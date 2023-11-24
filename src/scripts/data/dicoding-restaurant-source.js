import API_ENDPOINT from '../config/api-endpoint';

class DicodingRestaurantSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.GET_LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.GET_DETAIL_RESTAURANT(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(reviewData) {
    const response = await fetch(API_ENDPOINT.GET_ADD_REVIEW_RESTAURANT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async getReviews(id) {
    const response = await fetch(API_ENDPOINT.GET_DETAIL_RESTAURANT(id));
    const responseJson = await response.json();
    return responseJson.restaurant.customerReviews;
  }
}

export default DicodingRestaurantSource;
