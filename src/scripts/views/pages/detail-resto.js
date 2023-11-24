import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteExploreIdb from '../../data/favorite-explore-idb';
import DicodingRestaurantSource from '../../data/dicoding-restaurant-source';

import ExploreTemplate from '../templates/explore-template';
import '../../components/ModalAddReview';
import ErrorContainer from '../utils/error-container';

import RenderUI from '../utils/render-ui';
import HandleAddReviewClick from '../utils/handle-add-review-click';
import HandleSubmitReview from '../utils/handle-submit-review';

const DetailResto = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const listRestaurant = await FavoriteExploreIdb.getDetailRestaurant(url.id);

    if (listRestaurant) {
      this._exploreResto = await FavoriteExploreIdb.getDetailRestaurant(url.id);
    } else {
      this._exploreResto = await DicodingRestaurantSource.detailRestaurant(url.id);
    }

    return RenderUI.renderUI();
  },

  async afterRender() {
    const restaurantDetailContainer = document.querySelector('#restoDetail');

    try {
      if (!this._exploreResto) {
        throw new Error('Data restaurant detail not found.');
      }

      const reviewsTemplate = await ExploreTemplate.detailFavorite(this._exploreResto);
      restaurantDetailContainer.innerHTML = reviewsTemplate;

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteExplore: FavoriteExploreIdb,
        exploreRestoRecord: this._exploreResto,
      });

      // const isUnliked = await FavoriteExploreIdb.isUnliked(this._exploreResto.id);
      // if (isUnliked) {
      //   ErrorContainer.renderError('This restaurant has been unliked.');
      // }

      const addReviewButton = document.querySelector('#addReviewButton');
      if (addReviewButton) {
        addReviewButton.addEventListener(
          'click',
          HandleAddReviewClick.handleAddReviewClick.bind(this),
        );
      }
    } catch (error) {
      ErrorContainer.renderError(error.message);
    }
  },

  _renderUI() {
    return RenderUI.renderUI();
  },

  _handleAddReviewClick() {
    HandleAddReviewClick.handleAddReviewClick();
  },

  _handleSubmitReview(event) {
    HandleSubmitReview.handleSubmitReview(event, this);
  },
};

export default DetailResto;
