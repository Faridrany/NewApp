import '../styles/styles.css';
import App from './pages/app';
import { stopAllStreams } from './utils';
import { VAPID_PUBLIC_KEY } from './config.js'; // tambahkan ini

window.stream = null;

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered with scope:', registration.scope);

      
      await subscribeToPush(registration);

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  window.addEventListener('hashchange', async () => {
    stopAllStreams();
    await app.renderPage();
  });
});

window.addEventListener('click', (event) => {
  if (event.target.id === "close-message") {
    event.target.closest('#message').remove();
  }

  if (event.target.id === "drawer-button") {
    const navbar = event.target.parentElement.querySelector('#navigation-drawer');
    navbar.classList.toggle('hidden');
    navbar.classList.toggle('opacity-0');
  }
});

// ======== Tambahkan fungsi bantu untuk Push ========
async function subscribeToPush(registration) {
  if (!('PushManager' in window)) {
    console.warn('Push messaging is not supported');
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Permission for notifications was denied');
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    console.log('Push Subscription:', JSON.stringify(subscription));

    // Kirim ke server di sini jika backend tersedia
    // await sendSubscriptionToServer(subscription);

  } catch (err) {
    console.error('Failed to subscribe to push:', err);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
