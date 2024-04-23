const { checkToken } = require('../services/jwtService');
const { checkUserExists, getOneUser } = require('../services/servicesDB');
const { catchAsync } = require('../utils/catchAsync');
const { HttpError } = require('../utils/httpError');
const {
  signupUserDataValidator,
  loginUserDataValidator,
} = require('../utils/userValidators');

const checkSignupData = catchAsync(async (req, res, next) => {
  const { errors, value } = signupUserDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data', errors);

  const userExists = await checkUserExists({ email: value.email });

  if (userExists) throw new HttpError(409, 'User already exists');

  req.body = value;

  next();
});

const checkLoginData = catchAsync(async (req, res, next) => {
  const { errors, value } = loginUserDataValidator(req.body);

  if (errors) throw new HttpError(401, 'Unauthorized');

  req.body = value;

  next();
});

const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer ') &&
    req.headers.authorization.split(' ')[1];

  const userId = checkToken(token);

  if (!userId) throw new HttpError(401, 'Unauthorized');

  const currentUser = await getOneUser(userId);

  if (!currentUser) throw new HttpError(401, 'Unauthorized');

  req.user = currentUser;

  next();
});

const allowFor =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    next(new HttpError(403, 'You are not allow to perform this action ...'));
  };

module.exports = {
  checkSignupData,
  checkLoginData,
  protect,
  allowFor,
};
