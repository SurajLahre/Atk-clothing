import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFeaturedProducts } from '../features/product/productSlice';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const featuredProducts = useSelector(selectFeaturedProducts);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the ATK Collection
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Premium clothing designed for comfort and style. Elevate your wardrobe with our latest collection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="btn btn-primary"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="btn btn-secondary"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="ATK Collection"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* T-Shirts */}
            <Link to="/products?category=T-Shirts" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="T-Shirts"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">T-Shirts</h3>
                    <p className="text-gray-200 text-sm">Classic designs for everyday wear</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hoodies */}
            <Link to="/products?category=Hoodies" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Hoodies"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Hoodies</h3>
                    <p className="text-gray-200 text-sm">Stay warm in style</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Jackets */}
            <Link to="/products?category=Jackets" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Jackets"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Jackets</h3>
                    <p className="text-gray-200 text-sm">Premium outerwear collection</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Accessories */}
            <Link to="/products?category=Accessories" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Accessories"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Accessories</h3>
                    <p className="text-gray-200 text-sm">Complete your look</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-atku-brand hover:text-accent-dark flex items-center">
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Brand Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="About ATKU"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">About ATK</h2>
              <p className="text-gray-700 mb-6">
                ATK was founded with a simple mission: to create high-quality clothing that combines style, comfort, and sustainability. Our designs are inspired by modern urban aesthetics while maintaining a timeless appeal.
              </p>
              <p className="text-gray-700 mb-6">
                We believe in ethical manufacturing and use premium materials to ensure our products stand the test of time. Each piece in our collection is crafted with attention to detail and a commitment to excellence.
              </p>
              <Link to="/about" className="btn btn-primary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-atku-brand text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, special offers, and exclusive content.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
