// Scalar type: String, Boolean, Int, Float, ID (unique)
let users = [
  {
    id: '123',
    name: 'Andrew',
    email: 'a@example.com',
    age: 28
  },
  {
    id: '456',
    name: 'John',
    email: 'john@example.com',
    age: 30
  }
]

let posts = [
  {
    id: '1',
    title: 'article1',
    body: 'content1',
    published: false,
    author: '123',
  },
  {
    id: '2',
    title: 'title2',
    body: 'content2',
    published: true,
    author: '456'
  },
  {
    id: '3',
    title: 'title3',
    body: 'content3',
    published: true,
    author: '456'
  }
];

let comments = [
  {
    id: '1',
    text: 'comment1',
    author: '123',
    post: '1'
  },
  {
    id: '2',
    text: 'comment2',
    author: '456',
    post: '1'
  },
  {
    id: '3',
    text: 'comment3',
    author: '123',
    post: '2'
  },
  {
    id: '4',
    text: 'comment4',
    author: '456',
    post: '3'
  }
]

const db = {
  users,
  posts,
  comments
}

export default db;