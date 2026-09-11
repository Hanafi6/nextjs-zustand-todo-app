import React, { useState } from "react";
import useTodoStore from "@/zustand/ManeagMent";
import { Todo } from "../types/interFaces";

export default function RenameTab() {
  const [newName, setNewName] = useState("");


  const todo = {
  }
  const handelRename = () => {
    // if (newName.length > 1) {
    //   RenameTaB(newName, todo.id)

    // }
    // close(false);
  }


  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        ✏️ إعادة تسمية التاب
      </h3>
      <input
        type="text"
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-black dark:text-white"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      // placeholder={`${todo.text}`}
      />
      <div className="flex justify-end gap-2">
        <button
          // onClick={() => close(false)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200"
        >
          Exit
        </button>
        <button
          onClick={handelRename}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow transition-all duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
