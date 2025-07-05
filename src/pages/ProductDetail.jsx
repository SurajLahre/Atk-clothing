import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import Layout from '../components/layout/Layout';
import ProductGallery from '../components/products/ProductGallery';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { formatCurrency } from '../utils/formatCurrency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
    }
  }, [product]);

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null; // Will redirect in useEffect
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }

    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    setError('');

    dispatch(
      addToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );

    // Show success message or open cart drawer
    // For now, we'll just navigate to the cart
    navigate('/cart');
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div>
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-4">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" className="hover:text-atku-brand">Home</a>
                </li>
                <li>/</li>
                <li>
                  <a href="/products" className="hover:text-atku-brand">Products</a>
                </li>
                <li>/</li>
                <li>
                  <a href={`/products?category=${product.category}`} className="hover:text-atku-brand">
                    {product.category}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Product Title and Price */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-atku-brand mb-4">{formatCurrency(product.price)}</p>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">Size</h3>
                <a href="/size-guide" className="text-sm text-atku-brand hover:text-accent-dark">
                  Size Guide
                </a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`py-2 rounded-md border ${
                      selectedSize === size
                        ? 'bg-atku-brand text-white border-atku-brand'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Color</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`py-2 rounded-md border ${
                      selectedColor === color
                        ? 'bg-atku-brand text-white border-atku-brand'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                />
                <button
                  type="button"
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center py-3 px-6 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart className="mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                type="button"
                className="flex-1 sm:flex-none flex items-center justify-center py-3 px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FaHeart className="mr-2" />
                Wishlist
              </button>

              <button
                type="button"
                className="flex-1 sm:flex-none flex items-center justify-center py-3 px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FaShare className="mr-2" />
                Share
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>Category: {product.category}</li>
                  <li>Available Colors: {product.colors.join(', ')}</li>
                  <li>Available Sizes: {product.sizes.join(', ')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Shipping & Returns</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Free shipping on orders over ₹3,750. Free returns within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
