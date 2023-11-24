import DicodingRestaurantSource from '../../data/dicoding-restaurant-source';
import ExploreTemplate from '../templates/explore-template';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteExploreIdb from '../../data/favorite-explore-idb';

const Explore = {
  async render() {
    try {
      const listRestaurant = await DicodingRestaurantSource.listRestaurant();
      this._exploreResto = listRestaurant;

      return this._renderUI();
    } catch (error) {
      return this._renderError(error.message);
    }
  },

  async afterRender() {
    this._populateExploreRestoRecordToCard(this._exploreResto);
    this._initialListener();
  },

  _initialListener() {
    const lihatDetailAnchor = document.querySelectorAll('.card-footer');
    lihatDetailAnchor.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const dataRecordId = e.target.getAttribute('data-record-id');
        const dataRecord = this._exploreResto.find((item) => item.id == dataRecordId);

        this._populateDetailExploreRestoToModal(dataRecord);
        this._showLihatLengkapModal();

        LikeButtonPresenter.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteExplore: FavoriteExploreIdb,
          exploreRestoRecord: dataRecord,
        });
      });
    });

    const closeModalAnchor = document.querySelector('#lihatLengkapModal a[href="#"]');
    if (closeModalAnchor) {
      closeModalAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        this._hideLihatLengkapModal();
      });
    }

    const lihatLengkapModal = document.getElementById('lihatLengkapModal');
    if (lihatLengkapModal) {
      lihatLengkapModal.addEventListener('click', (e) => {
        if (e.target === lihatLengkapModal) {
          this._hideLihatLengkapModal();
        }
      });
    }
  },

  _populateExploreRestoRecordToCard(restaurants = null) {
    try {
      if (!Array.isArray(restaurants)) {
        throw new Error(`Data Restaurant tidak valid. The value is ${restaurants}`);
      }

      const recordBodyTable = document.querySelector('.cards');

      recordBodyTable.innerHTML = '';
      if (restaurants.length <= 0) {
        recordBodyTable.innerHTML = ExploreTemplate.emptyBodyTable();
        return;
      }

      restaurants.forEach((item, idx) => {
        recordBodyTable.innerHTML += ExploreTemplate.exploreItem(idx, restaurants[idx]);
      });
    } catch (error) {
      this._renderError(error.message);
    }
  },

  _populateDetailExploreRestoToModal(exploreRestoRecord) {
    if (!exploreRestoRecord) {
      throw new Error(
        `Data explore restaurant tidak ditemukan. The value is ${exploreRestoRecord}`,
      );
    }

    const lihatLengkapModal = document.getElementById('lihatLengkapModal');
    if (lihatLengkapModal) {
      ExploreTemplate.detailModal(exploreRestoRecord);
    }
  },

  _showLihatLengkapModal() {
    const lihatLengkapModal = document.getElementById('lihatLengkapModal');
    if (lihatLengkapModal) {
      lihatLengkapModal.style.display = 'block';
    }
  },

  _hideLihatLengkapModal() {
    const lihatLengkapModal = document.getElementById('lihatLengkapModal');
    if (lihatLengkapModal) {
      lihatLengkapModal.style.display = 'none';
    }
  },

  _renderUI() {
    return `
      <section class="hero-section">
        <div class="hero-img">
          <h1>Mouton <span>Slice & Grill</span></h1>
          <p>
            We provide some great new experience on food & ambience. Enjoy our self-grill feastivity
            experience
          </p>
        </div>
      </section>

      <div class="container">
        <section class="explorer">
          <article>
            <h2>Explore Restaurant</h2>
          </article>

          <div class="cards"></div>

          <div id="errorContainer">
            <p>Oops! Something went wrong. Please try again later.</p>
          </div>
        </section>
      </div>
    `;
  },

  _renderError(errorMessage) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
      errorContainer.style.display = 'block';
      errorContainer.innerHTML = `<p>Error: ${errorMessage}</p>`;
    }

    return this._renderUI();
  },
};

export default Explore;
