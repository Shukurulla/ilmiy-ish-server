const Publication = require('../models/Publication');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail, emailTemplates } = require('../utils/email');
const slugify = require('slugify');

// Create publication
exports.createPublication = async (req, res, next) => {
  try {
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    data.author = req.user._id;
    data.university = req.user.university;

    if (req.files && req.files.mainFile) {
      data.mainFile = `/uploads/publications/${req.files.mainFile[0].filename}`;
    }

    if (req.files && req.files.additionalFiles) {
      data.additionalFiles = req.files.additionalFiles.map((f) => ({
        filename: f.filename,
        originalName: f.originalname,
        path: `/uploads/additional/${f.filename}`,
      }));
    }

    const baseSlug = slugify(data.title.uz || data.title.ru || data.title.en || 'publication', {
      lower: true,
      strict: true,
    });
    data.slug = `${baseSlug}-${Date.now()}`;

    data.moderationHistory = [
      {
        action: 'submit',
        date: new Date(),
      },
    ];

    const publication = await Publication.create(data);
    const populatedPub = await Publication.findById(publication._id).populate('author', 'firstName lastName email');

    // Notify admins
    const admins = await User.find({
      role: { $in: ['admin', 'superadmin'] },
      ...(req.user.university ? { university: req.user.university } : {}),
    });

    const authorName = req.user.getFullName('uz');
    const pubTitle = data.title.uz || data.title.ru || data.title.en;

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        type: 'new_publication_review',
        title: {
          uz: 'Yangi ish tekshiruvga yuborildi',
          ru: 'Новая работа отправлена на проверку',
          en: 'New work submitted for review',
        },
        message: {
          uz: `${authorName} tomonidan "${pubTitle}" nomli yangi ish yuborildi`,
          ru: `${authorName} отправил новую работу "${pubTitle}"`,
          en: `${authorName} submitted a new work "${pubTitle}"`,
        },
        publication: publication._id,
      });

      const emailContent = emailTemplates.newPublicationForReview(
        admin.getFullName('uz'),
        authorName,
        pubTitle
      );
      sendEmail({ to: admin.email, ...emailContent });
    }

    // Notify author
    await Notification.create({
      user: req.user._id,
      type: 'publication_submitted',
      title: {
        uz: 'Ishingiz yuborildi',
        ru: 'Ваша работа отправлена',
        en: 'Your work has been submitted',
      },
      message: {
        uz: `"${pubTitle}" nomli ishingiz tekshiruvga yuborildi`,
        ru: `Ваша работа "${pubTitle}" отправлена на проверку`,
        en: `Your work "${pubTitle}" has been submitted for review`,
      },
      publication: publication._id,
    });

    res.status(201).json({ success: true, publication: populatedPub });
  } catch (error) {
    next(error);
  }
};

// Get all publications (with search and filters)
exports.getPublications = async (req, res, next) => {
  try {
    const {
      search, type, specialty, author, yearFrom, yearTo,
      university, language, journalType, quartile,
      sort = '-createdAt', page = 1, limit = 20,
      status,
    } = req.query;

    const query = {};

    // Public users only see published works
    if (!req.user || !['admin', 'superadmin'].includes(req.user.role)) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    // Admin only sees their university
    if (req.user && req.user.role === 'admin') {
      query.university = req.user.university;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (type) {
      query.type = { $in: type.split(',') };
    }

    if (specialty) {
      query.$or = query.$or || [];
      query.$or.push({ 'specialty.code': specialty }, { 'specialties.code': specialty });
    }

    if (author) {
      query.author = author;
    }

    if (yearFrom || yearTo) {
      query.publicationYear = {};
      if (yearFrom) query.publicationYear.$gte = parseInt(yearFrom);
      if (yearTo) query.publicationYear.$lte = parseInt(yearTo);
    }

    if (university) {
      query.university = university;
    }

    if (language) {
      query.language = language;
    }

    if (journalType) {
      query['articleDetails.journalType'] = journalType;
    }

    if (quartile) {
      query['articleDetails.quartile'] = quartile;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortObj = {};
    if (search) {
      sortObj = { score: { $meta: 'textScore' }, ...sortObj };
    }
    if (sort === 'newest') sortObj.createdAt = -1;
    else if (sort === 'oldest') sortObj.createdAt = 1;
    else if (sort === 'title') sortObj['title.uz'] = 1;
    else sortObj.createdAt = -1;

    const queryBuilder = Publication.find(query);

    if (search) {
      queryBuilder.select({ score: { $meta: 'textScore' } });
    }

    const [publications, total] = await Promise.all([
      queryBuilder
        .populate('author', 'firstName lastName avatar academicDegree academicTitle university')
        .populate('university', 'name')
        .skip(skip)
        .limit(parseInt(limit))
        .sort(sortObj),
      Publication.countDocuments(query),
    ]);

    res.json({
      success: true,
      publications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single publication
exports.getPublication = async (req, res, next) => {
  try {
    const publication = await Publication.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    })
      .populate('author', 'firstName lastName middleName avatar academicDegree academicTitle university orcid scopusAuthorId')
      .populate('university', 'name');

    if (!publication) {
      return res.status(404).json({ message: 'Ish topilmadi' });
    }

    // Increment view count
    publication.viewCount += 1;
    await publication.save();

    res.json({ success: true, publication });
  } catch (error) {
    next(error);
  }
};

// Get my publications
exports.getMyPublications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = { author: req.user._id };
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [publications, total] = await Promise.all([
      Publication.find(query)
        .populate('university', 'name')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Publication.countDocuments(query),
    ]);

    res.json({
      success: true,
      publications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update publication
exports.updatePublication = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Ish topilmadi' });
    }

    if (publication.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Faqat o\'z ishingizni tahrirlashingiz mumkin' });
    }

    if (!['pending', 'revision'].includes(publication.status)) {
      return res.status(400).json({ message: 'Faqat tekshiruvdagi yoki qayta ishlashdagi ishlarni tahrirlash mumkin' });
    }

    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.files && req.files.mainFile) {
      data.mainFile = `/uploads/publications/${req.files.mainFile[0].filename}`;
    }

    if (publication.status === 'revision') {
      data.status = 'pending';
      data.$push = {
        moderationHistory: { action: 'resubmit', date: new Date() },
      };
    }

    const updated = await Publication.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, publication: updated });
  } catch (error) {
    next(error);
  }
};

