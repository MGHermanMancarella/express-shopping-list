"use strict";
const express = require("express");
const items = require("./fakeDb");
const router = express.Router();
const ITEM_LIST = items["items"];
const { NotFoundError, BadRequestError } = require("./expressError");

/** get shopping list */
router.get("/", function (req, res) {
  debugger;
  return res.json(items);
});

/**  add item to shopping list */
router.post("/", function (req, res) {
  const newItem = req.body;
  if (!(req.body.price)) {
    throw new BadRequestError("must specify a price");
  } else if (!(+req.body.price)) {
    throw new BadRequestError("price must be a number");
  }
  items["items"].push(newItem);

  const response = { added: newItem };
  return res.json(response);
});

/** get single item from shopping list */
router.get("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);

  // return item === undefined ? res.json(item) : new ExpressError
  //TODO: write a middleware function to check if item exists in list
  if (item === undefined) {
    throw new NotFoundError;
  }
  return res.json(item);
});


/** updates data about item on shopping list */
router.patch("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);

  if (item === undefined) {
    throw new NotFoundError;
  } else if (!(req.body.price)) {
    throw new BadRequestError("must specify a price");
  } else if (!(+req.body.price)) {
    throw new BadRequestError("price must be a number");
  }

  let oldItem = item;
  let itemIdx = ITEM_LIST.indexOf(item);

  //reassigning index value to patched data
  ITEM_LIST[itemIdx] = req.body;

  let response = {
    oldItem: oldItem,
    updated: ITEM_LIST[itemIdx]
  };

  return res.json(response);
});


/** deletes item on shopping list */
router.delete("/:name", function (req, res) {
  let item = ITEM_LIST.find((item) => item.name === req.params.name);
  if (item === undefined) {
    throw new NotFoundError("item does not exist");
  }

  let itemIdx = ITEM_LIST.indexOf(item);
  let updatedList = ITEM_LIST.splice(itemIdx, 1);

  let message = { message: "Deleted" };

  return res.json(message);
});


module.exports = router;
