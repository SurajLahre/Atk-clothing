import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../features/auth/authSlice';
import { selectAllOrders } from '../features/order/orderSlice';
import Layout from '../components/layout/Layout';
import { FaShoppingBag, FaEye, FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Orders = () => {
  const user = useSelector(selectUser);
  const orders = useSelector(selectAllOrders);
  
  // Filter orders for the current user
  const userOrders = orders.filter(order => order.customer.id === user?.id);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaShoppingBag className="text-yellow-500" />;
      case 'processing':
        return <FaBoxOpen className="text-blue-500" />;
      case 'shipped':
        return <FaShippingFast className="text-indigo-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaShoppingBag className="text-gray-500" />;
    }
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
        
        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <div className="flex items-center mr-4">
                        {getStatusIcon(order.status)}
                        <span className="ml-2 text-sm font-medium capitalize">
                          {order.status}
                        </span>
                      </div>
                      <Link
                        to={`/order-confirmation/${order.id}`}
                        className="text-atku-brand hover:text-accent-dark text-sm font-medium flex items-center"
                      >
                        <FaEye className="mr-1" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                              <p className="text-sm text-gray-500">
                                Size: {item.size}, Color: {item.color}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center">
                              <p className="text-sm text-gray-500 mr-4">Qty: {item.quantity}</p>
                              <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-500 mr-2">Payment Method:</p>
                    <p className="text-sm font-medium capitalize">{order.paymentMethod.replace('-', ' ')}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-500 inline-block mr-2">Total:</p>
                    <p className="text-lg font-bold text-gray-900 inline-block">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FaShoppingBag className="mx-auto text-gray-400 text-5xl mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
