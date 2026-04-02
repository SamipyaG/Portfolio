const ContactMessage = require('../models/ContactMessage');

// POST /api/contact — public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
    });

    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id: newMessage._id },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact — admin only
const getMessages = async (req, res, next) => {
  try {
    const { unread } = req.query;
    const filter = unread === 'true' ? { isRead: false } : {};

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount: await ContactMessage.countDocuments({ isRead: false }),
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/contact/:id/read — admin only
const markAsRead = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!msg) {
      const err = new Error('Message not found');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contact/:id — admin only
const deleteMessage = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) {
      const err = new Error('Message not found');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getMessages, markAsRead, deleteMessage };
