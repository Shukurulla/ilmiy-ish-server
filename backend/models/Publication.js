const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },

    // 5.1 Work type
    type: {
      type: String,
      required: true,
      enum: [
        'dissertation',
        'abstract',
        'article',
        'monograph',
        'textbook',
        'manual',
        'conference_thesis',
        'other',
      ],
    },
    customType: String,

    // 5.2 Common fields
    title: {
      uz: { type: String, required: true },
      ru: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    annotation: { type: String, maxlength: 2000 },
    keywords: [String],
    specialty: {
      code: String,
      name: String,
    },
    specialties: [
      {
        code: String,
        fieldRef: { type: mongoose.Schema.Types.ObjectId, ref: 'ScientificField' },
      },
    ],
    publicationYear: { type: Number, required: true },
    language: {
      type: String,
      enum: ['uzbek', 'russian', 'english', 'other'],
      default: 'uzbek',
    },
    coAuthors: [
      {
        name: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],

    // 5.3 Files
    mainFile: { type: String, required: true },
    additionalFiles: [
      {
        filename: String,
        originalName: String,
        path: String,
      },
    ],

    // 5.4 Article-specific fields
    articleDetails: {
      journalName: String,
      volume: String,
      issue: String,
      pageFrom: Number,
      pageTo: Number,
      doi: String,
      url: String,
      journalType: {
        type: String,
        enum: ['republican', 'foreign', 'scopus', 'wos'],
      },
      quartile: {
        type: String,
        enum: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
    },

    // 5.5 Dissertation-specific fields
    dissertationDetails: {
      subType: { type: String, enum: ['candidate', 'doctoral', 'PhD', 'DSc'] },
      supervisor: {
        fullName: String,
        degree: String,
        title: String,
      },
      consultant: String,
      defensePlace: String,
      defenseDate: Date,
      diplomaNumber: String,
    },

    // 5.6 Conference-specific fields
    conferenceDetails: {
      conferenceName: String,
      conferenceType: {
        type: String,
        enum: ['republican', 'international', 'scopus'],
      },
      location: {
        city: String,
        country: String,
      },
      date: Date,
      proceedingsUrl: String,
    },

    // 5.7 Textbook-specific fields
    textbookDetails: {
      publisher: String,
      publishYear: Number,
      isbn: String,
      pageCount: Number,
      approval: String,
    },

    // Moderation
    status: {
      type: String,
      enum: ['pending', 'published', 'revision', 'rejected'],
      default: 'pending',
    },
    moderationHistory: [
      {
        action: { type: String, enum: ['submit', 'approve', 'revision', 'reject', 'resubmit'] },
        comment: String,
        moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ],

    // Stats
    viewCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },

    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

publicationSchema.index(
  {
    'title.uz': 'text',
    'title.ru': 'text',
    'title.en': 'text',
    annotation: 'text',
    keywords: 'text',
  },
  { language_override: 'searchLanguage' }
);

publicationSchema.index({ author: 1 });
publicationSchema.index({ status: 1 });
publicationSchema.index({ type: 1 });
publicationSchema.index({ publicationYear: -1 });
publicationSchema.index({ university: 1 });

module.exports = mongoose.model('Publication', publicationSchema);
