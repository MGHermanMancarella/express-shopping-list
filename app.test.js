"use strict";

const request = require("supertest");

const app = require("./app");
const list = require("./fakeDb");
let ITEM_LIST = list["items"];

const pickles = { "name": "pickles", "price": 45.99 };
const leeks = { "name": "leeks", "price": 6.99 };

beforeEach(function () {
  ITEM_LIST.push(pickles);
});

afterEach(function () {
  ITEM_LIST = [];
});
// end setup


/** GET items list and returns `items: [{ "name": "pickles", "price": 45.99 }]` */

describe("GET /items", function () {
  it("Gets our shopping list", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ "items": [pickles, pickles] });
  });
});
// end

/** GET /items/:name] - return data about one item: `{ "name": "pickles", "price": 45.99 }` */

describe("GET /items/:name", function () {
  it("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${pickles.name}`);

    expect(resp.body).toEqual({ "name": "pickles", "price": 45.99 });
  });

  it("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/${leeks.name}`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** POST /items/:name - create item from data; return `{ "name": "leeks", "price": 6.99 }` */

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send(
        { "name": "leeks", "price": 6.99 }
      );
    expect(resp.statusCode).toEqual(200);

    expect(resp.body).toEqual({
      "added": {
        "name": "leeks",
        "price": 6.99
      }
    });
  });
});
// end

/** PATCH /items/:name - update item; return `{ "name": "leeks", "price": 6.99 }` */

describe("PATCH /items/:name", function () {
  it("Updates a single cat", async function () {
    const resp = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({
        "name": "Sweet and Sour pickles",
        "price": 76.99
      });

    expect(resp.body).toEqual({
      "oldItem":
      {
        "name": "pickles",
        "price": 45.99
      },
      "updated": {
        "name": "Sweet and Sour pickles",
        "price": 76.99
      }
    });
  });

  it("Responds with 400 if price not specified", async function () {
    const resp = await request(app)
      .patch(`/items/chips`)
      .send({
        "name": "Sweet and Sour pickle chips",
        "price": .99
      });
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function () {
  it("Deletes a single a item", async function () {
    const resp = await request(app)
      .delete(`/items/${pickles.name}`);

    console.log(ITEM_LIST);
    console.log(resp.body);
    console.log(pickles.name);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(resp.statusCode).toEqual(200);


  });
});
// end;
