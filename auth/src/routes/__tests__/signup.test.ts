import request from "supertest";
import { app } from "../../app";

it("Should receive a status of 201 after a post request in '/signup' route.", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);
});

it("Should receive a status of 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test",
      password: "test",
    })
    .expect(400);
});

it("Should receive a status of 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "t",
    })
    .expect(400);
});

it("Should receive a status of 400 with no provided body.", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("Should not signup with the same email.", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(400);
});

it("Should set a cookie after successful signup.", async () => {
  const response = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "test",
  });

  expect(response.get("Set-Cookie")).toBeDefined();
});
