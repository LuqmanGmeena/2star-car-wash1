import React, { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, Car, MapPin, Phone } from 'lucide-react';
import { bookingService, Booking } from '../services/bookingService';

interface ServiceStatus {
  id: string;
  status: 'confirmed' | 'on-way' | 'in-progress' | 'completed';
  estimatedTime: string;
  currentStep: string;
  customerName: string;
  service: string;
  location: string;
}

const ServiceTracker = () => {
  const [trackingId, setTrackingId] = useState('');
  const [serviceStatus, setServiceStatus] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    setIsLoading(true);
    
    try {
      const booking = await bookingService.getBookingByBookingId(trackingId);
      setServiceStatus(booking);
    } catch (error) {
      console.error('Error tracking booking:', error);
      setServiceStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getEstimatedTime = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Waiting for team dispatch';
      case 'on-way':
        return '15-30 minutes';
      case 'in-progress':
        return '30-60 minutes';
      case 'completed':
        return 'Service completed';
      default:
        return 'Processing...';
    }
  };

  const getCurrentStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Booking received, awaiting confirmation';
      case 'confirmed':
        return 'Booking confirmed, team will be dispatched soon';
      case 'on-way':
        return 'Our team is on the way to your location';
      case 'in-progress':
        return 'Currently washing your vehicle';
      case 'completed':
        return 'Service completed successfully';
      default:
        return 'Processing your booking...';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-gray-600" />;
      case 'confirmed':
        return <Clock className="h-6 w-6 text-blue-600" />;
      case 'on-way':
        return <Car className="h-6 w-6 text-yellow-600" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-orange-600" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'on-way':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Booking Received' },
    { key: 'confirmed', label: 'Booking Confirmed' },
    { key: 'on-way', label: 'Team On The Way' },
    { key: 'in-progress', label: 'Service In Progress' },
    { key: 'completed', label: 'Service Completed' }
  ];

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Track Your Service</h2>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your booking ID
        </label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g., 2SW-123456"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleTrack}
            disabled={!trackingId || isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>{isLoading ? 'Tracking...' : 'Track'}</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Enter your booking ID to track your service status
        </p>
      </div>

      {/* Service Status */}
      {serviceStatus && (
        <div className="space-y-6">
          {/* Status Header */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {serviceStatus.service}
                </h3>
                <p className="text-gray-600">for {serviceStatus.firstName} {serviceStatus.lastName}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(serviceStatus.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(serviceStatus.status)}`}>
                  {serviceStatus.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{serviceStatus.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">ETA: {getEstimatedTime(serviceStatus.status)}</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Service Progress</h4>
            <div className="space-y-3">
              {statusSteps.map((step, index) => {
                const currentIndex = getCurrentStepIndex(serviceStatus.status);
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                
                return (
                  <div key={step.key} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-gray-600">{getCurrentStep(serviceStatus.status)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+255713366464"
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </a>
              <a
                href="https://wa.me/255713366464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {trackingId && !serviceStatus && !isLoading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No booking found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find a booking with ID "{trackingId}". Please check your booking ID and try again.
          </p>
          <p className="text-sm text-gray-500">
            If you need help, please contact us at +255 713 366464
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceTracker;