const { catchAsync } = require('../utils/catchAsync');
const servicesDB = require('../services/servicesDB');

const signup = catchAsync(async (req, res) => {
  const { user, token } = await servicesDB.signUser(req.body);

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { user, token } = await servicesDB.loginUser(req.body);

  res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = {
  signup,
  login,
};
