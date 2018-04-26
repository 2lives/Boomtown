import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = ` 
     type Item{
          id: ID!
          title: String!
          description: String!
          imageurl: String!
          tags: [String]!
          itemowner: User!
          created: String!
          available: Boolean
          borrower: User
     }

     type User {
          id: ID!
          fullname: String!
          email: String!
          bio: String
          owneditems: [Item]
          borroweditems: [Item]
     }

     type Query {
          items: [Item]
          users: [User]
          item(id: ID!): Item
          user(id: ID!): User
     }

`;
export default makeExecutableSchema({
    typeDefs,
    resolvers
});
