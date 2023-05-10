"use strict";
const express = require("express");

const items = require("./fakeDb");
const router = express.Router();

const ITEM_LIST = items["items"];

//////

/** get shopping list */
router.get("/", function (req, res) {
  debugger;
  return res.json(items);
});

/**  add item to shopping list */
router.post("/", function (req, res) {
  const newItem = req.body;
  items["items"].push(newItem);
  return res.json(items);
});

/** get single item from shopping list */
router.get("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);

  return res.json(item);
});

router.patch("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);

  let oldItem = item;

  let itemIdx = ITEM_LIST.indexOf(item);
  ITEM_LIST[itemIdx] = req.body;
  console.log("item=", ITEM_LIST[itemIdx]);

  let response = { updated: ITEM_LIST[itemIdx] };

  return res.json(response);
});

router.delete("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);

  let itemIdx = ITEM_LIST.indexOf(item);
  let updatedList = ITEM_LIST.splice(itemIdx, 1);

  let message = { message: "Deleted" };

  return res.json(message);
});

/////

module.exports = router;
