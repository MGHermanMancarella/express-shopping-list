process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

const db = require("../fakeDb");

const testItem = { name: "silly", price: 200 };

beforeEach(function () {
  db.items.push({ ...testItem });
});

afterEach(function () {
  db.items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    expect(response.body).toEqual({ items: [testItem] });
  });
});


/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${testItem.name}`);
    expect(response.body).toEqual({ item: testItem });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/not-there`);
    expect(response.statusCode).toEqual(404);
  });
});


/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "Taco", price: 0 });
    expect(response.body).toEqual({ item: { name: "Taco", price: 0 } });
  });

  test("Responds with 400 if empty body", async function () {
    const response = await request(app)
      .post(`/items`)
      .send();
    expect(response.statusCode).toEqual(400);
  });
});


/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send({ name: "Troll" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ item: { name: "Troll" } });
  });

  test("Responds with 400 if empty body", async function () {
    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send();
    expect(response.statusCode).toEqual(400);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app)
      .patch(`/items/0`)
      .send({ name: "Troll" });
    expect(response.statusCode).toEqual(404);
  });
});


/** DELETE /items/[name] - delete item,
 *  return `{message: "item deleted"}` */

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/silly`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
