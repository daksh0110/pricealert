const bcrypt = require("bcrypt");
const saltRounds = 10;

function encryption(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function decryption(plainPassword, DBpassword) {
  return bcrypt.compareSync(plainPassword, DBpassword);
}

module.exports = { encryption, decryption };
