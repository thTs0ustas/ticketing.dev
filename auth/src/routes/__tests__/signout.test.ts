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
  const response = await request(app)
    .get("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
