require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const University = require("./models/University");
const Publication = require("./models/Publication");
const ScientificField = require("./models/ScientificField");
const specialties = require("../ilmiy-ishlar-codi");
const fs = require("fs");
const path = require("path");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected\n");

    // ═══════════════════════════════════════════
    // 1. CLEAR EXISTING DATA
    // ═══════════════════════════════════════════
    await Promise.all([
      University.deleteMany({}),
      User.deleteMany({}),
      Publication.deleteMany({}),
      ScientificField.deleteMany({}),
    ]);
    // Drop old indexes to avoid conflicts
    await Promise.all([
      Publication.collection.dropIndexes().catch(() => {}),
      ScientificField.collection.dropIndexes().catch(() => {}),
    ]);
    console.log("Eski ma'lumotlar va indexlar tozalandi");

    // ═══════════════════════════════════════════
    // 2. IMPORT SCIENTIFIC FIELDS (344 ta mutaxassislik)
    // ═══════════════════════════════════════════
    const transformedFields = specialties.map((item) => ({
      code: item.code,
      branch: {
        code: item.branch.code,
        uz: item.branch.uz || item.branch.ru || item.branch.en || item.branch.code,
        ru: item.branch.ru || item.branch.uz || item.branch.en || item.branch.code,
        en: item.branch.en || item.branch.ru || item.branch.uz || item.branch.code,
      },
      group: item.group && item.group.code ? item.group : undefined,
      name: {
        uz: item.uz.label || item.ru.label || item.en.label || item.code,
        ru: item.ru.label || item.uz.label || item.en.label || item.code,
        en: item.en.label || item.ru.label || item.uz.label || item.code,
      },
      description: {
        uz: item.uz.describe || "",
        ru: item.ru.describe || "",
        en: item.en.describe || "",
      },
    }));

    await ScientificField.insertMany(transformedFields);
    console.log(`${transformedFields.length} ta ilmiy mutaxassislik import qilindi`);

    // Find specific fields for researchers
    const fields = {
      mathAnalysis: await ScientificField.findOne({ code: "01.01.01" }),
      diffEquations: await ScientificField.findOne({ code: "01.01.02" }),
      informatics: await ScientificField.findOne({ code: "05.01.07" }),
      orgChemistry: await ScientificField.findOne({ code: "02.00.03" }),
      uzbekLit: await ScientificField.findOne({ code: "10.00.02" }),
      pedagogy: await ScientificField.findOne({ code: "13.00.02" }),
      economics: await ScientificField.findOne({ code: "08.00.01" }),
      geography: await ScientificField.findOne({ code: "11.00.02" }),
      history: await ScientificField.findOne({ code: "07.00.01" }),
      biology: await ScientificField.findOne({ code: "03.00.04" }),
    };

    // ═══════════════════════════════════════════
    // 3. CREATE UNIVERSITIES
    // ═══════════════════════════════════════════
    const karsu = await University.create({
      name: {
        uz: "Berdax nomidagi Qoraqalpoq davlat universiteti",
        ru: "Каракалпакский государственный университет имени Бердаха",
        en: "Karakalpak State University named after Berdakh",
      },
      slug: "karakalpak-state-university",
      city: "Nukus",
      region: "Qoraqalpog'iston",
      website: "https://karsu.uz",
      email: "info@karsu.uz",
      faculties: [
        {
          name: {
            uz: "Fizika-matematika fakulteti",
            ru: "Физико-математический факультет",
            en: "Faculty of Physics and Mathematics",
          },
          departments: [
            {
              name: {
                uz: "Matematika kafedrasi",
                ru: "Кафедра математики",
                en: "Department of Mathematics",
              },
            },
            {
              name: {
                uz: "Fizika kafedrasi",
                ru: "Кафедра физики",
                en: "Department of Physics",
              },
            },
            {
              name: {
                uz: "Informatika kafedrasi",
                ru: "Кафедра информатики",
                en: "Department of Computer Science",
              },
            },
          ],
        },
        {
          name: {
            uz: "Tabiiy fanlar fakulteti",
            ru: "Факультет естественных наук",
            en: "Faculty of Natural Sciences",
          },
          departments: [
            {
              name: {
                uz: "Biologiya kafedrasi",
                ru: "Кафедра биологии",
                en: "Department of Biology",
              },
            },
            {
              name: {
                uz: "Kimyo kafedrasi",
                ru: "Кафедра химии",
                en: "Department of Chemistry",
              },
            },
            {
              name: {
                uz: "Geografiya kafedrasi",
                ru: "Кафедра географии",
                en: "Department of Geography",
              },
            },
          ],
        },
        {
          name: {
            uz: "Filologiya fakulteti",
            ru: "Филологический факультет",
            en: "Faculty of Philology",
          },
          departments: [
            {
              name: {
                uz: "O'zbek tili va adabiyoti kafedrasi",
                ru: "Кафедра узбекского языка и литературы",
                en: "Department of Uzbek Language and Literature",
              },
            },
            {
              name: {
                uz: "Ingliz tili kafedrasi",
                ru: "Кафедра английского языка",
                en: "Department of English Language",
              },
            },
          ],
        },
        {
          name: {
            uz: "Iqtisodiyot fakulteti",
            ru: "Экономический факультет",
            en: "Faculty of Economics",
          },
          departments: [
            {
              name: {
                uz: "Iqtisodiyot kafedrasi",
                ru: "Кафедра экономики",
                en: "Department of Economics",
              },
            },
          ],
        },
      ],
    });

    const ndpi = await University.create({
      name: {
        uz: "Ajiniyoz nomidagi Nukus davlat pedagogika instituti",
        ru: "Нукусский государственный педагогический институт имени Ажиниёза",
        en: "Nukus State Pedagogical Institute named after Ajiniyaz",
      },
      slug: "nukus-pedagogical-institute",
      city: "Nukus",
      region: "Qoraqalpog'iston",
      website: "https://ndpi.uz",
      email: "info@ndpi.uz",
      faculties: [
        {
          name: {
            uz: "Pedagogika fakulteti",
            ru: "Педагогический факультет",
            en: "Faculty of Pedagogy",
          },
          departments: [
            {
              name: {
                uz: "Pedagogika kafedrasi",
                ru: "Кафедра педагогики",
                en: "Department of Pedagogy",
              },
            },
          ],
        },
        {
          name: {
            uz: "Tarix fakulteti",
            ru: "Исторический факультет",
            en: "Faculty of History",
          },
          departments: [
            {
              name: {
                uz: "Tarix kafedrasi",
                ru: "Кафедра истории",
                en: "Department of History",
              },
            },
          ],
        },
      ],
    });

    const toshdu = await University.create({
      name: {
        uz: "Mirzo Ulug'bek nomidagi O'zbekiston Milliy universiteti",
        ru: "Национальный университет Узбекистана имени Мирзо Улугбека",
        en: "National University of Uzbekistan named after Mirzo Ulugbek",
      },
      slug: "national-university-uzbekistan",
      city: "Toshkent",
      region: "Toshkent shahri",
      website: "https://nuu.uz",
      email: "info@nuu.uz",
      faculties: [
        {
          name: {
            uz: "Matematika fakulteti",
            ru: "Математический факультет",
            en: "Faculty of Mathematics",
          },
          departments: [
            {
              name: {
                uz: "Matematik analiz kafedrasi",
                ru: "Кафедра математического анализа",
                en: "Department of Mathematical Analysis",
              },
            },
          ],
        },
        {
          name: {
            uz: "Biologiya fakulteti",
            ru: "Биологический факультет",
            en: "Faculty of Biology",
          },
          departments: [
            {
              name: {
                uz: "Biologiya kafedrasi",
                ru: "Кафедра биологии",
                en: "Department of Biology",
              },
            },
          ],
        },
      ],
    });

    console.log("3 ta universitet yaratildi");

    // ═══════════════════════════════════════════
    // 4. CREATE USERS
    // ═══════════════════════════════════════════

    // Superadmin
    const superadmin = await User.create({
      email: "admin@ilmiy.uz",
      password: "admin123",
      role: "superadmin",
      firstName: { uz: "Admin", ru: "Админ", en: "Admin" },
      lastName: { uz: "Tizim", ru: "Система", en: "System" },
      university: karsu._id,
      profileCompleted: true,
    });

    // Admin
    const admin = await User.create({
      email: "moderator@karsu.uz",
      password: "moderator123",
      role: "admin",
      firstName: { uz: "Gulnora", ru: "Гулнора", en: "Gulnora" },
      lastName: { uz: "Rahimova", ru: "Рахимова", en: "Rahimova" },
      university: karsu._id,
      profileCompleted: true,
    });

    // Researchers
    const researcher1 = await User.create({
      email: "researcher@karsu.uz",
      password: "researcher123",
      role: "researcher",
      firstName: { uz: "Azamat", ru: "Азамат", en: "Azamat" },
      lastName: { uz: "Karimov", ru: "Каримов", en: "Karimov" },
      middleName: {
        uz: "Baxtiyorovich",
        ru: "Бахтиёрович",
        en: "Bakhtiyorovich",
      },
      university: karsu._id,
      scientificFields: [fields.informatics?._id, fields.mathAnalysis?._id].filter(Boolean),
      scientificField: "Informatika va axborot texnologiyalari",
      academicDegree: "PhD",
      academicTitle: "docent",
      defenseSpecialty: { code: "05.01.07", name: "Informatika" },
      researchDirection: "Sun'iy intellekt va ma'lumotlar tahlili",
      currentPosition: "Dotsent",
      faculty: "Fizika-matematika fakulteti",
      department: "Informatika kafedrasi",
      orcid: "0000-0002-1234-5678",
      hIndexScopus: 3,
      hIndexGoogleScholar: 7,
      profileCompleted: true,
      publicationStats: {
        total: 32,
        scopusTotal: 5,
        scopusQ2: 2,
        scopusQ3: 3,
        republicanArticles: 12,
        foreignArticles: 5,
        internationalConference: 6,
        textbooks: 2,
      },
    });

    const researcher2 = await User.create({
      email: "davlatov@karsu.uz",
      password: "researcher123",
      role: "researcher",
      firstName: { uz: "Jasur", ru: "Жасур", en: "Jasur" },
      lastName: { uz: "Davlatov", ru: "Давлатов", en: "Davlatov" },
      middleName: {
        uz: "Rustamovich",
        ru: "Рустамович",
        en: "Rustamovich",
      },
      university: karsu._id,
      scientificFields: [fields.diffEquations?._id].filter(Boolean),
      scientificField: "Differensial tenglamalar",
      academicDegree: "DSc",
      academicTitle: "professor",
      defenseSpecialty: { code: "01.01.02", name: "Differensial tenglamalar" },
      researchDirection:
        "Qisman hosilali differensial tenglamalar va matematik fizika",
      currentPosition: "Professor",
      faculty: "Fizika-matematika fakulteti",
      department: "Matematika kafedrasi",
      hIndexScopus: 8,
      hIndexGoogleScholar: 14,
      profileCompleted: true,
      publicationStats: {
        total: 85,
        scopusTotal: 18,
        scopusQ1: 3,
        scopusQ2: 7,
        scopusQ3: 8,
        republicanArticles: 30,
        foreignArticles: 15,
        internationalConference: 12,
        monographs: 2,
        textbooks: 3,
      },
    });

    const researcher3 = await User.create({
      email: "yusupova@ndpi.uz",
      password: "researcher123",
      role: "researcher",
      firstName: { uz: "Madina", ru: "Мадина", en: "Madina" },
      lastName: { uz: "Yusupova", ru: "Юсупова", en: "Yusupova" },
      middleName: {
        uz: "Kamalovna",
        ru: "Камаловна",
        en: "Kamalovna",
      },
      university: ndpi._id,
      scientificFields: [fields.pedagogy?._id, fields.uzbekLit?._id].filter(Boolean),
      scientificField: "Pedagogika nazariyasi va tarixi",
      academicDegree: "PhD",
      academicTitle: "docent",
      defenseSpecialty: { code: "13.00.02", name: "Ta'lim va tarbiya nazariyasi" },
      researchDirection:
        "Innovatsion ta'lim texnologiyalari",
      currentPosition: "Dotsent",
      faculty: "Pedagogika fakulteti",
      department: "Pedagogika kafedrasi",
      hIndexScopus: 2,
      hIndexGoogleScholar: 5,
      profileCompleted: true,
      publicationStats: {
        total: 28,
        scopusTotal: 3,
        scopusQ3: 2,
        scopusQ4: 1,
        republicanArticles: 15,
        foreignArticles: 3,
        internationalConference: 4,
        textbooks: 1,
        manuals: 2,
      },
    });

    const researcher4 = await User.create({
      email: "alimov@nuu.uz",
      password: "researcher123",
      role: "researcher",
      firstName: { uz: "Bobur", ru: "Бобур", en: "Bobur" },
      lastName: { uz: "Alimov", ru: "Алимов", en: "Alimov" },
      middleName: {
        uz: "Shuhratovich",
        ru: "Шухратович",
        en: "Shuhratovich",
      },
      university: toshdu._id,
      scientificFields: [fields.biology?._id].filter(Boolean),
      scientificField: "Mikrobiologiya",
      academicDegree: "DSc",
      academicTitle: "professor",
      defenseSpecialty: { code: "03.00.04", name: "Mikrobiologiya" },
      researchDirection: "Orol dengizi havzasi mikrobiologiyasi",
      currentPosition: "Professor, kafedra mudiri",
      faculty: "Biologiya fakulteti",
      department: "Biologiya kafedrasi",
      orcid: "0000-0003-9876-5432",
      hIndexScopus: 12,
      hIndexGoogleScholar: 20,
      profileCompleted: true,
      publicationStats: {
        total: 120,
        scopusTotal: 25,
        scopusQ1: 5,
        scopusQ2: 10,
        scopusQ3: 7,
        scopusQ4: 3,
        webOfScience: 8,
        republicanArticles: 40,
        foreignArticles: 20,
        internationalConference: 15,
        monographs: 3,
        textbooks: 4,
      },
    });

    const researcher5 = await User.create({
      email: "ergashev@karsu.uz",
      password: "researcher123",
      role: "researcher",
      firstName: { uz: "Timur", ru: "Тимур", en: "Timur" },
      lastName: { uz: "Ergashev", ru: "Эргашев", en: "Ergashev" },
      middleName: {
        uz: "Ilxomovich",
        ru: "Илхомович",
        en: "Ilkhomovich",
      },
      university: karsu._id,
      scientificFields: [fields.economics?._id].filter(Boolean),
      scientificField: "Iqtisodiyot nazariyasi",
      academicDegree: "PhD",
      academicTitle: "none",
      defenseSpecialty: { code: "08.00.01", name: "Iqtisodiyot nazariyasi" },
      researchDirection:
        "Raqamli iqtisodiyot va innovatsion rivojlanish",
      currentPosition: "Katta o'qituvchi",
      faculty: "Iqtisodiyot fakulteti",
      department: "Iqtisodiyot kafedrasi",
      hIndexScopus: 1,
      hIndexGoogleScholar: 3,
      profileCompleted: true,
      publicationStats: {
        total: 15,
        scopusTotal: 2,
        scopusQ3: 1,
        scopusQ4: 1,
        republicanArticles: 8,
        foreignArticles: 2,
        internationalConference: 3,
      },
    });

    console.log("8 ta foydalanuvchi yaratildi (1 superadmin, 1 admin, 5 researcher + 1 admin)");

    // ═══════════════════════════════════════════
    // 5. CREATE SAMPLE PUBLICATIONS
    // ═══════════════════════════════════════════

    // Ensure uploads directory
    const uploadsDir = path.join(__dirname, "uploads/publications");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Create a tiny placeholder file for mainFile
    const placeholderFile = path.join(uploadsDir, "sample-placeholder.pdf");
    if (!fs.existsSync(placeholderFile)) {
      fs.writeFileSync(placeholderFile, "Placeholder PDF content");
    }
    const mainFilePath = "uploads/publications/sample-placeholder.pdf";

    const publications = [
      // ── Researcher 1: Karimov (Informatika) ──
      {
        author: researcher1._id,
        university: karsu._id,
        type: "article",
        title: {
          uz: "Sun'iy neyron tarmoqlari yordamida matnlarni tasniflashtirish",
          ru: "Классификация текстов с помощью искусственных нейронных сетей",
          en: "Text classification using artificial neural networks",
        },
        annotation:
          "Ushbu maqolada sun'iy neyron tarmoqlari yordamida o'zbek tilidagi matnlarni avtomatik tasniflashtirish usullari tahlil qilingan. Tadqiqot natijalari 94% aniqlik ko'rsatdi.",
        keywords: [
          "neyron tarmoq",
          "matn tasnifi",
          "NLP",
          "sun'iy intellekt",
          "machine learning",
        ],
        specialty: { code: "05.01.07", name: "Informatika" },
        publicationYear: 2024,
        language: "english",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Journal of Computer Science and Technology",
          volume: "15",
          issue: "3",
          pageFrom: 245,
          pageTo: 258,
          doi: "10.1234/jcst.2024.0315",
          journalType: "scopus",
          quartile: "Q2",
        },
        status: "published",
        viewCount: 156,
        downloadCount: 43,
        slug: "text-classification-neural-networks-2024",
      },
      {
        author: researcher1._id,
        university: karsu._id,
        type: "article",
        title: {
          uz: "Qoraqalpog'iston hududida raqamli texnologiyalardan foydalanish tahlili",
          ru: "Анализ использования цифровых технологий в Каракалпакстане",
          en: "Analysis of digital technology usage in Karakalpakstan",
        },
        annotation:
          "Maqolada Qoraqalpog'iston hududida raqamli texnologiyalarning joriy etilish jarayoni va uning ijtimoiy-iqtisodiy samaradorligi tadqiq etilgan.",
        keywords: [
          "raqamli texnologiya",
          "Qoraqalpog'iston",
          "iqtisodiy samaradorlik",
        ],
        specialty: { code: "05.01.07", name: "Informatika" },
        publicationYear: 2023,
        language: "uzbek",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "O'zbekiston axborot texnologiyalari jurnali",
          volume: "8",
          issue: "2",
          pageFrom: 45,
          pageTo: 56,
          journalType: "republican",
        },
        status: "published",
        viewCount: 89,
        downloadCount: 28,
        slug: "digital-tech-karakalpakstan-2023",
      },
      {
        author: researcher1._id,
        university: karsu._id,
        type: "conference_thesis",
        title: {
          uz: "Deep learning algoritmlarining tibbiyotda qo'llanilishi",
          ru: "Применение алгоритмов глубокого обучения в медицине",
          en: "Application of deep learning algorithms in medicine",
        },
        annotation:
          "Xalqaro konferensiya materiallari. Deep learning usullarining tibbiy tasvirlarni tahlil qilishda qo'llanilishi haqida.",
        keywords: ["deep learning", "tibbiy tasvir", "CNN", "diagnostika"],
        publicationYear: 2024,
        language: "english",
        mainFile: mainFilePath,
        conferenceDetails: {
          conferenceName:
            "International Conference on AI in Healthcare",
          conferenceType: "international",
          location: { city: "Toshkent", country: "O'zbekiston" },
        },
        status: "published",
        viewCount: 67,
        downloadCount: 19,
        slug: "deep-learning-medicine-conf-2024",
      },

      // ── Researcher 2: Davlatov (Matematika) ──
      {
        author: researcher2._id,
        university: karsu._id,
        type: "article",
        title: {
          uz: "Ikkinchi tartibli elliptik tenglamalar uchun Dirichle masalasining yechilishi",
          ru: "Решение задачи Дирихле для эллиптических уравнений второго порядка",
          en: "Solution of the Dirichlet problem for second-order elliptic equations",
        },
        annotation:
          "The paper establishes existence and uniqueness theorems for the Dirichlet problem associated with second-order elliptic equations in bounded domains with non-smooth boundaries.",
        keywords: [
          "elliptic equations",
          "Dirichlet problem",
          "Sobolev spaces",
          "regularity",
        ],
        specialty: { code: "01.01.02", name: "Differensial tenglamalar" },
        publicationYear: 2024,
        language: "english",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Journal of Mathematical Analysis and Applications",
          volume: "531",
          issue: "2",
          pageFrom: 128,
          pageTo: 145,
          doi: "10.1016/j.jmaa.2024.128145",
          journalType: "scopus",
          quartile: "Q1",
        },
        status: "published",
        viewCount: 234,
        downloadCount: 78,
        slug: "dirichlet-problem-elliptic-2024",
      },
      {
        author: researcher2._id,
        university: karsu._id,
        type: "monograph",
        title: {
          uz: "Matematik fizika tenglamalari: nazariya va qo'llanilishi",
          ru: "Уравнения математической физики: теория и приложения",
          en: "Equations of mathematical physics: theory and applications",
        },
        annotation:
          "Monografiyada matematik fizikaning asosiy tenglamalari, ularning yechish usullari va zamonaviy qo'llanilishi tizimli ravishda bayon etilgan.",
        keywords: [
          "matematik fizika",
          "differensial tenglamalar",
          "Furye usuli",
          "integral tenglamalar",
        ],
        publicationYear: 2023,
        language: "russian",
        mainFile: mainFilePath,
        textbookDetails: {
          publisher: "Fan nashriyoti",
          publishYear: 2023,
          pageCount: 320,
          isbn: "978-9943-6789-01-2",
        },
        status: "published",
        viewCount: 189,
        downloadCount: 95,
        slug: "math-physics-equations-monograph-2023",
      },
      {
        author: researcher2._id,
        university: karsu._id,
        type: "article",
        title: {
          uz: "Parabolik tenglamalar uchun boshlang'ich-chegaraviy masalalar",
          ru: "Начально-краевые задачи для параболических уравнений",
          en: "Initial-boundary value problems for parabolic equations",
        },
        annotation:
          "Parabolik turdagi differensial tenglamalar uchun boshlang'ich-chegaraviy masalalarning yechilishi va barqarorligi tadqiq etilgan.",
        keywords: [
          "parabolik tenglamalar",
          "boshlang'ich masala",
          "barqarorlik",
        ],
        publicationYear: 2024,
        language: "russian",
        mainFile: mainFilePath,
        articleDetails: {
          journalName:
            "Дифференциальные уравнения",
          volume: "60",
          issue: "4",
          pageFrom: 512,
          pageTo: 526,
          journalType: "scopus",
          quartile: "Q2",
        },
        status: "published",
        viewCount: 145,
        downloadCount: 52,
        slug: "parabolic-equations-ibvp-2024",
      },

      // ── Researcher 3: Yusupova (Pedagogika) ──
      {
        author: researcher3._id,
        university: ndpi._id,
        type: "article",
        title: {
          uz: "Boshlang'ich sinflarda interfaol ta'lim usullarining samaradorligi",
          ru: "Эффективность интерактивных методов обучения в начальных классах",
          en: "Effectiveness of interactive teaching methods in primary school",
        },
        annotation:
          "Maqolada boshlang'ich sinf o'quvchilarining bilim o'zlashtirishida interfaol usullarning samaradorligi eksperimental tadqiq etilgan.",
        keywords: [
          "interfaol ta'lim",
          "boshlang'ich sinf",
          "pedagogik texnologiya",
          "samaradorlik",
        ],
        specialty: { code: "13.00.02", name: "Pedagogika" },
        publicationYear: 2024,
        language: "uzbek",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Pedagogika jurnali",
          volume: "12",
          issue: "1",
          pageFrom: 78,
          pageTo: 89,
          journalType: "republican",
        },
        status: "published",
        viewCount: 112,
        downloadCount: 45,
        slug: "interactive-teaching-primary-2024",
      },
      {
        author: researcher3._id,
        university: ndpi._id,
        type: "textbook",
        title: {
          uz: "Zamonaviy pedagogik texnologiyalar",
          ru: "Современные педагогические технологии",
          en: "Modern pedagogical technologies",
        },
        annotation:
          "O'quv qo'llanmada zamonaviy pedagogik texnologiyalar, ularning nazariy asoslari va amaliy qo'llanilishi yoritilgan.",
        keywords: [
          "pedagogika",
          "texnologiya",
          "o'quv qo'llanma",
          "ta'lim",
        ],
        publicationYear: 2023,
        language: "uzbek",
        mainFile: mainFilePath,
        textbookDetails: {
          publisher: "O'qituvchi nashriyoti",
          publishYear: 2023,
          pageCount: 240,
          isbn: "978-9943-5678-12-3",
          approval: "O'zbekiston Respublikasi OO'MTVga tasdiqlangan",
        },
        status: "published",
        viewCount: 201,
        downloadCount: 130,
        slug: "modern-pedagogical-technologies-2023",
      },

      // ── Researcher 4: Alimov (Biologiya) ──
      {
        author: researcher4._id,
        university: toshdu._id,
        type: "article",
        title: {
          uz: "Orol dengizi havzasidagi tuproq mikrobiomining o'zgarishlari",
          ru: "Изменения почвенного микробиома в бассейне Аральского моря",
          en: "Changes in soil microbiome in the Aral Sea basin",
        },
        annotation:
          "This study investigates the composition and diversity of soil microbiomes in the dried bed of the Aral Sea using 16S rRNA sequencing. Significant shifts in microbial community structure were observed.",
        keywords: [
          "Aral Sea",
          "microbiome",
          "soil ecology",
          "16S rRNA",
          "metagenomics",
        ],
        specialty: { code: "03.00.04", name: "Mikrobiologiya" },
        publicationYear: 2024,
        language: "english",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Environmental Microbiology",
          volume: "26",
          issue: "8",
          pageFrom: 1234,
          pageTo: 1250,
          doi: "10.1111/1462-2920.16789",
          journalType: "scopus",
          quartile: "Q1",
        },
        status: "published",
        viewCount: 342,
        downloadCount: 156,
        slug: "aral-sea-soil-microbiome-2024",
      },
      {
        author: researcher4._id,
        university: toshdu._id,
        type: "article",
        title: {
          uz: "Tuzli tuproqlarda halofil bakteriyalarning xilma-xilligi",
          ru: "Разнообразие галофильных бактерий в засоленных почвах",
          en: "Diversity of halophilic bacteria in saline soils",
        },
        annotation:
          "A comprehensive survey of halophilic bacterial communities in saline soils of Central Asia, revealing novel species adapted to extreme salinity conditions.",
        keywords: [
          "halophilic bacteria",
          "saline soil",
          "biodiversity",
          "Central Asia",
          "extremophiles",
        ],
        publicationYear: 2023,
        language: "english",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Extremophiles",
          volume: "27",
          issue: "3",
          pageFrom: 45,
          pageTo: 58,
          doi: "10.1007/s00792-023-01234-5",
          journalType: "scopus",
          quartile: "Q2",
        },
        status: "published",
        viewCount: 278,
        downloadCount: 112,
        slug: "halophilic-bacteria-saline-2023",
      },
      {
        author: researcher4._id,
        university: toshdu._id,
        type: "dissertation",
        title: {
          uz: "Markaziy Osiyo tuproq mikroorganizmlarining ekologik xilma-xilligi va biotexnologik salohiyati",
          ru: "Экологическое разнообразие и биотехнологический потенциал почвенных микроорганизмов Центральной Азии",
          en: "Ecological diversity and biotechnological potential of soil microorganisms in Central Asia",
        },
        annotation:
          "Dissertatsiyada Markaziy Osiyo tuproq mikroorganizmlarining taksonomik tarkibi, ekologik xilma-xilligi va biotexnologik salohiyati kompleks tadqiq etilgan.",
        keywords: [
          "mikrobiologiya",
          "tuproq ekologiyasi",
          "biotexnologiya",
          "Markaziy Osiyo",
        ],
        publicationYear: 2020,
        language: "uzbek",
        mainFile: mainFilePath,
        dissertationDetails: {
          subType: "DSc",
          supervisor: {
            fullName: "Abdullayev N.T.",
            degree: "DSc",
            title: "professor",
          },
          defensePlace: "O'zbekiston Milliy universiteti",
        },
        status: "published",
        viewCount: 567,
        downloadCount: 234,
        slug: "central-asia-soil-microorganisms-diss-2020",
      },

      // ── Researcher 5: Ergashev (Iqtisodiyot) ──
      {
        author: researcher5._id,
        university: karsu._id,
        type: "article",
        title: {
          uz: "O'zbekistonda raqamli iqtisodiyotning rivojlanish tendensiyalari",
          ru: "Тенденции развития цифровой экономики в Узбекистане",
          en: "Trends in the development of digital economy in Uzbekistan",
        },
        annotation:
          "Maqolada O'zbekistonda raqamli iqtisodiyotning joriy holati, rivojlanish tendensiyalari va istiqbollari tahlil qilingan.",
        keywords: [
          "raqamli iqtisodiyot",
          "O'zbekiston",
          "innovatsiya",
          "IT sektor",
        ],
        specialty: { code: "08.00.01", name: "Iqtisodiyot nazariyasi" },
        publicationYear: 2024,
        language: "uzbek",
        mainFile: mainFilePath,
        articleDetails: {
          journalName: "Iqtisodiyot va innovatsion texnologiyalar",
          volume: "6",
          issue: "4",
          pageFrom: 15,
          pageTo: 28,
          journalType: "republican",
        },
        status: "published",
        viewCount: 95,
        downloadCount: 32,
        slug: "digital-economy-uzbekistan-2024",
      },
      {
        author: researcher5._id,
        university: karsu._id,
        type: "conference_thesis",
        title: {
          uz: "Qoraqalpog'istonda kichik biznesning rivojlanish muammolari",
          ru: "Проблемы развития малого бизнеса в Каракалпакстане",
          en: "Problems of small business development in Karakalpakstan",
        },
        annotation:
          "Maqolada Qoraqalpog'iston Respublikasida kichik biznes va tadbirkorlikning rivojlanishiga ta'sir etuvchi omillar tadqiq etilgan.",
        keywords: [
          "kichik biznes",
          "tadbirkorlik",
          "Qoraqalpog'iston",
          "iqtisodiy rivojlanish",
        ],
        publicationYear: 2023,
        language: "uzbek",
        mainFile: mainFilePath,
        conferenceDetails: {
          conferenceName:
            "Respublika ilmiy-amaliy konferensiyasi: Iqtisodiy islohotlar va rivojlanish",
          conferenceType: "republican",
          location: { city: "Nukus", country: "O'zbekiston" },
        },
        status: "published",
        viewCount: 54,
        downloadCount: 18,
        slug: "small-business-karakalpakstan-conf-2023",
      },
      {
        author: researcher1._id,
        university: karsu._id,
        type: "manual",
        title: {
          uz: "Python dasturlash tili: amaliy qo'llanma",
          ru: "Язык программирования Python: практическое руководство",
          en: "Python programming language: practical guide",
        },
        annotation:
          "Ushbu uslubiy qo'llanmada Python dasturlash tilining asoslari, ma'lumotlar tuzilmalari va algoritmlar amaliy misollar bilan tushuntirilgan.",
        keywords: ["Python", "dasturlash", "algoritmlar", "qo'llanma"],
        publicationYear: 2024,
        language: "uzbek",
        mainFile: mainFilePath,
        textbookDetails: {
          publisher: "KarSU nashriyoti",
          publishYear: 2024,
          pageCount: 180,
        },
        status: "published",
        viewCount: 320,
        downloadCount: 210,
        slug: "python-programming-guide-2024",
      },
    ];

    const createdPubs = await Publication.insertMany(publications);
    console.log(`${createdPubs.length} ta namunaviy nashr yaratildi`);

    // ═══════════════════════════════════════════
    // 6. SUMMARY
    // ═══════════════════════════════════════════
    console.log("\n══════════════════════════════════════");
    console.log("SEED MUVAFFAQIYATLI YAKUNLANDI!");
    console.log("══════════════════════════════════════");
    console.log(`Ilmiy sohalar:    ${transformedFields.length} ta (23 tarmoq)`);
    console.log(`Universitetlar:   3 ta`);
    console.log(`Foydalanuvchilar: 8 ta`);
    console.log(`Nashrlar:         ${createdPubs.length} ta`);
    console.log("──────────────────────────────────────");
    console.log("Login ma'lumotlari:");
    console.log("  SuperAdmin:  admin@ilmiy.uz / admin123");
    console.log("  Admin:       moderator@karsu.uz / moderator123");
    console.log("  Researcher1: researcher@karsu.uz / researcher123");
    console.log("  Researcher2: davlatov@karsu.uz / researcher123");
    console.log("  Researcher3: yusupova@ndpi.uz / researcher123");
    console.log("  Researcher4: alimov@nuu.uz / researcher123");
    console.log("  Researcher5: ergashev@karsu.uz / researcher123");
    console.log("══════════════════════════════════════\n");

    process.exit(0);
  } catch (error) {
    console.error("Seed xatolik:", error);
    process.exit(1);
  }
};

seed();
