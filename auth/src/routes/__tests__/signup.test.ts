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
