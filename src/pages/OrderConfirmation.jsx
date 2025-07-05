import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/order/orderSlice';
import Layout from '../components/layout/Layout';
import { FaCheckCircle, FaBox, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const currentOrder = useSelector(selectCurrentOrder);
  
  // If no current order, redirect to home
  if (!currentOrder) {
    return <Navigate to="/" />;
  }
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Estimated delivery date (7 days from order date)
  const estimatedDelivery = new Date(currentOrder.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-green-100 mb-4">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>
        
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Order Details</h2>
              <p className="text-gray-600">Order #{currentOrder.id.slice(0, 8)}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600">Order Date: {formatDate(currentOrder.createdAt)}</p>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {currentOrder.items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      Size: {item.size}, Color: {item.color}, Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">{currentOrder.customer.name}</p>
                <p className="text-gray-600">{currentOrder.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{currentOrder.shippingAddress.country}</p>
                <p className="text-gray-600 mt-2">{currentOrder.customer.phone}</p>
              </div>
            </div>
            
            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">Payment Method</p>
                <p className="text-gray-600 capitalize">{currentOrder.paymentMethod.replace('-', ' ')}</p>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${currentOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {currentOrder.totalAmount >= 50 ? 'Free' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(currentOrder.totalAmount * 0.085).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${(
                      currentOrder.totalAmount +
                      (currentOrder.totalAmount >= 50 ? 0 : 5.99) +
                      currentOrder.totalAmount * 0.085
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tracking Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Information</h3>
          
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Steps */}
            <div className="space-y-8">
              {/* Order Confirmed */}
              <div className="relative flex items-start">
                <div className="absolute left-0 rounded-full bg-atku-brand p-2">
                  <FaCheckCircle className="text-white" />
                </div>
                <div className="ml-16">
                  <h4 className="text-sm font-medium text-gray-900">Order Confirmed</h4>
                  <p className="text-sm text-gray-600">{formatDate(currentOrder.createdAt)}</p>
                </div>
              </div>
              
              {/* Processing */}
              <div className="relative flex items-start">
                <div className="absolute left-0 rounded-full bg-gray-200 p-2">
                  <FaBox className="text-gray-500" />
                </div>
                <div className="ml-16">
                  <h4 className="text-sm font-medium text-gray-500">Processing</h4>
                  <p className="text-sm text-gray-500">Your order is being processed</p>
                </div>
              </div>
              
              {/* Shipped */}
              <div className="relative flex items-start">
                <div className="absolute left-0 rounded-full bg-gray-200 p-2">
                  <FaTruck className="text-gray-500" />
                </div>
                <div className="ml-16">
                  <h4 className="text-sm font-medium text-gray-500">Shipped</h4>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
              
              {/* Delivered */}
              <div className="relative flex items-start">
                <div className="absolute left-0 rounded-full bg-gray-200 p-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                </div>
                <div className="ml-16">
                  <h4 className="text-sm font-medium text-gray-500">Delivered</h4>
                  <p className="text-sm text-gray-500">
                    Estimated: {formatDate(estimatedDelivery)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn btn-secondary">
            View All Orders
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
