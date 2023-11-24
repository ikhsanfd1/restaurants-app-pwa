import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithRestaurant = async (exploreRestoRecord) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    exploreRestoRecord,
  });
};
export { createLikeButtonPresenterWithRestaurant };
