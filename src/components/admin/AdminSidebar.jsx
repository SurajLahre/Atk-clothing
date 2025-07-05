import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  FaHome, 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { logout } from '../../features/auth/authSlice';

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Active link style
  const activeStyle = "bg-gray-800 text-white";
  const inactiveStyle = "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="bg-gray-900 text-white h-full min-h-screen w-64 flex-shrink-0">
      {/* Brand */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-atku-brand">ATK Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaHome className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/products" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaBox className="mr-3" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/orders" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaShoppingCart className="mr-3" />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/customers" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaUsers className="mr-3" />
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/analytics" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaChartBar className="mr-3" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <FaCog className="mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
