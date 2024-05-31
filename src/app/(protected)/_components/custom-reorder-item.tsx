import { Reorder } from "framer-motion";
import { ReorderIcon } from "./reorder-icon";
import { cn } from "@/lib/utils";

interface Props {
  item: {
    dishType: { id: string; name: string; order: number };
    dishes: { id: string; name: string; price: number; description: string }[];
  };
  index: number;
  isInactive: boolean;
}

export const CustomReorderItem = ({ item, index, isInactive }: Props) => {
  return (
    <Reorder.Item
      id={item.dishType.name}
      value={item}
      className={cn(
        `min-w-[250px] w-fit h-[50px] flex items-center justify-center rounded-lg border shadow-sm hover:bg-slate-100 hover:border-2 hover:shadow-lg px-4 gap-2`,
        {
          hidden: isInactive,
        }
      )}
    >
      <ReorderIcon />
      <p className="w-full text-sm text-center flex justify-between font-semibold p-1 gap-2 cursor-default">
        <span className="h-fit">{index}</span>{" "}
        <span>{item.dishType.name.toUpperCase()}</span>
      </p>
    </Reorder.Item>
  );
};
