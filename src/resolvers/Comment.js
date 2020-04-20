const Comment = {
  author: (parent, args, ctx, info) => {
    return ctx.db.users.find((user) => {
      return parent.author === user.id
    })
  },
  post: (parent, args, ctx, info) => {
    return ctx.db.posts.find((post) => {
      return parent.post === post.id
    })
  }
}

export default Comment;