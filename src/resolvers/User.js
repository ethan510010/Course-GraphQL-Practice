const User = {
  posts: (parent, args, ctx, info) => {
    return ctx.db.posts.filter((post) => {
      // parent 指的就是 User
      return post.author === parent.id
    })
  },
  comments: (parent, args, ctx, info) => {
    return ctx.db.comments.filter((comment) => {
      // parent 指的是 User ，所以要回傳的 comments 是  comment 的 author 的值 === user 的 id
      return comment.author === parent.id
    })
  }
}

export default User;