import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
import FavoriteExploreIdb from '../src/scripts/data/favorite-explore-idb';

describe('Favorite Explore Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteExploreIdb.getListRestaurant()).forEach(async (exploreRestoRecord) => {
      await FavoriteExploreIdb.deleteRestaurant(exploreRestoRecord.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteExploreIdb);
});
