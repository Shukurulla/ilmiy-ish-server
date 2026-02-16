const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const supervisedStudentSchema = new mongoose.Schema({
  fullName: String,
  degree: { type: String, enum: ['PhD', 'DSc', 'candidate', 'doctor'] },
  year: Number,
  dissertationTopic: String,
});

const projectSchema = new mongoose.Schema({
  projectNumber: String,
  title: String,
  startYear: Number,
  endYear: Number,
  role: String,
  fundingOrganization: String,
});

const patentSchema = new mongoose.Schema({
  type: { type: String, enum: ['patent', 'certificate', 'industrial_design'] },
  title: String,
  number: String,
  issueDate: Date,
  file: String,
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ['researcher', 'admin', 'superadmin'],
      default: 'researcher',
    },
    isActive: { type: Boolean, default: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },

    // 4.1 Personal info
    firstName: {
      uz: { type: String, default: '' },
      ru: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    lastName: {
      uz: { type: String, default: '' },
      ru: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    middleName: {
      uz: { type: String, default: '' },
      ru: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    avatar: String,
    dateOfBirth: Date,
    birthPlace: {
      region: String,
      district: String,
    },
    currentPosition: String,
    faculty: String,
    department: String,
    phone: String,

    // 4.2 Scientific qualification
    academicDegree: {
      type: String,
      enum: ['none', 'candidate', 'doctor', 'PhD', 'DSc'],
      default: 'none',
    },
    scientificField: String,
    scientificFieldRef: { type: mongoose.Schema.Types.ObjectId, ref: 'ScientificField' },
    scientificFields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScientificField' }],
    academicTitle: {
      type: String,
      enum: ['none', 'docent', 'professor'],
      default: 'none',
    },
    defenseSpecialty: {
      code: String,
      name: String,
    },
    candidateDefenseYear: Number,
    doctoralDefenseYear: Number,
    researchDirection: String,

    // 4.3 Dissertation topics
    candidateDissertation: {
      topic: { uz: String, ru: String, en: String },
      abstractFile: String,
    },
    doctoralDissertation: {
      topic: { uz: String, ru: String, en: String },
      abstractFile: String,
    },

    // 4.4 Scientific identifiers
    orcid: String,
    scopusAuthorId: String,
    hIndexScopus: { type: Number, default: 0 },
    webOfScienceId: String,
    hIndexWos: { type: Number, default: 0 },
    googleScholarId: String,
    hIndexGoogleScholar: { type: Number, default: 0 },

    // 4.5 Publication stats
    publicationStats: {
      total: { type: Number, default: 0 },
      textbooks: { type: Number, default: 0 },
      manuals: { type: Number, default: 0 },
      monographs: { type: Number, default: 0 },
      republicanArticles: { type: Number, default: 0 },
      foreignArticles: { type: Number, default: 0 },
      scopusTotal: { type: Number, default: 0 },
      scopusQ1: { type: Number, default: 0 },
      scopusQ2: { type: Number, default: 0 },
      scopusQ3: { type: Number, default: 0 },
      scopusQ4: { type: Number, default: 0 },
      scopusConference: { type: Number, default: 0 },
      webOfScience: { type: Number, default: 0 },
      republicanConference: { type: Number, default: 0 },
      internationalConference: { type: Number, default: 0 },
    },

    // 4.6 Supervised students
    supervisedStudents: [supervisedStudentSchema],

    // 4.7 Projects
    projects: [projectSchema],

    // 4.8 Patents
    patents: [patentSchema],

    // 4.9 Additional info
    teachingExperience: Number,
    taughtSubjects: [String],
    publicationLanguages: [String],
    editorialMemberships: [String],
    dissertationCouncils: [String],
    awards: [String],
    additionalAchievements: String,

    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({
  'firstName.uz': 'text',
  'firstName.ru': 'text',
  'firstName.en': 'text',
  'lastName.uz': 'text',
  'lastName.ru': 'text',
  'lastName.en': 'text',
  scientificField: 'text',
  researchDirection: 'text',
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getFullName = function (lang = 'uz') {
  return `${this.lastName[lang] || ''} ${this.firstName[lang] || ''} ${this.middleName[lang] || ''}`.trim();
};

module.exports = mongoose.model('User', userSchema);
