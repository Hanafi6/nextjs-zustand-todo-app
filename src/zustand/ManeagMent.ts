import { GroupByOption, Tab, Todo } from "@/app/types/interFaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TodoUIState {
  activeTabId: string | null;
  setActiveTab: (id: string | null) => void;
  setTodosInTab: (todos: Todo[] | null) => void;
  TodosInTab: Todo[] | null;
  groupBy: GroupByOption;
  setGroupBy: (newGroupStatus: GroupByOption) => void;

}

const useTodoStore = create<TodoUIState>()(
  persist(
    (set) => ({
      activeTabId: null,
      TodosInTab: [],
      groupBy: "none",

      setGroupBy: (newGroupStatus) => {
        set({
          groupBy: newGroupStatus,
        });
      },

      setActiveTab: (tab) => {
        set({
          activeTabId: tab && tab as string,
        });
      },

      setTodosInTab: (todos) => {
        set({
          TodosInTab: todos ? [...todos] : [],
        });
      },
    }),
    {
      name: "todo-ui-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useTodoStore;