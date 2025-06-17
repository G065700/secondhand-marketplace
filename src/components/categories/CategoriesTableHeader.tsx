const CategoriesTableHeader = () => {
  return (
    <p>
      <span className="inline-block w-[50px] bg-black text-white text-center p-2">
        순서
      </span>
      <span className="inline-block w-[calc(100%_-_50px)] bg-black text-white p-2">
        카테고리
      </span>
    </p>
  );
};

export default CategoriesTableHeader;
