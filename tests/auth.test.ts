import request from "supertest";
import app from "../src/app";

describe("Auth APIs", () => {
  // signup ====>
  it("should throw error that username is missing", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ password: "testpass" });
    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe("Unprocessable entity");
  });

  it("should throw error that password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "testuser" });
    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe("Unprocessable entity");
  });

  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "testuser", password: "testpass" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe("testuser");
  });

  it("should throw error that user already exists", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "testuser", password: "testpass" });
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toBe("User already exists");
  });

  // login ====>
  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpass" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpass" });
    expect(res.statusCode).toBe(500);
  });
});
