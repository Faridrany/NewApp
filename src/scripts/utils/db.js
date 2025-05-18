// src/scripts/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'app-db';
const STORE_NAME = 'stories';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveStory(story) {
  const db = await initDB();
  return db.put(STORE_NAME, story);
}

export async function getAllStories() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteStory(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
