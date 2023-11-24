import { openDB } from 'idb';
import CONFIG from '../config/config';
import API_ENDPOINT from '../config/api-endpoint';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteExploreIdb = {
  async getDetailRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getListRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async isUnliked(id) {
    const listRestaurant = await this.getListRestaurant();
    const restaurant = listRestaurant.find((restaurant) => restaurant.id === id);
    return restaurant === undefined;
  },

  async addReview(id, review) {
    const db = await dbPromise;
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);

    const restaurant = await store.get(id);

    if (restaurant) {
      restaurant.reviews = restaurant.reviews || [];
      restaurant.reviews.push(review);

      await store.put(restaurant);

      try {
        await this.sendReviewToAPI(id, review);
      } catch (error) {
        console.error('Error sending review to API:', error);
      }
    }

    await tx.complete;
  },

  async sendReviewToAPI(id, review) {
    const url = API_ENDPOINT.GET_ADD_REVIEW_RESTAURANT;
    const data = {
      id,
      name: review.name,
      review: review.review,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.message);
    }

    console.log('Review sent to API successfully:', responseData.customerReviews);
  },
};

export default FavoriteExploreIdb;
