import { useState, useEffect } from 'react';
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
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

export const useFirestore = (collectionName: string) => {
  const [documents, setDocuments] = useState<FirestoreDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all documents from collection
  const getDocuments = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a new document
  const addDocument = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add document');
      throw err;
    }
  };

  // Update a document
  const updateDocument = async (id: string, data: any) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      throw err;
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      throw err;
    }
  };

  // Get a single document
  const getDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get document');
      throw err;
    }
  };

  // Real-time listener
  const subscribeToCollection = (queryConstraints?: any[]) => {
    try {
      let q = collection(db, collectionName);
      
      if (queryConstraints && queryConstraints.length > 0) {
        q = query(q, ...queryConstraints) as any;
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(docs);
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe to collection');
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
  }, [collectionName]);

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
    subscribeToCollection
  };
};