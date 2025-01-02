import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
interface Todo {
  text: string;
  completed: boolean;
  key: string;
}
const todos: Todo[] = [
  {
    text: "Finish todo app",
    completed: false,
    key: "1",
  },
];

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string().min(1), key: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const todo: Todo = {
        text: input.text,
        completed: false,
        key: input.key,
      };
      todos.push(todo);
      return todo;
    }),
  read: publicProcedure.query(() => {
    return todos;
  }),
  updateCompletedStatus: publicProcedure
    .input(z.object({ key: z.string().min(1), completed: z.boolean() }))
    .mutation(async ({ input }) => {
      const todo = todos.find((todo) => todo.key === input.key);
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.completed = input.completed;
      const index = todos.findIndex((todo) => todo.key === input.key);
      todos[index] = todo;
      return todo;
    }),
  updateText: publicProcedure
    .input(z.object({ key: z.string().min(1), text: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const todo = todos.find((todo) => todo.key === input.key);
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.text = input.text;
      const index = todos.findIndex((todo) => todo.key === input.key);
      todos[index] = todo;
      return todo;
    }),
  delete: publicProcedure
    .input(z.object({ key: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const index = todos.findIndex((todo) => todo.key === input.key);
      if (index === -1) {
        throw new Error("Todo not found");
      }
      const todo = todos[index];
      todos.splice(index, 1);
      return todo;
    }),
});
