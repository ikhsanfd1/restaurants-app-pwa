import FavoriteExploreIdb from '../../data/favorite-explore-idb';
import ExploreTemplate from '../templates/explore-template';

const Favorite = {
  async render() {
    const listRestaurant = await FavoriteExploreIdb.getListRestaurant();
    this._exploreResto = listRestaurant;
    return `
        <div class="container">
            <section class="explorer">
            <article>
                <h2>Favorite Restaurant</h2>
            </article>

            <div class="cards"></div>
            </section>
        </div>
        `;
  },

  async afterRender() {
    await this._getFavoriteRestaurants();
    this._populateExploreRestoRecordToCard(this._exploreResto);
  },

  async _getFavoriteRestaurants() {
    this._exploreResto = await FavoriteExploreIdb.getListRestaurant();
  },

  _populateExploreRestoRecordToCard(restaurants = null) {
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
  },
};

export default Favorite;
