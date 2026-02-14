const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      uz: { type: String, required: true },
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    slug: { type: String, unique: true },
    logo: String,
    address: {
      uz: String,
      ru: String,
      en: String,
    },
    city: String,
    region: String,
    website: String,
    email: String,
    phone: String,
    faculties: [
      {
        name: {
          uz: String,
          ru: String,
          en: String,
        },
        departments: [
          {
            name: {
              uz: String,
              ru: String,
              en: String,
            },
          },
        ],
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

universitySchema.index({ 'name.uz': 'text', 'name.ru': 'text', 'name.en': 'text' });

module.exports = mongoose.model('University', universitySchema);
