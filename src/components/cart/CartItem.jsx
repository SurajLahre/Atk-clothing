import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      dispatch(
        updateQuantity({
          id: item.id,
          size: item.size,
          color: item.color,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-6">
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Title and Attributes */}
          <div className="mb-4 sm:mb-0">
            <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-atku-brand">
              {item.title}
            </Link>
            <div className="mt-1 text-sm text-gray-600">
              <span className="mr-4">Size: {item.size}</span>
              <span>Color: {item.color}</span>
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {formatCurrency(item.price)}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end">
            <div className="flex items-center mb-2">
              <label htmlFor={`quantity-${item.id}-${item.size}-${item.color}`} className="sr-only">
                Quantity
              </label>
              <select
                id={`quantity-${item.id}-${item.size}-${item.color}`}
                value={item.quantity}
                onChange={handleQuantityChange}
                className="rounded-md border border-gray-300 text-base py-1 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-atku-brand"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <FaTrash className="mr-1" />
              <span className="text-sm">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
