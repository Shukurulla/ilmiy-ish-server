const mongoose = require('mongoose');

const scientificFieldSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    branch: {
      code: { type: String, required: true },
      uz: { type: String, required: true },
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    group: {
      code: String,
      uz: String,
      ru: String,
      en: String,
    },
    name: {
      uz: { type: String, required: true },
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      uz: String,
      ru: String,
      en: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

scientificFieldSchema.index({ 'branch.code': 1 });
scientificFieldSchema.index({ 'group.code': 1 });
scientificFieldSchema.index({ code: 1 });
scientificFieldSchema.index({
  'name.uz': 'text',
  'name.ru': 'text',
  'name.en': 'text',
  'branch.uz': 'text',
  'branch.ru': 'text',
  'branch.en': 'text',
});

module.exports = mongoose.model('ScientificField', scientificFieldSchema);
