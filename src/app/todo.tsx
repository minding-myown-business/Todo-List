import { useState, useEffect } from "react";
import { TodoItem } from "./_components/todo-item";
import { api } from "~/trpc/server";

interface Todo {
  text: string;
  completed: boolean;
  key: string;
}

export const TodoList = () => {
  const newTodo = async (text: string, key: string) => {
    await api.todo.create({ text, key });
    setTodoItems([...todoItems, { text, completed: false, key }]);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await newTodo(newTodoText, crypto.randomUUID());
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const todosList = await api.todo.read();
      setTodoItems(todosList);
    };
    void fetchTodos();
  }, []);

  const [newTodoText, setNewTodoText] = useState<string>("");
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  return (
    <div>
      <div>
        <ul>
          {todoItems.map((item) => (
            <TodoItem
              text={item.text}
              completed={item.completed}
              key={item.key}
              toggleFunc={() => {
                void api.todo.updateCompletedStatus({
                  key: item.key,
                  completed: !item.completed,
                });
              }}
            />
          ))}
        </ul>
      </div>
      <form
        action=""
        method="post"
        className="form-example"
        onSubmit={handleSubmit}
      >
        <div className="form">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Todo item text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};
