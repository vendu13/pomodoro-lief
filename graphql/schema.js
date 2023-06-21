import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    description: String!
    dueDate: String!
    tomatoes: Int!
  }

  type Mutation {
    createTodo(
      title: String!
      description: String!
      dueDate: String!
      tomatoes: Int!
      completed: Boolean!
    ): Todo!
    updateTodo(
      id: ID!
      title: String!
      description: String!
      dueDate: String!
      tomatoes: Int!
      completed: Boolean!
    ): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
