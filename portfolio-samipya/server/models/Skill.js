const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['backend', 'frontend', 'database', 'devops', 'qa', 'other'],
      default: 'other',
    },
    // Highlighted skills get a large feature card on the portfolio
    // Non-highlighted appear as simple tags in "Also know" section
    isHighlight: { type: Boolean, default: false },
    // Short description shown only on highlight cards
    description: { type: String, default: '', trim: true },
    // Related sub-technologies shown as tags inside highlight card
    relatedTech: { type: [String], default: [] },
    // Icon key used in frontend (node, react, mongodb, docker, kubernetes, etc.)
    iconKey: { type: String, default: 'code', trim: true },
    // Accent color hex for the card glow / border
    color: { type: String, default: '#4f8ef7' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ isHighlight: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
