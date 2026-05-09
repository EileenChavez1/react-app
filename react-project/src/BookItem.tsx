type Props = {
  title: string;
  onRemove: () => void;
};

export default function BookItem({ title, onRemove }: Props) {
  return (
    <li>
      {title}
      <button onClick={onRemove}>Remove</button>
    </li>
  );
}