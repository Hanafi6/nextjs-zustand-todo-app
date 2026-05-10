import React from "react";

export default function TabHeader({ rename, deleteTab, addTodo, activeTab }) {
  const handleSelect = (e) => {
    const value = e.target.value;

    if (value === "rename") rename(true);
    if (value === "delete") deleteTab(activeTab);
    if (value === "addTodo") addTodo(true);

    // نرجع الخيار للقيمة الافتراضية
    e.target.value = "";
  };

  if (!activeTab) return null;

  return (
    <header id="header-todo" className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{activeTab.title}</h2>

      <div id="setting-todo">
        <select
          defaultValue=""
          onChange={handleSelect}
          className="p-2 rounded-md cursor-pointer
                     hover:bg-[#01434e] text-white
                     bg-[#017286]
                     focus:outline-none 
                     transition-colors duration-200 ease-in-out"
          aria-label="خيارات التعديل"
        >
          <option value="" disabled>Choies Action</option>
          <option value="rename">Rename</option>
          <option value="delete">Delet</option>
          <option value="addTodo">Add Todo</option>
        </select>
      </div>
    </header>
  );
}
