import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaCog, FaStore, FaShippingFast, FaCreditCard, FaEnvelope, FaBell, FaCheck } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'ATKU',
    storeEmail: 'contact@atku.com',
    storePhone: '(123) 456-7890',
    storeCurrency: 'INR',
    storeLanguage: 'en',
    storeAddress: '123 Fashion St, Mumbai, Maharashtra 400001',
    storeCountry: 'India'
  });

  // Shipping settings state
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 3750,
    shippingFlatRate: 449,
    shippingTaxRate: 0,
    enableInternationalShipping: false,
    internationalShippingRate: 1199
  });

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enablePaypal: true,
    enableCashOnDelivery: true,
    enableApplePay: false,
    enableGooglePay: false,
    taxRate: 8.5
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    newCustomerRegistration: true,
    marketingEmails: false
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingSettings({
      ...shippingSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, this would save to a backend API
    console.log('Saving settings...');
    console.log('General:', generalSettings);
    console.log('Shipping:', shippingSettings);
    console.log('Payment:', paymentSettings);
    console.log('Notifications:', notificationSettings);

    // Show success message
    setSaveSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'general'
                  ? 'text-atku-brand border-b-2 border-atku-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('general')}
            >
              <FaStore className="inline-block mr-2" />
              General
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'text-atku-brand border-b-2 border-atku-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              <FaShippingFast className="inline-block mr-2" />
              Shipping
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'payment'
                  ? 'text-atku-brand border-b-2 border-atku-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('payment')}
            >
              <FaCreditCard className="inline-block mr-2" />
              Payment
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'text-atku-brand border-b-2 border-atku-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell className="inline-block mr-2" />
              Notifications
            </button>
          </div>

          {/* Settings Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">General Settings</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        id="storeName"
                        name="storeName"
                        value={generalSettings.storeName}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div>
                      <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Email
                      </label>
                      <input
                        type="email"
                        id="storeEmail"
                        name="storeEmail"
                        value={generalSettings.storeEmail}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div>
                      <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Phone
                      </label>
                      <input
                        type="text"
                        id="storePhone"
                        name="storePhone"
                        value={generalSettings.storePhone}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div>
                      <label htmlFor="storeCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        id="storeCurrency"
                        name="storeCurrency"
                        value={generalSettings.storeCurrency}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      >
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="storeLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        id="storeLanguage"
                        name="storeLanguage"
                        value={generalSettings.storeLanguage}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Address
                      </label>
                      <input
                        type="text"
                        id="storeAddress"
                        name="storeAddress"
                        value={generalSettings.storeAddress}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div>
                      <label htmlFor="storeCountry" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="storeCountry"
                        name="storeCountry"
                        value={generalSettings.storeCountry}
                        onChange={handleGeneralChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="UAE">UAE</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Shipping Settings</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                        Free Shipping Threshold (₹)
                      </label>
                      <input
                        type="number"
                        id="freeShippingThreshold"
                        name="freeShippingThreshold"
                        value={shippingSettings.freeShippingThreshold}
                        onChange={handleShippingChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Orders above this amount qualify for free shipping
                      </p>
                    </div>

                    <div>
                      <label htmlFor="shippingFlatRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Flat Rate Shipping (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="shippingFlatRate"
                        name="shippingFlatRate"
                        value={shippingSettings.shippingFlatRate}
                        onChange={handleShippingChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div>
                      <label htmlFor="shippingTaxRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id="shippingTaxRate"
                        name="shippingTaxRate"
                        value={shippingSettings.shippingTaxRate}
                        onChange={handleShippingChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableInternationalShipping"
                        name="enableInternationalShipping"
                        checked={shippingSettings.enableInternationalShipping}
                        onChange={handleShippingChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enableInternationalShipping" className="ml-2 block text-sm text-gray-700">
                        Enable International Shipping
                      </label>
                    </div>

                    {shippingSettings.enableInternationalShipping && (
                      <div>
                        <label htmlFor="internationalShippingRate" className="block text-sm font-medium text-gray-700 mb-1">
                          International Shipping Rate (₹)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          id="internationalShippingRate"
                          name="internationalShippingRate"
                          value={shippingSettings.internationalShippingRate}
                          onChange={handleShippingChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Payment Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableCreditCard"
                        name="enableCreditCard"
                        checked={paymentSettings.enableCreditCard}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enableCreditCard" className="ml-2 block text-sm text-gray-700">
                        Accept Credit Card Payments
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enablePaypal"
                        name="enablePaypal"
                        checked={paymentSettings.enablePaypal}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enablePaypal" className="ml-2 block text-sm text-gray-700">
                        Accept PayPal Payments
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableCashOnDelivery"
                        name="enableCashOnDelivery"
                        checked={paymentSettings.enableCashOnDelivery}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enableCashOnDelivery" className="ml-2 block text-sm text-gray-700">
                        Accept Cash on Delivery
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableApplePay"
                        name="enableApplePay"
                        checked={paymentSettings.enableApplePay}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enableApplePay" className="ml-2 block text-sm text-gray-700">
                        Accept Apple Pay
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableGooglePay"
                        name="enableGooglePay"
                        checked={paymentSettings.enableGooglePay}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="enableGooglePay" className="ml-2 block text-sm text-gray-700">
                        Accept Google Pay
                      </label>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id="taxRate"
                        name="taxRate"
                        value={paymentSettings.taxRate}
                        onChange={handlePaymentChange}
                        className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atku-brand"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderConfirmation"
                        name="orderConfirmation"
                        checked={notificationSettings.orderConfirmation}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="orderConfirmation" className="ml-2 block text-sm text-gray-700">
                        Order Confirmation Emails
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderShipped"
                        name="orderShipped"
                        checked={notificationSettings.orderShipped}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="orderShipped" className="ml-2 block text-sm text-gray-700">
                        Order Shipped Notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="orderDelivered"
                        name="orderDelivered"
                        checked={notificationSettings.orderDelivered}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="orderDelivered" className="ml-2 block text-sm text-gray-700">
                        Order Delivered Notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lowStockAlert"
                        name="lowStockAlert"
                        checked={notificationSettings.lowStockAlert}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="lowStockAlert" className="ml-2 block text-sm text-gray-700">
                        Low Stock Alerts
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newCustomerRegistration"
                        name="newCustomerRegistration"
                        checked={notificationSettings.newCustomerRegistration}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="newCustomerRegistration" className="ml-2 block text-sm text-gray-700">
                        New Customer Registration Alerts
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="marketingEmails"
                        name="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-atku-brand focus:ring-atku-brand border-gray-300 rounded"
                      />
                      <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                        Send Marketing Emails to Customers
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors"
                >
                  <FaCog className="inline-block mr-2" />
                  Save Settings
                </button>

                {saveSuccess && (
                  <div className="ml-4 text-green-600 flex items-center">
                    <FaCheck className="mr-1" />
                    Settings saved successfully!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
