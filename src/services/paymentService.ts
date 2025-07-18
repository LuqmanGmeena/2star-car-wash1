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

export const paymentService = {
  // Create a new payment record
  async createPayment(paymentData: Omit<Payment, 'id' | 'paymentId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const paymentId = `PAY-${Date.now().toString().slice(-6)}`;
      
      const payment: Omit<Payment, 'id'> = {
        ...paymentData,
        paymentId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'payments'), payment);
      return docRef.id;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment record');
    }
  },

  // Get all payments
  async getAllPayments(): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, 'payments'),
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
  },

  // Update payment status
  async updatePaymentStatus(id: string, status: Payment['status'], notes?: string): Promise<void> {
    try {
      const paymentRef = doc(db, 'payments', id);
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
  },

  // Get payments by status
  async getPaymentsByStatus(status: Payment['status']): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, 'payments'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Payment));
    } catch (error) {
      console.error('Error fetching payments by status:', error);
      throw new Error('Failed to fetch payments');
    }
  },

  // Get payments by date range
  async getPaymentsByDateRange(startDate: string, endDate: string): Promise<Payment[]> {
    try {
      const q = query(
        collection(db, 'payments'),
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
  },

  // Get payment statistics
  async getPaymentStats(): Promise<{
    totalRevenue: number;
    todayRevenue: number;
    pendingPayments: number;
    completedPayments: number;
  }> {
    try {
      const payments = await this.getAllPayments();
      const today = new Date().toISOString().split('T')[0];
      
      const completedPayments = payments.filter(p => p.status === 'completed');
      const todayPayments = completedPayments.filter(p => p.date === today);
      const pendingPayments = payments.filter(p => p.status === 'pending');
      
      return {
        totalRevenue: completedPayments.reduce((sum, p) => sum + p.amount, 0),
        todayRevenue: todayPayments.reduce((sum, p) => sum + p.amount, 0),
        pendingPayments: pendingPayments.length,
        completedPayments: completedPayments.length
      };
    } catch (error) {
      console.error('Error calculating payment stats:', error);
      throw new Error('Failed to calculate payment statistics');
    }
  }
};