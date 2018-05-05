const typeDefs = ` 
     type Item{
          id: ID!
          title: String!
          description: String!
          imageurl: String!
          tags: [String]
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

     type Mutation {
          addItem (
            title: String!
            itemowner: String
            imageurl: String
            tags: String
            created: String
          ): Item
        }

     type Query {
          items: [Item]
          users: [User]
          item(id: ID!): Item
          user(id: ID!): User
     }

`;
export default typeDefs;
