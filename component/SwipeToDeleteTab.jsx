"use client";

import { motion, useAnimation } from "framer-motion";
import React from "react";

export default function SwipeToDeleteTab({ tab, onDelete, isActive, onClick }) {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      onDelete(tab.id);
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      className={`p-3 rounded-md mb-2 cursor-pointer select-none ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      onClick={() => onClick(tab.id)}
      style={{ touchAction: "pan-y" }}
    >
      {tab.title}
    </motion.div>
  );
}
