const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('first returned blog has a field called \'id\'', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].id).toBeDefined()
})


/*
test('a specific blog(object) is within the returned blogs', async () => {
  const blogsAtEnd = await helper.blogsInDb()

  // remove id-fields
  const contents = blogsAtEnd.map(r => {
    let { id, ...rest } = r
    return rest
  })

  expect(contents).toContainEqual(helper.initialBlogs[0])
})
*/

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'The New Blog',
    author: 'The New Blogger',
    url: 'new.blog',
    likes: 123
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  blogsAtEnd = blogsAtEnd.map(r => {
    let { id, ...rest } = r
    return rest
  })

  expect(blogsAtEnd).toContainEqual(newBlog)
})



afterAll(() => {
  mongoose.connection.close()
})