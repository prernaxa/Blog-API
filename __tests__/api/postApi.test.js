// __tests__/api/postRoutes.test.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../../app.js";
import Post from "../../models/Post.js";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Post.deleteMany();
});

test("GET /posts should return empty array", async () => {
  const res = await request(app).get("/posts");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test("POST /posts should create a post", async () => {
  const res = await request(app)
    .post("/posts")
    .send({ title: "New Post", content: "Test content" });

  expect(res.statusCode).toBe(201);
  expect(res.body.title).toBe("New Post");
});

test("PATCH /posts/:id should update a post", async () => {
  const post = await Post.create({ title: "Original", content: "Old" });
  const res = await request(app)
    .patch(`/posts/${post._id}`)
    .send({ content: "Updated" });

  expect(res.body.content).toBe("Updated");
});

test("DELETE /posts/:id should remove a post", async () => {
  const post = await Post.create({ title: "ToDelete", content: "Bye" });
  const res = await request(app).delete(`/posts/${post._id}`);
  expect(res.body.message).toBe("Post deleted");
});
