import request from "supertest";
import { app } from "../../app";

it("Should have a Set-Cookie header.", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send();

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Should return null as currentUser.", async () => {
  const response = await request(app).get("/api/users/currentuser").send();
  console.log(response.body);

  expect(response.body.currentUser).toBeUndefined();
});
