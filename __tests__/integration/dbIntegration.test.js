// __tests__/integration/mongoIntegration.test.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
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

test("Should insert a post into collection", async () => {
  const post = new Post({ title: "Integration", content: "In-memory test" });
  const saved = await post.save();
  expect(saved._id).toBeDefined();
});
