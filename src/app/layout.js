import "../app/style/globals.css";
import NavBar from "../../component/NavBar";

export const metadata = {
  title: "Advanced Todo App",
  description: "Todo App with Tabs, Zustand, Framer-motion, JSON Server",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans min-h-screen">
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* NavBar في الأعلى */}
          <header className="sticky top-0 z-50 bg-background border-b border-gray-200 dark:border-gray-700">
            <NavBar />
          </header>

          {/* المحتوى الرئيسي */}
          <main className="flex-grow mt-4">
            {children}
          </main>

          {/* ممكن تضيف فوتير هنا لو حابب */}
        </div>
      </body>
    </html>
  );
}
