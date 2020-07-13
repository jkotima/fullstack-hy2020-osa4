const Blog = require('../models/blog')
const User = require('../models/user')

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
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb
}