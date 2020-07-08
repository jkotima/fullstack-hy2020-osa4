var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => max.likes > blog.likes
      ? max
      : blog
    )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogCountByAuthor = _.countBy(blogs, 'author')
  const authorWithMostBlogs = Object.keys(blogCountByAuthor).reduce((a, b) =>
    blogCountByAuthor[a] > blogCountByAuthor[b] ? a : b
  )

  return {
    author: authorWithMostBlogs,
    blogs: blogCountByAuthor[authorWithMostBlogs]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}