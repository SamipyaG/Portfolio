const Project = require('../models/Project');

// GET /api/projects — public
const getProjects = async (req, res, next) => {
  try {
    const { featured, category } = req.query;
    const filter = {};

    if (featured === 'true') filter.featured = true;
    if (category) filter.category = category;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id — public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects — admin only
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id — admin only
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id — admin only
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
