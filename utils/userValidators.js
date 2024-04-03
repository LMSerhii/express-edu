const Joi = require('joi');
const { joiValidator } = require('./joiValidator');

const userDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      year: Joi.number()
        .required()
        .min(1900)
        .max(new Date().getFullYear() - 18),
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
    })
    .validate(data)
);

module.exports = {
  userDataValidator,
  updateUserDataValidator,
};
