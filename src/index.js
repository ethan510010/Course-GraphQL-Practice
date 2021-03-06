import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
// Type definitions (Schema) 
// ! means not allowed null

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query, 
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => console.log('Server is running on localhost:4000'))