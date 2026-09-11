"use client";

import { use, useMemo } from "react";
import { Todo as TODOType, ApiResponse, Tab } from "../types/interFaces";

import Todo from "./Todo";
import { ShieldAlert, CircleCheckBig } from "lucide-react";
import useTodoStore from "@/zustand/ManeagMent";


import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TggeleTabFromNavBar, updateInp } from "@/helpers/tabsMethods";
import dynamic from "next/dynamic";

const ActiveTodo = dynamic(() => import("@/app/component/ActiveTodo"), {
  ssr: false,
});

const GroupingBar = dynamic(() => import("./GroupingBar"), {
  ssr: false,
});

interface PC {
  todospromise: Promise<ApiResponse<TODOType[]>>;
  tabspromise: Promise<ApiResponse<Tab[]>>;
}

function TodoList({ items, className }: { items: TODOType[]; className?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400 italic">Dont Have Any Todos</p>;
  }

  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default function AllTodos({ todospromise, tabspromise }: PC) {
  const groupBy = useTodoStore((state) => state.groupBy);
  const activeTabId = useTodoStore((state) => state.activeTabId);
  const setActiveTab = useTodoStore((state) => state.setActiveTab);

  const { data: todos = [] } = use(todospromise ?? Promise.resolve({ data: [], success: true })) || {};
  const { data: tabs = [] } = use(tabspromise ?? Promise.resolve({ data: [], success: true })) || {};

  const tabMap = useMemo(() => {
    return new Map(tabs.map((t: Tab) => [String(t.id), t]));
  }, [tabs]);


  const groupedContent = useMemo(() => {
    if (groupBy === "tab") {
      return todos.reduce((acc, todo) => {
        const key = String(todo.tabId);
        if (!acc[key]) acc[key] = [];
        acc[key].push(todo);
        return acc;
      }, {} as Record<string, TODOType[]>);
    }

    if (groupBy === "status") {
      return todos.reduce(
        (acc, t) => {
          acc[t.completed ? "completed" : "active"].push(t);
          return acc;
        },
        { active: [] as TODOType[], completed: [] as TODOType[] }
      );
    }

    return todos;
  }, [groupBy, todos]);

  const renderedContent = useMemo(() => {
    if (groupBy === "none") {
      return <TodoList items={groupedContent as TODOType[]} />;
    }

    if (groupBy === "tab") {
      const groups = groupedContent as Record<string, TODOType[]>;

      return (
        <div className="space-y-6">
          {Object.entries(groups).map(([tabId, groupTodos]) => {
            const currentTab = tabMap.get(String(tabId));
            const isActiveTab = String(tabId) === String(activeTabId);

            return (
              <TabCol
                key={tabId}
                currentTab={currentTab}
                groupTodos={groupTodos}
                isActiveTab={tabId === String(activeTabId)}
                tabColor={currentTab?.color || "#0891b2"}
                tabId={tabId}
                onClick={setActiveTab}
              />
            );
          })}
        </div>
      );
    }

    if (groupBy === "status") {
      const { active, completed } = groupedContent as {
        active: TODOType[];
        completed: TODOType[];
      };

      return (
        <div className="space-y-6">
          <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30">
            <h3 className="font-semibold text-lg text-amber-700 mb-3 flex items-center gap-2">
              <ShieldAlert /> Active Tasks ({active.length})
            </h3>
            <TodoList items={active} />
          </div>

          <div className="border border-green-200 rounded-xl p-4 bg-green-50/30">
            <h3 className="font-semibold text-lg text-green-700 mb-3 flex items-center gap-2">
              <CircleCheckBig /> Completed Tasks ({completed.length})
            </h3>
            <TodoList items={completed} />
          </div>
        </div>
      );
    }

    return null;
  }, [groupBy, groupedContent, tabMap, activeTabId, setActiveTab]);


  return (
    <section className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg mb-6">
        <div className={activeTabId ? "hidden" : "block"}>
          <GroupingBar />
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {activeTabId ? (
          <motion.div
            key={`active-tab-${activeTabId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl shadow-lg bg-white dark:bg-gray-900 p-6"
          >
            <ActiveTodo todos={todos} tabs={tabs} />
          </motion.div>
        ) : (
          <motion.div
            key="render-filter-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl shadow-lg bg-white dark:bg-gray-900 p-6"
          >
            {renderedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TabCol({
  tabId,
  tabColor,
  currentTab,
  groupTodos,
  isActiveTab,
  onClick,
}: {
  tabId: string;
  tabColor: string;
  currentTab: Tab | undefined;
  groupTodos: TODOType[];
  isActiveTab: boolean;
  onClick: (tabId: string) => void;
}) {


  const handelAddToNavBar = () => {

    if (!currentTab) return;

    const req: updateInp = {
      id: currentTab.id,           // Type: string
      status: currentTab.inNavBar, // Type: boolean
      PathName: '/',
    };

    TggeleTabFromNavBar(req);
  };

  return (
    <div
      id={`tab-card-${tabId}`}
      className={`border rounded-xl p-4 transition-all duration-300 ${isActiveTab
        ? "ring-4 ring-blue-500/50 scale-[1.01] bg-blue-50/20 dark:bg-blue-900/20 border-blue-500"
        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        }`}
    >
      <h3
        style={{ color: tabColor }}
        className="font-semibold text-lg mb-3 pb-2 cursor-pointer hover:underline border-b border-gray-100 dark:border-gray-700"
        onClick={() => onClick(tabId)}
      >
        {currentTab?.title || `Tab #${tabId}`}
      </h3>

      <button
        onClick={handelAddToNavBar}
        style={{ background: currentTab?.inNavBar ? "red" : "green" }}
        className="rounded cursor-pointer text-white p-1 m-1"
      >
        Add to NavBar
      </button>

      <div className="flex gap-5 justify-around items-stretch flex-row">
        <span style={{ background: tabColor }} className="rounded p-1"></span>
        <TodoList className="flex-4" items={groupTodos} />
      </div>
    </div>
  );
}