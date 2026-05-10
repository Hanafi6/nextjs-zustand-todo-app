"use client";

import React, { useEffect, useState, useRef } from "react";
import useTodoStore from "../zustand/ManeagMent";
import Btn from "./Btn";
import Tab from "./Tab"; // 👈 استدعاء الكومبوننت الجديد
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const { tabs, activeTabId, setActiveTab, fetchTabs, ToggleTabInNavBar, getActiveTab } = useTodoStore();

  const [menu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);

  const visibleTabs = tabs.filter(tab => tab.inNavBar);

  useEffect(() => {
  }, [activeTabId])

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onContext = (e, tab) => {
    e.preventDefault();
    setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
    setSelectedTab(tab);
    setShowMenu(true);
  };

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (menu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menu]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setActiveTab(id);
  };

  const handelRemodetab = (tab) => {
    ToggleTabInNavBar(tab.id);

    // لو التاب اللي بيتشال هو الأكتف، نخليه null
    if (tab.id === activeTabId) {
      setActiveTab(null);
    }
  };


  return (
    <>
      <nav
        ref={containerRef}
        className="bg-gray-100 dark:bg-gray-900 rounded-t-md p-2"
      >
        {!isMobile ? (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleTabs.map((tab) => (
                <motion.div
                  key={tab.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Tab
                    handelRemodetab={handelRemodetab}
                    tab={tab}
                    isActive={tab.id === activeTabId}
                    onClick={setActiveTab}
                    onContext={onContext}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <Btn />
          </div>

        ) : (
          <div className="flex items-center gap-3 px-2">
            <select
              className="flex-grow p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              value={activeTabId || ""}
              onChange={handleSelectChange}
              aria-label="Select active tab"
            >
              {visibleTabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.title}

                </option>
              ))}
            </select>
            <Btn />
          </div>
        )}
      </nav>
    </>
  );
}
