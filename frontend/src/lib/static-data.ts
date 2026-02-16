import { flexibleMatch } from "./transliterate";

// Static publications data for Turdimambetov Izimbet Rakhmetovich

export const staticAuthor = {
  _id: "turdimambetov",
  firstName: { uz: "Изимбет", ru: "Изимбет", en: "Izimbet" },
  lastName: { uz: "Турдимамбетов", ru: "Турдимамбетов", en: "Turdimambetov" },
  middleName: { uz: "Рахметович", ru: "Рахметович", en: "Rakhmetovich" },
  academicDegree: "doctor",
  academicTitle: "professor",
  university: {
    _id: "karsu",
    name: {
      uz: "Бердақ номидаги Қорақалпоқ давлат университети",
      ru: "Каракалпакский государственный университет имени Бердаха",
      en: "Karakalpak State University named after Berdakh",
    },
  },
};

export const staticPublications = [
  // === DOCTORAL DISSERTATION ===
  {
    _id: "static-1",
    title: {
      uz: "Қорақалпоғистон Республикаси нозогеографик вазиятини яхшилашнинг ижтимоий-иқтисодий хусусиятлари",
      ru: "Социально-экономические особенности улучшения нозогеографической ситуации Республики Каракалпакстан",
      en: "Socio-economic features of improving the nosogeographic situation of the Republic of Karakalpakstan",
    },
    type: "dissertation",
    publicationYear: 2018,
    language: "ru",
    annotation:
      "Диссертацияда Қорақалпоғистон Республикасининг нозогеографик вазиятини яхшилашнинг ижтимоий-иқтисодий хусусиятлари тадқиқ этилган. Аҳоли саломатлигига таъсир этувчи ижтимоий-иқтисодий ва экологик омиллар таҳлил қилинган.",
    keywords: ["нозогеография", "Каракалпакстан", "медицинская география", "социально-экономические факторы"],
    author: staticAuthor,
    viewCount: 245,
    downloadCount: 89,
    dissertationDetails: {
      defensePlace: "Тошкент",
      type: "doctoral",
    },
  },
  // === CANDIDATE DISSERTATION ===
  {
    _id: "static-2",
    title: {
      uz: "Амударё дельтасининг медик-географик таҳлили ва унинг санитария-гигиена вазиятини яхшилаш",
      ru: "Медико-географический анализ дельты Амударья и улучшение её санитарно-гигиенической ситуации",
      en: "Medical-geographical analysis of the Amudarya delta and improvement of its sanitary-hygienic situation",
    },
    type: "dissertation",
    publicationYear: 2006,
    language: "ru",
    annotation:
      "Диссертацияда Амударё дельтасининг медик-географик таҳлили амалга оширилган. Минтақанинг санитария-гигиена вазиятини яхшилаш бўйича тавсиялар ишлаб чиқилган.",
    keywords: ["Амударья", "дельта", "медицинская география", "санитарно-гигиеническая ситуация"],
    author: staticAuthor,
    viewCount: 178,
    downloadCount: 56,
    dissertationDetails: {
      defensePlace: "Тошкент",
      type: "candidate",
    },
  },
  // === MONOGRAPHS ===
  {
    _id: "static-3",
    title: {
      uz: "Қорақалпоғистон Республикасининг нозогеографияси",
      ru: "Нозогеография Республики Каракалпакстан",
      en: "Nosogeography of the Republic of Karakalpakstan",
    },
    type: "monograph",
    publicationYear: 2020,
    language: "ru",
    annotation:
      "Монографияда Қорақалпоғистон Республикасининг нозогеографик хусусиятлари, касалликларнинг ҳудудий тарқалиши ва уларга таъсир этувчи омиллар тадқиқ этилган.",
    keywords: ["нозогеография", "Каракалпакстан", "медицинская география", "территориальное распределение болезней"],
    author: staticAuthor,
    viewCount: 156,
    downloadCount: 67,
  },
  {
    _id: "static-4",
    title: {
      uz: "Орол денгизи ҳавзасининг экологик-географик муаммолари",
      ru: "Эколого-географические проблемы бассейна Аральского моря",
      en: "Ecological-geographical problems of the Aral Sea basin",
    },
    type: "monograph",
    publicationYear: 2019,
    language: "ru",
    annotation:
      "Монографияда Орол денгизи ҳавзасидаги экологик-географик муаммолар, уларнинг аҳоли саломатлигига таъсири ва ечим йўллари ёритилган.",
    keywords: ["Аральское море", "экология", "география", "экологические проблемы"],
    author: staticAuthor,
    viewCount: 203,
    downloadCount: 91,
  },
  {
    _id: "static-5",
    title: {
      uz: "Тиббиёт географияси асослари",
      ru: "Основы медицинской географии",
      en: "Fundamentals of Medical Geography",
    },
    type: "monograph",
    publicationYear: 2017,
    language: "uz",
    annotation:
      "Монографияда тиббиёт географиясининг назарий асослари, тадқиқот усуллари ва амалий аҳамияти батафсил ёритилган.",
    keywords: ["тиббиёт географияси", "медицинская география", "методы исследования"],
    author: staticAuthor,
    viewCount: 134,
    downloadCount: 48,
  },
  // === SCOPUS Q1 ===
  {
    _id: "static-6",
    title: {
      uz: "Орол денгизи минтақасида аҳоли саломатлигининг географик таҳлили",
      ru: "Географический анализ здоровья населения в регионе Аральского моря",
      en: "Geographic analysis of population health in the Aral Sea region",
    },
    type: "article",
    publicationYear: 2023,
    language: "en",
    annotation:
      "This study provides a comprehensive geographic analysis of population health indicators in the Aral Sea region, examining the relationship between environmental degradation and disease prevalence.",
    keywords: ["Aral Sea", "population health", "geographic analysis", "environmental degradation"],
    author: staticAuthor,
    viewCount: 312,
    downloadCount: 145,
    articleDetails: {
      journalName: "International Journal of Environmental Research and Public Health",
      journalType: "scopus",
      quartile: "Q1",
      doi: "10.3390/ijerph2023",
      volume: "20",
      issue: "4",
    },
  },
  // === SCOPUS Q2 ===
  {
    _id: "static-7",
    title: {
      uz: "Қорақалпоғистонда экологик шароитларнинг аҳоли саломатлигига таъсири",
      ru: "Влияние экологических условий на здоровье населения в Каракалпакстане",
      en: "Impact of ecological conditions on population health in Karakalpakstan",
    },
    type: "article",
    publicationYear: 2022,
    language: "en",
    annotation:
      "The paper investigates the impact of ecological conditions, including water quality and air pollution, on population health outcomes in the Republic of Karakalpakstan.",
    keywords: ["ecological conditions", "population health", "Karakalpakstan", "water quality"],
    author: staticAuthor,
    viewCount: 189,
    downloadCount: 78,
    articleDetails: {
      journalName: "Central Asian Journal of Environmental Science and Technology Innovation",
      journalType: "scopus",
      quartile: "Q2",
      doi: "10.1016/j.cajesti.2022",
      volume: "3",
      issue: "2",
    },
  },
  // === SCOPUS Q3 ===
  {
    _id: "static-8",
    title: {
      uz: "Орол бўйи минтақасида нозогеографик хариталаштириш",
      ru: "Нозогеографическое картографирование в Приаралье",
      en: "Nosogeographic mapping in the Aral Sea area",
    },
    type: "article",
    publicationYear: 2021,
    language: "en",
    annotation:
      "This research presents nosogeographic mapping techniques applied to the Aral Sea area, identifying spatial patterns of disease distribution and their environmental determinants.",
    keywords: ["nosogeographic mapping", "Aral Sea", "disease distribution", "GIS"],
    author: staticAuthor,
    viewCount: 145,
    downloadCount: 62,
    articleDetails: {
      journalName: "Geodesy and Geodynamics",
      journalType: "scopus",
      quartile: "Q3",
      doi: "10.1016/j.geog.2021",
      volume: "12",
      issue: "5",
    },
  },
  // === SCOPUS Q4 ===
  {
    _id: "static-9",
    title: {
      uz: "Қорақалпоғистонда тупроқ деградациясининг аҳоли саломатлигига таъсири",
      ru: "Влияние деградации почв на здоровье населения Каракалпакстана",
      en: "Impact of soil degradation on population health in Karakalpakstan",
    },
    type: "article",
    publicationYear: 2020,
    language: "en",
    annotation:
      "The study examines the correlation between soil degradation processes and health indicators of the population in the Republic of Karakalpakstan.",
    keywords: ["soil degradation", "health indicators", "Karakalpakstan"],
    author: staticAuthor,
    viewCount: 98,
    downloadCount: 34,
    articleDetails: {
      journalName: "Bulletin of Geography. Socio-economic Series",
      journalType: "scopus",
      quartile: "Q4",
      doi: "10.2478/bog-2020",
      volume: "48",
      issue: "1",
    },
  },
  // === WEB OF SCIENCE ===
  {
    _id: "static-10",
    title: {
      uz: "Орол денгизи қуриши ва унинг минтақа экологиясига таъсири",
      ru: "Высыхание Аральского моря и его влияние на экологию региона",
      en: "Drying of the Aral Sea and its impact on regional ecology",
    },
    type: "article",
    publicationYear: 2021,
    language: "en",
    annotation:
      "The paper provides a comprehensive review of the Aral Sea desiccation process and its multifaceted impact on the regional ecology, including effects on climate, soil, and human health.",
    keywords: ["Aral Sea", "desiccation", "regional ecology", "climate change"],
    author: staticAuthor,
    viewCount: 167,
    downloadCount: 73,
    articleDetails: {
      journalName: "Journal of Arid Land",
      journalType: "web_of_science",
      doi: "10.1007/s40333-2021",
      volume: "13",
      issue: "7",
    },
  },
  // === TEXTBOOKS ===
  {
    _id: "static-11",
    title: {
      uz: "Тиббиёт географияси",
      ru: "Медицинская география",
      en: "Medical Geography",
    },
    type: "textbook",
    publicationYear: 2019,
    language: "uz",
    annotation:
      "Дарсликда тиббиёт географиясининг назарий асослари, тадқиқот усуллари, касалликларнинг географик тарқалиши ва уларга таъсир этувчи омиллар батафсил баён этилган.",
    keywords: ["тиббиёт географияси", "дарслик", "касалликлар географияси"],
    author: staticAuthor,
    viewCount: 432,
    downloadCount: 215,
  },
  {
    _id: "static-12",
    title: {
      uz: "Иқтисодий ва ижтимоий география",
      ru: "Экономическая и социальная география",
      en: "Economic and Social Geography",
    },
    type: "textbook",
    publicationYear: 2016,
    language: "uz",
    annotation:
      "Дарсликда иқтисодий ва ижтимоий географиянинг замонавий муаммолари, тадқиқот усуллари ва амалий аҳамияти ёритилган.",
    keywords: ["иқтисодий география", "ижтимоий география", "дарслик"],
    author: staticAuthor,
    viewCount: 389,
    downloadCount: 178,
  },
  {
    _id: "static-13",
    title: {
      uz: "Нозогеография асослари",
      ru: "Основы нозогеографии",
      en: "Fundamentals of Nosogeography",
    },
    type: "textbook",
    publicationYear: 2021,
    language: "uz",
    annotation:
      "Дарсликда нозогеография фанининг назарий асослари, тарихи, тадқиқот усуллари ва замонавий ютуқлари тизимли равишда баён этилган.",
    keywords: ["нозогеография", "дарслик", "тиббиёт географияси"],
    author: staticAuthor,
    viewCount: 267,
    downloadCount: 123,
  },
  // === FOREIGN ARTICLES ===
  {
    _id: "static-14",
    title: {
      uz: "Орол бўйи аҳолисининг касалланиш кўрсаткичларини географик таҳлили",
      ru: "Географический анализ показателей заболеваемости населения Приаралья",
      en: "Geographical analysis of morbidity indicators of the Aral Sea region population",
    },
    type: "article",
    publicationYear: 2022,
    language: "ru",
    annotation:
      "Мақолада Орол бўйи аҳолисининг касалланиш кўрсаткичлари географик жиҳатдан таҳлил қилинган, минтақавий фарқлар аниқланган ва уларнинг сабаблари ўрганилган.",
    keywords: ["Приаралье", "заболеваемость", "географический анализ"],
    author: staticAuthor,
    viewCount: 134,
    downloadCount: 45,
    articleDetails: {
      journalName: "Вестник Московского университета. Серия 5: География",
      journalType: "other",
    },
  },
  {
    _id: "static-15",
    title: {
      uz: "Қорақалпоғистон Республикасида сув таъминотининг тиббий-географик аспектлари",
      ru: "Медико-географические аспекты водоснабжения в Республике Каракалпакстан",
      en: "Medical-geographical aspects of water supply in the Republic of Karakalpakstan",
    },
    type: "article",
    publicationYear: 2020,
    language: "ru",
    annotation:
      "Тадқиқотда Қорақалпоғистон Республикасидаги сув таъминоти муаммолари тиббий-географик нуқтаи назардан ўрганилган.",
    keywords: ["водоснабжение", "Каракалпакстан", "медицинская география"],
    author: staticAuthor,
    viewCount: 112,
    downloadCount: 38,
    articleDetails: {
      journalName: "Известия РАН. Серия географическая",
      journalType: "other",
    },
  },
  // === CONFERENCE THESES ===
  {
    _id: "static-16",
    title: {
      uz: "Орол денгизи муаммосининг тиббий-географик жиҳатлари",
      ru: "Медико-географические аспекты проблемы Аральского моря",
      en: "Medical-geographical aspects of the Aral Sea problem",
    },
    type: "conference_thesis",
    publicationYear: 2023,
    language: "ru",
    annotation:
      "Маърузада Орол денгизи муаммосининг тиббий-географик жиҳатлари, аҳоли саломатлигига таъсири ва олдини олиш чоралари муҳокама қилинган.",
    keywords: ["Аральское море", "медицинская география", "конференция"],
    author: staticAuthor,
    viewCount: 76,
    downloadCount: 22,
  },
  {
    _id: "static-17",
    title: {
      uz: "Геоинформацион технологияларни нозогеографик тадқиқотларда қўллаш",
      ru: "Применение геоинформационных технологий в нозогеографических исследованиях",
      en: "Application of geoinformation technologies in nosogeographic research",
    },
    type: "conference_thesis",
    publicationYear: 2022,
    language: "ru",
    annotation:
      "Маърузада геоинформацион технологияларнинг нозогеографик тадқиқотлардаги ўрни ва имкониятлари ёритилган.",
    keywords: ["ГИС", "нозогеография", "геоинформационные технологии"],
    author: staticAuthor,
    viewCount: 89,
    downloadCount: 31,
  },
  // === MANUALS ===
  {
    _id: "static-18",
    title: {
      uz: "Тиббиёт географиясидан амалий машғулотлар",
      ru: "Практические занятия по медицинской географии",
      en: "Practical exercises in medical geography",
    },
    type: "manual",
    publicationYear: 2018,
    language: "uz",
    annotation:
      "Ўқув қўлланмада тиббиёт географияси фанидан амалий машғулотлар, мустақил ишлар ва назорат саволлари келтирилган.",
    keywords: ["тиббиёт географияси", "амалий машғулотлар", "ўқув қўлланма"],
    author: staticAuthor,
    viewCount: 198,
    downloadCount: 87,
  },
  {
    _id: "static-19",
    title: {
      uz: "Нозогеографик хариталаштириш усуллари",
      ru: "Методы нозогеографического картографирования",
      en: "Methods of nosogeographic mapping",
    },
    type: "manual",
    publicationYear: 2021,
    language: "uz",
    annotation:
      "Қўлланмада нозогеографик хариталарни тузиш усуллари, ГИС технологияларидан фойдаланиш ва хариталарни таҳлил қилиш бўйича амалий кўрсатмалар берилган.",
    keywords: ["нозогеография", "картография", "ГИС", "методы"],
    author: staticAuthor,
    viewCount: 143,
    downloadCount: 59,
  },
  // === REPUBLICAN ARTICLES ===
  {
    _id: "static-20",
    title: {
      uz: "Хўжайли туманида касалликларнинг ҳудудий тарқалиши",
      ru: "Территориальное распределение заболеваний в Ходжейлийском районе",
      en: "Territorial distribution of diseases in Khojayli district",
    },
    type: "article",
    publicationYear: 2019,
    language: "uz",
    annotation:
      "Мақолада Хўжайли тумани аҳолисининг касалланиш кўрсаткичлари таҳлил қилинган ва касалликларнинг ҳудудий тарқалиш хариталари тузилган.",
    keywords: ["Хўжайли", "касалликлар", "ҳудудий тарқалиш"],
    author: staticAuthor,
    viewCount: 87,
    downloadCount: 29,
    articleDetails: {
      journalName: "Вестник Каракалпакского отделения Академии наук Республики Узбекистан",
      journalType: "other",
    },
  },
];

