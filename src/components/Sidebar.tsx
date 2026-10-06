import React from 'react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: '📊' },
    { id: 'employees', label: 'کارکنان', icon: '👥' },
    { id: 'attendance', label: 'حضور و غیاب', icon: '⏰' },
    { id: 'salary', label: 'حقوق و دستمزد', icon: '💰' },
    { id: 'leave', label: 'مرخصی‌ها', icon: '🏖️' },
    { id: 'reports', label: 'گزارشات', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xl">
            🏢
          </div>
          <div>
            <h1 className="text-lg font-bold">سیستم HR</h1>
            <p className="text-xs text-slate-400">مدیریت منابع انسانی</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-right ${
              activePage === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm">
            👤
          </div>
          <div>
            <p className="text-sm font-medium">مدیر سیستم</p>
            <p className="text-xs text-slate-400">admin@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
