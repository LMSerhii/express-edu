const Joi = require('joi');
const { joiValidator } = require('./joiValidator');
const { PASSWD_REGEX } = require('../constans/regex');
const { userRoles } = require('../constans/userRols');

const userDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data)
);

const updateUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })

    .validate(data)
);

const signupUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
    })
    .validate(data)
);

const loginUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data)
);

module.exports = {
  userDataValidator,
  updateUserDataValidator,
  signupUserDataValidator,
  loginUserDataValidator,
};
