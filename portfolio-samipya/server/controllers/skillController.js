const Skill = require('../models/Skill');

const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ isHighlight: -1, order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) { next(error); }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) { next(error); }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) { const e = new Error('Skill not found'); e.statusCode = 404; return next(e); }
    res.status(200).json({ success: true, data: skill });
  } catch (error) { next(error); }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) { const e = new Error('Skill not found'); e.statusCode = 404; return next(e); }
    res.status(200).json({ success: true, message: 'Skill deleted' });
  } catch (error) { next(error); }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
