"use client";

import React, { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { addTodoAction } from "@/helpers/todoActions";

export default function AddTodoForm({
  close,
  tabId,
}: {
  close?: Dispatch<SetStateAction<boolean>>;
  tabId: string | null;
}) {
  const [state, formAction, isPending] = useActionState(addTodoAction, {
    success: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (state?.success && close) {
      close(false);
    }
  }, [state, close]);

  return (
    <form
      action={formAction}
      className="flex gap-2 mt-4 bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-md"
    >
      <input type="hidden" name="tabId" value={tabId || ""} />

      {close && (
        <button type="button" onClick={() => close(false)}>
          <X className="cursor-pointer hover:text-red-500 duration-[100ms]" />
        </button>
      )}

      <input
        type="text"
        name="text"
        placeholder="Add A New Todo"
        required
        disabled={isPending}
        className="flex-grow text-black dark:text-white p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-gray-800 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
      >
        {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus />}
      </button>
    </form>
  );
}