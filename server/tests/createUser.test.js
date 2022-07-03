const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user.model");

describe("when there is initially one user in the db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      first_name: "Example",
      surname: "User",
      email: "user@example.com",
      password: passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with a fresh user", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      first_name: "Steven",
      surname: "Rockett",
      email: "steven@mail.com",
      password: "example123",
    };

    await api
      .post("/api/users/register")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const emails = usersAtEnd.map((u) => u.email);
    expect(emails).toContain(newUser.email);
  });

  test("creation fails with proper status code and message if email is already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      first_name: "Example",
      surname: "User",
      email: "user@example.com",
      password: "example123",
    };

    const result = await api
      .post("/api/users/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("email must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
