import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount } from '../../features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderSummary = () => {
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
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

      {/* Items Summary */}
      <div className="space-y-3 mb-6">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
            <div className="flex-1">
              <p className="text-gray-700">
                {item.title} ({item.size}, {item.color})
              </p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-gray-900 font-medium">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Subtotal */}
      <div className="flex justify-between mb-2">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-900 font-medium">{formatCurrency(cartTotal)}</p>
      </div>

      {/* Shipping */}
      <div className="flex justify-between mb-2">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-900 font-medium">
          {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
        </p>
      </div>

      {/* Tax */}
      <div className="flex justify-between mb-2">
        <p className="text-gray-700">Tax (8.5%)</p>
        <p className="text-gray-900 font-medium">{formatCurrency(taxAmount)}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Total */}
      <div className="flex justify-between mb-6">
        <p className="text-lg font-medium text-gray-900">Total</p>
        <p className="text-lg font-bold text-gray-900">{formatCurrency(orderTotal)}</p>
      </div>

      {/* Free Shipping Notice */}
      {cartTotal < 3750 && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-6">
          Add {formatCurrency(3750 - cartTotal)} more to qualify for free shipping!
        </div>
      )}

      {/* Back to Cart Link */}
      <div className="text-center">
        <Link to="/cart" className="text-atku-brand hover:text-accent-dark text-sm font-medium">
          Edit Cart
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
