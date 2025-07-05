import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa';
import { selectCartTotalItems } from '../../features/cart/cartSlice';
import { selectIsAuthenticated, selectIsAdmin, logout } from '../../features/auth/authSlice';
import { setFilters } from '../../features/product/productSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector(selectCartTotalItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileProfileDropdown = () => {
    setIsMobileProfileOpen(!isMobileProfileOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ searchQuery }));
    navigate('/products');
    setSearchQuery('');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-atku-brand">
            ATK
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-atku-brand">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-atku-brand">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-atku-brand">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-atku-brand">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, and User Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-atku-brand focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-atku-brand">
              <FaShoppingCart className="text-2xl" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-atku-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* User Account */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                className="flex items-center text-gray-700 hover:text-atku-brand focus:outline-none"
                onClick={toggleProfileDropdown}
              >
                <FaUser className="text-2xl" />
                <FaChevronDown className={`ml-1 transform ${isProfileOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {isAuthenticated ? (
                  <>
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Up
                    </Link>
                  </>
                )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                Contact
              </Link>
            </nav>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-atku-brand focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {/* Mobile User Menu */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <button
                className="flex items-center justify-between w-full py-2 text-gray-700 focus:outline-none"
                onClick={toggleMobileProfileDropdown}
              >
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  {isAuthenticated ? 'My Account' : 'Account'}
                </span>
                <FaChevronDown className={`transform ${isMobileProfileOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`} />
              </button>

              {isMobileProfileOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link to="/account" className="block py-2 text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                        My Account
                      </Link>
                      <Link to="/orders" className="block py-2 text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="block py-2 text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="block w-full text-left py-2 text-gray-700 hover:text-atku-brand"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block py-2 text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                        Login
                      </Link>
                      <Link to="/signup" className="block py-2 text-gray-700 hover:text-atku-brand" onClick={toggleMenu}>
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              className="mt-4 flex items-center justify-between py-2 text-gray-700 hover:text-atku-brand border-t border-gray-200 pt-4"
              onClick={toggleMenu}
            >
              <span className="flex items-center">
                <FaShoppingCart className="mr-2" />
                Cart
              </span>
              {cartItems > 0 && (
                <span className="bg-atku-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
