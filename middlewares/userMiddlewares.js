const { Types } = require('mongoose');
const { User } = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');
const { HttpError } = require('../utils/httpError');
const {
  userDataValidator,
  updateUserDataValidator,
} = require('../utils/userValidators');

const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new HttpError(404, 'User not found..');

  const user = await User.findById(id);

  if (!user) throw new HttpError(404, 'User not found..');

  req.user = user;

  next();
});

const checkUserData = catchAsync(async (req, res, next) => {
  const { value, errors } = userDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data..', errors);

  const userExists = await User.exists({ email: value.email });

  if (userExists) {
    throw new HttpError(409, 'User with that email already exists..');
  }

  req.body = value;

  next();
});

const checkUpdateUserData = (req, res, next) => {
  const { value, errors } = updateUserDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data..', errors);

  if (Object.keys(value).length === 0) {
    throw new HttpError(400, 'Body must have at least one field', errors);
  }

  req.body = value;

  next();
};

module.exports = {
  checkUserId,
  checkUserData,
  checkUpdateUserData,
};
