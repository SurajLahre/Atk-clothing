import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '../features/cart/cartSlice';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { formatCurrency } from '../utils/formatCurrency';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotalAmount);

  // Calculate shipping cost (free shipping over ₹3,750)
  const shippingCost = cartTotal >= 3750 ? 0 : 449;  // ₹449

  // Calculate tax (8.5%)
  const taxRate = 0.085;
  const taxAmount = cartTotal * taxRate;

  // Calculate order total
  const orderTotal = cartTotal + shippingCost + taxAmount;

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
              <FaShoppingCart className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="btn btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Cart Header */}
                <div className="pb-4 border-b border-gray-200 mb-6">
                  <h2 className="text-xl font-medium text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                {/* Cart Items List */}
                <div className="space-y-0">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.size}-${item.color}`}
                      item={item}
                    />
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-8">
                  <Link
                    to="/products"
                    className="inline-flex items-center text-atku-brand hover:text-accent-dark"
                  >
                    <FaArrowLeft className="mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

                {/* Subtotal */}
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(cartTotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax (8.5%)</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(taxAmount)}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(orderTotal)}</span>
                </div>

                {/* Free Shipping Notice */}
                {cartTotal < 3750 && (
                  <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-6">
                    Add {formatCurrency(3750 - cartTotal)} more to qualify for free shipping!
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full btn btn-primary flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
