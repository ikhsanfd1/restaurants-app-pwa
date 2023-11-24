// Mengimpor regenerator-runtime untuk async await
import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// Import components
import './components/index';

// Mengimpor file stylesheet (main.scss)
import '../sass/main.scss';

// Mengimpor kelas RestaurantApp dan fungsi swRegister
import RestaurantApp from './views/restaurant-app';
import swRegister from './utils/sw-register';

// Membuat instance dari RestaurantApp
const restaurantApp = new RestaurantApp({
  anchor: document.querySelector('.menu-toggle #hamburger'),
  hmbMenu: document.querySelector('nav ul'),
  scrolled: document.querySelector('.menu'),
  content: document.querySelector('main'),
});

// Menanggapi perubahan hash di URL
window.addEventListener('hashchange', () => {
  restaurantApp.renderPage();
});

// Menanggapi kejadian 'load' pada window
window.addEventListener('load', () => {
  // Merender halaman pertama kali
  restaurantApp.renderPage();
  // Mendaftarkan service worker
  swRegister();
});
