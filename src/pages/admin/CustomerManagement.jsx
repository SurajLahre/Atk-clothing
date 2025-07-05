import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaSearch, FaEye, FaEnvelope, FaPhone, FaShoppingBag } from 'react-icons/fa';

// Mock customer data (in a real app, this would come from an API or Redux store)
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    totalOrders: 5,
    totalSpent: 349.95,
    lastOrderDate: '2023-06-15T14:30:00Z',
    createdAt: '2023-01-10T09:15:00Z',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(234) 567-8901',
    totalOrders: 3,
    totalSpent: 189.50,
    lastOrderDate: '2023-05-22T11:45:00Z',
    createdAt: '2023-02-05T14:20:00Z',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States'
    }
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(345) 678-9012',
    totalOrders: 8,
    totalSpent: 629.75,
    lastOrderDate: '2023-06-18T09:30:00Z',
    createdAt: '2022-11-15T10:30:00Z',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'United States'
    }
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(456) 789-0123',
    totalOrders: 2,
    totalSpent: 119.90,
    lastOrderDate: '2023-04-30T16:20:00Z',
    createdAt: '2023-03-20T08:45:00Z',
    address: {
      street: '321 Elm St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'United States'
    }
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '(567) 890-1234',
    totalOrders: 6,
    totalSpent: 459.85,
    lastOrderDate: '2023-06-10T13:15:00Z',
    createdAt: '2022-12-05T11:10:00Z',
    address: {
      street: '654 Maple Ave',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'United States'
    }
  }
];

// Mock orders data
const mockOrders = [
  {
    id: 'ord-001',
    customerId: '1',
    date: '2023-06-15T14:30:00Z',
    total: 129.99,
    status: 'delivered',
    items: [
      { id: 'prod-1', name: 'ATKU Classic T-Shirt', quantity: 2, price: 29.99 },
      { id: 'prod-3', name: 'ATKU Denim Jacket', quantity: 1, price: 79.99 }
    ]
  },
  {
    id: 'ord-002',
    customerId: '1',
    date: '2023-05-20T10:15:00Z',
    total: 49.99,
    status: 'delivered',
    items: [
      { id: 'prod-2', name: 'ATKU Hoodie', quantity: 1, price: 49.99 }
    ]
  },
  {
    id: 'ord-003',
    customerId: '2',
    date: '2023-05-22T11:45:00Z',
    total: 189.50,
    status: 'delivered',
    items: [
      { id: 'prod-2', name: 'ATKU Hoodie', quantity: 1, price: 49.99 },
      { id: 'prod-3', name: 'ATKU Denim Jacket', quantity: 1, price: 79.99 },
      { id: 'prod-4', name: 'ATKU Cap', quantity: 1, price: 24.99 },
      { id: 'prod-1', name: 'ATKU Classic T-Shirt', quantity: 1, price: 29.99 }
    ]
  },
  {
    id: 'ord-004',
    customerId: '3',
    date: '2023-06-18T09:30:00Z',
    total: 159.97,
    status: 'shipped',
    items: [
      { id: 'prod-1', name: 'ATKU Classic T-Shirt', quantity: 2, price: 29.99 },
      { id: 'prod-4', name: 'ATKU Cap', quantity: 4, price: 24.99 }
    ]
  }
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  
  // Load mock data
  useEffect(() => {
    setCustomers(mockCustomers);
  }, []);
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    
    // Get customer orders
    const orders = mockOrders.filter(order => order.customerId === customer.id);
    setCustomerOrders(orders);
  };
  
  const closeCustomerDetails = () => {
    setSelectedCustomer(null);
    setCustomerOrders([]);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atku-brand focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                        <div className="text-sm text-gray-500">Last order: {formatDate(customer.lastOrderDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(customer.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Customer Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900">
                Customer Details
              </h2>
              <button
                onClick={closeCustomerDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-900 mb-1">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-600 flex items-center mb-1">
                    <FaEnvelope className="mr-2 text-gray-400" /> {selectedCustomer.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaPhone className="mr-2 text-gray-400" /> {selectedCustomer.phone}
                  </p>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Address</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">{selectedCustomer.address.street}</p>
                  <p className="text-sm text-gray-600">
                    {selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{selectedCustomer.address.country}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer Since</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedCustomer.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-sm font-medium text-gray-900">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-sm font-medium text-gray-900">${selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Order</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedCustomer.lastOrderDate)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-2">
                  <button className="px-4 py-2 bg-atku-brand text-white rounded-md hover:bg-accent-dark transition-colors">
                    <FaEnvelope className="inline-block mr-2" />
                    Email Customer
                  </button>
                </div>
              </div>
            </div>
            
            {/* Customer Orders */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaShoppingBag className="mr-2" />
                Order History
              </h3>
              
              {customerOrders.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
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
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(order.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.items.reduce((total, item) => total + item.quantity, 0)} items
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.items.map(item => item.name).join(', ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No order history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
