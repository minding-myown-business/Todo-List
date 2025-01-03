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
    <li className={completed ? "text-justify line-through" : "text-justify"}>
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
