"use client";

import { PlusCircle } from "lucide-react";
import { addTab } from "@/helpers/tabsMethods";
import { usePathname } from "next/navigation";

export default function AddTabButton() {
  const PathName = usePathname()

  const handleAddTab = () => {

    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    addTab({
      title: "New Tab",
      color: randomColor,
      inNavBar: true,
      PathName
    });
  };

  return (
    <button
      onClick={handleAddTab}
      className="flex items-center justify-center gap-1 min-w-[40px] px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      aria-label="Add new tab"
    >
      <PlusCircle size={18} />
    </button>
  );
}
