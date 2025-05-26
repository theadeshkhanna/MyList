import request from "supertest";
import * as jwt from "jsonwebtoken";
import { Genre } from "@prisma/client";
import { JWT_SECRET } from "../secrets";
import app, { prismaClient } from "../app";

let token: string;
let userId: string;
let listId: string;
let contentId: string;

beforeAll(async () => {
  const user = await prismaClient.user.create({
    data: {
      username: "listitemuser",
      password: "testpass",
    },
  });
  userId = user.id;
  token = jwt.sign({ userId }, JWT_SECRET);

  const content = await prismaClient.content.create({
    data: {
      title: "test movie",
      description: "test movie description",
      genres: [Genre.Action],
      releaseDate: "2025-01-01T00:00:00Z",
      director: "Nordman",
      actors: ["Juliar"],
    },
  });
  contentId = content.id;

  const list = await prismaClient.list.create({
    data: { name: "Test List", userId },
  });
  listId = list.id;
});

describe("List Item APIs", () => {
  // add item to list ==>
  it("should not be able to add item to list", async () => {
    const res = await request(app)
      .post(`/api/list-item/${listId}/items`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Unprocessable entity");
  });

  it("should not be able to add item to list", async () => {
    const res = await request(app)
      .post(`/api/list-item/randomStringToMockCreateAPIFailure/items`)
      .set("Authorization", `Bearer ${token}`)
      .send({ contentId: contentId });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List not found");
  });

  it("should add item to list", async () => {
    const res = await request(app)
      .post(`/api/list-item/${listId}/items`)
      .set("Authorization", `Bearer ${token}`)
      .send({ contentId: contentId });

    expect(res.statusCode).toBe(201);
    expect(res.body.contentId).toBe(contentId);
  });

  it("should not add duplicate item", async () => {
    const res = await request(app)
      .post(`/api/list-item/${listId}/items`)
      .set("Authorization", `Bearer ${token}`)
      .send({ contentId: contentId });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Item already exists in the list");
  });

  // fetch all items of list ==>
  it("should fetch all items in list", async () => {
    const res = await request(app)
      .get(`/api/list-item/${listId}/items`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // remove items of list ==>
  it("should not be able to remove item from list", async () => {
    const item = await prismaClient.listItem.findFirst({
      where: { listId },
    });

    const res = await request(app)
      .delete(
        `/api/list-item/randomStringToMockRemoveAPIFailure/items/${item?.id}`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List not found");
  });

  it("should not be able to remove item from list", async () => {
    const res = await request(app)
      .delete(
        `/api/list-item/${listId}/items/randomStringToMockRemoveAPIFailure`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("List item not found");
  });

  it("should remove item from list", async () => {
    const item = await prismaClient.listItem.findFirst({
      where: { listId },
    });

    const res = await request(app)
      .delete(`/api/list-item/${listId}/items/${item?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item removed from list");
  });
});
