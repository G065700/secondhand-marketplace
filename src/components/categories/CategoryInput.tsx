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
        hover:border-teal-500
        transition
        cursor-pointer
        ${selected ? 'border-teal-500' : 'border-neutral-200'}
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
