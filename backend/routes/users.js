const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users');
const {
  validateUpdateAvatar,
  validateGetUserById,
  validateUpdateProfile,
} = require('../middlewares/validations');

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
