import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const NavigationMobileToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    onClick={toggle}
    className="absolute top-[26px] right-[27px] rounded-[50%] bg-transparent"
  >
    <svg width="26" height="26" viewBox="0 0 26 26">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 24 2.5" },
          open: { d: "M 3 23.5 L 23 2.5" },
        }}
      />
      <Path
        d="M 2 12.25 L 24 12.25"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 23.5 L 24 23.5" },
          open: { d: "M 3 2.5 L 23 23.5" },
        }}
      />
    </svg>
  </button>
);
