import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItems = [
  {
    menuName: "Accueil",
    menuId: "#hero",
  },
  {
    menuName: "Galerie",
    menuId: "#gallery",
  },
  {
    menuName: "Contact",
    menuId: "#contact",
  },
  {
    menuName: "Carte du restaurant",
    menuId: "#menucard",
  },
];

export const NavigationMobileMenu = ({ toggle }: { toggle: () => void }) => (
  <motion.ul variants={variants} className="p-6 absolute top-[100px] w-[230px]">
    {menuItems.map((menuItem) => (
      <MenuItem key={menuItem.menuName} menuItem={menuItem} toggle={toggle} />
    ))}
  </motion.ul>
);
