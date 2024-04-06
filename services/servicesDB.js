const { User } = require('../models/userModel');

/**
 * function to return all users
 * @param {null}
 * @returns {Array} - return array of users
 */

const getAllUsers = () => User.find();

/**
 * function to return on user
 * @param {string} id - user id
 * @returns {object} - Return user's object
 */

const getOneUser = async (id) => {
  const res = await User.findById(id);
  return res;
};

/**
 * function to delete one user
 * @param {string} id
 * @returns {undefined}
 */

const removeUser = async (id) => {
  await User.findByIdAndDelete(id);
};

/**
 * function to update user data
 * @param {string} id
 * @param {string} id
 * @returns {object} - Return updated user
 */

const refreshUser = async (id, fields) => {
  const updatedUser = await User.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  });
  return updatedUser;
};

/**
 * function to create new user
 * @param {object} userDetails
 * @returns {object} - Return created user's object
 */

const createUser = async (userDetails) => {
  const user = await User.create(userDetails);

  user.password = undefined;

  return user;
};

module.exports = {
  getAllUsers,
  getOneUser,
  removeUser,
  refreshUser,
  createUser,
};
