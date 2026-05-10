// ActiveTodos.jsx
"use client";
import React, { useEffect, useState } from "react";
import useTodoStore from "../zustand/ManeagMent";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import TabHeader from "./TabHeader";
import RenameTab from "./RenameTab";
import { motion, AnimatePresence } from "framer-motion";


export default function ActiveTodo() {
  const activeTabId = useTodoStore((state) => state.activeTabId);
  const { tabs, setActiveTab } = useTodoStore();
  const [rename, setRename] = useState(false);
  const [addTodo, setAdtodo] = useState(false);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);


  useEffect(() => {
  }, [rename])

  if (!activeTab) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No tab selected.</p>
      </div>
    );
  }

  const HandelDeletTodo = (tb) => {
    console.log(tb)
  }



  return (
    <div className="bg-black rounded-xl shadow p-6">
      {/* عنوان التاب */}
      <TabHeader deleteTab={HandelDeletTodo} rename={setRename} addTodo={setAdtodo} activeTab={activeTab} />
      {/* قائمة المهام */}
      <ul className="space-y-3">
        {activeTab.todos?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>

      {/* الزر أسفل القائمة */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setActiveTab(null)}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Show All Todos
        </button>
      </div>

      <AnimatePresence>
        {rename && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              key="pop"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-lg bg-white dark:bg-gray-900 p-6"
            >
              <RenameTab close={setRename} todo={activeTab} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addTodo && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              key="pop"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-lg bg-white dark:bg-gray-900 p-6"
            >
              <AddTodoForm close={setAdtodo} tabId={activeTabId} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
