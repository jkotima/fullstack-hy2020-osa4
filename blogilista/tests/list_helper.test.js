const listHelper = require('../utils/list_helper')
const testlist = [
  {
    _id: '1',
    title: 'qwe',
    author: 'jaaboldi',
    url: 'qwe.com',
    likes: 10,
    __v: 0
  },
  {
    _id: '2',
    title: 'asd',
    author: 'kuuboldi',
    url: 'asd.com',
    likes: 5,
    __v: 0
  },
  {
    _id: '3',
    title: 'zxc',
    author: 'kuuboldi',
    url: 'zxc.com',
    likes: 3,
    __v: 0
  },
  {
    _id: '4',
    title: 'jee',
    author: 'ramboldi',
    url: 'jee.com',
    likes: 123,
    __v: 0
  }
]

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
  test('return null if empty list', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  test('return blog with most likes', () => {
    expect(listHelper.favoriteBlog(testlist)).toEqual(testlist[3])
  })
})

describe('most blogs', () => {
  test('return null if empty list', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('correct author', () => {
    expect(listHelper.mostBlogs(testlist).author).toEqual('kuuboldi')
  })

  test('correct number of blogs', () => {
    expect(listHelper.mostBlogs(testlist).blogs).toEqual(2)
  })

})
