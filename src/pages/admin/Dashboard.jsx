import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  selectAllProducts,
  selectFeaturedProducts
} from '../../features/product/productSlice';
import {
  selectAllOrders,
  selectOrdersByStatus,
  selectRecentOrders
} from '../../features/order/orderSlice';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Dashboard = () => {
  const products = useSelector(selectAllProducts);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const orders = useSelector(selectAllOrders);
  const pendingOrders = useSelector((state) => selectOrdersByStatus(state, 'pending'));
  const recentOrders = useSelector((state) => selectRecentOrders(state, 5));

  // Calculate total revenue
  const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);

  // Calculate low stock products (for demo purposes, we'll consider < 10 as low stock)
  const lowStockProducts = products.filter(product => !product.inStock);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaBox className="text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-800">
                View all products
              </Link>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaShoppingCart className="text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/orders" className="text-sm text-green-600 hover:text-green-800">
                View all orders
              </Link>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaDollarSign className="text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-sm text-green-500">12% from last month</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/orders?status=pending" className="text-sm text-yellow-600 hover:text-yellow-800">
                View pending orders
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders and Low Stock Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">
                  No orders yet
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link to="/admin/orders" className="text-sm text-atku-brand hover:text-accent-dark">
                View all orders
              </Link>
            </div>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Out of Stock Products</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="px-6 py-4 flex items-center">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover object-center rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">
                  No out of stock products
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link to="/admin/products" className="text-sm text-atku-brand hover:text-accent-dark">
                Manage inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
