"use client";

import React from "react";
import { Plus, PlusCircle } from "lucide-react"; // أيقونة + من lucide
import useTodoStore from "../zustand/ManeagMent";

export default function AddTabButton() {
  const addTab = useTodoStore((state) => state.addTab);

  const handleAddTab = () => {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    addTab({
      title: "New Tab",
      color: randomColor,
      inNavBar: true,
      todos: []
    });
  };

  return (
    <button
      onClick={handleAddTab}
      className="flex items-center justify-center gap-1 min-w-[40px] px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      aria-label="Add new tab"
    >
      <Plus size={18} />
    </button>
  );
}
