const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      _id: '1',
      title: '',
      author: '',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: '',
      author: '',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: '',
      author: '',
      url: '',
      likes: 3,
      __v: 0
    },
    {
      _id: '4',
      title: '',
      author: '',
      url: '',
      likes: 0,
      __v: 0
    }
  ]


  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(biggerList)).toBe(13)
  })
})

describe('favorite blog', () => {

  const testlist = [
    {
      _id: '1',
      title: '',
      author: '',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: '2',
      title: '',
      author: '',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '3',
      title: '',
      author: '',
      url: '',
      likes: 3,
      __v: 0
    },
    {
      _id: '4',
      title: '',
      author: '',
      url: '',
      likes: 123,
      __v: 0
    }
  ]

  test('return null if empty list', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  test('return blog with most likes', () => {
    expect(listHelper.favoriteBlog(testlist)).toEqual(testlist[3])
  })

})