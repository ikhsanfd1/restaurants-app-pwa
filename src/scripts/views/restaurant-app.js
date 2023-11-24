import HmbMenuInitiator from '../utils/hmb-menu-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class RestaurantApp {
  constructor({ anchor, hmbMenu, scrolled, content }) {
    this._anchor = anchor;
    this._hmbMenu = hmbMenu;
    this._scrolled = scrolled;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    HmbMenuInitiator.init({
      anchor: this._anchor,
      hmbMenu: this._hmbMenu,
      scrolled: this._scrolled,
      content: this._content,
    });
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];
      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLink = document.querySelector('.skip-link');
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main-content').focus();
      });
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }
}

export default RestaurantApp;
