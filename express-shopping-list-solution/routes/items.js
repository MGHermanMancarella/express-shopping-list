const express = require("express");

const Item = require("../item");
const { BadRequestError } = require("../expressError");

const router = express.Router();


/** GET / => {items: [{name, price}, ...]} */

router.get("", (req, res, next) => {
  return res.json({ items: Item.findAll() });
});

/** POST / {name, price} => {item: {name, price}} */

router.post("", (req, res, next) => {
  if(req.body === undefined){
    throw new BadRequestError();
  }
  let newItem = new Item(req.body.name, req.body.price);
  return res.json({ item: newItem });
});

/** GET /[name] => {item: {name, price}} */

router.get("/:name", (req, res, next) => {
  let foundItem = Item.find(req.params.name);
  return res.json({ item: foundItem });
});

/** PATCH /[name] => {item: {name, price}} */

router.patch("/:name", (req, res, next) => {
  if(req.body === undefined){
    throw new BadRequestError();
  }
  let foundItem = Item.update(req.params.name, req.body);
  return res.json({ item: foundItem });
});

/** DELETE /[name] => {message: "Removed"} */

router.delete("/:name", (req, res, next) => {
  Item.remove(req.params.name);
  return res.json({ message: "Deleted" });
});

module.exports = router;
