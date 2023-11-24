import { async } from 'regenerator-runtime';
import FavoriteExploreIdb from '../src/scripts/data/favorite-explore-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this resto"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this resto"]')).toBeFalsy();
  });

  it('should add the restaurant to favorites when liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tunggu hingga operasi like dan pengambilan detail restoran selesai
    setTimeout(async () => {
      const exploreRestoRecord = await FavoriteExploreIdb.getDetailRestaurant(1);
      console.log('Explore Restaurant Record after liking:', exploreRestoRecord);
      expect(exploreRestoRecord).toEqual({ id: 1 });

      await FavoriteExploreIdb.deleteRestaurant(1);
    }, 1000);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteExploreIdb.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada film yang ganda
    expect(await FavoriteExploreIdb.getListRestaurant()).toEqual([{ id: 1 }]);
    await FavoriteExploreIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteExploreIdb.getListRestaurant()).toEqual([]);
  });
});
