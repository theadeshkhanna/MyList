import request from "supertest";
import * as jwt from "jsonwebtoken";
import app, { prismaClient } from "../app";
import { JWT_SECRET } from "../secrets";

let token: string;
let userId: string;

beforeAll(async () => {
  const user = await prismaClient.user.create({
    data: {
      username: "listuser",
      password: "hashedpassword",
    },
  });
  userId = user.id;

  // Generate token
  token = jwt.sign({ userId: user.id }, JWT_SECRET);
});

describe("List APIs", () => {
  // create ==>
  it("should throw error while creating a new list", async () => {
    const res = await request(app)
      .post("/api/list")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Unprocessable entity");
  });

  it("should create a new list", async () => {
    const res = await request(app)
      .post("/api/list")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "My List" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("My List");
  });

  // get all lists ==>
  it("should get all lists for the user", async () => {
    const res = await request(app)
      .get("/api/list")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // get by id ==>
  it("should get list", async () => {
    const list = await prismaClient.list.create({
      data: { name: "Get List", userId },
    });

    const res = await request(app)
      .get(`/api/list/${list.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(list.id);
  });

  it("should not be able to get list", async () => {
    const listId = "randomStringToMockGetAPIFailure";

    const res = await request(app)
      .get(`/api/list/${listId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List not found");
  });

  // update ==>
  it("should not be able to update list name", async () => {
    const list = await prismaClient.list.create({
      data: { name: "Update List", userId },
    });

    const res = await request(app)
      .put(`/api/list/${list.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Unprocessable entity");
  });

  it("should not be able to update list name", async () => {
    const listId = "randomStringToMockUpdateAPIFailure";

    const res = await request(app)
      .put(`/api/list/${listId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Update List Name" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List not found");
  });

  it("should update list name", async () => {
    const list = await prismaClient.list.create({
      data: { name: "Update List Test", userId },
    });

    const res = await request(app)
      .put(`/api/list/${list.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Update List Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Update List Name");
  });

  // delete ==>
  it("should not be able to delete a list", async () => {
    const listId = "randomStringToMockDeleteAPIFailure";
    const res = await request(app)
      .delete(`/api/list/${listId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List not found");
  });

  it("should delete a list", async () => {
    // Create a list first
    const list = await prismaClient.list.create({
      data: { name: "Delete List", userId },
    });

    const res = await request(app)
      .delete(`/api/list/${list.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("List deleted successfully");
  });
});
