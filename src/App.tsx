import AppRoute from './components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavigationMenuSidebar } from './components/SideNavbar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation()

  // Pages where NavBar should NOT show
  const hideNavBarOn = ['/login', '/']

  const showNavBar = !hideNavBarOn.includes(location.pathname)

  return (
    <div className="flex h-screen w-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 text-white overflow-hidden">

      {/* Sidebar */}
     { showNavBar && <NavigationMenuSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto relative transition-all duration-300 ml-4"
   
      >
        <AppRoute />
        <ToastContainer
          position="bottom-right"
          toastClassName="bg-slate-800 text-white"
          hideProgressBar={true}
        />
      </main>
    </div>
  );
};

export default App;
