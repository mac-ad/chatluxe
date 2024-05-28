const Tag = ({ name }: { name: string }) => {
  return (
    <div className="border rounded-full px-4 py-1 dark:border-none  dark:bg-[#364249] dark:text-[#ddd] cursor-pointer ">
      {name}
    </div>
  );
};

export default Tag;
