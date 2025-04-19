
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  TrendingUp, 
  Mail, 
  CalendarClock, 
  Award, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type SidebarItemType = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItemType[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Expenses', href: '/expenses', icon: Receipt },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Predictions', href: '/predictions', icon: TrendingUp },
  { name: 'Gmail Receipts', href: '/receipts', icon: Mail },
  { name: 'Future Planning', href: '/planning', icon: CalendarClock },
  { name: 'Badges', href: '/badges', icon: Award },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="bg-primary rounded-lg p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-bold text-xl">BillTrix</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <span className="bg-primary rounded-lg p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => setCollapsed(prev => !prev)}
          className="flex items-center justify-center w-full p-2 rounded-md hover:bg-secondary"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
