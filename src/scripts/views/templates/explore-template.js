import {
  createExploreItemTemplate,
  createExploreDetailTemplate,
  createExploreDetailFavoriteTemplate,
} from './template-creator';
import DicodingRestaurantSource from '../../data/dicoding-restaurant-source';

const ExploreTemplate = {
  emptyBodyTable() {
    return `
      <div class="card-not-found">
        <h1 style="text-align: center;">Belum ada Restaurant yang difavorite kan</h1>
      </div>
    `;
  },

  async detailModal(exploreRestoRecord) {
    if (!exploreRestoRecord) {
      throw new Error(
        `Data explore restaurant tidak ditemukan. The value is ${exploreRestoRecord}`,
      );
    }

    const detailedRestaurant = await DicodingRestaurantSource.detailRestaurant(
      exploreRestoRecord.id,
    );

    const reviews = await DicodingRestaurantSource.getReviews(exploreRestoRecord.id);

    return createExploreDetailTemplate(detailedRestaurant, reviews);
  },

  async detailFavorite(exploreRestoRecord) {
    if (!exploreRestoRecord) {
      throw new Error(
        `Data detail favorite restaurant di unlike. The value is ${exploreRestoRecord}`,
      );
    }

    const detailedRestaurant = await DicodingRestaurantSource.detailRestaurant(
      exploreRestoRecord.id,
    );

    const reviews = await DicodingRestaurantSource.getReviews(exploreRestoRecord.id);

    return createExploreDetailFavoriteTemplate(detailedRestaurant, reviews);
  },

  exploreItem(index, exploreRestoRecord) {
    return createExploreItemTemplate(index, exploreRestoRecord);
  },
};

export default ExploreTemplate;
