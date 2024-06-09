import { Button } from "@nextui-org/button";

const Tag = ({ name }: { name: string }) => {
  return (
    // <div className="border rounded-full px-4 py-1 dark:border-none  dark:bg-[#364249] dark:text-[#ddd] cursor-pointer ">
    //   {name}
    // </div>
    <Button className="rounded-full">{name}</Button>
  );
};

export default Tag;
