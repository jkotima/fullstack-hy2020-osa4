const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'qwe',
    author: 'jaaboldi',
    url: 'qwe.com',
    likes: 10
  },
  {
    title: 'asd',
    author: 'kuuboldi',
    url: 'asd.com',
    likes: 5,
  }
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}