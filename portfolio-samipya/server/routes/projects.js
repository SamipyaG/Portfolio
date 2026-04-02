const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }),
  body('techStack').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('category').optional().isIn(['fullstack', 'backend', 'frontend', 'automation', 'other']),
  body('githubUrl').optional().isURL().withMessage('Invalid GitHub URL'),
  body('liveUrl').optional().isURL().withMessage('Invalid live URL'),
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid project ID'),
];

router.get('/', getProjects);
router.get('/:id', idValidation, validate, getProjectById);
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, idValidation, projectValidation, validate, updateProject);
router.delete('/:id', protect, idValidation, validate, deleteProject);

module.exports = router;
