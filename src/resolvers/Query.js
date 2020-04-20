const Query = {
  greeting: (parent, args, ctx, info) => {
    if (args) {
      console.log(args)
      return `hello, ${args.name}, you are ${args.age} years old`;
    } else {
      return `hello`;
    }
  },
  // key 要與上面 Query 裡面的 key 一致，再去實作裡面的內容
  add: (_, args) => {
    const { numbers } = args;
    if (numbers.length > 0) {
      // let result = 0;
      // for (let index = 0; index < numbers.length; index++) {
      //   result += numbers[index];
      // }
      // return result;
      // 上面的 code 用 reduce 改寫
      return numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    } else {
      return 0
    }
  },
  grades: (parent, args, ctx, info) => {
    return [99, 90, 93]
  },
  users: (parent, args, ctx, info) => {
    const { query } = args;
    const users = ctx.db.users;

    return users.filter((user) => {
      return user.name.includes(query);
    })
  },
  posts: (parent, args, ctx, info) => {
    
    const posts = ctx.db.posts;

    return posts.filter((post) => {
      return post.title.includes(args.query) || post.body.includes(args.query);
    })
  },
  comments: (parent, args, ctx, info) => {
    return ctx.db.comments;
  }
}

export default Query;