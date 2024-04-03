const { v4 } = require('uuid');
const { catchAsync } = require('../utils/catchAsync');
const { customReadFile } = require('../utils/customReadFile');
const { customWriteFile } = require('../utils/customWriteFile');

const createUser = catchAsync(async (req, res) => {
  const { name, year } = req.value;

  const newUser = {
    id: v4(),
    name,
    year,
  };

  // ===== Temporary DB ======

  const users = await customReadFile('data.json');

  users.push(newUser);

  customWriteFile('data.json', users);

  // ====== Temporary DB  ======

  // Send response
  res.status(201).json({
    msg: 'success',
    user: newUser,
  });
});

const getUsers = catchAsync(async (req, res) => {
  // ===== Temporary DB ======

  const users = await customReadFile('data.json');
  // ===== Temporary DB ======

  res.status(200).json({
    msg: 'success',
    users,
  });
});

const getUserById = (req, res) => {
  const { user } = req;

  res.status(200).json({
    msg: 'success',
    user,
  });
};

const updateUserAll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;

  // ===== Temporary DB ======

  const users = await customReadFile('data.json');

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json({
      msg: 'User not found',
    });
  }

  users[index] = { id, name, year };

  customWriteFile('data.json', users);

  // ===== Temporary DB ======

  res.status(200).json({
    msg: 'success',
    user: users[index],
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const users = await customReadFile('data.json');

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json({
      msg: 'User not found',
    });
  }

  users[index] = { ...users[index], ...updates };

  customWriteFile('data.json', users);

  res.status(200).json({
    msg: 'success',
    user: users[index],
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const users = await customReadFile('data.json');

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json({
      msg: 'User not found',
    });
  }

  const { name } = users[index];
  users.splice(index, 1);

  customWriteFile('data.json', users);

  res.status(200).json({
    msg: 'success',
    user: `User ${name} deleted`,
  });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserAll,
  updateUser,
  deleteUser,
};
