import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllOrders } from '../../features/order/orderSlice';
import { selectAllProducts } from '../../features/product/productSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaCalendarAlt,
  FaBoxOpen,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

// Mock data for analytics
const mockCustomers = [
  { id: '1', name: 'John Doe', totalSpent: 26246.25 },  // ₹26,246.25
  { id: '2', name: 'Jane Smith', totalSpent: 14212.50 },  // ₹14,212.50
  { id: '3', name: 'Robert Johnson', totalSpent: 47231.25 },  // ₹47,231.25
  { id: '4', name: 'Emily Davis', totalSpent: 8992.50 },  // ₹8,992.50
  { id: '5', name: 'Michael Wilson', totalSpent: 34488.75 }  // ₹34,488.75
];

const Analytics = () => {
  const orders = useSelector(selectAllOrders);
  const products = useSelector(selectAllProducts);

  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'

  // Calculate analytics data
  const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top selling products (in a real app, this would be calculated from order items)
  const topSellingProducts = products
    .slice(0, 5)
    .map(product => ({
      id: product.id,
      name: product.title,
      category: product.category,
      sales: Math.floor(Math.random() * 50) + 1, // Random sales for demo
      revenue: (Math.floor(Math.random() * 50) + 1) * product.price
    }))
    .sort((a, b) => b.sales - a.sales);

  // Top customers
  const topCustomers = mockCustomers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  // Sales by category (in a real app, this would be calculated from order items)
  const salesByCategory = {
    'T-Shirts': 93806.25,  // ₹93,806.25
    'Hoodies': 175537.50,  // ₹175,537.50
    'Jackets': 234018.75,  // ₹234,018.75
    'Accessories': 66772.50  // ₹66,772.50
  };

  // Monthly sales data (in a real app, this would be calculated from orders)
  const monthlySalesData = [
    { month: 'Jan', revenue: 90000 },  // ₹90,000
    { month: 'Feb', revenue: 142500 },  // ₹142,500
    { month: 'Mar', revenue: 112500 },  // ₹112,500
    { month: 'Apr', revenue: 157500 },  // ₹157,500
    { month: 'May', revenue: 180000 },  // ₹180,000
    { month: 'Jun', revenue: 135000 },  // ₹135,000
    { month: 'Jul', revenue: 165000 },  // ₹165,000
    { month: 'Aug', revenue: 195000 },  // ₹195,000
    { month: 'Sep', revenue: 172500 },  // ₹172,500
    { month: 'Oct', revenue: 202500 },  // ₹202,500
    { month: 'Nov', revenue: 187500 },  // ₹187,500
    { month: 'Dec', revenue: 225000 }   // ₹225,000
  ];

  // This is now imported from utils/formatCurrency.js

  // Get percentage change (for demo purposes)
  const getPercentageChange = () => {
    return (Math.random() * 20 - 5).toFixed(1); // Random value between -5% and +15%
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-white rounded-md shadow-sm p-1">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === 'week'
                  ? 'bg-atku-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === 'month'
                  ? 'bg-atku-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === 'year'
                  ? 'bg-atku-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Year
            </button>
            <div className="pl-2 border-l border-gray-200">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <FaCalendarAlt />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaDollarSign className="text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              {parseFloat(getPercentageChange()) > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{getPercentageChange()}% from last {timeRange}</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-sm text-red-500">{Math.abs(parseFloat(getPercentageChange()))}% from last {timeRange}</span>
                </>
              )}
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaShoppingCart className="text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              {parseFloat(getPercentageChange()) > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{getPercentageChange()}% from last {timeRange}</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-sm text-red-500">{Math.abs(parseFloat(getPercentageChange()))}% from last {timeRange}</span>
                </>
              )}
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Average Order Value</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaChartLine className="text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              {parseFloat(getPercentageChange()) > 0 ? (
                <>
                  <FaArrowUp className="text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{getPercentageChange()}% from last {timeRange}</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-500 mr-1" />
                  <span className="text-sm text-red-500">{Math.abs(parseFloat(getPercentageChange()))}% from last {timeRange}</span>
                </>
              )}
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FaBoxOpen className="text-xl" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">{products.filter(p => p.inStock).length} in stock</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaChartArea className="mr-2 text-atku-brand" />
                Revenue Over Time
              </h3>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {monthlySalesData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center mx-1">
                      <div
                        className="w-6 bg-atku-brand rounded-t-sm"
                        style={{
                          height: `${(data.revenue / 225000) * 150}px`,
                          backgroundColor: data.revenue > 187500 ? '#3B82F6' : data.revenue > 150000 ? '#60A5FA' : '#93C5FD'
                        }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">{data.month}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Monthly Revenue Chart</p>
              </div>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaChartPie className="mr-2 text-atku-brand" />
                Sales by Category
              </h3>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-50 rounded-md p-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Pie Chart Placeholder */}
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-atku-brand relative">
                    <div className="absolute inset-0 border-8 border-l-transparent border-b-transparent border-r-transparent rounded-full" style={{ borderTopColor: '#60A5FA' }}></div>
                    <div className="absolute inset-0 border-8 border-l-transparent border-b-transparent border-t-transparent rounded-full" style={{ borderRightColor: '#93C5FD' }}></div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col justify-center">
                  {Object.entries(salesByCategory).map(([category, sales], index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: index === 0 ? '#3B82F6' :
                                          index === 1 ? '#60A5FA' :
                                          index === 2 ? '#93C5FD' : '#BFDBFE'
                        }}
                      ></div>
                      <div className="flex-1 text-sm text-gray-700">{category}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(sales)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products and Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaChartBar className="mr-2 text-atku-brand" />
                Top Selling Products
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {topSellingProducts.map((product, index) => (
                <div key={product.id} className="px-6 py-4 flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.sales} sold</p>
                    <p className="text-sm text-gray-500">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaUsers className="mr-2 text-atku-brand" />
                Top Customers
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="px-6 py-4 flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
