import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and About */}
          <div>
            <h3 className="text-2xl font-bold text-atku-brand mb-4">ATK</h3>
            <p className="text-gray-400 mb-4">
              Premium clothing brand offering stylish and comfortable apparel for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=T-Shirts" className="text-gray-400 hover:text-white">T-Shirts</Link>
              </li>
              <li>
                <Link to="/products?category=Hoodies" className="text-gray-400 hover:text-white">Hoodies</Link>
              </li>
              <li>
                <Link to="/products?category=Jackets" className="text-gray-400 hover:text-white">Jackets</Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-gray-400 hover:text-white">Accessories</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">All Products</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-wrap justify-center space-x-6">
            <FaCreditCard size={24} className="text-gray-400" />
            <FaPaypal size={24} className="text-gray-400" />
            <FaApplePay size={24} className="text-gray-400" />
            <FaGooglePay size={24} className="text-gray-400" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm pt-4 border-t border-gray-800">
          <p>&copy; {currentYear} ATK Clothing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
