"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useTodoStore from "../zustand/ManeagMent";
import AllTodos from "./AllTodos";
import ActiveTodo from "./ActiveTodo";

function ContainerComponent() {
  const fetchTabs = useTodoStore((state) => state.fetchTabs);
  const { tabs, activeTabId, setActiveTab, getActiveTab } = useTodoStore();

  const [activeTab, setActiveTabLocal] = useState(null);
  const [prevTabId, setPrevTabId] = useState(null);
  const [direction, setDirection] = useState(1); // 1: right to left, -1: left to right

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  useEffect(() => {
    if (activeTabId != null) {
      if (prevTabId !== null) {
        setDirection(activeTabId > prevTabId ? 1 : -1);
      }
      setPrevTabId(activeTabId);

      const tab = getActiveTab
        ? getActiveTab(activeTabId)
        : tabs.find((t) => t.id === activeTabId);
      setActiveTabLocal(tab);
    } else {
      setActiveTabLocal(null);
    }
    // console.log(activeTabId)
  }, [activeTabId, getActiveTab, tabs, prevTabId]);

  useEffect(() => {
  if (activeTabId != null) {
    const tab =
      typeof getActiveTab === "function"
        ? getActiveTab(activeTabId)
        : tabs.find((t) => t.id === activeTabId);

    setActiveTabLocal(tab || null);
  } else {
    setActiveTabLocal(null);
  }
}, [activeTabId, tabs, getActiveTab]);


  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="relative min-h-[300px]">
      <AnimatePresence mode="wait" initial={false}>
        {activeTab ? (
        <motion.div
          key={`active-${activeTab.id}`}
          initial={{ opacity: 0, x: 100 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 * direction }}
          transition={{ duration: 0.3 }}
      >
      <ActiveTodo />
      </motion.div>
            ) : (
      <motion.div
        key="all"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <AllTodos onSelectTab={handleSelectTab} tabs={tabs} />
      </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default ContainerComponent;
