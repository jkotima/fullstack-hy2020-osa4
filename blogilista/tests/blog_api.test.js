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

afterAll(() => {
  mongoose.connection.close()
})