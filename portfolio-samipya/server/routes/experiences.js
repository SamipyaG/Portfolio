const express = require('express');
const { param, body } = require('express-validator');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const expValidation = [
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('period').trim().notEmpty().withMessage('Period is required'),
];
const idVal = [param('id').isMongoId().withMessage('Invalid ID')];

router.get('/', getExperiences);
router.post('/', protect, expValidation, validate, createExperience);
router.put('/:id', protect, idVal, validate, updateExperience);
router.delete('/:id', protect, idVal, validate, deleteExperience);

module.exports = router;
