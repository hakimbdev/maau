// Firebase configuration with localStorage fallback
// This allows the application to work without the Firebase package installed

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn1Ut_TUIpwrpLuuhj0Ip_vAbiwJz939M",
  authDomain: "patientlm-69675.firebaseapp.com",
  projectId: "patientlm-69675",
  storageBucket: "patientlm-69675.firebasestorage.app",
  messagingSenderId: "265338363204",
  appId: "1:265338363204:web:7c594362f4812ce3efcb11",
  measurementId: "G-106DCN67QY"
};

// Collection and document functions
const collection = (db: any, collectionName: string) => {
  console.log(`Accessing collection: ${collectionName}`);
  console.log(`Firebase config would be used if Firebase was installed:`, firebaseConfig);
  return { collectionName };
};

// Add document to localStorage
const addDoc = async (collectionRef: any, data: any) => {
  try {
    // Generate a unique ID for the document
    const docId = 'doc-' + Math.random().toString(36).substring(2, 9);

    // Get existing collection data or initialize empty array
    const collectionKey = `msau_${collectionRef.collectionName}`;
    const existingData = localStorage.getItem(collectionKey);
    const collectionData = existingData ? JSON.parse(existingData) : [];

    // Add the new document with its ID
    const newDoc = { id: docId, ...data };
    collectionData.push(newDoc);

    // Save back to localStorage
    localStorage.setItem(collectionKey, JSON.stringify(collectionData));

    console.log(`Added document to ${collectionRef.collectionName}:`, newDoc);
    console.log(`In a real Firebase implementation, this would be saved to Firestore using the config:`, firebaseConfig);

    // Return the document ID
    return { id: docId };
  } catch (error) {
    console.error(`Error adding document to ${collectionRef.collectionName}:`, error);
    throw error;
  }
};

// Mock serverTimestamp
const serverTimestamp = () => {
  return new Date().toISOString();
};

// Mock Firestore database
const db = {};

// Export the mock implementations
export { db, collection, addDoc, serverTimestamp };
