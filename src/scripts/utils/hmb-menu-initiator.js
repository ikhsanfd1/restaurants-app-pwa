const HmbMenuInitiator = {
  init({
 anchor, hmbMenu, scrolled, content,
}) {
    anchor.addEventListener('click', (event) => {
      this._toggleNavbar(event, hmbMenu);
    });

    content.addEventListener('click', (event) => {
      this._closeNavbar(event, hmbMenu);
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrolled.classList.add('scrolled');
      } else {
        scrolled.classList.remove('scrolled');
      }
    });
  },

  _toggleNavbar(event, hmbMenu) {
    hmbMenu.classList.toggle('slide');
    event.preventDefault();
    event.stopPropagation();
  },

  _closeNavbar(event, hmbMenu) {
    event.stopPropagation();
    hmbMenu.classList.remove('slide');
  },
};

export default HmbMenuInitiator;
