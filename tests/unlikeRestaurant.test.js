import FavoriteExploreIdb from '../src/scripts/data/favorite-explore-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  const id = 1;

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteExploreIdb.putRestaurant({ id });
  });

  afterEach(async () => {
    await FavoriteExploreIdb.deleteRestaurant(id);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id });

    expect(document.querySelector('[aria-label="unlike this resto"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id });

    expect(document.querySelector('[aria-label="like this resto"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id });

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteExploreIdb.getListRestaurant()).toEqual([]);
  });

  it('should not throw an error when user clicks unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id });

    await FavoriteExploreIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteExploreIdb.getListRestaurant()).toEqual([]);
  });
});
