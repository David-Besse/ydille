import { motion } from "framer-motion";
import { ScrollLink } from "./ScrollLink";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: 400 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: 800 },
    },
  },
};

interface MenuItemProps {
  menuItem: {
    menuName: string;
    menuId: string;
  };
}

export const MenuItem = ({ menuItem }: MenuItemProps) => {
  return (
    <motion.li
      variants={variants}
      className="list-none mb-5 flex items-center justify-end cursor-pointer hover:bg-slate-200 hover:rounded-md hover:p-1"
    >
      <ScrollLink href={menuItem.menuId} className="text-lg font-semibold">
        {menuItem.menuName}
      </ScrollLink>
    </motion.li>
  );
};
