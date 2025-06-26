// __tests__/unit/postModel.test.js
import Post from "../../models/Post.js";

describe("Post model unit test", () => {
  it("should create a post instance with correct data", () => {
    const post = new Post({ title: "Test Title", content: "Test Content" });
    expect(post.title).toBe("Test Title");
    expect(post.content).toBe("Test Content");
  });

  it("should be invalid without a title", () => {
    const post = new Post({ content: "Only content" });
    const err = post.validateSync();
    expect(err.errors.title).toBeDefined();
  });
});
