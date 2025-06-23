import { useState, useEffect } from 'react';
import {
  LogIn,
  UserPlus,
  Map,
  LayoutDashboard,
  MapPin,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useAuthStore';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function NavigationMenuSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, fetchCurrentUser, logout } = useUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/user', label: 'User', icon: UserPlus },
    { path: '/dzongkhag', label: 'Dzongkhags', icon: Map },
    { path: '/gewog', label: 'Gewogs', icon: MapPin },
  ];

  const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
  };

  const SidebarContent = (
    <div
      className={`h-full flex flex-col justify-between
        ${isCollapsed ? 'w-20' : 'w-72'}
        bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]
        text-white border-r border-cyan-600 shadow-lg
        backdrop-blur-md bg-opacity-70 relative`}
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Top Nav */}
      <div className="p-4 flex items-center space-x-4 bg-cyan-700/80 backdrop-blur-sm rounded-b-xl shadow-lg border-b border-cyan-500">
        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-300 rounded-lg flex items-center justify-center text-blue-900 font-extrabold shadow-md transform hover:scale-110 transition-transform duration-300">
          💧
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-bold tracking-wide drop-shadow-lg">DWAS Panel</h2>
            <p className="text-xs text-cyan-200">Refreshing Controls</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <NavigationMenu className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-cyan-900">
        <NavigationMenuList className="flex flex-col space-y-3">
          {menuItems.map(({ path, label, icon: Icon }) => {
            const isActive = activeItem === path;
            return (
              <NavigationMenuItem key={path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={path}
                    className={`flex items-center transition-all px-4 py-3 rounded-lg group
                      ${
                        isActive
                          ? 'bg-cyan-400 border border-cyan-300 text-blue-900 shadow-lg shadow-cyan-400/60'
                          : 'hover:bg-cyan-300/70 text-cyan-100 hover:text-white'
                      } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon size={20} className={`transition ${isActive ? 'text-blue-900' : 'text-cyan-200 group-hover:text-white'}`} />
                    {!isCollapsed && <span className="text-sm font-semibold">{label}</span>}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-cyan-600 bg-cyan-800/70 backdrop-blur-md rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-300 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-lg">
            {getInitials(user?.name ?? '')}
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-cyan-200">{user?.role}</p>
            </div>
          )}
          <button
            onClick={logout}
            title="Logout"
            className="text-red-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-800/20"
          >
            <LogIn size={18} />
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute top-6 -right-3 w-8 h-8 bg-cyan-600 border border-cyan-400 hover:bg-cyan-500 text-white rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft size={18} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-cyan-600 text-white shadow-lg backdrop-blur-md">
        <button
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar menu"
          className="p-1 rounded-md hover:bg-cyan-600 transition"
        >
          <Menu size={24} />
        </button>
        <div className="font-bold text-lg select-none drop-shadow-lg">DWAS Panel</div>
        <div className="w-8" />
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-gradient-to-b from-blue-900 via-cyan-700 to-teal-500
          text-white border-r border-cyan-600 shadow-xl rounded-tr-xl rounded-br-xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="flex items-center justify-between p-5 border-b border-cyan-600 backdrop-blur-md bg-cyan-800/60 rounded-t-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-300 rounded-lg flex items-center justify-center text-blue-900 font-extrabold text-xl shadow-md">
              💧
            </div>
            <h2 className="text-xl font-extrabold tracking-wide drop-shadow-lg">DWAS Panel</h2>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="text-white hover:bg-cyan-600 rounded-full p-1 transition"
            aria-label="Close sidebar menu"
          >
            <X size={28} />
          </button>
        </div>

        <NavigationMenu className="flex flex-col h-full">
          <NavigationMenuList className="flex flex-col h-full">
            <div className="flex-1 px-4 py-7 space-y-4 overflow-y-auto">
              {menuItems.map(({ path, label, icon: Icon }) => {
                const isActive = activeItem === path;
                return (
                  <NavigationMenuItem key={path}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={path}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium text-base
                          transition-all duration-200
                          ${isActive ? 'bg-cyan-400 text-blue-900 shadow-lg shadow-cyan-400/60' : 'hover:bg-cyan-300 text-cyan-200 hover:text-white'}`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <Icon size={22} className={isActive ? 'text-blue-900' : 'text-cyan-200'} />
                        <span>{label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </div>

            <div className="p-5 border-t border-cyan-600 bg-cyan-800/70 rounded-t-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-300 shadow-lg flex items-center justify-center font-bold text-blue-900 text-lg ring-2 ring-cyan-400">
                  {getInitials(user?.name ?? '')}
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold">{user?.name}</p>
                  <p className="text-sm text-cyan-200">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="text-red-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-800/20"
                >
                  <LogIn size={20} />
                </button>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className="hidden md:flex fixed top-0 left-0 h-full z-40">{SidebarContent}</aside>
    </>
  );
}