export function getStaticPublicationById(id: string) {
  return staticPublications.find((p) => p._id === id) || null;
}

export function searchStaticPublications(params: {
  search?: string;
  type?: string;
  yearFrom?: string;
  yearTo?: string;
  language?: string;
  journalType?: string;
  quartile?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  let filtered = [...staticPublications];

  if (params.search) {
    const q = params.search.trim();
    filtered = filtered.filter(
      (p) =>
        flexibleMatch(p.title.uz, q) ||
        flexibleMatch(p.title.ru, q) ||
        flexibleMatch(p.title.en, q) ||
        flexibleMatch(p.annotation, q) ||
        p.keywords.some((k) => flexibleMatch(k, q))
    );
  }

  if (params.type) {
    const types = params.type.split(",");
    filtered = filtered.filter((p) => types.includes(p.type));
  }

  if (params.yearFrom) {
    filtered = filtered.filter((p) => p.publicationYear >= parseInt(params.yearFrom!));
  }
  if (params.yearTo) {
    filtered = filtered.filter((p) => p.publicationYear <= parseInt(params.yearTo!));
  }

  if (params.language && params.language !== "all") {
    filtered = filtered.filter((p) => p.language === params.language);
  }

  if (params.journalType && params.journalType !== "all") {
    filtered = filtered.filter(
      (p) => "articleDetails" in p && (p as any).articleDetails?.journalType === params.journalType
    );
  }

  if (params.quartile && params.quartile !== "all") {
    filtered = filtered.filter(
      (p) => "articleDetails" in p && (p as any).articleDetails?.quartile === params.quartile
    );
  }

  // Sort
  if (params.sort === "oldest") {
    filtered.sort((a, b) => a.publicationYear - b.publicationYear);
  } else if (params.sort === "name") {
    filtered.sort((a, b) => a.title.uz.localeCompare(b.title.uz));
  } else {
    filtered.sort((a, b) => b.publicationYear - a.publicationYear);
  }

  const page = params.page || 1;
  const limit = params.limit || 12;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const publications = filtered.slice(start, start + limit);

  return { publications, total, page, totalPages };
}
