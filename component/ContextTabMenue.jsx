import { motion } from "framer-motion";

export default function ContextTabMenue({ position, tab, closeMenu }) {
  return (
    <motion.div
      className="context-menu absolute bg-white shadow-lg rounded-lg border p-2 text-sm z-50 w-44"
      style={{ top: position.y, left: position.x }}
      initial={{ opacity: 0, y: -15, scaleY: 0.8 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <p className="font-semibold mb-2 text-gray-700 truncate">{tab.title}</p>
      <button className="block w-full text-left px-3 py-1 rounded-md hover:bg-gray-100">
        ✏ Edit
      </button>
      <button className="block w-full text-left px-3 py-1 rounded-md hover:bg-red-100 text-red-500">
        🗑 Delete
      </button>
    </motion.div>
  );
}
