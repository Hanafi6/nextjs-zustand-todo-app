"use client";

import React from "react";
import Todo from "./Todo";
import useTodoStore from "../zustand/ManeagMent";
export default function AllTodos({ onSelectTab, tabs }) {
  const { ToggleTabInNavBar } = useTodoStore();

  // بدل الفلترة هنا خلي كل التابات عادي
  // const tabsWithTodos = tabs.filter(tab => tab.todos && tab.todos.length > 0);

  const handleToggleInNavBar = (tab) => {
    if (!tab.inNavBar) ToggleTabInNavBar(tab.id);
    onSelectTab(tab.id);
  };

  return (
    <section className="max-w-4xl mx-auto p-4 mt-8 sm:p-6 md:p-8 space-y-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        All Todos
      </h2>

      {tabs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No todos found.
        </p>
      )}

      {tabs.map((tab) => (
        <div key={tab.id} className="space-y-3">
          {/* عنوان التابة */}
          <button
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => onSelectTab(tab.id)}
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: tab.color }}
            />
            <span className="hover:underline">{tab.title}</span>
          </button>

          {/* زر إضافة أو إزالة من الناف بار */}
          <button
            onClick={() => ToggleTabInNavBar(tab.id)}
            className={`px-2 py-1 rounded text-sm ${tab.inNavBar
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
              }`}
          >
            {tab.inNavBar ? "Remove from NavBar" : "Add to NavBar"}
          </button>

          {/* قائمة التودوز الخاصة بالتابة */}
          <ul
            className="space-y-2 pl-6 border-l-4"
            style={{ borderColor: tab.color }}
          >
            {tab.todos && tab.todos.length > 0 ? (
              tab.todos.map((todo) => (
                <Todo
                  key={`${tab.id}-${todo.id}`}
                  todo={{
                    ...todo,
                    tabId: tab.id,
                    tabTitle: tab.title,
                    tabColor: tab.color,
                  }}
                  handelClick={() => onSelectTab(tab.id)}
                />
              ))
            ) : (
              <li className="text-gray-400 italic">No todos here</li>
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}
