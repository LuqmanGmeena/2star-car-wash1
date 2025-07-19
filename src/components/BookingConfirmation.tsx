import React from 'react';
import { CheckCircle, Calendar, Clock, Car, User, MapPin, Phone } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';

interface BookingData {
  service: string;
  date: string;
  time: string;
  vehicleType: string;
  plateNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  paymentMethod: string;
  specialRequests: string;
}

interface BookingConfirmationProps {
  bookingData: BookingData;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingData, onClose }) => {
  const bookingId = `2SW-${Date.now().toString().slice(-6)}`;

  // Save booking to Firebase when component mounts
  React.useEffect(() => {
    const saveBooking = async () => {
      try {
        // Save booking
        await firestoreService.createBooking(bookingData);
        
        // Create payment record
        await firestoreService.createPayment({
          bookingId,
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          customerPhone: bookingData.phone,
          service: bookingData.service,
          amount: getServicePrice(bookingData.service),
          paymentMethod: bookingData.paymentMethod as 'cash' | 'mpesa' | 'card',
          status: 'pending',
          date: bookingData.date,
          time: bookingData.time,
          location: bookingData.location,
          notes: bookingData.specialRequests
        });
      } catch (error) {
        console.error('Error saving booking:', error);
      }
    };

    saveBooking();
  }, [bookingData, bookingId]);

  const getServicePrice = (service: string): number => {
    const prices: { [key: string]: number } = {
      'Express Wash': 5000,
      'Exterior Wash': 10000,
      'Interior Cleaning': 15000,
      'Engine Wash': 15000,
      'Waxing & Polishing': 15000,
      'VIP Complete Package': 100000
    };
    return prices[service] || 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your car wash appointment has been successfully scheduled.</p>
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <p className="text-blue-800 font-semibold">Booking ID: {bookingId}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Service Details</h3>
                </div>
                <p className="text-gray-700">{bookingData.service}</p>
                <p className="text-sm text-gray-600">{bookingData.vehicleType} - {bookingData.plateNumber}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Date & Time</h3>
                </div>
                <p className="text-gray-700">{new Date(bookingData.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{bookingData.time}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Customer Info</h3>
                </div>
                <p className="text-gray-700">{bookingData.firstName} {bookingData.lastName}</p>
                <p className="text-sm text-gray-600">{bookingData.phone}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-700">{bookingData.location}</p>
                <p className="text-sm text-gray-600">Payment: {bookingData.paymentMethod}</p>
              </div>
            </div>

            {bookingData.specialRequests && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                <p className="text-gray-700">{bookingData.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>We'll call you within 30 minutes to confirm details</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Our team will arrive at your location on time</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Enjoy your sparkling clean car!</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Need to make changes or have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+255713366464"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </a>
              <a
                href="https://wa.me/255713366464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;