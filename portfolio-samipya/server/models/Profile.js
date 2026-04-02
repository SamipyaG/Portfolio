const mongoose = require('mongoose');

// Singleton — only one profile document ever exists
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Samipya Ghimire', trim: true },
    title: { type: String, default: 'Full Stack MERN Developer', trim: true },
    tagline: { type: String, default: 'Building Scalable Backend Systems & Modern Web Apps', trim: true },
    bio: {
      type: [String],
      default: [
        "I'm a Full Stack MERN Developer based in Biratnagar, Nepal, with a strong focus on Node.js backend systems. I specialize in building production-grade REST APIs, designing MongoDB schemas for scale, and implementing secure authentication flows.",
        "At G-Mana, I've worn multiple hats — backend developer, QA automation engineer, and production debugger. This breadth gives me a unique ability to see systems holistically and write code that's both maintainable and resilient.",
        "I write clean, modular JavaScript and TypeScript, follow SOLID principles, and believe strongly in code reviews, API documentation, and test coverage as non-negotiable parts of any professional workflow.",
      ],
    },
    photoUrl: { type: String, default: '' },
    email: { type: String, default: 'samipya.ghimire.it@gmail.com', trim: true },
    phone: { type: String, default: '', trim: true },
    location: { type: String, default: 'Biratnagar, Nepal', trim: true },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/samipya-ghimire-30abb7202' },
    github: { type: String, default: 'https://github.com/samipya' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    availability: {
      available: { type: Boolean, default: true },
      message: { type: String, default: 'Available for opportunities' },
    },
    // Quick stats shown in Resume section
    stats: {
      type: [
        {
          value: String,
          label: String,
        },
      ],
      default: [
        { value: '1+', label: 'Year Experience' },
        { value: '5+', label: 'Projects Shipped' },
        { value: 'MERN', label: 'Core Stack' },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
