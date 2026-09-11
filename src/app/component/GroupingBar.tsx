import useTodoStore from "@/zustand/ManeagMent";
import { GroupByOption } from "../types/interFaces";


export default function GroupingBar() {
    const setGroupBy = useTodoStore(state => state.setGroupBy);
    const groupBy = useTodoStore(state => state.groupBy);
    return (
        <>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Group By:
            </span>

            <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupByOption)}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
                <option value="none">None (All List)</option>
                <option value="tab">By Tab</option>
                <option value="status">By Status (Active / Completed)</option>
            </select>
        </>
    );
}