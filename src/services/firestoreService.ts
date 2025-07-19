import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types
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

export interface Payment {
  id?: string;
  paymentId: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  amount: number;
  paymentMethod: 'cash' | 'mpesa' | 'card';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  time: string;
  location: string;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking?: string;
  createdAt?: any;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  totalRevenue: number;
  todayRevenue: number;
  pendingBookings: number;
  completedBookings: number;
  totalCustomers: number;
  pendingPayments: number;
}

class FirestoreService {
  // Collections
  private bookingsCollection = 'bookings';
  private paymentsCollection = 'payments';
  private customersCollection = 'customers';

  // BOOKING OPERATIONS
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

      const docRef = await addDoc(collection(db, this.bookingsCollection), booking);
      
      // Also create/update customer record
      await this.createOrUpdateCustomer({
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        phone: bookingData.phone,
        email: bookingData.email,
        location: bookingData.location
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.bookingsCollection),
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
  }

  async getBookingByBookingId(bookingId: string): Promise<Booking | null> {
    try {
      const q = query(
        collection(db, this.bookingsCollection),
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
  }

  async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    try {
      const bookingRef = doc(db, this.bookingsCollection, id);
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw new Error('Failed to update booking status');
    }
  }

  async getTodaysBookings(): Promise<Booking[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const q = query(
        collection(db, this.bookingsCollection),
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

  // PAYMENT OPERATIONS
  async createPayment(paymentData: Omit<Payment, 'id' | 'paymentId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const paymentId = `PAY-${Date.now().toString().slice(-6)}`;
      
      const payment: Omit<Payment, 'id'> = {
        ...paymentData,
        paymentId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, this.paymentsCollection), payment);
      return docRef.id;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment record');
    }
  }

  async getAllPayments(): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, this.paymentsCollection),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Payment));
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw new Error('Failed to fetch payments');
    }
  }

  async updatePaymentStatus(id: string, status: Payment['status'], notes?: string): Promise<void> {
    try {
      const paymentRef = doc(db, this.paymentsCollection, id);
      const updateData: any = {
        status,
        updatedAt: Timestamp.now()
      };
      
      if (notes) {
        updateData.notes = notes;
      }
      
      await updateDoc(paymentRef, updateData);
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  // CUSTOMER OPERATIONS
  async createOrUpdateCustomer(customerData: Omit<Customer, 'id' | 'totalBookings' | 'totalSpent' | 'createdAt'>): Promise<void> {
    try {
      // Check if customer exists
      const q = query(
        collection(db, this.customersCollection),
        where('phone', '==', customerData.phone)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Create new customer
        await addDoc(collection(db, this.customersCollection), {
          ...customerData,
          totalBookings: 1,
          totalSpent: 0,
          lastBooking: new Date().toISOString().split('T')[0],
          createdAt: Timestamp.now()
        });
      } else {
        // Update existing customer
        const customerDoc = querySnapshot.docs[0];
        const currentData = customerDoc.data() as Customer;
        
        await updateDoc(doc(db, this.customersCollection, customerDoc.id), {
          ...customerData,
          totalBookings: (currentData.totalBookings || 0) + 1,
          lastBooking: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error creating/updating customer:', error);
      throw new Error('Failed to create/update customer');
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const q = query(
        collection(db, this.customersCollection),
        orderBy('totalBookings', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Customer));
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers');
    }
  }

  // DASHBOARD STATISTICS
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [bookings, payments, customers] = await Promise.all([
        this.getAllBookings(),
        this.getAllPayments(),
        this.getAllCustomers()
      ]);

      const today = new Date().toISOString().split('T')[0];
      
      const todayBookings = bookings.filter(b => b.date === today);
      const completedPayments = payments.filter(p => p.status === 'completed');
      const todayPayments = completedPayments.filter(p => p.date === today);
      const pendingBookings = bookings.filter(b => b.status === 'pending');
      const completedBookings = bookings.filter(b => b.status === 'completed');
      const pendingPayments = payments.filter(p => p.status === 'pending');

      return {
        totalBookings: bookings.length,
        todayBookings: todayBookings.length,
        totalRevenue: completedPayments.reduce((sum, p) => sum + p.amount, 0),
        todayRevenue: todayPayments.reduce((sum, p) => sum + p.amount, 0),
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        totalCustomers: customers.length,
        pendingPayments: pendingPayments.length
      };
    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
      throw new Error('Failed to calculate dashboard statistics');
    }
  }

  // REAL-TIME LISTENERS
  subscribeToBookings(callback: (bookings: Booking[]) => void) {
    const q = query(
      collection(db, this.bookingsCollection),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
      callback(bookings);
    });
  }

  subscribeToPayments(callback: (payments: Payment[]) => void) {
    const q = query(
      collection(db, this.paymentsCollection),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const payments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Payment));
      callback(payments);
    });
  }

  subscribeToDashboardStats(callback: (stats: DashboardStats) => void) {
    // Subscribe to all collections and calculate stats in real-time
    const unsubscribeBookings = this.subscribeToBookings(() => {
      this.getDashboardStats().then(callback);
    });
    
    const unsubscribePayments = this.subscribeToPayments(() => {
      this.getDashboardStats().then(callback);
    });

    // Return combined unsubscribe function
    return () => {
      unsubscribeBookings();
      unsubscribePayments();
    };
  }

  // SEARCH AND FILTER
  async searchBookings(searchTerm: string): Promise<Booking[]> {
    try {
      const allBookings = await this.getAllBookings();
      return allBookings.filter(booking => 
        booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching bookings:', error);
      throw new Error('Failed to search bookings');
    }
  }

  async getBookingsByStatus(status: Booking['status']): Promise<Booking[]> {
    try {
      const q = query(
        collection(db, this.bookingsCollection),
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
  }

  async getPaymentsByDateRange(startDate: string, endDate: string): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, this.paymentsCollection),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Payment));
    } catch (error) {
      console.error('Error fetching payments by date range:', error);
      throw new Error('Failed to fetch payments');
    }
  }

  // BULK OPERATIONS
  async bulkUpdateBookingStatus(bookingIds: string[], status: Booking['status']): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      bookingIds.forEach(id => {
        const bookingRef = doc(db, this.bookingsCollection, id);
        batch.update(bookingRef, {
          status,
          updatedAt: Timestamp.now()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error bulk updating booking status:', error);
      throw new Error('Failed to bulk update booking status');
    }
  }
}

// Export singleton instance
export const firestoreService = new FirestoreService();
export default firestoreService;