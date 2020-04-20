import { v4 as uuidv4 } from 'uuid';

const Mutation =  {
  createUser: (parent, args, ctx, info) => {
    const emailTaken = ctx.db.users.some((user) => {
      return user.email === args.data.email;
    });
    
    if (emailTaken) {
      throw new Error('Email taken.');
    }

    const user = {
      id: uuidv4(),
      name: args.data.name,
      email: args.data.email,
      age: args.data.age
    }
    
    ctx.db.users.push(user);

    return user;
  },
  createPost: (parent, args, ctx, info) => {
    const { title, body, published, author } = args.postData;

    const userExists = ctx.db.users.some(user => {
      return user.id === author;
    });

    if (!userExists) {
      throw new Error('User not exists');
    }

    const post = {
      id: uuidv4(),
      title: title,
      body: body,
      published: published,
      author: author
    };

    ctx.db.posts.push(post);

    return post;
  },
  createComment: (parent, args, ctx, info) => {
    const { text, author, post } = args.commetData;

    const userExists = ctx.db.users.some((user) => {
      return user.id === author;
    });

    const postExistsAndPublished = ctx.db.posts.some((eachPost) => {
      return eachPost.id === post && eachPost.published;
    });

    if (!userExists) {
      throw new Error('user not found');
    }

    if (postExistsAndPublished) {
      const newComment = {
        id: uuidv4(),
        text: text,
        author: author,
        post: post
      }
      
      ctx.db.comments.push(newComment);
      
      return newComment;
    }
  },
  updateUser: (parent, args, ctx, info) => {
    const { id, data } = args;
    const user = ctx.db.users.find((user) => user.id === id);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = ctx.db.users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error('Email already taken');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  updatePost: (parent, args, ctx, info) => {
    const { id, data } = args;
    const post = ctx.db.posts.find(post => post.id === id);

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;  
    }
    if (typeof data.body === 'string') {
      post.body = data.body;  
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;  
    }

    return post;
  },
  updateComment: (parent, args, ctx, info) => {
    const { id, data } = args;
    const comment = ctx.db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    return comment;
  },
  deleteUser: (parent, args, ctx, info) => {
    const userIndex = ctx.db.users.findIndex((user) => user.id === args.userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deletedUsers = ctx.db.users.splice(userIndex, 1);

    // 把該 user 底下的 post 移除掉，把被刪掉的 post 底下對應的 comment 也刪掉
    ctx.db.posts = ctx.db.posts.filter((post) => {
      const match = post.author === args.userId;
      if (match) {
        ctx.db.comments = ctx.db.comments.filter((comment) => {
          return comment.post !== post.id;
        })
      }
      return !match;
    })

    ctx.db.comments = ctx.db.comments.filter((comment) => {
      return comment.author !== args.userId;
    })

    return deletedUsers[0];
  },
  deletePost: (parent, args, ctx, info) => {
    const postIndex = ctx.db.posts.findIndex(post => post.id === args.postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    const deletedPosts = ctx.db.posts.splice(postIndex, 1);

    ctx.db.comments = ctx.db.comments.filter((comment) => {
      return comment.post !== args.postId;
    })

    return deletedPosts[0];
  },
  deleteComment: (parent, args, ctx, info) => {
    const commentIndex = ctx.db.comments.findIndex((comment) => comment.id === args.commentId);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    const deleteComments = ctx.db.comments.splice(commentIndex, 1);

    return deleteComments[0];
  }
}

export default Mutation;