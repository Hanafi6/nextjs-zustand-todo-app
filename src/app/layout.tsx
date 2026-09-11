import "@/app/style/globals.css";

import { ReactNode } from 'react';
import { getTabs, getTodos } from "@/helpers/TodosMethods";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import('@/app/component/NavBar'), {
  loading: () => <nav className="relative bg-gray-100 dark:bg-gray-900 rounded-t-md p-2 animate-ping">Loading...</nav>,
})

export const metadata = {
  title: "Advanced Todo App",
  description: "Todo App with Tabs, Zustand, Framer-motion, JSON Server",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const getTABS = getTabs('/api/tabs');
  const getTODOS = getTodos('/api/todos');
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans min-h-screen">
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <header className="sticky top-0 z-50 bg-background border-b border-gray-200 dark:border-gray-700">
            <NavBar todosPromies={getTODOS} tabsPromise={getTABS} />
          </header>


          <main className="flex-grow  mt-4">
            {children}
          </main>


        </div>
      </body>
    </html>
  );
}
