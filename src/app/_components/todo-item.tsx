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
    <li>
      <input
        type="checkbox"
        name={text}
        id={text}
        checked={completed}
        onClick={toggleFunc}
      />
      <label htmlFor={text}>{text}</label>
    </li>
  );
};
