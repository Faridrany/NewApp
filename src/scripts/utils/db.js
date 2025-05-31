// src/scripts/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'app-db';
const STORE_NAME = 'stories';

export async function initDB() {
  // Pastikan agar initDB hanya dipanggil sekali dan tidak menyebabkan error berulang.
  // IndexedDB sendiri memiliki mekanisme untuk memastikan ini.
  try {
    return await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  } catch (error) {
    console.error("Error initializing IndexedDB:", error);
    // Jika ada masalah serius dengan IndexedDB, pastikan ini tidak menghancurkan aplikasi.
    // Misalnya, Anda bisa mengembalikan Promise.reject(error) atau null
    throw error; // Re-throw error agar bisa ditangani di pemanggil
  }
}

export async function saveStory(story) {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.put(story);
    await tx.done; // Pastikan transaksi selesai
    return story; // Kembalikan story yang disimpan
  } catch (error) {
    console.error("Error saving story to IndexedDB:", error);
    throw error;
  }
}

export async function getAllStories() {
  try {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error("Error getting all stories from IndexedDB:", error);
    throw error;
  }
}

export async function deleteStory(id) {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).delete(id);
    await tx.done;
    return true; // Indikasi berhasil
  } catch (error) {
    console.error("Error deleting story from IndexedDB:", error);
    throw error;
  }
}

export async function getStoryById(id) { // Tambahkan fungsi ini jika Anda memang menggunakannya
  try {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
  } catch (error) {
    console.error("Error getting story by ID from IndexedDB:", error);
    throw error;
  }
}