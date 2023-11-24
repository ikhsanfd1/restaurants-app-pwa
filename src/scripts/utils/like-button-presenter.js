import { async } from 'regenerator-runtime';
import FavoriteExploreIdb from '../data/favorite-explore-idb';
import {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
} from '../views/templates/template-creator';
import DicodingRestaurantSource from '../data/dicoding-restaurant-source';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, exploreRestoRecord }) {
    this._likeButtonContainer = likeButtonContainer;
    this._exploreRestoRecord = exploreRestoRecord;
    this._favoriteExplore = FavoriteExploreIdb;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._exploreRestoRecord;

    try {
      if (await this._isRestaurantInFavorites(id)) {
        this._renderLiked();
      } else {
        this._renderLike();
      }
    } catch (error) {
      console.error(`Error rendering like button for restaurant ${id}:`, error);
    }
  },

  async _isRestaurantInFavorites(id) {
    const exploreRestoRecord = await FavoriteExploreIdb.getDetailRestaurant(id);
    return !!exploreRestoRecord;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      const { id } = this._exploreRestoRecord;

      try {
        const detailRestaurant = await DicodingRestaurantSource.detailRestaurant(id);
        await FavoriteExploreIdb.putRestaurant(detailRestaurant);
        this._renderButton();
      } catch (error) {
        console.error(`Error adding restaurant to favorites ${id}:`, error);
      }
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteExploreIdb.deleteRestaurant(this._exploreRestoRecord.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
