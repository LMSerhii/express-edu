const { Router } = require('express');

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');

const {
  checkUserId,
  checkUserData,
  checkUpdateUserData,
} = require('../middlewares/userMiddlewares');

// ============= CRUD ===============
/**
 /**=== REST api ===
  * POST         /users
  * GET          /users
  * PATCH(PUT)   /users/<userId>
  *  */

const router = Router();

router.post('/', checkUserData, createUser);

router.get('/', getUsers);

router.get('/:id', checkUserId, getUserById);

router.patch('/:id', checkUserId, checkUpdateUserData, updateUser);

router.delete('/:id', checkUserId, deleteUser);

module.exports = {
  userRouter: router,
};
