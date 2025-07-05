import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
  selectFilteredProducts, 
  selectFilters, 
  setFilters 
} from '../features/product/productSlice';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';

const ProductListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector(selectFilteredProducts);
  const filters = useSelector(selectFilters);
  
  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam && categoryParam !== filters.category) {
      dispatch(setFilters({ category: categoryParam }));
    }
  }, [location.search, dispatch, filters.category]);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <ProductFilter categories={categories} />
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
