const express = require('express');
const { param, body } = require('express-validator');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const skillValidation = [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('category').optional().isIn(['backend', 'frontend', 'database', 'devops', 'qa', 'other']),
];
const idVal = [param('id').isMongoId().withMessage('Invalid ID')];

router.get('/', getSkills);
router.post('/', protect, skillValidation, validate, createSkill);
router.put('/:id', protect, idVal, validate, updateSkill);
router.delete('/:id', protect, idVal, validate, deleteSkill);

module.exports = router;
