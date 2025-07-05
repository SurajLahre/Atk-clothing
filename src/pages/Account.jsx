import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUserSuccess } from '../features/auth/authSlice';
import { selectAllOrders } from '../features/order/orderSlice';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaAddressCard, FaKey, FaCheck } from 'react-icons/fa';

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectAllOrders);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    address: user?.address?.address || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'United States'
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateAddressForm = () => {
    const newErrors = {};
    
    if (!addressForm.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!addressForm.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!addressForm.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!addressForm.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    // In a real app, this would make an API call to update the user profile
    dispatch(updateUserSuccess({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    }));
    
    showUpdateSuccess();
  };
  
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    if (!validateAddressForm()) {
      return;
    }
    
    // In a real app, this would make an API call to update the user address
    dispatch(updateUserSuccess({
      address: addressForm
    }));
    
    showUpdateSuccess();
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    // In a real app, this would make an API call to update the user password
    // For demo purposes, we'll just show a success message
    
    // Reset password form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    showUpdateSuccess();
  };
  
  const showUpdateSuccess = () => {
    setUpdateSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setUpdateSuccess(false);
    }, 3000);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Filter orders for the current user
  const userOrders = orders.filter(order => order.customer.id === user?.id);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-atku-brand text-white flex items-center justify-center">
                    <FaUser />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    activeTab === 'profile'
                      ? 'bg-gray-100 text-atku-brand font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaUser className="inline-block mr-2" />
                  Profile Information
                </button>
                
                <button
                  onClick={() => setActiveTab('address')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    activeTab === 'address'
                      ? 'bg-gray-100 text-atku-brand font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaAddressCard className="inline-block mr-2" />
                  Address
                </button>
                
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    activeTab === 'password'
                      ? 'bg-gray-100 text-atku-brand font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaKey className="inline-block mr-2" />
                  Change Password
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                    activeTab === 'orders'
                      ? 'bg-gray-100 text-atku-brand font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaShoppingBag className="inline-block mr-2" />
                  Order History
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Success Message */}
              {updateSuccess && (
                <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                  <FaCheck className="mr-2" />
                  Your information has been updated successfully!
                </div>
              )}
              
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className={`w-full border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className={`w-full border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              )}
              
              {/* Address */}
              {activeTab === 'address' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Address Information</h2>
                  
                  <form onSubmit={handleAddressSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          className={`w-full border ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          className={`w-full border ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          className={`w-full border ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={addressForm.zipCode}
                          onChange={handleAddressChange}
                          className={`w-full border ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
                    >
                      Update Address
                    </button>
                  </form>
                </div>
              )}
              
              {/* Change Password */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                  
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className={`w-full border ${
                            errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className={`w-full border ${
                            errors.newPassword ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className={`w-full border ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand`}
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
              
              {/* Order History */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order History</h2>
                  
                  {userOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {userOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  to={`/order-confirmation/${order.id}`}
                                  className="text-atku-brand hover:text-accent-dark"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-md">
                      <FaShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Link
                        to="/products"
                        className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
