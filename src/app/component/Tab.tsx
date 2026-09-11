"use client";

import { motion } from "framer-motion";
import { Delete } from "lucide-react";
// import useTodoStore from "@/zustand/ManeagMent";
import type { Tab as TAB } from "../types/interFaces";
import useTodoStore from "@/zustand/ManeagMent";

type PropsTab = {
  handelRemodetab?: () => void,
  tab: TAB,
  isActive?:
  boolean,
  onContext?: any,
  onClick?: (id: string) => void;
}

export default function Tab({ handelRemodetab = () => { }, tab, isActive, onClick, onContext, ...porps }: PropsTab) {
  return (
    <motion.button
      key={tab.id}
      onClick={() => onClick?.(tab.id)}
      {...porps}
      onContextMenu={(e) => onContext(e, tab)}
      onDoubleClick={(e) => onContext(e, tab)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative flex items-center space-x-2 min-w-[110px] px-5 py-2
        rounded-t-lg border border-transparent
        cursor-pointer select-none whitespace-nowrap
        text-sm font-semibold 
        ${isActive
          ? "bg-white dark:bg-gray-800 border-b-0 text-gray-900 dark:text-white shadow"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        }
      `}
      style={{
        borderBottomLeftRadius: isActive ? 0 : undefined,
        borderBottomRightRadius: isActive ? 0 : undefined,
      }}
      aria-selected={isActive}
      role="tab"
    >
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: tab.color }}
      />
      <span className="overflow-hidden text-ellipsis">{tab.title}</span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white dark:bg-gray-800 rounded-t-md"
          style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))" }}
        />
      )}
      <Delete
        onClick={(e) => {
          e.stopPropagation();
          handelRemodetab();
        }}
        className="hover:text-red-400 duration-[200ms]"
      />
    </motion.button>
  );
}
