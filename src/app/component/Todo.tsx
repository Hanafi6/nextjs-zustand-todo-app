// Todo.jsx
'use client'
import { memo } from "react";
import { Todo as TODO } from "../types/interFaces";
import { toggleStatusTodo } from "@/helpers/todoActions";

function Todo({ todo }: { todo: TODO }) {


  const ToggleStatusTodo = async () => {
    await toggleStatusTodo(todo.id, { completed: !todo.completed }, 'todos');
  }

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-lg border ${todo.completed ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
        } transition`}
      data-id={todo.id}
      onClick={ToggleStatusTodo}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="w-5 h-5 accent-green-500 cursor-pointer"
      />

      <span
        className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
      >
        {todo.text}
      </span>
    </li>
  );
}


export default memo(Todo)