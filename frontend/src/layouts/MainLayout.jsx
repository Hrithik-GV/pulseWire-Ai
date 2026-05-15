import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitBranch, 
  FileText, 
  History, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Cpu,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggle }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', path: '/workflow/active', icon: GitBranch },
    { name: 'Articles', path: '/articles', icon: FileText },
    { name: 'Publishing Logs', path: '/logs', icon: History },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Cpu className="text-primary w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">PulseWire <span className="text-primary">AI</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="bg-secondary/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">System Status</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Agents Online</span>
              <div className="flex items-center gap-1.5">
                <span className="status-pulse">
                  <span className="status-pulse-inner bg-green-500"></span>
                  <span className="status-pulse-dot bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <button onClick={toggleSidebar} className="p-2 -ml-2 lg:hidden text-foreground">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex items-center max-w-md ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search news, workflows, or logs..." 
              className="w-full bg-secondary/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
            PW
          </div>
        </div>
      </div>
    </header>
  );
};

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