// Delete publication
exports.deletePublication = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Ish topilmadi' });
    }

    const isOwner = publication.author.toString() === req.user._id.toString();
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Bu amalni bajarish huquqingiz yo\'q' });
    }

    await Publication.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Ish o\'chirildi' });
  } catch (error) {
    next(error);
  }
};

// Download file - increment counter
exports.downloadFile = async (req, res, next) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Ish topilmadi' });
    }

    publication.downloadCount += 1;
    await publication.save();

    res.json({ success: true, fileUrl: publication.mainFile });
  } catch (error) {
    next(error);
  }
};

// Moderate publication (admin)
exports.moderatePublication = async (req, res, next) => {
  try {
    const { action, comment } = req.body;
    const publication = await Publication.findById(req.params.id).populate('author');

    if (!publication) {
      return res.status(404).json({ message: 'Ish topilmadi' });
    }

    if (!['approve', 'revision', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Noto\'g\'ri amal' });
    }

    if (['revision', 'reject'].includes(action) && !comment) {
      return res.status(400).json({ message: 'Izoh kiritish shart' });
    }

    const statusMap = {
      approve: 'published',
      revision: 'revision',
      reject: 'rejected',
    };

    publication.status = statusMap[action];
    publication.moderationHistory.push({
      action,
      comment,
      moderator: req.user._id,
      date: new Date(),
    });
    await publication.save();

    // Notification
    const notifTypeMap = {
      approve: 'publication_approved',
      revision: 'publication_revision',
      reject: 'publication_rejected',
    };

    const titleMap = {
      approve: { uz: 'Ishingiz tasdiqlandi', ru: 'Ваша работа одобрена', en: 'Your work has been approved' },
      revision: { uz: 'Ishingiz qayta ishlashga yuborildi', ru: 'Ваша работа отправлена на доработку', en: 'Your work needs revision' },
      reject: { uz: 'Ishingiz rad etildi', ru: 'Ваша работа отклонена', en: 'Your work has been rejected' },
    };

    const pubTitle = publication.title.uz || publication.title.ru || publication.title.en;

    await Notification.create({
      user: publication.author._id,
      type: notifTypeMap[action],
      title: titleMap[action],
      message: {
        uz: `"${pubTitle}" - ${comment || 'Tasdiqlandi'}`,
        ru: `"${pubTitle}" - ${comment || 'Одобрено'}`,
        en: `"${pubTitle}" - ${comment || 'Approved'}`,
      },
      publication: publication._id,
      comment,
    });

    // Send email
    const authorName = publication.author.getFullName('uz');
    let emailContent;
    if (action === 'approve') {
      emailContent = emailTemplates.publicationApproved(authorName, pubTitle);
    } else if (action === 'revision') {
      emailContent = emailTemplates.publicationRevision(authorName, pubTitle, comment);
    } else {
      emailContent = emailTemplates.publicationRejected(authorName, pubTitle, comment);
    }
    sendEmail({ to: publication.author.email, ...emailContent });

    res.json({ success: true, publication });
  } catch (error) {
    next(error);
  }
};

// Get statistics (admin)
exports.getStatistics = async (req, res, next) => {
  try {
    const universityFilter = req.user.role === 'admin' ? { university: req.user.university } : {};

    const [
      totalPublications,
      byStatus,
      byType,
      totalUsers,
      recentPublications,
    ] = await Promise.all([
      Publication.countDocuments(universityFilter),
      Publication.aggregate([
        { $match: universityFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Publication.aggregate([
        { $match: universityFilter },
        { $group: { _id: '$type', count: { $sum: 1 } } },
      ]),
      User.countDocuments({ ...universityFilter, role: 'researcher' }),
      Publication.find(universityFilter)
        .populate('author', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(10)
        .select('title type status createdAt'),
    ]);

    res.json({
      success: true,
      stats: {
        totalPublications,
        byStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.count])),
        byType: Object.fromEntries(byType.map((t) => [t._id, t.count])),
        totalUsers,
        recentPublications,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Search suggestions (autocomplete)
exports.searchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ success: true, suggestions: [] });
    }

    const regex = new RegExp(q, 'i');
    const publications = await Publication.find({
      status: 'published',
      $or: [
        { 'title.uz': regex },
        { 'title.ru': regex },
        { 'title.en': regex },
        { keywords: regex },
      ],
    })
      .select('title type publicationYear')
      .limit(10);

    const users = await User.find({
      role: 'researcher',
      profileCompleted: true,
      $or: [
        { 'firstName.uz': regex },
        { 'firstName.ru': regex },
        { 'lastName.uz': regex },
        { 'lastName.ru': regex },
      ],
    })
      .select('firstName lastName avatar academicDegree')
      .limit(5);

    res.json({
      success: true,
      suggestions: {
        publications: publications.map((p) => ({
          id: p._id,
          title: p.title,
          type: p.type,
          year: p.publicationYear,
        })),
        researchers: users.map((u) => ({
          id: u._id,
          name: u.firstName,
          lastName: u.lastName,
          avatar: u.avatar,
          degree: u.academicDegree,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
