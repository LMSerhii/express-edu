const fs = require('fs/promises');
const { HttpError } = require('./httpError');

const customWriteFile = async (filename, data) => {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 4));
  } catch (error) {
    throw new HttpError(500, 'Server error', 'Can not write file');
  }
};

module.exports = { customWriteFile };
