import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';

let favoriteResto = [];

const FavoriteRestoArray = {
  getDetailRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return favoriteResto.find((exploreRestoRecord) => exploreRestoRecord.id == id);
  },

  getListRestaurant() {
    return favoriteResto;
  },

  putRestaurant(exploreRestoRecord) {
    // eslint-disable-next-line no-prototype-builtins
    if (!exploreRestoRecord.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteResto
    if (this.getDetailRestaurant(exploreRestoRecord.id)) {
      return;
    }

    favoriteResto.push(exploreRestoRecord);
  },

  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteResto = favoriteResto.filter((exploreRestoRecord) => exploreRestoRecord.id != id);
  },
};

describe('Favorite Explore Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteResto = [];
  });

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
