const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
  submitContact,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

const idValidation = [param('id').isMongoId().withMessage('Invalid message ID')];

router.post('/', contactValidation, validate, submitContact);

// Admin-only routes
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, idValidation, validate, markAsRead);
router.delete('/:id', protect, idValidation, validate, deleteMessage);

module.exports = router;
