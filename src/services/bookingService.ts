import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Booking {
  id?: string;
  bookingId: string;
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
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'on-way' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt?: any;
  updatedAt?: any;
}

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData: Omit<Booking, 'id' | 'bookingId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const bookingId = `2SW-${Date.now().toString().slice(-6)}`;
      
      const booking: Omit<Booking, 'id'> = {
        ...bookingData,
        bookingId,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'bookings'), booking);
      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  },

  // Get all bookings
  async getAllBookings(): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
  },

  // Get booking by booking ID
  async getBookingByBookingId(bookingId: string): Promise<Booking | null> {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('bookingId', '==', bookingId)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Booking;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw new Error('Failed to fetch booking');
    }
  },

  // Update booking status
  async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw new Error('Failed to update booking status');
    }
  },

  // Get bookings by status
  async getBookingsByStatus(status: Booking['status']): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error fetching bookings by status:', error);
      throw new Error('Failed to fetch bookings');
    }
  },

  // Get today's bookings
  async getTodaysBookings(): Promise<Booking[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const q = query(
        collection(db, 'bookings'),
        where('date', '==', today),
        orderBy('time', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error fetching today\'s bookings:', error);
      throw new Error('Failed to fetch today\'s bookings');
    }
  }
};