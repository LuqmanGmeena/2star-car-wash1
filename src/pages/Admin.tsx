import React, { useState } from 'react';
import { useEffect } from 'react';
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
import BookingManagement from '../components/BookingManagement';
import CustomerManagement from '../components/CustomerManagement';
import { firestoreService, DashboardStats } from '../services/firestoreService';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    todayBookings: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalCustomers: 0,
    pendingPayments: 0
  });
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="h-5 w-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoading(true);
        const dashboardStats = await firestoreService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();

    // Set up real-time listener for stats
    const unsubscribe = firestoreService.subscribeToDashboardStats((newStats) => {
      setStats(newStats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: `TZSH ${stats.totalRevenue.toLocaleString()}`,
      change: `Today: TZSH ${stats.todayRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: 'green'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toString(),
      change: `Today: ${stats.todayBookings}`,
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      change: `Pending: ${stats.pendingBookings}`,
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: 'purple'
    },
    {
      title: 'Completed Services',
      value: stats.completedBookings.toString(),
      change: `Pending Payments: ${stats.pendingPayments}`,
      icon: <Car className="h-8 w-8 text-orange-600" />,
      color: 'orange'
    }
  ];

  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadRecentBookings = async () => {
      try {
        const bookings = await firestoreService.getAllBookings();
        setRecentBookings(bookings.slice(0, 5)); // Get latest 5 bookings
      } catch (error) {
        console.error('Error loading recent bookings:', error);
      }
    };

    loadRecentBookings();

    // Set up real-time listener for bookings
    const unsubscribe = firestoreService.subscribeToBookings((bookings) => {
      setRecentBookings(bookings.slice(0, 5));
    });

    return () => unsubscribe();
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          dashboardStats.map((stat, index) => (
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
          ))
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{booking.firstName} {booking.lastName}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                  <p className="text-xs text-gray-500">{booking.bookingId} • {booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">TZSH {booking.totalAmount?.toLocaleString() || 'N/A'}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'on-way' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
              ))}
              {recentBookings.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent bookings</p>
              )}
            </div>
          )}
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
          {activeTab === 'bookings' && <BookingManagement />}
          {activeTab === 'customers' && <CustomerManagement />}
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