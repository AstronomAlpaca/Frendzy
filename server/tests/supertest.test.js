const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

// api, AKA request
const api = supertest(app);
test("this route works", async () => {
  await api.get("/api/users/").expect(200);
});

// test("there are two notes", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body).toHaveLength(2);
// });

// test("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body[0].content).toBe("HTML is easy");
// });

afterAll(() => {
  mongoose.connection.close();
});
