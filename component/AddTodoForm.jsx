"use client";

import React, { useState } from "react";
import useTodoStore from "../zustand/ManeagMent";
import { X } from "lucide-react";

export default function AddTodoForm({ close, tabId }) {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };

    addTodo(tabId, newTodo);
    setText("");
    close(false)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mt-4 bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-md"
    >
      <X className="cursor-pointer hover:text-red-500 duration-[100ms]" onClick={e => close(false)} />
      <input
        type="text"
        placeholder="✍️ أضف مهمة جديدة..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow text-black dark:text-white p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-800"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition-all duration-200"
      >
        ➕ إضافة
      </button>
    </form>
  );
}
