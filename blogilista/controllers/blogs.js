const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { request } = require('express')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  if (body.title === undefined && body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
