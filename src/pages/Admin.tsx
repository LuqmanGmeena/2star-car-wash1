import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CreditCard, 
  Settings, 
  Bell,
  TrendingUp,
  Car,
  Clock,
  DollarSign
} from 'lucide-react';
import PaymentManagement from '../components/PaymentManagement';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: 'TZSH 2,450,000',
      change: '+12.5%',
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: 'green'
    },
    {
      title: 'Total Bookings',
      value: '156',
      change: '+8.2%',
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+15.3%',
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: 'purple'
    },
    {
      title: 'Services Completed',
      value: '142',
      change: '+6.7%',
      icon: <Car className="h-8 w-8 text-orange-600" />,
      color: 'orange'
    }
  ];

  const recentBookings = [
    {
      id: '2SW-123456',
      customer: 'Mwijaku Hassan',
      service: 'VIP Complete Package',
      status: 'completed',
      amount: 100000,
      time: '2 hours ago'
    },
    {
      id: '2SW-789012',
      customer: 'Amina Juma',
      service: 'Exterior Wash',
      status: 'in-progress',
      amount: 10000,
      time: '30 minutes ago'
    },
    {
      id: '2SW-345678',
      customer: 'Hassan Mwinyimkuu',
      service: 'Interior Cleaning',
      status: 'pending',
      amount: 15000,
      time: '1 hour ago'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.color === 'green' ? 'text-green-600' : 
                  stat.color === 'blue' ? 'text-blue-600' : 
                  stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                  <p className="text-xs text-gray-500">{booking.id} • {booking.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">TZSH {booking.amount.toLocaleString()}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-blue-900 font-medium">View Today's Bookings</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <CreditCard className="h-6 w-6 text-green-600" />
              <span className="text-green-900 font-medium">Process Payments</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Users className="h-6 w-6 text-purple-600" />
              <span className="text-purple-900 font-medium">Customer Management</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <BarChart3 className="h-6 w-6 text-orange-600" />
              <span className="text-orange-900 font-medium">Generate Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/2star logo.jpg" 
                alt="2Star Car Wash" 
                className="h-8 w-8 object-contain"
              />
              <h1 className="text-xl font-bold text-gray-900">2Star Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">GM</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Goodluck Meena</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'payments' && <PaymentManagement />}
          {activeTab === 'bookings' && (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bookings Management</h3>
              <p className="text-gray-600">Booking management system coming soon...</p>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Management</h3>
              <p className="text-gray-600">Customer management system coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;