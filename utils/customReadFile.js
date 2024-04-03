const fs = require('fs/promises');
const { HttpError } = require('./httpError');

const customReadFile = async (filename) => {
  try {
    const usersDB = await fs.readFile(filename);
    const users = JSON.parse(usersDB);
    return users;
  } catch (error) {
    throw new HttpError(500, 'Server Error', 'Can not read file');
  }
};

module.exports = { customReadFile };
