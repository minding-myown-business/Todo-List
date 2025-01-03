export const TodoItem = ({
  text,
  completed,
  toggleFunc,
}: {
  text: string;
  completed: boolean;
  toggleFunc: () => void;
}) => {
  return (
    <li
      className={
        completed
          ? "my-1 flex cursor-pointer items-center gap-2 rounded-md border p-2 text-justify line-through hover:bg-gray-50"
          : "my-1 flex cursor-pointer items-center gap-2 rounded-md border bg-gray-50 p-2 text-justify text-gray-500 opacity-75 hover:bg-gray-50"
      }
    >
      <input
        type="checkbox"
        name={text}
        id={text}
        checked={completed}
        onChange={toggleFunc}
      />
      <label htmlFor={text}>{text}</label>
    </li>
  );
};
