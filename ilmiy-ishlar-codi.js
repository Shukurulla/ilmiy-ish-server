const specialties = [
  {
    code: "01.01.01",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Математик анализ",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Математический анализ",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Mathematical analysis",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.01.02",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Дифференциал тенгламалар ва математик физика",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Дифференциальные уравнения и математическая физика",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Differential equations and mathematical physics",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.01.03",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Ҳисоблаш математикаси ва дискрет математика",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Вычислительная и дискретная математика",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Computational and discrete mathematics",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.01.04",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Геометрия ва топология",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Геометрия и топология",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Geometry and topology",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.01.05",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Эҳтимоллар назарияси ва математик статистика",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Теория вероятностей и математическая статистика",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Probability theory and mathematical statistics",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.01.06",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.01.00",
      uz: "Математика",
      ru: "Математика",
      en: "Mathematics",
    },
    uz: {
      label: "Алгебра",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Алгебра",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Algebra",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.02.01",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.02.00",
      uz: "Механика",
      ru: "Механика",
      en: "Mechanics",
    },
    uz: {
      label: "Назарий механика",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Теоретическая механика",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Theoretical mechanics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.02.02",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.02.00",
      uz: "Механика",
      ru: "Механика",
      en: "Mechanics",
    },
    uz: {
      label: "Машиналар, асбоблар ва ускуналар динамикаси ва мустаҳкамлиги",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Динамика, прочность машин, приборов и аппаратуры",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Dynamics, stability of machines, instruments and apparatus science, group of specialities. which the scientific",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.02.04",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.02.00",
      uz: "Механика",
      ru: "Механика",
      en: "Mechanics",
    },
    uz: {
      label: "Деформацияланувчан қаттиқ жисм механикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Механика деформируемого твердого тела",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Mechanics of deformable solids",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.02.05",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.02.00",
      uz: "Механика",
      ru: "Механика",
      en: "Mechanics",
    },
    uz: {
      label: "Суюқлик ва газ механикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Механика жидкости и газа",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Mechanics of fluid and gas",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.03.01",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.03.00",
      uz: "Астрономия",
      ru: "Астрономия",
      en: "Astronomy",
    },
    uz: {
      label: "Астрономия",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Астрономия",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Astronomy",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.03.02",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.03.00",
      uz: "Астрономия",
      ru: "Астрономия",
      en: "Astronomy",
    },
    uz: {
      label: "Космос физикаси ва астрофизика",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Физика космоса и астрофизика",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Space physics and astrophysics",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.04.01",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Экспериментал физиканинг асбоблари ва усуллари",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Приборы и методы экспериментальной физики",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Instruments and methods of experimental physics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.02",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Назарий физика",
      describe: "Физика-математика фанлари",
    },
    ru: {
      label: "Теоретическая физика",
      describe: "Физико-математические науки",
    },
    en: {
      label: "Theoretical physics",
      describe: "Physical and mathematical sciences",
    },
  },
  {
    code: "01.04.03",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Молекуляр физика ва иссиқлик физикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Молекулярная физика и теплофизика",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Molecular and thermal physics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.04",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Физик электроника",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Физическая электроника",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Physical electronics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.05",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Оптика",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Оптика",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Optics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.06",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Полимерлар физикаси",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Физика полимеров",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Physics of polymers science, group of specialities. which the scientific",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "01.04.07",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Конденсирланган ҳолат физикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Физика конденсированного состояния",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Physics of condensed matters",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.08",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label:
        "Атом ядроси ва элементар заррачалар физикаси. Тезлаштирувчи техника",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Физика атомного ядра и элементарных частиц. Ускорительная техника",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Atomic nucleus and elementary particle physics. Acceleratory facilities",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.09",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Магнит ҳодисалари физикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Физика магнитных явлений",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Physics of magnetic phenomena",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.10",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Яримўтказгичлар физикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Физика полупроводников",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Physics of semiconductors",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.11",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Лазер физикаси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Лазерная физика",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Laser physics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "01.04.12",
    branch: {
      code: "01.00.00",
      uz: "Физика-математика фанлари",
      ru: "Физико-математические науки",
      en: "Physical and mathematical sciences",
    },
    group: {
      code: "01.04.00",
      uz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    uz: {
      label: "Наноматериаллар физикаси ва технологияси",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Физика и технология наноматериалов",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Physics and technology of nanomaterials science, group of specialities. which the scientific",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "02.00.01",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Ноорганик кимё",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Неорганическая химия",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Inorganic chemistry",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.02",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Аналитик кимё",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Аналитическая химия",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label: "Analytical chemistry",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.03",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Органик кимё",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Органическая химия",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Organic chemistry",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.04",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Физик кимё",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Физическая химия",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label: "Physical chemistry",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.05",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label:
        "Целлюлоза ва целлюлоза-қоғоз ишлаб чиқариш кимёси ва технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Химия и технология целлюлозы и целлюлозно-бумажного производства",
      describe: "Технические науки Химические науки",
    },
    en: {
      label:
        "Chemistry and technology of cellulose and cellulose-paper production",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.06",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Юқори молекуляр бирикмалар",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Высокомолекулярные соединения",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "High-molecular compounds",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.07",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label:
        "Композицион, лок-бўёқ ва резина материаллари кимёси ва технологияси",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Химия и технология композиционных, лакокрасочных и резиновых материалов",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Chemistry and technology of composite, varnishpaint and rubber materials",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.08",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Нефть ва газ кимёси ва технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Химия и технология нефти и газа",
      describe: "Технические науки Химические науки",
    },
    en: {
      label:
        "Chemistry and technology of oil and gas science, group of specialities. which the scientific",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.09",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Товарлар кимёси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Химия товаров",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Chemistry of goods",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.10",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Биоорганик кимё",
      describe: "Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Биоорганическая химия",
      describe: "Биологические науки Технические науки Химические науки",
    },
    en: {
      label: "Bioorganic chemistry",
      describe: "Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.11",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Коллоид ва мембрана кимёси",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Коллоидная и мембранная химия",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label: "Colloid and membrane chemistry",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.12",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Нанокимё, нанофизика ва нанотехнология",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Нанохимия, нанофизика и нанотехнология",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label: "Nanochemistry, nanophysics and nanotechnology",
      describe:
        "Physical and mathematical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.13",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Ноорганик моддалар ва улар асосидаги материаллар технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология неорганических веществ и материалов на их основе",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Technology of inorganic substance and materials on their basis",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.14",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Органик моддалар ва улар асосидаги материаллар технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология органических веществ и материалов на их основе",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Technology of organic substance and materials on their basis",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.15",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Силикат ва қийин эрийдиган нометалл материаллар технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология силикатных и тугоплавких неметаллических материалов",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Technology of silicate and refractory nonmetal materials",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.16",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label:
        "Кимё технологияси ва озиқ-овқат ишлаб чиқариш жараёнлари ва аппаратлари",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Процессы и аппараты химических технологий и пищевых производств",
      describe: "Технические науки Химические науки",
    },
    en: {
      label:
        "Processes and apparatus of chemical technologies and food productions science, group of specialities. which the scientific",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.17",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label:
        "Қишлоқ хўжалик ва озиқ-овқат маҳсулотларига ишлов бериш, сақлаш ҳамда қайта ишлаш технологиялари ва биотехнологиялари",
      describe: "Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Технология и биотехнология обработки, хранения и переработки сельскохозяйственных и пищевых продуктов",
      describe: "Биологические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Technology and biotechnology of processing, storage and reprocessing of agricultural and food products",
      describe: "Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.18",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Балиқчилик маҳсулотларини қайта ишлаш ва сақлаш технологияси",
      describe: "Қишлоқ хўжалиги фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология переработки и хранения рыбопродуктов",
      describe: "Сельскохозяйственные науки Технические науки Химические науки",
    },
    en: {
      label: "Technology of reprocessing and storage of fish products",
      describe: "Agricultural sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "02.00.19",
    branch: {
      code: "02.00.00",
      uz: "Кимё фанлари",
      ru: "Химические науки",
      en: "Chemical sciences",
    },
    uz: {
      label: "Камёб, нодир ва радиоактив элементлар технологияси",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология редких, благородных и радиоактивных элементов",
      describe: "Технические науки Химические науки",
    },
    en: {
      label:
        "Technology of rare, noble and radioactive elements science, group of specialities. which the scientific",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "03.00.01",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Биокимё",
      describe:
        "Қишлоқ хўжалиги фанлари Ветеринария фанлари Биология фанлари Техника фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label: "Биохимия",
      describe:
        "Сельскохозяйственные науки Биологические науки Ветеринарные науки Технические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Biochemistry",
      describe:
        "Agricultural sciences Biological sciences Veterinary sciences Technical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "03.00.02",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Биофизика ва радиобиология",
      describe:
        "Физика-математика фанлари Биология фанлари Техника фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label: "Биофизика и радиобиология",
      describe:
        "Физико-математические науки Биологические науки Технические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Biophysics and radiobiology",
      describe:
        "Physical and mathematical sciences Biological sciences Technical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "03.00.03",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Молекуляр биология. Молекуляр генетика. Молекуляр биотехнология",
      describe:
        "Қишлоқ хўжалиги фанлари Биология фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Молекулярная биология. Молекулярная генетика. Молекулярная биотехнология",
      describe:
        "Сельскохозяйственные науки Биологические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Molecular biology. Molecular genetics. Molecular biotechnology",
      describe:
        "Agricultural sciences Biological sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "03.00.04",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Микробиология ва вирусология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Микробиология и вирусология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Microbiology and virology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "03.00.05",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Ботаника",
      describe: "География фанлари Биология фанлари",
    },
    ru: {
      label: "Ботаника",
      describe: "Географические науки Биологические науки",
    },
    en: {
      label: "Botany",
      describe: "Geographical sciences Biological sciences",
    },
  },
  {
    code: "03.00.06",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Зоология",
      describe:
        "Қишлоқ хўжалиги фанлари Ветеринария фанлари География фанлари Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Зоология",
      describe:
        "Сельскохозяйственные науки Географические науки Биологические науки Ветеринарные науки Медицинские науки",
    },
    en: {
      label: "Zoology",
      describe:
        "Geographical sciences Agricultural sciences Biological sciences Veterinary sciences Medical sciences",
    },
  },
  {
    code: "03.00.07",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Ўсимликлар физиологияси ва биокимёси",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label: "Физиология и биохимия растений",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Plant physiology and biochemistry",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "03.00.08",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Одам ва ҳайвонлар физиологияси",
      describe: "Ветеринария фанлари Биология фанлари",
    },
    ru: {
      label: "Физиология человека и животных",
      describe: "Биологические науки Ветеринарные науки",
    },
    en: {
      label:
        "Human and animal physiology science, group of specialities. which the scientific",
      describe: "Biological sciences Veterinary sciences",
    },
  },
  {
    code: "03.00.09",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Умумий генетика",
      describe: "Қишлоқ хўжалиги фанлари Ветеринария фанлари Биология фанлари",
    },
    ru: {
      label: "Общая генетика",
      describe:
        "Сельскохозяйственные науки Биологические науки Ветеринарные науки",
    },
    en: {
      label: "General genetics",
      describe: "Agricultural sciences Biological sciences Veterinary sciences",
    },
  },
  {
    code: "03.00.10",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Экология",
      describe:
        "Қишлоқ хўжалиги фанлари География фанлари Биология фанлари Техника фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label: "Экология",
      describe:
        "Сельскохозяйственные науки Географические науки Биологические науки Технические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Ecology",
      describe:
        "Geographical sciences Agricultural sciences Biological sciences Technical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "03.00.11",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Гистология, цитология ва ҳужайра биологияси",
      describe:
        "Қишлоқ хўжалиги фанлари Ветеринария фанлари Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Гистология, цитология и клеточная биология",
      describe:
        "Сельскохозяйственные науки Биологические науки Ветеринарные науки Медицинские науки",
    },
    en: {
      label: "Histology, cytology and cell biology",
      describe:
        "Agricultural sciences Biological sciences Veterinary sciences Medical sciences",
    },
  },
  {
    code: "03.00.12",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Биотехнология",
      describe:
        "Қишлоқ хўжалиги фанлари Фармацевтика фанлари Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Биотехнология",
      describe:
        "Сельскохозяйственные науки Фармацевтические науки Биологические науки Технические науки Химические науки",
    },
    en: {
      label: "Biotechnology",
      describe:
        "Pharmaceutical sciences Agricultural sciences Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "03.00.13",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Тупроқшунослик",
      describe:
        "Қишлоқ хўжалиги фанлари География фанлари Биология фанлари Кимё фанлари",
    },
    ru: {
      label: "Почвоведение",
      describe:
        "Сельскохозяйственные науки Географические науки Биологические науки Химические науки",
    },
    en: {
      label: "Soil science",
      describe:
        "Geographical sciences Agricultural sciences Biological sciences Chemical sciences",
    },
  },
  {
    code: "03.00.14",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Геномика, протеомика ва биоинформатика",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Геномика, протеомика и биоинформатика",
      describe:
        "Сельскохозяйственные науки Биологические науки Медицинские науки",
    },
    en: {
      label: "Genomics, proteomics and bioinformation science",
      describe: "Agricultural sciences Biological sciences Medical sciences",
    },
  },
  {
    code: "03.00.15",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Ихтиология",
      describe: "Биология фанлари",
    },
    ru: {
      label: "Ихтиология",
      describe: "Биологические науки",
    },
    en: {
      label: "Ichthyology",
      describe: "Biological sciences",
    },
  },
  {
    code: "03.00.16",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Гидробиология",
      describe: "Биология фанлари",
    },
    ru: {
      label: "Гидробиология",
      describe: "Биологические науки",
    },
    en: {
      label: "Hydrobiology",
      describe: "Biological sciences",
    },
  },
  {
    code: "03.00.17",
    branch: {
      code: "03.00.00",
      uz: "Биология фанлари",
      ru: "Биологические науки",
      en: "Biological sciences",
    },
    uz: {
      label: "Спорт физиологияси, фармакологияси ва генетикаси",
      describe: "Фармацевтика фанлари Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Спортивная физиология, фармакология и генетика",
      describe: "Фармацевтические науки Биологические науки Медицинские науки",
    },
    en: {
      label:
        "Sports physiology, pharmacology and genetics science, group of specialities. which the scientific",
      describe: "Pharmaceutical sciences Biological sciences Medical sciences",
    },
  },
  {
    code: "04.00.01",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Умумий ва минтақавий геология",
      describe: "Геология-минералогия фанлари",
    },
    ru: {
      label: "Общая и региональная геология",
      describe: "Геолого-минералогические науки",
    },
    en: {
      label: "General and regional geology",
      describe: "Geological and mineralogical sciences",
    },
  },
  {
    code: "04.00.02",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label:
        "Қаттиқ фойдали қазилма конларининг геологияси, уларни қидириш ва разведка қилиш. Металлогения ва геокимё",
      describe: "Геология-минералогия фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Геология, поиски и разведка месторождений твердых полезных ископаемых. Металлогения и геохимия",
      describe:
        "Геолого-минералогические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Geology, prospecting and exploration of solid mineral deposits. Metallogeny and geochemistry",
      describe:
        "Geological and mineralogical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "04.00.03",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Геотектоника ва геодинамика. Петрология ва литология",
      describe: "Геология-минералогия фанлари",
    },
    ru: {
      label: "Геотектоника и геодинамика. Петрология и литология",
      describe: "Геолого-минералогические науки",
    },
    en: {
      label: "Geotectonics and geodynamics. Petrology and lithology",
      describe: "Geological and mineralogical sciences",
    },
  },
  {
    code: "04.00.04",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Гидрогеология ва муҳандислик геологияси",
      describe:
        "Геология-минералогия фанлари География фанлари Техника фанлари",
    },
    ru: {
      label: "Гидрогеология и инженерная геология",
      describe:
        "Геолого-минералогические науки Географические науки Технические науки",
    },
    en: {
      label: "Hydrogeology and engineering geology",
      describe:
        "Geological and mineralogical sciences Geographical sciences Technical sciences",
    },
  },
  {
    code: "04.00.05",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Палеонтология ва стратиграфия",
      describe: "Геология-минералогия фанлари Биология фанлари",
    },
    ru: {
      label: "Палеонтология и стратиграфия",
      describe: "Геолого-минералогические науки Биологические науки",
    },
    en: {
      label: "Paleontology and stratigraphy",
      describe: "Geological and mineralogical sciences Biological sciences",
    },
  },
  {
    code: "04.00.06",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Геофизика. Фойдали қазилмаларни қидиришнинг геофизик усуллари",
      describe:
        "Геология-минералогия фанлари Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Геофизика. Геофизические методы поисков полезных ископаемых",
      describe:
        "Геолого-минералогические науки Физико-математические науки Технические науки",
    },
    en: {
      label: "Geophysics. Geophysical methods of mineral prospecting",
      describe:
        "Geological and mineralogical sciences Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "04.00.07",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label:
        "Нефть ва газ конлари геологияси, уларни қидириш ва разведка қилиш",
      describe: "Геология-минералогия фанлари",
    },
    ru: {
      label: "Геология, поиски и разведка нефтяных и газовых месторождений",
      describe: "Геолого-минералогические науки",
    },
    en: {
      label:
        "Geology, prospecting and exploration of oil and gas deposits science, group of specialities. which the scientific",
      describe: "Geological and mineralogical sciences",
    },
  },
  {
    code: "04.00.08",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Минералогия. Кристаллография",
      describe: "Геология-минералогия фанлари Кимё фанлари",
    },
    ru: {
      label: "Минералогия. Кристаллография",
      describe: "Геолого-минералогические науки Химические науки",
    },
    en: {
      label: "Mineralogy. Crystallography",
      describe: "Geological and mineralogical sciences Chemical sciences",
    },
  },
  {
    code: "04.00.09",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Маркшейдерия",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Маркшейдерия",
      describe: "Технические науки",
    },
    en: {
      label: "Mine survey",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.10",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Геотехнология (очиқ, ер ости ва қурилиш)",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Геотехнология (открытая, подземная и строительная)",
      describe: "Технические науки",
    },
    en: {
      label: "Geotechnology (opencast, underground and construction)",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.11",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Қудуқларни бурғулаш ва ўзлаштириш технологияси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технология бурения и освоения скважин",
      describe: "Технические науки",
    },
    en: {
      label: "Well drilling and development technology",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.12",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Нефть ва газ қувурлари, база ва омборларини қуриш ҳамда ишлатиш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Строительство и эксплуатация нефтегазопроводов, баз и хранилищ",
      describe: "Технические науки",
    },
    en: {
      label:
        "Construction and exploitation of oil and gas pipe-lines, bases and repositories",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.13",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Нефть ва газ конларини ўзлаштириш ҳамда ишлатиш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Разработка и эксплуатация нефтяных и газовых месторождений",
      describe: "Технические науки",
    },
    en: {
      label: "Mining and exploitation of oil and gas deposits",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.14",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Фойдали қазилмаларни бойитиш",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Обогащение полезных ископаемых",
      describe: "Технические науки Химические науки",
    },
    en: {
      label: "Concentration of mineral deposits",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "04.00.15",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Геологик разведка ишлари технологияси ва техникаси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технология и техника геологоразведочных работ",
      describe: "Технические науки",
    },
    en: {
      label: "Technology and engineering of geologic-prospecting works",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.16",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Кончилик машиналари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Машины горного производства",
      describe: "Технические науки",
    },
    en: {
      label: "Mining machines",
      describe: "Technical sciences",
    },
  },
  {
    code: "04.00.17",
    branch: {
      code: "04.00.00",
      uz: "Геология-минералогия фанлари",
      ru: "Геолого-минералогические науки",
      en: "Geological and mineralogical sciences",
    },
    uz: {
      label: "Кончиликда физик жараёнлар",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Физические процессы в горном производстве",
      describe: "Технические науки",
    },
    en: {
      label:
        "Physical processes in mining science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.01.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label:
        "Муҳандислик геометрияси ва компьютер графикаси. Аудио ва видеотехнологиялари",
      describe: "Педагогика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Инженерная геометрия и компьютерная графика. Аудио и видеотехнологии",
      describe: "Педагогические науки Технические науки",
    },
    en: {
      label:
        "Engineering geometry and computer graphics. Audio and videotechnologies",
      describe: "Pedagogical sciences Technical sciences",
    },
  },
  {
    code: "05.01.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Тизимли таҳлил, бошқарув ва ахборотни қайта ишлаш",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Системный анализ, управление и обработка информации",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Systemic analysis, management and information processing",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Информатиканинг назарий асослари",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Теоретические основы информатики",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Theoretical basis of computer science",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label:
        "Ҳисоблаш машиналари, мажмуалари ва компьютер тармоқларининг математик ва дастурий таъминоти",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Математическое и программное обеспечение вычислительных машин, комплексов и компьютерных сетей",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Mathematical and software support of computers, complexes and computer networks",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.05",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label:
        "Ахборотларни ҳимоялаш усуллари ва тизимлари. Ахборот ва киберхавфсизлик",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Методы и системы защиты информации. Информационная и кибербезопасность",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Methods and systems of information protection. Information and cybersecurity",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.06",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label:
        "Ҳисоблаш техникаси ва бошқарув тизимларининг элементлари ва қурилмалари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Элементы и устройства вычислительной техники и систем управления",
      describe: "Технические науки",
    },
    en: {
      label: "Elements and devices of computing technics and control systems",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.01.07",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Математик моделлаштириш. Сонли усуллар ва дастурлар мажмуи",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Математическое моделирование. Численные методы и комплексы программ",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Mathematical simulation. Numerical methods and software science, group of specialities. which the scientific",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.08",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label:
        "Технологик жараёнлар ва ишлаб чиқаришларни автоматлаштириш ва бошқариш",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Автоматизация и управление технологическими процессами и производствами",
      describe: "Технические науки",
    },
    en: {
      label:
        "Automation and management of technological processes and production",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.01.09",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Ҳужжатшунослик. Архившунослик. Кутубхонашунослик",
      describe:
        "Педагогика фанлари Филология фанлари Техника фанлари Тарих фанлари",
    },
    ru: {
      label: "Документоведение. Архивоведение. Библиотековедение",
      describe:
        "Филологические науки Педагогические науки Исторические науки Технические науки",
    },
    en: {
      label: "Documentation science. Archival science. Library science",
      describe:
        "Philological sciences Pedagogical sciences Historical sciences Technical sciences",
    },
  },
  {
    code: "05.01.10",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Ахборот олиш тизимлари ва жараёнлари",
      describe: "Филология фанлари Техника фанлари",
    },
    ru: {
      label: "Информационные системы и процессы",
      describe: "Филологические науки Технические науки",
    },
    en: {
      label: "Information systems and processes",
      describe: "Philological sciences Technical sciences",
    },
  },
  {
    code: "05.01.11",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Рақамли технологиялар ва сунъий интеллект",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Цифровые технологии и искусственный интеллект",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Digital technologies and artificial intelligence",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.01.12",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Киберхавфсизлик. Кибержиноятчилик",
      describe:
        "Физика-математика фанлари Иқтисодиёт фанлари Техника фанлари Юридик фанлар",
    },
    ru: {
      label: "Кибербезопасность. Киберпреступность",
      describe:
        "Физико-математические науки Экономические науки Технические науки Юридические науки",
    },
    en: {
      label: "Cybersecurity Cybercrime Law",
      describe:
        "Physical and mathematical sciences Technical sciences Economic sciences",
    },
  },
  {
    code: "05.01.13",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.01.00",
      uz: "Ахборот технологиялари, бошқарув ва компьютер графикаси",
      ru: "Информационные технологии, управление и компьютерная графика",
      en: "Information technologies, management and computer graphics",
    },
    uz: {
      label: "Ахборотни қайта ишлашнинг квант усуллари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Квантовые методы обработки информации",
      describe: "Технические науки",
    },
    en: {
      label: "Quantum methods of information processing",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Машинасозликда материалшунослик. Қуймачилик. Металларга термик ва босим остида ишлов бериш. Қора, рангли ва ноёб металлар металлургияси.",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Материаловедение в машиностроении. Литейное производство. Термическая обработка и обработка металлов давлением. Металлургия черных, цветных и редких металлов",
      describe: "Технические науки",
    },
    en: {
      label:
        "Material science in mechanical engineering. Foundry production. Thermal and pressure treatment of metals. Metallurgy of ferrous, non-ferrous and rare metals science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Механизмлар ва машиналар назарияси. Машинашунослик ва машина деталлари",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Теория механизмов и машин. Машиноведение и детали машин",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Theory of mechanisms and machines. Theoretical engineering and machine elements",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.02.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Технологик машиналар. Роботлар, мехатроника ва робототехника тизимлари",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Технологические машины. Роботы, мехатроника и робототехнические системы",
      describe: "Технические науки",
    },
    en: {
      label:
        "Technological machines. Robots, mechatronics and robotics systems",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label: "Стандартлаштириш ва маҳсулотлар сифатини бошқариш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Стандартизация и управление качеством продукции",
      describe: "Технические науки",
    },
    en: {
      label: "Standardization and management of quality of products",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.05",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Механик ва физиктехник ишлов бериш технологиялари ва жараёнлари. Станоклар ва асбобускуналар",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Технологии и процессы механической и физико-технической обработки. Станки и инструменты",
      describe: "Технические науки",
    },
    en: {
      label:
        "Technologies and processes of mechanic and physical-technical processing. Machinetools and instruments",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.06",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Конструкцион материалларга ишлов бериш технологиялари ва ускуналари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технологии и оборудования обработки конструкционных материалов",
      describe: "Технические науки",
    },
    en: {
      label:
        "Technologies and equipments of constructional materials processing",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.07",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label: "Машинасозлик машиналари, аппаратлари, агрегатлари ва қурилмалари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Машины, аппараты, агрегаты и установки машиностроения",
      describe: "Технические науки",
    },
    en: {
      label:
        "Machines, apparatus, systems and installation of mechanical engineering",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.08",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label:
        "Учиш аппаратларини лойиҳалаш, конструкцияси, ишлаб чиқариш, уларни ишлатиш ва ер усти мажмуалари",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Проектирование, конструкция, производство летательных аппаратов, их эксплуатация и наземные комплексы",
      describe: "Технические науки",
    },
    en: {
      label:
        "Design, construction, production of aircraft systems, their exploitation and ground complexes",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.02.09",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.02.00",
      uz: "Машинасозлик ва машинашунослик. Машинасозликда материалларга ишлов бериш. Металлургия. Авиация техникаси",
      ru: "Машиностроение и машиноведение. Обработка материалов в машиностроении. Металлургия. Авиационная техника",
      en: "Mechanical and theoretical engineering. Processing of materials in mechanical engineering. Metallurgy. Aviation equipment",
    },
    uz: {
      label: "Матбаа ишлаб чиқариш машиналари, агрегатлари ва жараёнлари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Машины, агрегаты и процессы полиграфического производства",
      describe: "Технические науки",
    },
    en: {
      label:
        "Machines, aggregates and processes of printing production science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.03.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.03.00",
      uz: "Асбобсозлик, метрология ва ахборот-ўлчов асбоблари ва тизимлари",
      ru: "Приборостроение, метрология и информационно-измерительные приборы и системы",
      en: "Instrument production, metrology and information measuring instruments and systems",
    },
    uz: {
      label: "Асбоблар. Ўлчаш ва назорат қилиш усуллари (тармоқлар бўйича)",
      describe: "Физика-математика фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Приборы. Методы измерения и контроля (по отраслям)",
      describe:
        "Физико-математические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Instruments. Methods of mathematical measurement and control (by fields) Physical and sciences",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "05.03.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.03.00",
      uz: "Асбобсозлик, метрология ва ахборот-ўлчов асбоблари ва тизимлари",
      ru: "Приборостроение, метрология и информационно-измерительные приборы и системы",
      en: "Instrument production, metrology and information measuring instruments and systems",
    },
    uz: {
      label: "Метрология ва метрология таъминоти",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Метрология и метрологическое обеспечение",
      describe: "Технические науки",
    },
    en: {
      label: "Metrology and metrological maintenance",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.04.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.04.00",
      uz: "Радиотехника ва алоқа",
      ru: "Радиотехника и связь",
      en: "Radio engineering and communication",
    },
    uz: {
      label:
        "Телекоммуникация ва компьютер тизимлари, телекоммуникация тармоқлари ва қурилмалари. Ахборотларни тақсимлаш",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Телекоммуникационные и компьютерные системы, сети и устройства телекоммуникаций. Распределение информации",
      describe: "Технические науки",
    },
    en: {
      label:
        "Telecommunication and computer systems, networks and telecommunications devices. Information distribution",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.04.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.04.00",
      uz: "Радиотехника ва алоқа",
      ru: "Радиотехника и связь",
      en: "Radio engineering and communication",
    },
    uz: {
      label:
        "Радиотехника, радионавигация, радиолокация ва телевидение тизимлари ва қурилмалари. Мобиль, толаоптик алоқа тизимлари",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Системы и устройства радиотехники, радионавигации, радиолокации и телевидения. Мобильные, волоконно-оптические системы связи",
      describe: "Технические науки",
    },
    en: {
      label:
        "Radio engineering, radionavigation, radiolocation and television systems and devices. Mobile, fibrous-optical communication systems",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Энергетика тизимлари ва мажмуалари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Энергетические системы и комплексы",
      describe: "Технические науки",
    },
    en: {
      label: "Power systems and complexes",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label:
        "Электротехника. Электр энергия станциялари, тизимлари. Электротехник мажмуалар ва қурилмалар",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Электротехника. Электроэнергетические станции, системы. Электротехнические комплексы и установки",
      describe: "Технические науки",
    },
    en: {
      label:
        "Electrical engineering. Electric power plants, systems. Electrotechnical complexes and installations science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Ёруғлик техникаси. Махсус ёритиш технологияси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Светотехника. Технология спецосвещения",
      describe: "Технические науки",
    },
    en: {
      label: "Illumination engineering. Technology of special lighting",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Саноат иссиқлик энергетикаси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Промышленная теплоэнергетика",
      describe: "Технические науки",
    },
    en: {
      label: "Industrial thermal power engineering",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.05",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Иссиқлик техникасининг назарий асослари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Теоретические основы теплотехники",
      describe: "Технические науки",
    },
    en: {
      label: "Theoretical basis of heat engineering",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.06",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Қайта тикланадиган энергия турлари асосидаги энергия қурилмалари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Энергоустановки на основе возобновляемых видов энергии",
      describe: "Технические науки",
    },
    en: {
      label: "Power-plants on the basis of renewable energy",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.07",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Қишлоқ хўжалигида электр технологиялар ва электр ускуналар",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Электротехнологии и электрооборудование в сельском хозяйстве",
      describe: "Технические науки",
    },
    en: {
      label: "Electrotechnologies and electroequipment in agriculture",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.08",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Электроника",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label: "Электроника",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label: "Electronics",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.05.09",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Ядро энергетикаси қурилмалари ва технологиялари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Ядерные энергетические установки и технологии",
      describe: "Технические науки",
    },
    en: {
      label: "Nuclear power systems and technologies",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.10",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label:
        "Атом реакторсозлиги, атом саноати машиналари, агрегатлари ва материаллари технологияси",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Атомное реакторостроение, машины, агрегаты и технология материалов атомной промышленности",
      describe: "Технические науки",
    },
    en: {
      label:
        "Nuclear reactor engineering, machines, units and technology of materials in nuclear industry",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.05.11",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.05.00",
      uz: "Энергетика ва электротехника. Қишлоқ хўжалиги ишлаб чиқаришини электрлаштириш технологияси. Электроника",
      ru: "Энергетика и электротехника. Технология электрификации сельскохозяйственного производства. Электроника",
      en: "Power engineering and electrical engineering. Technology of electrification in farming. Electronics",
    },
    uz: {
      label: "Водород энергетикаси технологиялари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технологии водородной энергетики",
      describe: "Технические науки",
    },
    en: {
      label: "Technology of hydrogen power engineering",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.06.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.06.00",
      uz: "Тўқимачилик ва енгил саноат материаллари ва буюмлари технологияси",
      ru: "Технология материалов и изделий текстильной и легкой промышленности",
      en: "Technology of materials and articles of textile and light industries",
    },
    uz: {
      label: "Тўқимачилик ва енгил саноат ишлаб чиқаришлари материалшунослиги",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Материаловедение производств текстильной и легкой промышленности",
      describe: "Технические науки",
    },
    en: {
      label:
        "Materials science of textile and light industry production science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.06.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.06.00",
      uz: "Тўқимачилик ва енгил саноат материаллари ва буюмлари технологияси",
      ru: "Технология материалов и изделий текстильной и легкой промышленности",
      en: "Technology of materials and articles of textile and light industries",
    },
    uz: {
      label:
        "Тўқимачилик материаллари технологияси ва хомашёга дастлабки ишлов бериш",
      describe: "Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Технология текстильных материалов и первичная обработка сырья",
      describe: "Технические науки Химические науки",
    },
    en: {
      label:
        "Technology of textile materials and initial treatment of raw materials",
      describe: "Technical sciences Chemical sciences",
    },
  },
  {
    code: "05.06.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.06.00",
      uz: "Тўқимачилик ва енгил саноат материаллари ва буюмлари технологияси",
      ru: "Технология материалов и изделий текстильной и легкой промышленности",
      en: "Technology of materials and articles of textile and light industries",
    },
    uz: {
      label: "Тери, мўйна, пойабзал ва тери-галантерея буюмлари технологияси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технология кожи, меха, обуви и кожевенно-галантерейных изделий",
      describe: "Технические науки",
    },
    en: {
      label:
        "Technology of leather, fur, foot-wear and leather haberdashery articles",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.06.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.06.00",
      uz: "Тўқимачилик ва енгил саноат материаллари ва буюмлари технологияси",
      ru: "Технология материалов и изделий текстильной и легкой промышленности",
      en: "Technology of materials and articles of textile and light industries",
    },
    uz: {
      label: "Тикувчилик буюмлари технологияси ва костюм дизайни",
      describe: "Санъатшунослик фанлари Техника фанлари",
    },
    ru: {
      label: "Технология швейных изделий и дизайн костюма",
      describe: "Технические науки Искусствоведение",
    },
    en: {
      label: "Technology of garments and design of suit",
      describe: "Technical sciences Art sciences",
    },
  },
  {
    code: "05.07.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.07.00",
      uz: "Қишлоқ хўжалиги ишлаб чиқаришини механизациялаш технологияси",
      ru: "Технология механизации сельскохозяйственного производства",
      en: "Technology of mechanization in farming",
    },
    uz: {
      label:
        "Қишлоқ хўжалиги ва мелиорация машиналари. Қишлоқ хўжалиги ва мелиорация ишларини механизациялаш",
      describe: "Қишлоқ хўжалиги фанлари Техника фанлари",
    },
    ru: {
      label:
        "Сельскохозяйственные и мелиоративные машины. Механизация сельскохозяйственных и мелиоративных работ",
      describe: "Сельскохозяйственные науки Технические науки",
    },
    en: {
      label:
        "Agricultural and meliorative machinery. Mechanization of agricultural and reclamation works",
      describe: "Agricultural sciences Technical sciences",
    },
  },
  {
    code: "05.07.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.07.00",
      uz: "Қишлоқ хўжалиги ишлаб чиқаришини механизациялаш технологияси",
      ru: "Технология механизации сельскохозяйственного производства",
      en: "Technology of mechanization in farming",
    },
    uz: {
      label:
        "Қишлоқ хўжалиги ва мелиорация техникаларини ишлатиш, тиклаш ва таъмирлаш",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Эксплуатация, восстановление и ремонт сельскохозяйственной и мелиоративной техники",
      describe: "Технические науки",
    },
    en: {
      label:
        "Exploitation, reconstruction and repair of agricultural and reclamation machinery",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.08.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label:
        "Мамлакат, унинг минтақа, шаҳар ва саноат марказларининг транспорт тизимлари. Транспорт логистикаси",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Транспортные системы страны, ее регионов, городов и промышленных центров. Транспортная логистика",
      describe: "Технические науки",
    },
    en: {
      label:
        "Transport systems of cities and industrial centres. Transport logistics",
      describe: "Technical the country, its regions, sciences",
    },
  },
  {
    code: "05.08.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label: "Темир йўллар ва йўл хўжалиги",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Железнодорожный путь и путевое хозяйство",
      describe: "Технические науки",
    },
    en: {
      label: "Railway track and track facilities",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.08.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label: "Темир йўл транспортини ишлатиш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Эксплуатация железнодорожного транспорта",
      describe: "Технические науки",
    },
    en: {
      label:
        "Exploitation of railway transport science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.08.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label: "Навигация ва ҳаво йўллари ҳаракатини бошқариш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Навигация и управление воздушным движением",
      describe: "Технические науки",
    },
    en: {
      label: "Navigation and air traffic control",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.08.05",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label:
        "Темир йўлларнинг ҳаракатланувчи таркиби, поездларни тортиш ва электрлаштириш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Подвижной состав железных дорог, тяга поездов и электрификация",
      describe: "Технические науки",
    },
    en: {
      label:
        "Rolling-stock of railways, traction of trains and use of electric power",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.08.06",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.08.00",
      uz: "Транспорт",
      ru: "Транспорт",
      en: "Transport",
    },
    uz: {
      label: "Ғилдиракли ва гусеницали машиналар ва уларни ишлатиш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Колесные и гусеничные машины и их эксплуатация",
      describe: "Технические науки",
    },
    en: {
      label: "Wheeled and cater-pillar machines and their exploitation",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Қурилиш конструкциялари, бино ва иншоотлар",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Строительные конструкции, здания и сооружения",
      describe: "Технические науки",
    },
    en: {
      label: "Engineering constructions, buildings and structures",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label:
        "Геотехника (1. Асослар, пойдевор ва ер ости иншоотлари. Грунтлар ва тоғ жинслари механикаси. 2. Кўприк, транспорт тоннеллари ва метрополитенлар. 3. Йўллар, йўлларни рақамлаштириш ва йўл харакати хавфсизлиги. Йўл телематикаси)",
      describe: "Физика-математика фанлари Техника фанлари",
    },
    ru: {
      label:
        "Геотехника (1. Основания, фундаменты и подземные сооружения. Механика грунтов и горных пород. 2. Мосты, транспортные тоннели и метрополитены. 3. Дороги, цифровизация дорог и безопасность дорожного движения. Дорожная телематика)",
      describe: "Физико-математические науки Технические науки",
    },
    en: {
      label:
        "Geotechnics (1. Basements, foundations and underground structures. Mechanics of soils and rock sequences. 2. Bridges, transport tunnels and subways. 3. Roads, road digitalization and road safety. Road telematics)",
      describe: "Physical and mathematical sciences Technical sciences",
    },
  },
  {
    code: "05.09.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label:
        "Иссиқлик таъминоти. Вентиляция, кондиционерлаш. Газ таъминоти ва ёритиш",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Теплоснабжение. Вентиляция, кондиционирование. Газоснабжение и освещение",
      describe: "Технические науки",
    },
    en: {
      label:
        "Heat-supply. Ventilation, conditioning. Gas-supply and illumination",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.04",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label:
        "Сув таъминоти. Канализация. Сув ҳавзаларини муҳофазаловчи қурилиш тизимлари",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Водоснабжение. Канализация. Строительные системы охраны водных ресурсов",
      describe: "Технические науки",
    },
    en: {
      label:
        "Water-supply. Sewerage. Construction systems of water resources protection",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.05",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Қурилиш материаллари ва буюмлари",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Строительные материалы и изделия",
      describe: "Технические науки",
    },
    en: {
      label:
        "Building materials and articles science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.06",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Гидротехника ва мелиорация қурилиши",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Гидротехническое и мелиоративное строительство",
      describe: "Технические науки",
    },
    en: {
      label: "Hydrotechnical and meliorative construction",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.07",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Гидравлика ва муҳандислик гидрологияси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Гидравлика и инженерная гидрология",
      describe: "Технические науки",
    },
    en: {
      label: "Hydraulics and engineering hydrology",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.08",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Қурилиш технологияси ва қурилиш жараёнларини ташкил қилиш",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Технологии строительства и организация строительных процессов",
      describe: "Технические науки",
    },
    en: {
      label:
        "Construction technology and organization of construction processes",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.09.09",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.09.00",
      uz: "Қурилиш",
      ru: "Строительство",
      en: "Construction",
    },
    uz: {
      label: "Қурилиш механикаси",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Строительная механика",
      describe: "Технические науки",
    },
    en: {
      label: "Construction mechanics",
      describe: "Technical sciences",
    },
  },
  {
    code: "05.10.01",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.10.00",
      uz: "Инсон фаолияти хавфсизлиги",
      ru: "Безопасность деятельности человека",
      en: "Safety of human activity",
    },
    uz: {
      label: "Меҳнатни муҳофаза қилиш ва инсон фаолияти хавфсизлиги",
      describe: "Техника фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Охрана труда и безопасность деятельности человека",
      describe: "Технические науки Медицинские науки",
    },
    en: {
      label: "Labour protection and safety of human activity",
      describe: "Technical sciences Medical sciences",
    },
  },
  {
    code: "05.10.02",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.10.00",
      uz: "Инсон фаолияти хавфсизлиги",
      ru: "Безопасность деятельности человека",
      en: "Safety of human activity",
    },
    uz: {
      label:
        "Фавқулодда ҳолатларда хавфсизлик. Ёнғин, саноат, ядро ва радиация хавфсизлиги",
      describe:
        "Ветеринария фанлари Биология фанлари Техника фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Безопасность в чрезвычайных ситуациях. Пожарная, промышленная, ядерная и радиационная безопасность",
      describe:
        "Биологические науки Ветеринарные науки Технические науки Медицинские науки Химические науки",
    },
    en: {
      label:
        "Security in emergency situations. Fire, industrial, nuclear and radiation safety",
      describe:
        "Biological sciences Veterinary sciences Technical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "05.10.03",
    branch: {
      code: "05.00.00",
      uz: "Техника фанлари",
      ru: "Технические науки",
      en: "Technical sciences",
    },
    group: {
      code: "05.10.00",
      uz: "Инсон фаолияти хавфсизлиги",
      ru: "Безопасность деятельности человека",
      en: "Safety of human activity",
    },
    uz: {
      label: "Сейсмик хавфсизлик",
      describe: "Техника фанлари",
    },
    ru: {
      label: "Сейсмическая безопасность",
      describe: "Технические науки",
    },
    en: {
      label:
        "Seismic safety science, group of specialities. which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "06.01.01",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Умумий деҳқончилик. Пахтачилик",
      describe: "Қишлоқ хўжалиги фанлари",
    },
    ru: {
      label: "Общее земледелие. Хлопководство",
      describe: "Сельскохозяйственные науки",
    },
    en: {
      label: "General agriculture. Cotton-growing",
      describe: "Agricultural sciences",
    },
  },
  {
    code: "06.01.02",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Мелиорация ва суғорма деҳқончилик",
      describe: "Қишлоқ хўжалиги фанлари Техника фанлари",
    },
    ru: {
      label: "Мелиорация и орошаемое земледелие",
      describe: "Сельскохозяйственные науки Технические науки",
    },
    en: {
      label: "Melioration and irrigated agriculture",
      describe: "Agricultural sciences Technical sciences",
    },
  },
  {
    code: "06.01.03",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Агротупроқшунослик ва агрофизика",
      describe:
        "Қишлоқ хўжалиги фанлари География фанлари Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Агропочвоведение и агрофизика",
      describe:
        "Сельскохозяйственные науки Географические науки Биологические науки Технические науки Химические науки",
    },
    en: {
      label: "Agricultural soil science and agrophysics",
      describe:
        "Geographical sciences Agricultural sciences Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "06.01.04",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Агрокимё",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари Кимё фанлари",
    },
    ru: {
      label: "Агрохимия",
      describe:
        "Сельскохозяйственные науки Биологические науки Химические науки",
    },
    en: {
      label: "Agrochemistry",
      describe: "Agricultural sciences Biological sciences Chemical sciences",
    },
  },
  {
    code: "06.01.05",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Селекция ва уруғчилик",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label: "Селекция и семеноводство",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Selection and seed growing",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.01.06",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Сабзавотчилик",
      describe: "Қишлоқ хўжалиги фанлари",
    },
    ru: {
      label: "Овощеводство",
      describe: "Сельскохозяйственные науки",
    },
    en: {
      label: "Vegetable-growing",
      describe: "Agricultural sciences",
    },
  },
  {
    code: "06.01.07",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Мевачилик ва узумчилик",
      describe: "Қишлоқ хўжалиги фанлари",
    },
    ru: {
      label: "Плодоводство и виноградарство",
      describe: "Сельскохозяйственные науки",
    },
    en: {
      label: "Fruit-growing and viticulture",
      describe: "Agricultural sciences",
    },
  },
  {
    code: "06.01.08",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Ўсимликшунослик",
      describe: "Қишлоқ хўжалиги фанлари",
    },
    ru: {
      label: "Растениеводство",
      describe: "Сельскохозяйственные науки",
    },
    en: {
      label: "Plant-growing",
      describe: "Agricultural sciences",
    },
  },
  {
    code: "06.01.09",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Ўсимликларни ҳимоя қилиш",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label: "Защита растений",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Plant protection",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.01.10",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Ер тузиш, кадастр ва ер мониторинги",
      describe:
        "Қишлоқ хўжалиги фанлари Иқтисодиёт фанлари География фанлари Техника фанлари",
    },
    ru: {
      label: "Землеустройство, кадастр и мониторинг земель",
      describe:
        "Сельскохозяйственные науки Географические науки Экономические науки Технические науки",
    },
    en: {
      label: "Land management, cadastre and land monitoring",
      describe:
        "Geographical sciences Agricultural sciences Technical sciences Economic sciences",
    },
  },
  {
    code: "06.01.11",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.01.00",
      uz: "Агрономия",
      ru: "Агрономия",
      en: "Agronomy",
    },
    uz: {
      label: "Қишлоқ хўжалиги маҳсулотларини сақлаш ва қайта ишлаш",
      describe: "Қишлоқ хўжалиги фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Хранение и переработка сельскохозяйственных продуктов",
      describe: "Сельскохозяйственные науки Технические науки Химические науки",
    },
    en: {
      label:
        "Storage and reprocessing of agricultural products science, group of specialities. which the scientific",
      describe: "Agricultural sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "06.02.01",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.02.00",
      uz: "Зоотехния",
      ru: "Зоотехния",
      en: "Zootechnics",
    },
    uz: {
      label:
        "Қишлоқ хўжалиги ҳайвонларини урчитиш, кўпайтириш, селекцияси ва генетикаси. Қоракўлчилик",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label:
        "Разведение, селекция, генетика и воспроизводство сельскохозяйственных животных. Каракулеводство",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label:
        "Breeding, selection, genetics and reproduction of farm animals. Astrakhan sheep breeding",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.02.02",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.02.00",
      uz: "Зоотехния",
      ru: "Зоотехния",
      en: "Zootechnics",
    },
    uz: {
      label:
        "Қишлоқ хўжалиги ҳайвонларини озиқлантириш ва озуқа тайёрлаш технологияси",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label: "Кормление сельскохозяйственных животных и технология кормов",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Livestock feed and feeding technology",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.02.03",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.02.00",
      uz: "Зоотехния",
      ru: "Зоотехния",
      en: "Zootechnics",
    },
    uz: {
      label:
        "Хусусий зоотехния. Чорвачилик маҳсулотларини ишлаб чиқариш технологияси",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label:
        "Частная зоотехния. Технология производства продуктов животноводства",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Private zootechnics. Animal products technology",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.02.04",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.02.00",
      uz: "Зоотехния",
      ru: "Зоотехния",
      en: "Zootechnics",
    },
    uz: {
      label: "Ипакчилик",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари",
    },
    ru: {
      label: "Шелководство",
      describe: "Сельскохозяйственные науки Биологические науки",
    },
    en: {
      label: "Silk-growing",
      describe: "Agricultural sciences Biological sciences",
    },
  },
  {
    code: "06.02.05",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.02.00",
      uz: "Зоотехния",
      ru: "Зоотехния",
      en: "Zootechnics",
    },
    uz: {
      label: "Балиқчилик",
      describe:
        "Қишлоқ хўжалиги фанлари Ветеринария фанлари Биология фанлари Техника фанлари",
    },
    ru: {
      label: "Рыбоводство",
      describe:
        "Сельскохозяйственные науки Биологические науки Ветеринарные науки Технические науки",
    },
    en: {
      label: "Fish farming",
      describe:
        "Agricultural sciences Biological sciences Veterinary sciences Technical sciences",
    },
  },
  {
    code: "06.03.01",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.03.00",
      uz: "Ўрмон хўжалиги",
      ru: "Лесное хозяйство",
      en: "Forestry",
    },
    uz: {
      label:
        "Ўрмон экинлари. Селекция, уруғчилик ва шаҳарларни кўкаламзорлаштириш. Ўрмонлар агромелиорацияси ва ҳимоя ўрмонларини барпо этиш",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари Техника фанлари",
    },
    ru: {
      label:
        "Лесные культуры. Селекция, семеноводство и озеленение городов. Агролесомелиорация и защитное лесоразведение",
      describe:
        "Сельскохозяйственные науки Биологические науки Технические науки",
    },
    en: {
      label:
        "Forest crops. Selection, seed growing and urban greening. Agricultural melioration of forests and protective afforestation",
      describe: "Agricultural sciences Biological sciences Technical sciences",
    },
  },
  {
    code: "06.03.02",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.03.00",
      uz: "Ўрмон хўжалиги",
      ru: "Лесное хозяйство",
      en: "Forestry",
    },
    uz: {
      label:
        "Ўрмон тузиш ва ўрмон таксацияси. Ўрмоншунослик ва ўрмончилик. Ўрмон ёнғинлари ва уларга қарши курашиш",
      describe: "Қишлоқ хўжалиги фанлари Биология фанлари Техника фанлари",
    },
    ru: {
      label:
        "Лесоустройство и лесная таксация. Лесоведение и лесоводство. Лесные пожары и борьба с ними",
      describe:
        "Сельскохозяйственные науки Биологические науки Технические науки",
    },
    en: {
      label:
        "Forest management and forest estimation. Dendrology and silviculture. Forest fire and forest fire protection",
      describe: "Agricultural sciences Biological sciences Technical sciences",
    },
  },
  {
    code: "06.03.03",
    branch: {
      code: "06.00.00",
      uz: "Қишлоқ хўжалиги фанлари",
      ru: "Сельскохозяйственные науки",
      en: "Agricultural sciences",
    },
    group: {
      code: "06.03.00",
      uz: "Ўрмон хўжалиги",
      ru: "Лесное хозяйство",
      en: "Forestry",
    },
    uz: {
      label:
        "Доривор ўсимликлар интродукцияси, етиштириш технологияси ва агрофармоэкологияси",
      describe:
        "Қишлоқ хўжалиги фанлари Фармацевтика фанлари Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Интродукция, технология возделывания и агрофармоэкология лекарственных растений",
      describe:
        "Сельскохозяйственные науки Фармацевтические науки Биологические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Introduction, cultivation technology and agropharmoecology of medicinal plants science, group of specialities. which the scientific",
      describe:
        "Pharmaceutical sciences Agricultural sciences Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "07.00.01",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Ўзбекистон тарихи",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "История Узбекистана",
      describe: "Исторические науки",
    },
    en: {
      label: "History of Uzbekistan",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.02",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Фан ва технологиялар тарихи",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "История науки и технологий",
      describe: "Исторические науки",
    },
    en: {
      label: "History of science and technologies",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.03",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Жаҳон тарихи",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "Всемирная история",
      describe: "Исторические науки",
    },
    en: {
      label: "World history",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.04",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Диншунослик",
      describe: "Филология фанлари Фалсафа фанлари Тарих фанлари",
    },
    ru: {
      label: "Религиоведение",
      describe: "Филологические науки Исторические науки Философские науки",
    },
    en: {
      label: "Religious studies",
      describe:
        "Philosophical sciences Philological sciences Historical sciences",
    },
  },
  {
    code: "07.00.05",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Халқаро муносабатлар ва ташқи сиёсат тарихи",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "История международных отношений и внешней политики",
      describe: "Исторические науки",
    },
    en: {
      label: "History of international relations and foreign politics",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.06",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Археология",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "Археология",
      describe: "Исторические науки",
    },
    en: {
      label: "Archaeology",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.07",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Этнография, этнология ва антропология",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "Этнография, этнология и антропология",
      describe: "Исторические науки",
    },
    en: {
      label: "Ethnography, ethnology and anthropology",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.08",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Тарихшунослик, манбашунослик ва тарихий тадқиқот усуллари",
      describe: "Тарих фанлари",
    },
    ru: {
      label:
        "Историография, и методы исторического исследования источниковедение",
      describe: "Исторические науки",
    },
    en: {
      label:
        "Historiography, studies of historical sources and methods of historical research",
      describe: "Historical sciences",
    },
  },
  {
    code: "07.00.09",
    branch: {
      code: "07.00.00",
      uz: "Тарих фанлари",
      ru: "Исторические науки",
      en: "Historical sciences",
    },
    uz: {
      label: "Давлат сиёсати ва бошқаруви тарихи",
      describe: "Тарих фанлари",
    },
    ru: {
      label: "История государственной политики и управления",
      describe: "Исторические науки",
    },
    en: {
      label:
        "History of public policy and public administration science, group of specialities. which the scientific",
      describe: "Historical sciences",
    },
  },
  {
    code: "08.00.01",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Иқтисодиёт назарияси",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономическая теория",
      describe: "Экономические науки",
    },
    en: {
      label: "Economic theory",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.02",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Макроиқтисодиёт",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Макроэкономика",
      describe: "Экономические науки",
    },
    en: {
      label: "Macroeconomics",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.03",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Саноат иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономика промышленности",
      describe: "Экономические науки",
    },
    en: {
      label: "Economics of industry",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.04",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Қишлоқ хўжалиги иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономика сельского хозяйства",
      describe: "Экономические науки",
    },
    en: {
      label: "Economics of agriculture",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.05",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Хизмат кўрсатиш тармоқлари иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономика отраслей сферы услуг",
      describe: "Экономические науки",
    },
    en: {
      label: "Economics of service sphere branches",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.06",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Эконометрика ва статистика",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Эконометрика и статистика",
      describe: "Экономические науки",
    },
    en: {
      label: "Econometrics and statistics",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.07",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Молия, пул муомаласи ва кредит",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Финансы, денежное обращение и кредит",
      describe: "Экономические науки",
    },
    en: {
      label: "Finance, money circulation and credit",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.08",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Бухгалтерия ҳисоби, иқтисодий таҳлил ва аудит",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Бухгалтерский учёт, экономический анализ и аудит",
      describe: "Экономические науки",
    },
    en: {
      label: "Accounting, economic analysis and audit",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.09",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Жаҳон иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Мировая экономика",
      describe: "Экономические науки",
    },
    en: {
      label: "World economy",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.10",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Демография. Меҳнат иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Демография. Экономика труда",
      describe: "Экономические науки",
    },
    en: {
      label: "Demography. Labour economics",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.11",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Маркетинг",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Маркетинг",
      describe: "Экономические науки",
    },
    en: {
      label: "Marketing",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.12",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Минтақавий иқтисодиёт",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Региональная экономика",
      describe: "Экономические науки",
    },
    en: {
      label:
        "Regional economics science, group of specialities. which the scientific",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.13",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Менежмент",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Менеджмент",
      describe: "Экономические науки",
    },
    en: {
      label: "Management",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.14",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Иқтисодиётда ахборот тизимлари ва технологиялари",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Информационные системы и технологии в экономике",
      describe: "Экономические науки",
    },
    en: {
      label: "Information system and technologies in economics",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.15",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Тадбиркорлик ва кичик бизнес иқтисодиёти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономика предпринимательства и малого бизнеса",
      describe: "Экономические науки",
    },
    en: {
      label: "Entrepreneurship and small business economics",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.16",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Рақамли иқтисодиёт ва ҳалқаро рақамли интеграция",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Цифровая экономика и международная цифровая интеграция",
      describe: "Экономические науки",
    },
    en: {
      label: "Digital economy and international digital integration",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.17",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Туризм ва меҳмонхона фаолияти",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Туризм и гостиничная деятельность",
      describe: "Экономические науки",
    },
    en: {
      label: "Tourism and hotel activities",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.18",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Камбағаллик ва тараққиёт",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Бедность и развитие",
      describe: "Экономические науки",
    },
    en: {
      label: "Poverty and development",
      describe: "Economic sciences",
    },
  },
  {
    code: "08.00.19",
    branch: {
      code: "08.00.00",
      uz: "Иқтисодиёт фанлари",
      ru: "Экономические науки",
      en: "Economic sciences",
    },
    uz: {
      label: "Давлат бошқарувининг иқтисодий асослари",
      describe: "Иқтисодиёт фанлари",
    },
    ru: {
      label: "Экономические основы государственного управления",
      describe: "Экономические науки",
    },
    en: {
      label:
        "Economic foundations of public administration science, group of specialities. which the scientific",
      describe: "Economic sciences",
    },
  },
  {
    code: "09.00.01",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Онтология, гносеология ва мантиқ",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "Онтология, гносеология и логика",
      describe: "Философские науки",
    },
    en: {
      label: "Ontology, gnosiology and logics",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.02",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Онг, маданият ва амалиёт шакллари фалсафаси (номи)",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "Философия форм сознания, культуры и практики (название)",
      describe: "Философские науки",
    },
    en: {
      label:
        "Philosophy of forms of consciousness, culture and practice (title)",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.03",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Фалсафа тарихи",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "История философии",
      describe: "Философские науки",
    },
    en: {
      label: "History of philosophy",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.04",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Ижтимоий фалсафа",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "Социальная философия",
      describe: "Философские науки",
    },
    en: {
      label: "Social philosophy",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.05",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Миллий ғоя тарғиботи технологиялари",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "Технологии пропаганды национальной идеи",
      describe: "Философские науки",
    },
    en: {
      label: "Technologies for promoting the national idea",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.06",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Ғоялар тарихи ва методологияси",
      describe: "Фалсафа фанлари",
    },
    ru: {
      label: "История и методология идей",
      describe: "Философские науки",
    },
    en: {
      label: "History and methodology of ideas",
      describe: "Philosophical sciences",
    },
  },
  {
    code: "09.00.07",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Маънавият тарихи ва назарияси",
      describe:
        "Психология фанлари Социология фанлари Фалсафа фанлари Тарих фанлари Сиёсий фанлар",
    },
    ru: {
      label: "История и теория духовности",
      describe:
        "Психологические науки Социологические науки Исторические науки Политические науки Философские науки",
    },
    en: {
      label: "History and theory of spirituality",
      describe:
        "Philosophical sciences Psychological sciences Sociological sciences Historical sciences Political sciences",
    },
  },
  {
    code: "09.00.08",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Маънавий тарбия",
      describe:
        "Психология фанлари Социология фанлари Фалсафа фанлари Тарих фанлари Сиёсий фанлар",
    },
    ru: {
      label: "Духовное воспитание",
      describe:
        "Психологические науки Социологические науки Исторические науки Политические науки Философские науки",
    },
    en: {
      label: "Spiritual bringing up",
      describe:
        "Philosophical sciences Psychological sciences Sociological sciences Historical sciences Political sciences",
    },
  },
  {
    code: "09.00.09",
    branch: {
      code: "09.00.00",
      uz: "Фалсафа фанлари",
      ru: "Философские науки",
      en: "Philosophical sciences",
    },
    uz: {
      label: "Маънавий жараёнлар ва технологиялар",
      describe:
        "Психология фанлари Социология фанлари Фалсафа фанлари Тарих фанлари Сиёсий фанлар",
    },
    ru: {
      label: "Духовные процессы и технологии",
      describe:
        "Психологические науки Социологические науки Исторические науки Политические науки Философские науки",
    },
    en: {
      label:
        "Spiritual processes and technologies science, group of specialities. which the scientific",
      describe:
        "Philosophical sciences Psychological sciences Sociological sciences Historical sciences Political sciences",
    },
  },
  {
    code: "10.00.01",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Ўзбек тили",
      describe: "фанлари",
    },
    ru: {
      label: "Узбекский язык",
      describe: "науки",
    },
    en: {
      label: "Uzbek language",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.02",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label:
        "Ўзбек адабиёти (Ўзбек мумтоз адабиёти. ХХ аср ўзбек адабиёти ва ҳозирги адабий жараён)",
      describe: "Филология фанлари",
    },
    ru: {
      label:
        "Узбекская литература (Узбекская классическая литература. Узбекская литература XX века и современный литературный процесс)",
      describe: "Филологические науки",
    },
    en: {
      label:
        "Uzbek literature (Uzbek classical literature. Uzbek literature of the XX century and the current literary process)",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.03",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Қорақалпоқ тили",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Каракалпакский язык",
      describe: "Филологические науки",
    },
    en: {
      label: "Karakalpak language",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.04",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Европа, Америка ва Австралия халқлари тили ва адабиёти",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Языки и литература народов Европы, Америки и Австралии",
      describe: "Филологические науки",
    },
    en: {
      label:
        "National languages and literature of Europe, America and Australia",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.05",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Осиё ва Африка халқлари тили ва адабиёти",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Языки и литература народов Азии и Африки",
      describe: "Филологические науки",
    },
    en: {
      label: "National languages and literature of Asia and Africa",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.06",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label:
        "Қиёсий адабиётшунослик, чоғиштирма тилшунослик ва таржимашунослик",
      describe: "Филология фанлари",
    },
    ru: {
      label:
        "Сравнительное литературоведение, сопоставительное языкознание и переводоведение",
      describe: "Филологические науки",
    },
    en: {
      label:
        "Comparative literary criticism, contrastive linguistics and translation studies",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.07",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Адабиёт назарияси",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Теория литературы",
      describe: "Филологические науки",
    },
    en: {
      label: "Theory of literature",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.08",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Фольклоршунослик",
      describe: "Санъатшунослик фанлари Филология фанлари",
    },
    ru: {
      label: "Фольклористика",
      describe: "Филологические науки Искусствоведение",
    },
    en: {
      label:
        "Folklore studies science, group of specialities. which the scientific",
      describe: "Philological sciences Art sciences",
    },
  },
  {
    code: "10.00.09",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Журналистика",
      describe: "Социология фанлари Филология фанлари",
    },
    ru: {
      label: "Журналистика",
      describe: "Социологические науки Филологические науки",
    },
    en: {
      label: "Journalism",
      describe: "Philological sciences Sociological sciences",
    },
  },
  {
    code: "10.00.10",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Матншунослик ва адабий манбашунослик",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Текстология и литературное источниковедение",
      describe: "Филологические науки",
    },
    en: {
      label: "Textology and studies of literary sources",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.11",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Амалий ва компьютер лингвистикаси",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Прикладная и компьютерная лингвистика",
      describe: "Филологические науки",
    },
    en: {
      label: "Applied and computational linguistics",
      describe: "Philological sciences",
    },
  },
  {
    code: "10.00.12",
    branch: {
      code: "10.00.00",
      uz: "Филология фанлари",
      ru: "Филологические науки",
      en: "Philological sciences",
    },
    uz: {
      label: "Қорақалпоқ адабиёти",
      describe: "Филология фанлари",
    },
    ru: {
      label: "Каракалпакская литература",
      describe: "Филологические науки",
    },
    en: {
      label:
        "Karakalpak literature science, group of specialities. which the scientific",
      describe: "Philological sciences",
    },
  },
  {
    code: "11.00.01",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Табиий география",
      describe: "География фанлари",
    },
    ru: {
      label: "Физическая география",
      describe: "Географические науки",
    },
    en: {
      label: "Physical geography",
      describe: "sciences",
    },
  },
  {
    code: "11.00.02",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Иқтисодий ва ижтимоий география",
      describe: "Иқтисодиёт фанлари География фанлари",
    },
    ru: {
      label: "Экономическая и социальная география",
      describe: "Географические науки Экономические науки",
    },
    en: {
      label: "Economic and social geography",
      describe: "Geographical sciences Economic sciences",
    },
  },
  {
    code: "11.00.03",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Қуруқлик гидрологияси. Сув ресурслари. Гидрокимё",
      describe: "География фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label: "Гидрология суши. Водные ресурсы. Гидрохимия",
      describe: "Географические науки Технические науки Химические науки",
    },
    en: {
      label: "Land hydrology. Water resources. Hydrochemistry",
      describe: "Geographical sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "11.00.04",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Метеорология. Иқлимшунослик. Агрометеорология",
      describe:
        "Физика-математика фанлари Қишлоқ хўжалиги фанлари География фанлари Техника фанлари",
    },
    ru: {
      label: "Метеорология. Климатология. Агрометеорология",
      describe:
        "Физико-математические науки Сельскохозяйственные науки Географические науки Технические науки",
    },
    en: {
      label: "Meteorology. Climatology. Agrometeorology",
      describe:
        "Physical and mathematical sciences Geographical sciences Agricultural sciences Technical sciences",
    },
  },
  {
    code: "11.00.05",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label:
        "Атроф-муҳитни муҳофаза қилиш ва табиий ресурслардан оқилона фойдаланиш",
      describe:
        "Геология-минералогия фанлари Физика-математика фанлари Қишлоқ хўжалиги фанлари География фанлари Биология фанлари Техника фанлари Кимё фанлари",
    },
    ru: {
      label:
        "Охрана окружающей среды и рациональное использование природных ресурсов",
      describe:
        "Геолого-минералогические науки Физико-математические науки Сельскохозяйственные науки Географические науки Биологические науки Технические науки Химические науки",
    },
    en: {
      label:
        "Environment protection and rational utilization of natural resources",
      describe:
        "Geological and mineralogical sciences Physical and mathematical sciences Geographical sciences Agricultural sciences Biological sciences Technical sciences Chemical sciences",
    },
  },
  {
    code: "11.00.06",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Геодезия. Картография",
      describe: "Физика-математика фанлари География фанлари Техника фанлари",
    },
    ru: {
      label: "Геодезия. Картография",
      describe:
        "Физико-математические науки Географические науки Технические науки",
    },
    en: {
      label: "Geodesy. Cartography",
      describe:
        "Physical and mathematical sciences Geographical sciences Technical sciences",
    },
  },
  {
    code: "11.00.07",
    branch: {
      code: "11.00.00",
      uz: "География фанлари",
      ru: "Географические науки",
      en: "Geographical sciences",
    },
    uz: {
      label: "Геоинформатика",
      describe: "Қишлоқ хўжалиги фанлари География фанлари Техника фанлари",
    },
    ru: {
      label: "Геоинформатика",
      describe:
        "Сельскохозяйственные науки Географические науки Технические науки",
    },
    en: {
      label:
        "Geoinformatics science, group of specialities. which the scientific",
      describe:
        "Geographical sciences Agricultural sciences Technical sciences",
    },
  },
  {
    code: "12.00.01",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Давлат ва ҳуқуқ назарияси ва тарихи. Ҳуқуқий таълимотлар тарихи",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "государства и права. История правовых учений",
      describe: "Юридические науки",
    },
    en: {
      label: "Theory and history of state and law. History of law doctrines",
      describe: "Law",
    },
  },
  {
    code: "12.00.02",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Конституциявий ҳуқуқ. Маъмурий ҳуқуқ. Молия ва божхона ҳуқуқи",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Конституционное право. Административное право. Финансовое и таможенное право",
      describe: "Юридические науки",
    },
    en: {
      label: "Constitutional law. Administrative law. Finance and customs law",
      describe: "Law",
    },
  },
  {
    code: "12.00.03",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label:
        "Фуқаролик ҳуқуқи. Тадбиркорлик ҳуқуқи. Оила ҳуқуқи. Халқаро хусусий ҳуқуқ",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Гражданское право. Предприниматель-ское право. Семейное право. Международное частное право",
      describe: "Юридические науки",
    },
    en: {
      label: "Civil law. Business law. Family law. International private law",
      describe: "Law",
    },
  },
  {
    code: "12.00.04",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label:
        "Фуқаролик процессуал ҳуқуқи. Хўжалик процессуал ҳуқуқи. Ҳакамлик жараёни ва медиация",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Гражданское процессуальное право. Хозяйственное процессуальное право. Третейский процесс и медиация",
      describe: "Юридические науки",
    },
    en: {
      label:
        "Civil procedures law. Economic procedures law. Arbitration process and mediation",
      describe: "Law",
    },
  },
  {
    code: "12.00.05",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Меҳнат ҳуқуқи. Ижтимоий таъминот ҳуқуқи",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Трудовое право. Право социального обеспечения",
      describe: "Юридические науки",
    },
    en: {
      label: "Labour law. Social security law",
      describe: "Law",
    },
  },
  {
    code: "12.00.06",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Табиий ресурслар ҳуқуқи. Аграр ҳуқуқ. Экологик ҳуқуқ",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Природоресурсное право. Аграрное право. Экологическое право",
      describe: "Юридические науки",
    },
    en: {
      label: "Natural resource law. Agrarian law. Ecological law",
      describe: "Law",
    },
  },
  {
    code: "12.00.07",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label:
        "Суд ҳокимияти. Прокурор назорати. Ҳуқуқни муҳофаза қилиш фаолиятини ташкил этиш. Адвокатура",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Судебная власть. Прокурорский надзор. Организация правоохранительной деятельности. Адвокатура",
      describe: "Юридические науки",
    },
    en: {
      label:
        "Judicial power. Prosecutorial supervision. Organization of law enforcement. Advocacy science, group of specialities.",
      describe: "Law which the scientific",
    },
  },
  {
    code: "12.00.08",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Жиноят ҳуқуқи. Жиноят-ижроия ҳуқуқи",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Уголовное право. Уголовно-исполнительное право",
      describe: "Юридические науки",
    },
    en: {
      label: "Criminal law. Penal enforcement law",
      describe: "Law",
    },
  },
  {
    code: "12.00.09",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label:
        "Жиноят процесси. Криминалистика, тезкор-қидирув ҳуқуқ ва суд экспертизаси",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Уголовный процесс. Криминалистика, оперативно-розыскное право и судебная экспертиза",
      describe: "Юридические науки",
    },
    en: {
      label:
        "Criminal procedure. Criminology, operation search law and forensic examination",
      describe: "Law",
    },
  },
  {
    code: "12.00.10",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Халқаро ҳуқуқ",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Международное право",
      describe: "Юридические науки",
    },
    en: {
      label: "International law",
      describe: "Law",
    },
  },
  {
    code: "12.00.11",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Парламент ҳуқуқи",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Парламентское право",
      describe: "Юридические науки",
    },
    en: {
      label: "Parliamentary law",
      describe: "Law",
    },
  },
  {
    code: "12.00.12",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Коррупция муаммолари",
      describe:
        "Иқтисодиёт фанлари Психология фанлари Социология фанлари Техника фанлари Юридик фанлар",
    },
    ru: {
      label: "Проблемы коррупции",
      describe:
        "Психологические науки Социологические науки Экономические науки Технические науки Юридические науки",
    },
    en: {
      label: "Problems of corruption Law",
      describe:
        "Psychological sciences Sociological sciences Technical sciences Economic sciences",
    },
  },
  {
    code: "12.00.13",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Инсон ҳуқуқлари",
      describe: "Социология фанлари Юридик фанлар",
    },
    ru: {
      label: "Права человека",
      describe: "Социологические науки Юридические науки",
    },
    en: {
      label: "Human rights Law",
      describe: "Sociological sciences",
    },
  },
  {
    code: "12.00.14",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label:
        "Ҳуқуқбузарликлар профилактикаси. Жамоат хавфсизлигини таъминлаш. Пробация фаолияти",
      describe: "Юридик фанлар",
    },
    ru: {
      label:
        "Профилактика правонарушений. Обеспечение общественной безопасности. Деятельность пробации",
      describe: "Юридические науки",
    },
    en: {
      label: "Crime prevention. Ensuring public safety. Probation activities",
      describe: "Law",
    },
  },
  {
    code: "12.00.15",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Криминοлοгия Кимё фалари",
      describe:
        "Педагогика фанлари Психология фанлари Социология фанлари Техника фанлари Тиббиёт фанлари Юридик фанлар",
    },
    ru: {
      label: "Криминοлοгия",
      describe:
        "Психологические науки Социологические науки Педагогические науки Технические науки Юридические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Criminology Law",
      describe:
        "Psychological sciences Sociological sciences Pedagogical sciences Technical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "12.00.16",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Киберхавфсизликни ҳуқуқий таъминлаш",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Правовое обеспечение кибербезопасности",
      describe: "Юридические науки",
    },
    en: {
      label: "Legal regulation of cybersecurity",
      describe: "Law",
    },
  },
  {
    code: "12.00.17",
    branch: {
      code: "12.00.00",
      uz: "Юридик фанлар",
      ru: "Юридические науки",
      en: "Juridical sciences",
    },
    uz: {
      label: "Давлат бошқарувининг ҳуқуқий асослари",
      describe: "Юридик фанлар",
    },
    ru: {
      label: "Правовые основы государственного управления",
      describe: "Юридические науки",
    },
    en: {
      label:
        "Legal foundations of public administration science, group of specialities.",
      describe: "Law which the scientific",
    },
  },
  {
    code: "13.00.01",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Педагогика назарияси. Педагогик таълимотлар тарихи",
      describe: "Педагогика фанлари",
    },
    ru: {
      label: "Теория педагогики. История педагогических учений",
      describe: "Педагогические науки",
    },
    en: {
      label: "Theory of pedagogy. History of pedagogical studies",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.02",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Таълим ва тарбия (соҳалар бўйича)",
      describe: "Педагогика назарияси ва методикаси фанлари",
    },
    ru: {
      label: "Теория и методика обучения и воспитания (по отраслям)",
      describe: "Педагогические науки",
    },
    en: {
      label: "Theory and methodology of teaching and bringing up (by fields)",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.03",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Махсус педагогика",
      describe: "Педагогика фанлари",
    },
    ru: {
      label: "Специальная педагогика",
      describe: "Педагогические науки",
    },
    en: {
      label: "Special pedagogy",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.04",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label:
        "Жисмоний тарбия, спорт машғулотлари, соғломлаштирувчи ва адаптив жисмоний тарбия назарияси ва методикаси",
      describe: "Педагогика фанлари",
    },
    ru: {
      label:
        "Теория и методика физического воспитания, спортивной тренировки, оздоровительной и адаптивной физической культуры",
      describe: "Педагогические науки",
    },
    en: {
      label:
        "Theory and methodology of physical education, sports training, healthimproving and adaptive physical culture",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.05",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Касб-ҳунар таълими",
      describe: "Педагогика назарияси ва методикаси фанлари",
    },
    ru: {
      label: "Теория и методика профессионального образования",
      describe: "Педагогические науки",
    },
    en: {
      label: "Theory and methodology of professional education",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.06",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Рақамли таълим (таълим соҳалари ва босқичлари бўйича)",
      describe: "Педагогика назарияси ва методикаси фанлари",
    },
    ru: {
      label:
        "Теория и методика цифрового образования (по областям и уровням образования)",
      describe: "Педагогические науки",
    },
    en: {
      label:
        "Theory and methodology of digital education (by fields and levels of education)",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.07",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Таълимда менежмент",
      describe: "Педагогика фанлари",
    },
    ru: {
      label: "Менеджмент в образовании",
      describe: "Педагогические науки",
    },
    en: {
      label: "Management in education",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.08",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Мактабгача таълим ва тарбия назарияси ва методикаси",
      describe: "Педагогика фанлари",
    },
    ru: {
      label: "Теория и методика дошкольного образования и воспитания",
      describe: "Педагогические науки",
    },
    en: {
      label: "Theory and methodology of preschool education and bringing up",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "13.00.09",
    branch: {
      code: "13.00.00",
      uz: "Педагогика фанлари",
      ru: "Педагогические науки",
      en: "Pedagogical sciences",
    },
    uz: {
      label: "Ижтимоий педагогика",
      describe: "Педагогика фанлари",
    },
    ru: {
      label: "Социальная педагогика",
      describe: "Педагогические науки",
    },
    en: {
      label:
        "Social pedagogy science, group of specialities. which the scientific",
      describe: "Pedagogical sciences",
    },
  },
  {
    code: "14.00.01",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Акушерлик ва гинекология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Акушерство и гинекология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Obstetrics and gynecology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.02",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Морфология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Морфология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Morphology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.03",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Эндокринология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Эндокринология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Endocrinology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.04",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Оториноларингология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Оториноларингология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Otorhinolaryngology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.05",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Ички касалликлар",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Внутренние болезни",
      describe: "Медицинские науки",
    },
    en: {
      label: "Internal diseases",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.06",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Кардиология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Кардиология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Cardiology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.07",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Гигиена",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Гигиена",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Hygiene",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.08",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Офтальмология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Офтальмология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Ophthalmology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.09",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Педиатрия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Педиатрия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Pediatrics",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.10",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Юқумли касалликлар",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Инфекционные болезни",
      describe: "Медицинские науки",
    },
    en: {
      label: "Infectious diseases",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.11",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Дерматология ва венерология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Дерматология и венерология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Dermatology and venereology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.12",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Тиббий реабилитология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Медицинская реабилитология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Medical rehabilitology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.13",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Неврология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Неврология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Neurology science, group of specialities. which the scientific",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.14",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Онкология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Онкология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Oncology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.15",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Патологик анатомия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Патологическая анатомия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Pathological anatomy",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.16",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Нормал ва патологик физиология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Нормальная и патологическая физиология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Normal and pathological physiology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.17",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Фармакология ва клиник фармакология",
      describe: "Фармацевтика фанлари Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Фармакология и клиническая фармакология",
      describe: "Фармацевтические науки Биологические науки Медицинские науки",
    },
    en: {
      label: "Pharmacology and clinical pharmacology",
      describe: "Pharmaceutical sciences Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.18",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Психиатрия ва наркология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Психиатрия и наркология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Psychiatry and narcology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.19",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Клиник радиология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Клиническая радиология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Clinical radiology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.20",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Тиббий генетика",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Медицинская генетика",
      describe: "Медицинские науки",
    },
    en: {
      label: "Medical genetics",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.21",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Стоматология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Стоматология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Stomatology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.22",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Травматология ва ортопедия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Травматология и ортопедия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Traumatology and orthopaedy",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.23",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Ҳамширалик ишини ташкил этиш",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Организация медсестринского дела",
      describe: "Медицинские науки",
    },
    en: {
      label: "Organization of medical-nursery affair",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.24",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Суд тиббиёти",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Судебная медицина",
      describe: "Медицинские науки",
    },
    en: {
      label: "Forensic medicine",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.25",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Клиник-лаборатор ва функционал диагностика",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Клинико-лабораторная и функциональная диагностика",
      describe: "Медицинские науки",
    },
    en: {
      label: "Clinical laboratory and functional diagnostics",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.26",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Фтизиатрия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Фтизиатрия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Phthisiatry",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.27",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Хирургия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Хирургия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Surgery",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.28",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Нейрохирургия",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Нейрохирургия",
      describe: "Медицинские науки",
    },
    en: {
      label:
        "Neurosurgery science, group of specialities. which the scientific",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.29",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Гематология ва трансфузиология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Гематология и трансфузиология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Hematology and transfusiology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.30",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Эпидемиология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Эпидемиология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Epidemiology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.31",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Урология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Урология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Urology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.32",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Трансплантология ва сунъий аъзолар",
      describe: "Биология фанлари Техника фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Трансплантология и искусственные органы",
      describe: "Биологические науки Технические науки Медицинские науки",
    },
    en: {
      label: "Transplantology and artificial organs",
      describe: "Biological sciences Technical sciences Medical sciences",
    },
  },
  {
    code: "14.00.33",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Жамият саломатлиги. Соғлиқни сақлашда менежмент",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Общественное здоровье. Менеджмент в здравоохранении",
      describe: "Медицинские науки",
    },
    en: {
      label: "Public health. Healthcare management",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.34",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Юрак-қон томир хирургияси",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Сердечно-сосудистая хирургия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Cardiovascular surgery",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.35",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Болалар хирургияси",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Детская хирургия",
      describe: "Медицинские науки",
    },
    en: {
      label: "Pediatric surgery",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.36",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Аллергология ва иммунология",
      describe: "Биология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Аллергология и иммунология",
      describe: "Биологические науки Медицинские науки",
    },
    en: {
      label: "Allergology and immunology",
      describe: "Biological sciences Medical sciences",
    },
  },
  {
    code: "14.00.37",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Анестезиология ва реаниматология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Анестезиология и реаниматология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Anaesthesiology and reanimatology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.38",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Спорт тиббиёти",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Спортивная медицина",
      describe: "Медицинские науки",
    },
    en: {
      label: "Sports medicine",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.39",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Токсикология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Токсикология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Toxicology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.40",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Шошилинч тиббиёт",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Экстренная медицина",
      describe: "Медицинские науки",
    },
    en: {
      label: "Emergency medicine",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.41",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Халқ табобати",
      describe: "Фармацевтика фанлари Тиббиёт фанлари Кимё фанлари",
    },
    ru: {
      label: "Народная медицина",
      describe: "Фармацевтические науки Медицинские науки Химические науки",
    },
    en: {
      label: "Folk medicine",
      describe: "Pharmaceutical sciences Chemical sciences Medical sciences",
    },
  },
  {
    code: "14.00.42",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Пульмонология",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Пульмонология",
      describe: "Медицинские науки",
    },
    en: {
      label: "Pulmonology",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.43",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Профилактик тиббиёт",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Профилактическая медицина",
      describe: "Медицинские науки",
    },
    en: {
      label: "Preventive medicine",
      describe: "Medical sciences",
    },
  },
  {
    code: "14.00.44",
    branch: {
      code: "14.00.00",
      uz: "Тиббиёт фанлари",
      ru: "Медицинские науки",
      en: "Medical sciences",
    },
    uz: {
      label: "Рақамли тиббиёт",
      describe: "Тиббиёт фанлари",
    },
    ru: {
      label: "Цифровая медицина",
      describe: "Медицинские науки",
    },
    en: {
      label:
        "Digital medicine science, group of specialities. which the scientific",
      describe: "Medical sciences",
    },
  },
  {
    code: "15.00.01",
    branch: {
      code: "15.00.00",
      uz: "Фармацевтика фанлари",
      ru: "Фармацевтические науки",
      en: "Pharmaceutical sciences",
    },
    uz: {
      label: "Дори технологияси",
      describe: "Фармацевтика фанлари Техника фанлари",
    },
    ru: {
      label: "Технология лекарств",
      describe: "Фармацевтические науки Технические науки",
    },
    en: {
      label: "Technology of drugs",
      describe: "Pharmaceutical sciences Technical sciences",
    },
  },
  {
    code: "15.00.02",
    branch: {
      code: "15.00.00",
      uz: "Фармацевтика фанлари",
      ru: "Фармацевтические науки",
      en: "Pharmaceutical sciences",
    },
    uz: {
      label: "Фармацевтик кимё ва фармакогнозия",
      describe: "Фармацевтика фанлари Биология фанлари Кимё фанлари",
    },
    ru: {
      label: "Фармацевтическая химия и фармакогнозия",
      describe: "Фармацевтические науки Биологические науки Химические науки",
    },
    en: {
      label: "Pharmaceutical chemistry and pharmacognosy",
      describe: "Pharmaceutical sciences Biological sciences Chemical sciences",
    },
  },
  {
    code: "15.00.03",
    branch: {
      code: "15.00.00",
      uz: "Фармацевтика фанлари",
      ru: "Фармацевтические науки",
      en: "Pharmaceutical sciences",
    },
    uz: {
      label: "Фармацевтика ишини ташкил этиш",
      describe: "Фармацевтика фанлари",
    },
    ru: {
      label: "Организация фармацевтического дела",
      describe: "Фармацевтические науки",
    },
    en: {
      label:
        "Pharmacy organization science, group of specialities. which the scientific",
      describe: "Pharmaceutical sciences",
    },
  },
  {
    code: "16.00.01",
    branch: {
      code: "16.00.00",
      uz: "Ветеринария фанлари",
      ru: "Ветеринарные науки",
      en: "Veterinary sciences",
    },
    uz: {
      label: "Ҳайвонлар касалликлари диагностикаси, терапияси ва хирургияси",
      describe: "Ветеринария фанлари",
    },
    ru: {
      label: "Диагностика болезней, терапия и хирургия животных",
      describe: "Ветеринарные науки",
    },
    en: {
      label: "Diagnostics of diseases, therapy and surgery of animals",
      describe: "Veterinary sciences",
    },
  },
  {
    code: "16.00.02",
    branch: {
      code: "16.00.00",
      uz: "Ветеринария фанлари",
      ru: "Ветеринарные науки",
      en: "Veterinary sciences",
    },
    uz: {
      label:
        "Ҳайвонлар патологияси, онкологияси ва морфологияси. Ветеринар акушерлиги ва ҳайвонлар репродукцияси биотехникаси",
      describe: "Қишлоқ хўжалиги фанлари Ветеринария фанлари Биология фанлари",
    },
    ru: {
      label:
        "Патология, онкология и морфология животных. Ветеринарное акушерство и биотехника репродукции животных",
      describe:
        "Сельскохозяйственные науки Биологические науки Ветеринарные науки",
    },
    en: {
      label:
        "Pathology, oncology and morphology of animals. Veterinary obstetrics and biotechnology of animal reproduction",
      describe: "Agricultural sciences Biological sciences Veterinary sciences",
    },
  },
  {
    code: "16.00.03",
    branch: {
      code: "16.00.00",
      uz: "Ветеринария фанлари",
      ru: "Ветеринарные науки",
      en: "Veterinary sciences",
    },
    uz: {
      label:
        "Ветеринария микробиологияси, вирусологияси, эпизоотологияси, микологияси, микотоксикологияси ва иммунологияси",
      describe: "Ветеринария фанлари Биология фанлари",
    },
    ru: {
      label:
        "Ветеринарная микробиология, вирусология, эпизоотология, микология с микотоксикологией и иммунология",
      describe: "Биологические науки Ветеринарные науки",
    },
    en: {
      label:
        "Veterinary microbiology, virology, epizootiology, mycology with mycotoxicology and immunology",
      describe: "Biological sciences Veterinary sciences",
    },
  },
  {
    code: "16.00.04",
    branch: {
      code: "16.00.00",
      uz: "Ветеринария фанлари",
      ru: "Ветеринарные науки",
      en: "Veterinary sciences",
    },
    uz: {
      label:
        "Ветеринария фармакологияси ва токсикологияси. Ветеринария санитарияси, экологияси, зоогигиенаси ва ветеринар-санитария экспертизаси",
      describe: "Ветеринария фанлари Биология фанлари",
    },
    ru: {
      label:
        "Ветеринарная фармакология и токсикология. Ветеринарная санитария, экология, зоогигиена и ветеринарно-санитарная экспертиза",
      describe: "Биологические науки Ветеринарные науки",
    },
    en: {
      label:
        "Veterinary pharmacology and toxicology. Veterinary sanitation, ecology, zoohygiene and veterinary-sanitary expertise science, group of specialities. which the scientific",
      describe: "Biological sciences Veterinary sciences",
    },
  },
  {
    code: "17.00.01",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Театр санъати",
      describe: "фанлари",
    },
    ru: {
      label: "Театральное искусство",
      describe: "Искусствоведение",
    },
    en: {
      label: "Theatrical art",
      describe: "Art sciences",
    },
  },
  {
    code: "17.00.02",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Мусиқа санъати",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label: "Музыкальное искусство",
      describe: "Искусствоведение",
    },
    en: {
      label: "Musical art",
      describe: "Art sciences",
    },
  },
  {
    code: "17.00.03",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Кино санъати. Телевидение",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label: "Киноискусство. Телевидение",
      describe: "Искусствоведение",
    },
    en: {
      label: "Cinematography. Television",
      describe: "Art sciences",
    },
  },
  {
    code: "17.00.04",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Тасвирий ва амалий безак санъати",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label: "Изобразительное и декоративноприкладное искусство",
      describe: "Искусствоведение",
    },
    en: {
      label: "Visual and applieddecorative art",
      describe: "Art sciences",
    },
  },
  {
    code: "17.00.05",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Дизайн назарияси ва тарихи",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label: "Теория и история дизайна",
      describe: "Искусствоведение",
    },
    en: {
      label: "Theory and history of design",
      describe: "Art sciences",
    },
  },
  {
    code: "17.00.06",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label:
        "Музейшунослик. Тарихий-маданий объектларни консервация қилиш, таъмирлаш ва сақлаш",
      describe: "Санъатшунослик фанлари Техника фанлари Тарих фанлари",
    },
    ru: {
      label:
        "Музееведение. Консервация, реставрация и хранение историко-культурных объектов",
      describe: "Исторические науки Технические науки Искусствоведение",
    },
    en: {
      label:
        "Museology. Conservation, restoration and storage of historical and cultural objects",
      describe: "Historical sciences Technical sciences Art sciences",
    },
  },
  {
    code: "17.00.07",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Маданият назарияси ва тарихи. Маданиятшунослик",
      describe: "Санъатшунослик фанлари Фалсафа фанлари Тарих фанлари",
    },
    ru: {
      label: "Теория и история культуры. Культурология",
      describe: "Исторические науки Философские науки Искусствоведение",
    },
    en: {
      label: "Theory and history of culture. Culturology",
      describe: "Philosophical sciences Historical sciences Art sciences",
    },
  },
  {
    code: "17.00.08",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Санъат назарияси ва тарихи",
      describe: "Санъатшунослик фанлари Тарих фанлари",
    },
    ru: {
      label: "Теория и история искусства",
      describe: "Исторические науки Искусствоведение",
    },
    en: {
      label: "Theory and history of art",
      describe: "Historical sciences Art sciences",
    },
  },
  {
    code: "17.00.09",
    branch: {
      code: "17.00.00",
      uz: "Санъатшунослик фанлари",
      ru: "Искусствоведение",
      en: "Art sciences",
    },
    uz: {
      label: "Хореография санъати",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label: "Хореографическое искусство",
      describe: "Искусствоведение",
    },
    en: {
      label:
        "Choreographic art science, group of specialities. which the scientific",
      describe: "Art sciences",
    },
  },
  {
    code: "18.00.01",
    branch: {
      code: "18.00.00",
      uz: "Меъморчилик фанлари",
      ru: "Архитектура",
      en: "Architecture",
    },
    uz: {
      label:
        "Архитектура назарияси ва тарихи. Архитектура ёдгорликларини таъмирлаш ва тиклаш Архитектура",
      describe: "Санъатшунослик фанлари",
    },
    ru: {
      label:
        "Теория и история архитектуры. Реставрация и реконструкция памятников архитектуры Архитектура",
      describe: "Искусствоведение",
    },
    en: {
      label:
        "Theory and history of architecture. Restoration and reconstruction of architectural monuments Architecture",
      describe: "Art sciences",
    },
  },
  {
    code: "18.00.02",
    branch: {
      code: "18.00.00",
      uz: "Меъморчилик фанлари",
      ru: "Архитектура",
      en: "Architecture",
    },
    uz: {
      label:
        "Районлаштириш. Шаҳарсозлик. Қишлоқ турар жойларини режалаштириш. Ландшафт архитектураси. Бино ва иншоотлар архитектураси Архитектура",
      describe: "Техника фанлари",
    },
    ru: {
      label:
        "Районная планировка. Градостроительство. Планировка сельских населенных мест. Ландшафтная архитектура. Архитектура зданий и сооружений Архитектура",
      describe: "Технические науки",
    },
    en: {
      label:
        "Area planning. Town building. Planning of rural residences. Landscape architecture. Architecture of buildings and constructions science, group of specialities. Architecture  which the scientific",
      describe: "Technical sciences",
    },
  },
  {
    code: "19.00.01",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label:
        "Психология тарихи ва назарияси. Умумий психология. Шахс психологияси",
      describe: "Психология фанлари",
    },
    ru: {
      label:
        "История и теория психологии. Общая психология. Психология личности",
      describe: "Психологические науки",
    },
    en: {
      label:
        "History and theory of psychology. General psychology. Psychology of personality",
      describe: "Psychological sciences",
    },
  },
  {
    code: "19.00.02",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Психофизиология",
      describe: "Психология фанлари",
    },
    ru: {
      label: "Психофизиология",
      describe: "Психологические науки",
    },
    en: {
      label: "Psycho-physiology",
      describe: "Psychological sciences",
    },
  },
  {
    code: "19.00.03",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Инсон касбий фаолияти психологияси (номи)",
      describe: "Психология фанлари",
    },
    ru: {
      label: "Психология профессиональной деятельности человека (название)",
      describe: "Психологические науки",
    },
    en: {
      label: "Psychology of human being professional activity (title)",
      describe: "Psychological sciences",
    },
  },
  {
    code: "19.00.04",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Тиббий психология",
      describe: "Психология фанлари Тиббиёт фанлари",
    },
    ru: {
      label: "Медицинская психология",
      describe: "Психологические науки Медицинские науки",
    },
    en: {
      label: "Medical psychology",
      describe: "Psychological sciences Medical sciences",
    },
  },
  {
    code: "19.00.05",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Ижтимоий психология. Этнопсихология",
      describe: "Психология фанлари Социология фанлари",
    },
    ru: {
      label: "Социальная психология. Этнопсихология",
      describe: "Психологические науки Социологические науки",
    },
    en: {
      label: "Social psychology. Ethnopsychology",
      describe: "Psychological sciences Sociological sciences",
    },
  },
  {
    code: "19.00.06",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Ёш ва педагогик психология. Ривожланиш психологияси",
      describe: "Психология фанлари",
    },
    ru: {
      label: "Возрастная и педагогическая психология. Психология развития",
      describe: "Психологические науки",
    },
    en: {
      label: "Age and pedagogical psychology. Psychology of development",
      describe: "Psychological sciences",
    },
  },
  {
    code: "19.00.07",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label: "Дин психологияси",
      describe: "Психология фанлари",
    },
    ru: {
      label: "Психология религии",
      describe: "Психологические науки",
    },
    en: {
      label: "Psychology of religion",
      describe: "Psychological sciences",
    },
  },
  {
    code: "19.00.08",
    branch: {
      code: "19.00.00",
      uz: "Психология фанлари",
      ru: "Психологические науки",
      en: "Psychological sciences",
    },
    uz: {
      label:
        "Махсус психология (жисмоний ва ақлий заифларни ривожланишининг психологик хусусиятлари)",
      describe: "Психология фанлари",
    },
    ru: {
      label:
        "Специальная психология (психологические особенности развития при физических и умственных недостатках)",
      describe: "Психологические науки",
    },
    en: {
      label:
        "Special psychology (psychological characteristics of development with physical and mental disabilities) science, group of specialities. which the scientific",
      describe: "Psychological sciences",
    },
  },
  {
    code: "21.01.02",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Стратегия (жумладан қуролли кучлар бошқаруви, стратегик ёйилиш, стратегик операциялар (жанговар ҳаракатлар) ва уларнинг барча кўринишдаги таъминоти, давлатнинг ҳарбий хавфсизлиги аспектлари, ҳарбий сиёсатшунослик)",
      describe:
        "Социология фанлари Фалсафа фанлари Ҳарбий фанлар Сиёсий фанлар",
    },
    ru: {
      label:
        "Стратегия (в том числе управление вооруженными силами, стратегическое развёртывание, стратегические операции (боевые действия) и все виды их обеспечения, военные аспекты безопасности государства, военная политология)",
      describe:
        "Социологические науки Политические науки Философские науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.03",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Яхлит оператив санъат, қуролли кучлар турлари, қўшин турлари ва махсус қисмлар бўйича (жумладан бошқарув ва жангнинг барча кўринишдаги таъминоти)",
      describe: "Ҳарбий фанлар",
    },
    ru: {
      label:
        "Оперативное искусство в целом, по видам вооруженных сил, родам войск и специальным войскам (в том числе управление и все виды обеспечения операций)",
      describe: "Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.04",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Умумий тактика, қуролли кучлар кўринишлари, қўшин турлари ва махсус қисмлар бўйича (жумладан бошқарув ва жангнинг барча кўринишдаги таъминоти)",
      describe: "Ҳарбий фанлар",
    },
    ru: {
      label:
        "Тактика общая, по видам вооруженных сил, родам войск и специальным войскам (в том числе управление и все виды обеспечения боя)",
      describe: "Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.05",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Қуролли кучлар қурилиши (жумладан қуролли кучлар турлари, қуролли кучлар фронт орти, қўшин турлари ва махсус қисмлар бўйича)",
      describe: "Иқтисодиёт фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Строительство вооруженных сил (в том числе по видам вооруженных сил, тылу вооруженных сил, родам войск и специальным войскам)",
      describe: "Экономические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.06",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Ҳарбий таълим ва тарбия, жанговар тайёргарлик, кадрларни танлаш ва жойлаштириш, қўшинларларнинг кундалик фаолиятини бошқариш (жумладан қуролли кучлар турлари, қуролли кучлар фронт орти, қўшин турлари ва махсус қисмлар бўйича)",
      describe:
        "Педагогика фанлари Психология фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Воинское обучение и воспитание, боевая подготовка, подбор и расстановка кадров, управление повседневной деятельностью войск (в том числе по видам вооруженных сил, тылу вооруженных сил, родам войск и специальным войскам)",
      describe:
        "Психологические науки Педагогические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.08",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label:
        "Қуролли кучлар фронт орти (жумладан қуролли кучлар турлари, қўшин турлари ва махсус қисмлар бўйича)",
      describe:
        "Ветеринария фанлари Иқтисодиёт фанлари Техника фанлари Тиббиёт фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Тыл вооруженных сил (в том числе по видам вооруженных сил, родам войск и специальным войскам)",
      describe:
        "Экономические науки Ветеринарные науки Технические науки Медицинские науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.09",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label: "Бошқарув ва алоқанинг ҳарбий тизимлари",
      describe: "Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Военные системы управления и связи",
      describe: "Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.10",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label: "Ҳарбий разведка",
      describe: "Психология фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Военная разведка",
      describe: "Психологические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.01.11",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.01.00",
      uz: "Ҳарбий-назарий фанлар",
      ru: "Военно-теоретические науки",
      en: "Military-theoretical sciences",
    },
    uz: {
      label: "Чет эл армия ва давлатлари, уларнинг салоҳиятлари",
      describe: "Иқтисодиёт фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Иностранные армии и государства, их потенциалы",
      describe: "Экономические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.03",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label: "Ҳарбий ҳуқуқ, халқаро ҳуқуқнинг ҳарбий муаммолари",
      describe: "Юридик фанлар Ҳарбий фанлар",
    },
    ru: {
      label: "Военное право, военные проблемы международного права",
      describe: "Юридические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.05",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Операцион (тактик) йўналиш, қўшинлар позициялари ва жойлашиш худудларининг муҳандислик ускуналари, фортификация, маскировка",
      describe: "Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Инженерное оборудование операционного (тактического) направления, позиций и районов расположения войск, фортификация, маскировка",
      describe: "Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.09",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Қўшинлар жанговар ҳаракатларининг гидрометеорологик ва топогеодезик таъминоти",
      describe:
        "Физика-математика фанлари География фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Гидрометеорологическое и топогеодезическое обеспечение боевых действий войск",
      describe:
        "Физико-математические науки Географические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.12",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Ҳарбий кибернетика, тизимли таҳлил, операциялар тадқиқоти, жанговар ҳаракатлар ва ҳарбий тизимларни моделлаштириш (жумладан қуролли кучлар турлари, қўшин турлари ва махсус қисмлар бўйича)",
      describe: "Физика-математика фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Военная кибернетика, системный анализ, исследование операций, моделирование боевых действий и систем военного назначения (в том числе по видам вооруженных сил, родам войск и специальным войскам)",
      describe: "Физико-математические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.13",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label: "Ҳарбий ишда информатика ва компьютер технологиялари",
      describe:
        "Физика-математика фанлари Техника фанлари Фалсафа фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Информатика и компьютерные технологии в военном деле",
      describe:
        "Физико-математические науки Технические науки Философские науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.14",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Қурол-аслаҳа ва ҳарбий техника, ҳарбий мажмуа ва тизимлар (жумладан қуролли кучлар турлари, қўшин турлари ва махсус қисмлар бўйича)",
      describe: "Физика-математика фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Вооружение и военная техника, комплексы и системы военного назначения (в том числе по видам вооруженных сил, родам войск и специальным войскам)",
      describe: "Физико-математические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.17",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Қурол-аслаҳа ва ҳарбий техникани ишлатиш ва қайта тиклаш, техник таъминот (жумладан қуролли кучлар турлари, қуролли кучлар фронт орти, қўшин турлари ва махсус қисмлар бўйича",
      describe: "Физика-математика фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label:
        "Эксплуатация и восстановление вооружения и военной техники, техническое обеспечение (в том числе по видам вооруженных сил, тылу вооруженных сил, родам войск и специальным войскам)",
      describe: "Физико-математические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.22",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label: "Ҳарбий тарих",
      describe: "Тарих фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Военная история",
      describe: "Исторические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.23",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label: "Ҳарбий тиббиёт",
      describe: "Тиббиёт фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Военная медицина",
      describe: "Медицинские науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.24",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label:
        "Фуқаролар ҳимояси. Фавқулодда ҳолатларнинг олдини олиш ҳамда уларни бартараф этиш воситалари ва усуллари",
      describe: "Техника фанлари Ҳарбий фанлар Кимё фанлари",
    },
    ru: {
      label:
        "Гражданская защита. Средства и способы предотвращения и ликвидации чрезвычайных ситуаций",
      describe: "Технические науки Химические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "21.02.25",
    branch: {
      code: "21.00.00",
      uz: "Ҳарбий фанлар",
      ru: "Военные науки",
      en: "Military sciences",
    },
    group: {
      code: "21.02.00",
      uz: "Ҳарбий-махсус фанлар",
      ru: "Военно-специальные науки",
      en: "Military-special sciences",
    },
    uz: {
      label: "Ҳарбий электроника, ҳарбий мажмуалар аппаратлари",
      describe: "Физика-математика фанлари Техника фанлари Ҳарбий фанлар",
    },
    ru: {
      label: "Военная электроника, аппаратура комплексов военного назначения",
      describe: "Физико-математические науки Технические науки Военные науки",
    },
    en: {
      label: "",
      describe: "",
    },
  },
  {
    code: "22.00.01",
    branch: {
      code: "22.00.00",
      uz: "Социология фанлари",
      ru: "Социологические науки",
      en: "Sociological sciences",
    },
    uz: {
      label:
        "Социология назарияси, методологияси ва тарихи. Социологик тадқиқотлар усуллари",
      describe: "Социология фанлари",
    },
    ru: {
      label:
        "Теория, методология и история социологии. Методы социологических исследований",
      describe: "Социологические науки",
    },
    en: {
      label:
        "Theory, methodology and history of sociology. Methods of sociological studies",
      describe: "Sociological sciences",
    },
  },
  {
    code: "22.00.02",
    branch: {
      code: "22.00.00",
      uz: "Социология фанлари",
      ru: "Социологические науки",
      en: "Sociological sciences",
    },
    uz: {
      label: "Ижтимоий тузилиш, ижтимоий институтлар ва турмуш тарзи",
      describe: "Социология фанлари",
    },
    ru: {
      label: "Социальная структура, социальные институты и образ жизни",
      describe: "Социологические науки",
    },
    en: {
      label: "Social structure, social institutions and lifestyle",
      describe: "Sociological sciences",
    },
  },
  {
    code: "22.00.03",
    branch: {
      code: "22.00.00",
      uz: "Социология фанлари",
      ru: "Социологические науки",
      en: "Sociological sciences",
    },
    uz: {
      label: "Ижтимоий онг ва ижтимоий жараёнлар социологияси",
      describe: "Социология фанлари",
    },
    ru: {
      label: "Социология общественного сознания и социальных процессов",
      describe: "Социологические науки",
    },
    en: {
      label: "Sociology of public consciousness and social processes",
      describe: "Sociological sciences",
    },
  },
  {
    code: "22.00.04",
    branch: {
      code: "22.00.00",
      uz: "Социология фанлари",
      ru: "Социологические науки",
      en: "Sociological sciences",
    },
    uz: {
      label: "Гендер тадқиқотлари",
      describe: "Социология фанлари",
    },
    ru: {
      label: "Гендерные исследования",
      describe: "Социологические науки",
    },
    en: {
      label: "Gender studies",
      describe: "Sociological sciences",
    },
  },
  {
    code: "22.00.05",
    branch: {
      code: "22.00.00",
      uz: "Социология фанлари",
      ru: "Социологические науки",
      en: "Sociological sciences",
    },
    uz: {
      label: "Давлат сиёсати ва бошқаруви социологияси",
      describe: "Социология фанлари",
    },
    ru: {
      label: "Социология государственной политики и управления",
      describe: "Социологические науки",
    },
    en: {
      label:
        "Sociology of public policy and public administration science, group of specialities. which the scientific",
      describe: "Sociological sciences",
    },
  },
  {
    code: "23.00.01",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label:
        "Сиёсат назарияси ва фалсафаси. Сиёсий таълимотлар тарихи ва методологияси",
      describe: "Фалсафа фанлари Сиёсий фанлар",
    },
    ru: {
      label:
        "Теория и философия политики. История и методология политических учений",
      describe: "Политические науки Философские науки",
    },
    en: {
      label:
        "Theory and philosophy of politics. History and methodology of political studies",
      describe: "Philosophical sciences Political sciences",
    },
  },
  {
    code: "23.00.02",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label: "Сиёсий институтлар, жараёнлар ва технологиялар",
      describe: "Сиёсий фанлар",
    },
    ru: {
      label: "Политические институты, процессы и технологии",
      describe: "Политические науки",
    },
    en: {
      label: "Political institutes, processes and technologies",
      describe: "Political sciences",
    },
  },
  {
    code: "23.00.03",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label: "Сиёсий маданият ва мафкура",
      describe: "Фалсафа фанлари Сиёсий фанлар",
    },
    ru: {
      label: "Политическая культура и идеология",
      describe: "Политические науки Философские науки",
    },
    en: {
      label: "Political culture and ideology",
      describe: "Philosophical sciences Political sciences",
    },
  },
  {
    code: "23.00.04",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label:
        "Халқаро муносабатлар, жаҳон ва минтақа тараққиётининг сиёсий муаммолари",
      describe: "Сиёсий фанлар",
    },
    ru: {
      label:
        "Политические проблемы международных отношений, глобального и регионального развития",
      describe: "Политические науки",
    },
    en: {
      label:
        "Political issues of international relations, global and regional development",
      describe: "Political sciences",
    },
  },
  {
    code: "23.00.05",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label:
        "Миллий хавфсизлик муаммоларининг тизимли таҳлили ва прогнозлаштириш",
      describe:
        "Иқтисодиёт фанлари Психология фанлари Социология фанлари Юридик фанлар Сиёсий фанлар",
    },
    ru: {
      label:
        "Системный анализ и прогнозирование проблем национальной безопасности",
      describe:
        "Психологические науки Социологические науки Экономические науки Политические науки Юридические науки",
    },
    en: {
      label:
        "The system analysis and prognosis of national security problems Law",
      describe:
        "Psychological sciences Sociological sciences Political sciences Economic sciences",
    },
  },
  {
    code: "23.00.06",
    branch: {
      code: "23.00.00",
      uz: "Сиёсий фанлар",
      ru: "Политические науки",
      en: "Political sciences",
    },
    uz: {
      label: "Давлат сиёсати ва бошқаруви асослари",
      describe: "Сиёсий фанлар",
    },
    ru: {
      label: "Основы государственной политики и управления",
      describe: "Политические науки",
    },
    en: {
      label:
        "Public policy and public administration foundations science, group of specialities. which the scientific",
      describe: "Political sciences",
    },
  },
  {
    code: "24.00.01",
    branch: {
      code: "24.00.00",
      uz: "Исломшунослик фанлари",
      ru: "Исламоведение",
      en: "Islamic sciences",
    },
    uz: {
      label: "Ислом тарихи ва манбашунослиги",
      describe: "Исломшунослик фанлари Тарих фанлари",
    },
    ru: {
      label: "История и источниковедение ислама",
      describe: "Исторические науки Исламоведение",
    },
    en: {
      label: "History and source study of Islam",
      describe: "Historical sciences Islamic sciences",
    },
  },
  {
    code: "24.00.02",
    branch: {
      code: "24.00.00",
      uz: "Исломшунослик фанлари",
      ru: "Исламоведение",
      en: "Islamic sciences",
    },
    uz: {
      label: "Қуръоншунослик. Ҳадисшунослик",
      describe:
        "Исломшунослик фанлари Филология фанлари Фалсафа фанлари Тарих фанлари",
    },
    ru: {
      label: "Корановедение. Хадисоведение",
      describe:
        "Филологические науки Исторические науки Философские науки Исламоведение",
    },
    en: {
      label: "Koran studies. Hadith studies",
      describe:
        "Philosophical sciences Philological sciences Historical sciences Islamic sciences",
    },
  },
  {
    code: "24.00.03",
    branch: {
      code: "24.00.00",
      uz: "Исломшунослик фанлари",
      ru: "Исламоведение",
      en: "Islamic sciences",
    },
    uz: {
      label: "Фиқҳ, калом илми. Илоҳиёт",
      describe:
        "Исломшунослик фанлари Филология фанлари Фалсафа фанлари Тарих фанлари",
    },
    ru: {
      label: "Учение фикха и калама. Теология",
      describe:
        "Филологические науки Исторические науки Философские науки Исламоведение",
    },
    en: {
      label: "Science of Fikh and Kalom. Theology",
      describe:
        "Philosophical sciences Philological sciences Historical sciences Islamic sciences",
    },
  },
  {
    code: "24.00.04",
    branch: {
      code: "24.00.00",
      uz: "Исломшунослик фанлари",
      ru: "Исламоведение",
      en: "Islamic sciences",
    },
    uz: {
      label: "Мумтоз шарқ адабиёти ва манбашунослиги",
      describe: "Исломшунослик фанлари Филология фанлари",
    },
    ru: {
      label: "Восточная классическая литература и источниковедение",
      describe: "Филологические науки Исламоведение",
    },
    en: {
      label: "Eastern classical literature and source study",
      describe: "Philological sciences Islamic sciences",
    },
  },
];
module.exports = specialties;
