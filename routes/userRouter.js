const { Router } = require('express');

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
} = require('../controllers/userControllers');

const {
  checkUserId,
  checkUserData,
  checkUpdateUserData,
} = require('../middlewares/userMiddlewares');
const { protect } = require('../middlewares/authMiddlewares');

// ============= CRUD ===============
/**
 /**=== REST api ===
  * POST         /users
  * GET          /users
  * PATCH(PUT)   /users/<userId>
  *  */

const router = Router();

router.post('/', checkUserData, createUser);

router.get('/me', protect, getMe);

router.get('/', protect, getUsers);

router.get('/:id', protect, checkUserId, getUserById);

router.patch('/:id', protect, checkUserId, checkUpdateUserData, updateUser);

router.delete('/:id', protect, checkUserId, deleteUser);

module.exports = {
  userRouter: router,
};
