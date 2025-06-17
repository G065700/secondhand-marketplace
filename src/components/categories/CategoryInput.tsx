interface CategoryInputProps {
  label: string;
  selected?: boolean;
  id: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  label,
  selected,
  id,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-cyan-500
        transition
        cursor-pointer
        ${selected ? 'border-cyan-500' : 'border-neutral-300'}
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
