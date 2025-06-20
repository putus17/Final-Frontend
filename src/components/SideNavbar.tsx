import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Map, LayoutDashboard, MapPin, ChevronLeft } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from './ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useAuthStore';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function NavigationMenuSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname)
  const { user,fetchCurrentUser, logout } = useUserStore()


  useEffect(()=>{
    fetchCurrentUser()
  },[])

  

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
  if (!name) return ''
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

  return (
  <aside
      className={`h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'} 
        bg-gradient-to-b from-cyan-900 via-blue-900 to-slate-900 
        text-white shadow-lg border-r border-blue-800 relative
      `}
    >
      <NavigationMenu className="flex flex-col h-full justify-between">
        <NavigationMenuList className="flex flex-col h-full">

          {/* Ocean Header */}
          <div className="p-6 flex items-center space-x-4 bg-blue-800/20 rounded-b-xl shadow-inner">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-sky-400 rounded-lg flex items-center justify-center text-white font-bold">
              O
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold tracking-wide">DWAS Panel</h2>
                <p className="text-xs text-cyan-200">Smooth Controls</p>
              </div>
            )}
          </div>

          {/* Ocean Menu */}
          <div className="flex-1 px-3 py-6 space-y-3">
            {menuItems.map(({ path, label, icon: Icon }) => {
              const isActive = activeItem === path;
              return (
                <NavigationMenuItem key={path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={path}
                      className={`flex items-center transition-all px-4 py-3 rounded-lg group ${
                        isActive
                          ? 'bg-cyan-700/30 border border-cyan-400 text-white shadow'
                          : 'hover:bg-sky-800/30 text-cyan-200'
                      } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                    >
                      <Icon
                        size={20}
                        className={`transition ${
                          isActive ? 'text-cyan-300' : 'text-sky-300 group-hover:text-white'
                        }`}
                      />
                      {!isCollapsed && <span className="text-sm">{label}</span>}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </div>

          {/* Ocean Footer */}
          <div className="p-4 border-t border-blue-800/50 bg-blue-900/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                {getInitials(user?.name ?? '')}
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-cyan-300">{user?.role}</p>
                </div>
              )}
              <button
                onClick={logout}
                title="Logout"
                className="text-rose-400 hover:text-rose-600 transition"
              >
                <LogIn size={18} />
              </button>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 -right-3 w-7 h-7 bg-cyan-700 border border-cyan-400 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center shadow-md"
      >
        <ChevronLeft
          size={16}
          className={`transition-transform ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
    </aside>
  );
}