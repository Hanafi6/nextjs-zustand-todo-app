"use client";

import React, { useEffect, useState, useRef, use } from "react";
import useTodoStore from "@/zustand/ManeagMent";
import Btn from "./Btn";
import Tab from "./Tab";
import { AnimatePresence, motion } from "framer-motion";
import type { ApiResponse, Tab as TAB, Todo } from "../types/interFaces";
import { TggeleTabFromNavBar } from "@/helpers/tabsMethods";
import { Delete, Pen } from "lucide-react";
import { ContextTabMenue } from "./ContextTabMenue";

interface NavBarProps {
  tabsPromise: Promise<ApiResponse<TAB[]>>;
  todosPromies: Promise<ApiResponse<Todo[]>>;
}

export default function NavBar({ tabsPromise, todosPromies }: NavBarProps) {
  const { data: tabs } = use(tabsPromise);
  const { data: todos } = use(todosPromies);

  const [menu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedTab, setSelectedTab] = useState<TAB | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const activeTabId = useTodoStore((state) => state.activeTabId);
  const setActiveTab = useTodoStore((state) => state.setActiveTab);

  const containerRef = useRef<HTMLDivElement>(null);

  const visibleTabs = tabs.filter((tab: TAB) => tab.inNavBar);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (menu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menu]);

  const handelRemodetab = (tab: TAB) => {
    TggeleTabFromNavBar({ id: tab.id, status: tab.inNavBar });
  };

  const handelRenderContentTab = (tab: TAB) => {
    setActiveTab(tab.id);

    setTimeout(() => {
      const targetElement = document.getElementById(`tab-card-${tab.id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  const handleContextMenu = (e: React.MouseEvent, tab: TAB) => {
    e.preventDefault();

    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    setPosition({ x, y });
    setSelectedTab(tab);
    setShowMenu(true);
  };

  return (
    <nav
      ref={containerRef}
      className="relative bg-gray-100 dark:bg-gray-900 rounded-t-md p-2"
    >
      {!isMobile ? (
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleTabs.map((tab) => (
              <motion.span
                key={tab.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Tab
                  tab={tab}
                  handelRemodetab={() => handelRemodetab(tab)}
                  onClick={() => handelRenderContentTab(tab)}
                  isActive={activeTabId == tab.id}
                  onContext={(e: React.MouseEvent) => handleContextMenu(e, tab)}
                />
              </motion.span>
            ))}
          </AnimatePresence>
          <Btn />
        </div>
      ) : (
        <div className="flex items-center gap-3 px-2">
          <select
            className="flex-grow p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            value={activeTabId || ""}
            onChange={(e) => setActiveTab(e.target.value)}
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

      <AnimatePresence mode="wait" key='menue'>
        {menu && selectedTab && (
          <ContextTabMenue
            position={position}
            key={selectedTab.id}
            tab={selectedTab}
            closeMenu={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
