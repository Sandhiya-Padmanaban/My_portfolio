// Robust client storage helper using IndexedDB + localStorage for permanent photo persistence

const DB_NAME = 'sandhiya_portfolio_db';
const STORE_NAME = 'profile_assets';
const PHOTO_KEY = 'sandhiya_permanent_photo';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePermanentPhoto(photoData: string): Promise<void> {
  // 1. Try local storage first (instant synchronous)
  try {
    localStorage.setItem('sandhiya_profile_photo', photoData);
    localStorage.setItem('sandhiya_portfolio_custom_photo', photoData);
  } catch (e) {
    console.warn('localStorage full or restricted, relying on IndexedDB', e);
  }

  // 2. Persist in IndexedDB (handles large HD photos with 50MB+ quotas)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(photoData, PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB write error', e);
  }
}

export async function loadPermanentPhoto(): Promise<string | null> {
  // 1. Check localStorage first
  try {
    const fromLocal = localStorage.getItem('sandhiya_profile_photo') || localStorage.getItem('sandhiya_portfolio_custom_photo');
    if (fromLocal && fromLocal.length > 20) {
      return fromLocal;
    }
  } catch (e) {
    console.warn('localStorage read error', e);
  }

  // 2. Check IndexedDB
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(PHOTO_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB read error', e);
    return null;
  }
}

export async function removePermanentPhoto(): Promise<void> {
  try {
    localStorage.removeItem('sandhiya_profile_photo');
    localStorage.removeItem('sandhiya_portfolio_custom_photo');
  } catch {
    // ignore
  }

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
}
