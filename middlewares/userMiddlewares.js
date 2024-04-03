const fs = require('fs/promises');
const { catchAsync } = require('../utils/catchAsync');
const { HttpError } = require('../utils/httpError');
const { customReadFile } = require('../utils/customReadFile');
const {
  userDataValidator,
  updateUserDataValidator,
} = require('../utils/userValidators');

const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const users = await customReadFile('data.json');

  const currentUser = users.find((user) => user.id === id);

  if (!currentUser) {
    throw new HttpError(404, 'User not found');
  }

  req.user = currentUser;

  next();
});

const checkUserData = (req, res, next) => {
  const { value, errors } = userDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data..', errors);

  req.value = value;

  next();
};

const checkUpdateUserData = (req, res, next) => {
  const { value, errors } = updateUserDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data..', errors);

  if (Object.keys(value).length === 0) {
    throw new HttpError(400, 'Body must have at least one field', errors);
  }

  req.value = value;

  next();
};

module.exports = {
  checkUserId,
  checkUserData,
  checkUpdateUserData,
};
