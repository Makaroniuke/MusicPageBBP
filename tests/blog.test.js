const mongoose = require("mongoose");
const blogService = require('../services/blogService')

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost:27017/music-page');
});

afterEach(async () => {
await mongoose.connection.close();

});



describe('blog', () => {
  it('should create a new blog', async () => {
    const newBlog = await blogService.addNewBlog(
    '656cd50c9c2d692ff554a1d6', 'test', 'test', 'test', 'test');
    const blog = await blogService.getBlog(newBlog._id);

    expect(blog).toHaveProperty('topic', 'test');
    expect(blog).toHaveProperty('imageUrl', 'test');
    expect(blog).toHaveProperty('filename', 'test');
  });
  it('should NOT create a new blog', async () => {
    const newBlog = await blogService.addNewBlog('656cd50c9c2d692ff554a1d6', 'test', 'test');

    expect(newBlog).toBe(undefined);
  });

  it('should get all blogs', async () => {
    const blogs = await blogService.getAllBlogs();

    expect(blogs.length).toBeGreaterThan(0);
  });

  it('should get blog by id', async () => {
    const blog = await blogService.getBlog('6630bcc43c93f3f3df80a523');

    expect(blog).toHaveProperty('topic', 'test');
  });

  it('should delete blog by id', async () => {
    await blogService.deleteBlog('6630bcc43c93f3f3df80a523');
    const blog = await blogService.getBlog('6630bcc43c93f3f3df80a523');

    expect(blog).toBeNull();
  });


})