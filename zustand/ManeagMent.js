// store.js
import { create } from "zustand";
import { getTabs, updateTab, addTabApi, deleteTabApi, renameTabApi, setUpdats } from "../api/axiosApiManage";
import axios from "axios";

const useTodoStore = create((set, get) => ({
  tabs: [],
  activeTabId: null,

  getActiveTab: (id) => {
    const { tabs } = get();
    return tabs.find((tab) => tab.id === id) || null;
  },

  fetchTabs: async () => {
    const res = await getTabs();
    set({
      tabs: res.data,
    });
  },

  setTabs: (newTabs) => set({ tabs: newTabs }),


  setActiveTab: (id) => set({ activeTabId: id }),

  RenameTaB: async (newName, id) => {
    const oldTab = get().tabs.find(t => t.id === id);
    if (!oldTab) return;

    const newTab = {
      ...oldTab,
      title: newName, // نخلي العنوان الجديد يغلب القديم
    };


    try {
      await renameTabApi(id, newName); // API request
      // تحديث الstate بعد نجاح الAPI
      set({
        tabs: get().tabs.map((tab) =>
          tab.id === id ? newTab : tab
        ),
      });
    } catch (err) {
      console.error("خطأ في التعديل:", err);
    }
  },

  ToggleTabInNavBar: async (id) => {
    const { tabs, activeTabId, setActiveTab } = get();
    const oldTab = tabs.find(t => t.id === id);
    if (!oldTab) return;

    const newTab = {
      ...oldTab,
      inNavBar: !oldTab.inNavBar,
    };

    try {
      await setUpdats(newTab);

      set({
        tabs: tabs.map((tab) =>
          tab.id === id ? newTab : tab
        ),
      });

      // منطق التعامل مع الأكتف
      if (!newTab.inNavBar && activeTabId === id) {
        // لو شيلت التاب الأكتف → اختار أول تاب متاح
        const remainingTabs = tabs.filter(t => t.inNavBar && t.id !== id);
        setActiveTab(remainingTabs.length > 0 ? remainingTabs[0].id : null);
      }
      // لو ضفته للـ NavBar مفيش داعي نخليه أكتف إلا لو أنت اخترته من مكان تاني
      // يعني هنا مش هنعمل setActiveTab(id) تلقائي

    } catch (err) {
      console.error("خطأ في التعديل:", err);
    }
  },


  addTab: async (newTab) => {
    await addTabApi(newTab);
    const res = await getTabs();
    set({ tabs: res.data });
  },

  removeTab: async (tabId) => {
    await deleteTabApi(tabId);
    const res = await getTabs();
    set({
      tabs: res.data,
      activeTabId: res.data[0]?.id || null
    });
  },

  addTodo: async (tabId, todo) => {
    try {
      // جلب التاب الحالي عشان نضيف التودو
      const tab = get().tabs.find(t => t.id === tabId);
      if (!tab) return;

      const updatedTodos = [...tab.todos, todo];

      // أولاً نحدث البيانات في الـ backend
      await updateTab(tabId, { todos: updatedTodos });

      // بعد التأكد من نجاح التحديث، نحدث الـ state
      set((state) => ({
        tabs: state.tabs.map(t =>
          t.id === tabId ? { ...t, todos: updatedTodos } : t
        )
      }));
    } catch (error) {
      console.error("Failed to add todo:", error);
      // هنا ممكن تعمل set لرسالة خطأ أو حالة
    }
  },


  toggleTodo: async (tabId, todoId) => {
    const prevTabs = get().tabs;
    const updatedTabs = prevTabs.map(tab =>
      tab.id === tabId
        ? {
          ...tab,
          todos: tab.todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          )
        }
        : tab
    );

    set({ tabs: updatedTabs });

    try {
      await updateTab(tabId, {
        todos: updatedTabs.find(t => t.id === tabId).todos,
      });
    } catch (err) {
      console.error("toggleTodo failed", err);
      set({ tabs: prevTabs }); // rollback لو فشل
    }
  },

  deleteTodo: async (tabId, todoId) => {
    set((state) => {
      const updatedTabs = state.tabs.map((tab) =>
        tab.id === tabId
          ? {
            ...tab,
            todos: tab.todos.filter((todo) => todo.id !== todoId)
          }
          : tab
      );
      updateTab(tabId, {
        todos: updatedTabs.find((t) => t.id === tabId).todos
      });
      return { tabs: updatedTabs };
    });
  }
}));

export default useTodoStore;
