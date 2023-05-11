/** Item in a shopping cart. */

const { NotFoundError } = require("./expressError");
const db = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    db.items.push(this);
  }

  /** Return all items. */

  static findAll() {
    return db.items;
  }

  /** Update found item with matching name to data. */

  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) throw new NotFoundError();

    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  /** Find & return item with matching name. */

  static find(name) {
    const foundItem = db.items.find(v => v.name === name);
    if (foundItem === undefined) throw new NotFoundError();
    return foundItem;
  }

  /** Remove item with matching id. */

  static remove(name) {
    let foundIdx = db.items.findIndex(v => v.name === name);
    if (foundIdx === -1) throw new NotFoundError();

    db.items.splice(foundIdx, 1);
  }
}

module.exports = Item;
