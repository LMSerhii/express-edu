const { catchAsync } = require('../utils/catchAsync');
const servicesDB = require('../services/servicesDB');

const createUser = catchAsync(async (req, res) => {
  const newUser = await servicesDB.createUser(req.body);

  res.status(201).json({
    user: newUser,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await servicesDB.getAllUsers();

  res.status(200).json({
    users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { user } = req;

  const currentUser = await servicesDB.getOneUser(user.id);

  res.status(200).json({
    user: currentUser,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const updatedUser = await servicesDB.refreshUser(id, fields);

  res.status(200).json({
    user: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  await servicesDB.removeUser(id);

  res.sendStatus(204);
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
