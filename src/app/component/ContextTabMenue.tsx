import { Delete, Pen } from "lucide-react";
import { Tab } from "../types/interFaces";
import { motion } from 'framer-motion';

export function ContextTabMenue({
  position,
  tab,
  closeMenu,
}: {
  position: { x: number; y: number };
  tab: Tab;
  closeMenu: () => void;
}) {
  return (
    <motion.div
      className="context-menu absolute bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm z-50 w-44"
      style={{ top: position.y, left: position.x }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="font-semibold mb-2 flex gap-5 items-center justify-between  text-gray-700 dark:text-gray-200 truncate px-2 border-b pb-1">
        {tab.title}
        <Delete
          className=" w-full bold  px-3 py-1.5  rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition"
          onClick={() => {
            closeMenu();
          }}
        >delete</Delete>
      </p>
      <button
        onClick={() => {
          closeMenu();
        }}
        className="block w-full text-left px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
      >
        <Pen />
      </button>

    </motion.div>
  );
}