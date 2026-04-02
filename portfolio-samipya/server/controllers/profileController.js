const Profile = require('../models/Profile');

// GET /api/profile — public
const getProfile = async (req, res, next) => {
  try {
    // Always return the single profile; create if first time
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// PUT /api/profile — admin only (upsert singleton)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
