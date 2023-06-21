import Context from "../Context";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    todos: async (parent, args) => await Context.prisma.todo.findMany(),
  },
  Mutation: {
    createTodo: async (
      parent,
      { title, description, dueDate, tomatoes, completed }
    ) => {
      // Create a new todo in your Prisma database
      return prisma.todo.findMany();
    },
    updateTodo: async (
      parent,
      { id, title, description, dueDate, tomatoes, completed }
    ) => {
      // Update a todo in your Prisma database
      return prisma.todo.findMany();
    },
    deleteTodo: async (parent, { id }) => {
      // Delete a todo from your Prisma database
      return prisma.todo.findMany();
    },
  },
};
