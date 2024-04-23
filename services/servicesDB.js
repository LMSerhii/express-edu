const { userRoles } = require('../constans/userRols');
const { User } = require('../models/userModel');
const { HttpError } = require('../utils/httpError');
const { signToken } = require('./jwtService');

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

const checkUserExists = (filter) => User.exists(filter);

const signUser = async (userDetails) => {
  const user = await User.create({
    ...userDetails,
    role: userRoles.USER,
  });

  const token = signToken(user.id);

  user.password = undefined;

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new HttpError(401, 'Unauthorized');

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw new HttpError(401, 'Unauthorized');

  const token = signToken(user.id);

  user.password = undefined;

  return { user, token };
};

module.exports = {
  getAllUsers,
  getOneUser,
  removeUser,
  refreshUser,
  createUser,
  checkUserExists,
  signUser,
  loginUser,
};
