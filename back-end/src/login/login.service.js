const knex = require("../db/connection");

function read(logindata) {
  return knex("user")
    .select("*")
    .where({ email: logindata.email, password: logindata.password })
    .first();
}

module.exports = {
  read,
};
