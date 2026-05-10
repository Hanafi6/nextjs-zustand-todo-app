// Todo.jsx
import React from "react";

export default function Todo({ handelClick, todo }) {

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-lg border ${todo.completed ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
        } transition`}
      data-id={todo.id}
      onClick={handelClick}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="w-5 h-5 accent-green-500 cursor-pointer"
      />

      {/* نص المهمة */}
      <span
        className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
      >
        {todo.text}
      </span>
    </li>
  );
}
