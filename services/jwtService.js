const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils/httpError');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const checkToken = (token) => {
  if (!token) throw new HttpError(401, 'Unauthorized');

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return id;
  } catch (error) {
    throw new HttpError(401, 'Unauthorized');
  }
};

module.exports = { signToken, checkToken };
