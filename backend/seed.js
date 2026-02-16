require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const University = require('./models/University');
const ScientificField = require('./models/ScientificField');
const specialties = require('../ilmiy-ishlar-codi');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await University.deleteMany({});
    await User.deleteMany({});
    await ScientificField.deleteMany({});

    // Import all 386 scientific field specialties
    const transformedFields = specialties.map((item) => ({
      code: item.code,
      branch: item.branch,
      group: item.group || undefined,
      name: {
        uz: item.uz.label,
        ru: item.ru.label,
        en: item.en.label,
      },
      description: {
        uz: item.uz.describe,
        ru: item.ru.describe,
        en: item.en.describe,
      },
    }));

    await ScientificField.insertMany(transformedFields);
    console.log(`${transformedFields.length} ta ilmiy soha (mutaxassislik) import qilindi`);

    // Find specific fields for linking
    const csField = await ScientificField.findOne({ code: '05.01.07' }); // Informatika
    const geoField = await ScientificField.findOne({ code: '11.00.02' }); // Med geografiya

    // Create university
    const university = await University.create({
      name: {
        uz: 'Qoraqalpog\'iston Davlat Universiteti',
        ru: 'Каракалпакский государственный университет',
        en: 'Karakalpak State University',
      },
      slug: 'karakalpak-state-university',
      city: 'Nukus',
      region: 'Qoraqalpog\'iston',
      website: 'https://karsu.uz',
      email: 'info@karsu.uz',
      faculties: [
        {
          name: {
            uz: 'Fizika-matematika fakulteti',
            ru: 'Физико-математический факультет',
            en: 'Faculty of Physics and Mathematics',
          },
          departments: [
            {
              name: {
                uz: 'Matematika kafedrasi',
                ru: 'Кафедра математики',
                en: 'Department of Mathematics',
              },
            },
            {
              name: {
                uz: 'Fizika kafedrasi',
                ru: 'Кафедра физики',
                en: 'Department of Physics',
              },
            },
            {
              name: {
                uz: 'Informatika kafedrasi',
                ru: 'Кафедра информатики',
                en: 'Department of Computer Science',
              },
            },
          ],
        },
        {
          name: {
            uz: 'Tabiiy fanlar fakulteti',
            ru: 'Факультет естественных наук',
            en: 'Faculty of Natural Sciences',
          },
          departments: [
            {
              name: {
                uz: 'Biologiya kafedrasi',
                ru: 'Кафедра биологии',
                en: 'Department of Biology',
              },
            },
            {
              name: {
                uz: 'Kimyo kafedrasi',
                ru: 'Кафедра химии',
                en: 'Department of Chemistry',
              },
            },
            {
              name: {
                uz: 'Geografiya kafedrasi',
                ru: 'Кафедра географии',
                en: 'Department of Geography',
              },
            },
          ],
        },
      ],
    });

    // Create superadmin
    await User.create({
      email: 'admin@ilmiy.uz',
      password: 'admin123',
      role: 'superadmin',
      firstName: { uz: 'Admin', ru: 'Админ', en: 'Admin' },
      lastName: { uz: 'Tizim', ru: 'Система', en: 'System' },
      university: university._id,
      profileCompleted: true,
    });

    // Create admin
    await User.create({
      email: 'moderator@karsu.uz',
      password: 'moderator123',
      role: 'admin',
      firstName: { uz: 'Moderator', ru: 'Модератор', en: 'Moderator' },
      lastName: { uz: 'KarSU', ru: 'КарГУ', en: 'KarSU' },
      university: university._id,
      profileCompleted: true,
    });

    // Create sample researcher
    const researcherFields = [];
    if (csField) researcherFields.push(csField._id);
    if (geoField) researcherFields.push(geoField._id);

    await User.create({
      email: 'researcher@karsu.uz',
      password: 'researcher123',
      role: 'researcher',
      firstName: { uz: 'Azamat', ru: 'Азамат', en: 'Azamat' },
      lastName: { uz: 'Karimov', ru: 'Каримов', en: 'Karimov' },
      middleName: { uz: 'Baxtiyorovich', ru: 'Бахтиёрович', en: 'Bakhtiyorovich' },
      university: university._id,
      scientificFields: researcherFields,
      scientificField: 'Informatika',
      academicDegree: 'PhD',
      academicTitle: 'docent',
      researchDirection: 'Sun\'iy intellekt va ma\'lumotlar tahlili',
      currentPosition: 'Dotsent',
      faculty: 'Fizika-matematika fakulteti',
      department: 'Informatika kafedrasi',
      profileCompleted: true,
      publicationStats: {
        total: 25,
        scopusTotal: 5,
        scopusQ2: 2,
        scopusQ3: 3,
        republicanArticles: 10,
        foreignArticles: 5,
        internationalConference: 5,
      },
      hIndexScopus: 3,
      hIndexGoogleScholar: 5,
    });

    console.log('Seed data yaratildi!');
    console.log('---');
    console.log('SuperAdmin: admin@ilmiy.uz / admin123');
    console.log('Admin: moderator@karsu.uz / moderator123');
    console.log('Researcher: researcher@karsu.uz / researcher123');
    process.exit(0);
  } catch (error) {
    console.error('Seed xatolik:', error);
    process.exit(1);
  }
};

seed();
