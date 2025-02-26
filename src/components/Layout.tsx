import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Refrigerator, ShoppingCart, ChefHat, BarChart3, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { expiringItems } = useAppContext();
  
  const navItems = [
    { path: '/', icon: <Refrigerator size={24} />, label: 'Inventory' },
    { path: '/recipes', icon: <ChefHat size={24} />, label: 'Recipes' },
    { path: '/shopping-list', icon: <ShoppingCart size={24} />, label: 'Shopping List' },
    { path: '/analytics', icon: <BarChart3 size={24} />, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <Refrigerator className="mr-2" />
            FoodSaver
          </Link>
          <div className="relative">
            <Link to="/notifications" className="p-2">
              <Bell size={24} />
              {expiringItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {expiringItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 mb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200">
        <div className="container mx-auto flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-3 ${
                location.pathname === item.path
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;