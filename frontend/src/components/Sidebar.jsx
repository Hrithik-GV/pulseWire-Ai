import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitBranch, 
  FileText, 
  Terminal, 
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: GitBranch, label: 'Workflows', path: '/workflows' },
    { icon: FileText, label: 'Articles Feed', path: '/articles' },
    { icon: Terminal, label: 'Publishing Logs', path: '/logs' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 glass-card rounded-none border-l-0 border-y-0 hidden lg:flex flex-col p-4">
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-2">
        <button className="nav-link w-full">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="nav-link w-full">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
