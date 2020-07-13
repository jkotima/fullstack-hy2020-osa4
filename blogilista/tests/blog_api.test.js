const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('when there is initially some blogs saved', () => {
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

  test('a returned blog has a field called \'id\'', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id).toBeDefined()
  })


  test('a specific blog(object) is within the returned blogs', async () => {
    let blogsAtEnd = await helper.blogsInDb()

    blogsAtEnd = blogsAtEnd.map(r => {
      let { id, ...rest } = r
      return rest
    })

    expect(blogsAtEnd).toContainEqual(helper.initialBlogs[0])
  })
})
describe('addition of a new blog', () => {
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

  test('if likes-field in POST undefined, it should be initialized as zero', async () => {
    const blogWithoutLikes = {
      title: 'The Sad Blog',
      author: 'The Sad Blogger',
      url: 'sad.blog',
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 2)

    blogsAtEnd = blogsAtEnd.map(r => {
      let { id, ...rest } = r
      return rest
    })

    expect(blogsAtEnd).toContainEqual(Object.assign(blogWithoutLikes, { likes: 0 } ))
  })

  test('if both title and url in POST undefined, should return 400 Bad Request', async () => {
    const blogWithoutTitleAndUrl = {
      author: 'The Mysterious Blogger',
      likes: 123
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitleAndUrl)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('if id is valid, succeeds with status code 204 and blog is removed from db', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    let blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('update blog', () => {
  test('increasing likes by one works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeUpdated = blogsAtStart[0]

    const updatedBlog = {
      ...blogToBeUpdated,
      likes: blogToBeUpdated.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogToBeUpdated.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})