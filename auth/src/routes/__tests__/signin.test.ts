import request from "supertest";
import { app } from "../../app";

beforeEach(
  async () =>
    await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "test",
    })
);

it("Should have a Set-Cookie header.", async () => {
  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "test",
  });
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("Should signin with the correct credentials.", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(200);
});

it("Should not signin with wrong email.", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@testt.com",
      password: "test",
    })
    .expect(400);
});

it("Should not signin with wrong password.", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "testt",
    })
    .expect(400);
});
