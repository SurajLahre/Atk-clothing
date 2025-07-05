import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
      })
    );
  };

  return (
    <div className="card group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quick Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 px-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="w-full text-center font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-atku-brand transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">
          {product.category}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>

          {/* Color Options Preview */}
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  backgroundColor: color.toLowerCase(),
                  background: color.toLowerCase() === 'white' ? 'white' : color.toLowerCase(),
                }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
