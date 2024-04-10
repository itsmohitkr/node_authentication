const knex = require("../db/connection");

function create(signupData) {
  return knex("user")
    .insert(signupData)
    .returning("*")
    .then((created) => created[0]);
}

module.exports = {
  create,
};
