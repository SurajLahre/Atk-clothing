import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../features/product/productSlice';
import { FaPlus, FaTimes } from 'react-icons/fa';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: [''],
    sizes: [],
    colors: [],
    inStock: true,
    featured: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available options
  const categoryOptions = ['T-Shirts', 'Hoodies', 'Jackets', 'Accessories'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const colorOptions = ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Yellow', 'Maroon', 'Brown'];

  // Initialize form with product data if editing
  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        images: product.images || [''],
        sizes: product.sizes || [],
        colors: product.colors || [],
        inStock: product.inStock !== undefined ? product.inStock : true,
        featured: product.featured || false,
      });
    }
  }, [product, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ''],
    });
  };

  const removeImageField = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages.length ? updatedImages : [''],
    });
  };

  const handleSizeToggle = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  const handleColorToggle = (color) => {
    const updatedColors = formData.colors.includes(color)
      ? formData.colors.filter(c => c !== color)
      : [...formData.colors, color];
    
    setFormData({
      ...formData,
      colors: updatedColors,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.images[0].trim()) {
      newErrors.images = 'At least one image URL is required';
    }
    
    if (formData.sizes.length === 0) {
      newErrors.sizes = 'At least one size must be selected';
    }
    
    if (formData.colors.length === 0) {
      newErrors.colors = 'At least one color must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format data for submission
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.filter(img => img.trim()),
      };
      
      if (isEditing) {
        // Update existing product
        dispatch(updateProduct({
          id: product.id,
          ...productData,
        }));
      } else {
        // Add new product
        dispatch(addProduct(productData));
      }
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({
        submit: 'There was an error saving the product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Product Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Product Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Product Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Price and Category */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
          >
            <option value="">Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Product Images */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Images *
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Enter image URL"
                className={`flex-1 rounded-md border ${
                  errors.images && index === 0 ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                disabled={formData.images.length === 1}
                className="ml-2 p-2 text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 flex items-center text-sm text-atku-brand hover:text-accent-dark"
          >
            <FaPlus className="mr-1" /> Add Another Image
          </button>
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images}</p>
          )}
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Sizes *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-2 px-3 rounded-md border ${
                  formData.sizes.includes(size)
                    ? 'bg-atku-brand text-white border-atku-brand'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && (
            <p className="mt-1 text-sm text-red-600">{errors.sizes}</p>
          )}
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Colors *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorToggle(color)}
                className={`py-2 px-3 rounded-md border ${
                  formData.colors.includes(color)
                    ? 'bg-atku-brand text-white border-atku-brand'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          {errors.colors && (
            <p className="mt-1 text-sm text-red-600">{errors.colors}</p>
          )}
        </div>

        {/* Stock and Featured Status */}
        <div className="md:col-span-2 flex space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
              In Stock
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Featured Product
            </label>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-atku-brand"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-atku-brand hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-atku-brand disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Saving...'
            : isEditing
            ? 'Update Product'
            : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
