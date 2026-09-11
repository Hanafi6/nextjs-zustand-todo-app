// ActiveTodos.jsx
"use client";
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";
import TabHeader from "./TabHeader";
import { motion, AnimatePresence } from "framer-motion";
import useTodoStore from "@/zustand/ManeagMent";
import { Tab, Todo as TODOTYPE } from "../types/interFaces";
import { useMemo, useState } from "react";


export default function ActiveTodo({ tabs, todos }: { tabs: Tab[], todos: TODOTYPE[] }) {
  // const activeTabId = useTodoStore((state) => state.activeTabId);
  // const { tabs, setActiveTab } = useTodoStore();
  const [rename, setRename] = useState(false);
  const [addTodo, setAdtodo] = useState(false);


  const activeTabId = useTodoStore(state => state.activeTabId)
  const setActiveTab = useTodoStore(state => state.setActiveTab)

  const activeTab = tabs.find((tab) => String(tab.id) === String(activeTabId));

  const tabTodos = useMemo(() => {
    return todos.filter(todo => String(todo.tabId) === String(activeTabId))
  }, [todos, activeTabId]);

  const HandelDeletTodo = (tb: Tab) => {
    console.log(tb)
  }



  return (
    <div className="rounded-xl shadow p-6">
      <TabHeader deleteTab={HandelDeletTodo} rename={setRename} addTodo={setAdtodo} activeTab={activeTab} />
      <ul className="space-y-3">
        {tabTodos?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setActiveTab(null)}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Show All Todos
        </button>
      </div>

      <AnimatePresence>
        {/* {rename && (
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
        )} */}
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
