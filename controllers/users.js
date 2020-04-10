const User = require("../models/user");
const fs = require("fs");

module.exports = {
  index,
};

function index(req, res, next) {
  console.log("hi users");
}
