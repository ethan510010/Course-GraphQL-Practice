// 綁定關係用的
const Post = {
  author: (parent, args, ctx, info) => {
    // 對於 author 來說這邊的 parent 其實就是 Post，所以 parent 裡面可以取到 Post 裡面的屬性
    // ex: title, body, author, published
    return ctx.db.users.find((user) => {
      return user.id === parent.author
    })
  },
  comments: (parent, args, ctx, info) => {
    return ctx.db.comments.filter((comment) => {
      return comment.post === parent.id
    })
  }
}

export default Post;

