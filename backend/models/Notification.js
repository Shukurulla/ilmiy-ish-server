const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [
        'publication_submitted',
        'publication_approved',
        'publication_revision',
        'publication_rejected',
        'new_publication_review',
        'publication_resubmitted',
      ],
      required: true,
    },
    title: {
      uz: String,
      ru: String,
      en: String,
    },
    message: {
      uz: String,
      ru: String,
      en: String,
    },
    publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },
    isRead: { type: Boolean, default: false },
    comment: String,
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
