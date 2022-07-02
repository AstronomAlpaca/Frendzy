const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

// api, AKA request
const api = supertest(app);
test("this route works", async () => {
  await api.get("/api/users/").expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});
