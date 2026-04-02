const Experience = require('../models/Experience');

const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) { next(error); }
};

const createExperience = async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (error) { next(error); }
};

const updateExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) { const e = new Error('Experience not found'); e.statusCode = 404; return next(e); }
    res.status(200).json({ success: true, data: exp });
  } catch (error) { next(error); }
};

const deleteExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) { const e = new Error('Experience not found'); e.statusCode = 404; return next(e); }
    res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) { next(error); }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
