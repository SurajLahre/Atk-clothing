import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, selectFilters } from '../../features/product/productSlice';
import { FaFilter, FaTimes } from 'react-icons/fa';

const ProductFilter = ({ categories }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleCategoryChange = (category) => {
    setLocalFilters({
      ...localFilters,
      category: category === localFilters.category ? null : category,
    });
  };

  const handlePriceChange = (e, bound) => {
    const value = parseInt(e.target.value, 10) || 0;
    setLocalFilters({
      ...localFilters,
      priceRange: {
        ...localFilters.priceRange,
        [bound]: value,
      },
    });
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-6">
      {/* Mobile Filter Button */}
      <button
        className="md:hidden w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 rounded-md"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FaFilter />
        <span>Filter Products</span>
      </button>

      {/* Filter Panel */}
      <div
        className={`${
          isFilterOpen ? 'block' : 'hidden md:block'
        } bg-white p-4 rounded-lg shadow-md mt-4 md:mt-0`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          {isFilterOpen && (
            <button
              className="md:hidden text-gray-500"
              onClick={() => setIsFilterOpen(false)}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={localFilters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="block text-sm text-gray-700 mb-1">
                Min ($)
              </label>
              <input
                type="number"
                id="min-price"
                min="0"
                value={localFilters.priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-atku-brand"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm text-gray-700 mb-1">
                Max ($)
              </label>
              <input
                type="number"
                id="max-price"
                min="0"
                value={localFilters.priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-atku-brand"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleApplyFilters}
            className="flex-1 bg-atku-brand text-white py-2 px-4 rounded-md hover:bg-accent-dark transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
