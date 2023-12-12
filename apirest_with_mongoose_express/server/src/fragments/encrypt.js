const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  try {
    const saltRounds = parseInt(process.env.SALT);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return false;
  }
};

exports.comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    return false;
  }
};
