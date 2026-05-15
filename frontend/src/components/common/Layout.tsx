import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSettingsStore } from '../../stores/useSettingsStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    // Tema'yı HTML element'e uygula
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`flex h-screen text-white transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-900 dark:bg-gray-900' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className={`flex-1 overflow-auto transition-colors ${
          theme === 'dark'
            ? 'bg-gray-900 dark:bg-gray-900'
            : 'bg-gray-50 dark:bg-gray-900'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
