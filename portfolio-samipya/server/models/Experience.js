const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    type: { type: String, default: 'Full-time', trim: true },
    color: { type: String, default: '#4f8ef7' },
    achievements: { type: [String], default: [] },
    tech: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });

module.exports = mongoose.model('Experience', experienceSchema);
