"use strict";
const express = require("express");

const items = require("./fakeDb");
const router = express.Router();

//////

/** GET /users: get list of users */
router.get("/", function (req, res) {
  return res.json(items);

});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.post("/", function (req, res) {
  const newItem = req.body;
  items['items'].push(newItem);
  return res.json(items);

});

/////

module.exports = router;
