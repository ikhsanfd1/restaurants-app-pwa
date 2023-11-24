import CONFIG from '../../config/config';

const createExploreDetailTemplate = (exploreRestoRecord) => {
  if (!exploreRestoRecord) {
    throw new Error(`Data explore restaurant tidak ditemukan. The value is ${exploreRestoRecord}`);
  }

  const imgDetailRecord = document.querySelector('#lihatLengkapModal #imgDetailRecord');
  const cityDetailRecord = document.querySelector('#lihatLengkapModal #cityDetailRecord');
  const addressDetailRecord = document.querySelector('#lihatLengkapModal #addressDetailRecord');
  const ratingDetailRecord = document.querySelector('#lihatLengkapModal #ratingDetailRecord');
  const nameDetailRecord = document.querySelector('#lihatLengkapModal #nameDetailRecord');
  const descDetailRecord = document.querySelector('#lihatLengkapModal #descDetailRecord');
  const seeDetailRecord = document.querySelector('#lihatLengkapModal .modal-card-detail');

  imgDetailRecord.setAttribute('src', CONFIG.SMALL_RESOLUTION_IMAGE + exploreRestoRecord.pictureId);
  imgDetailRecord.setAttribute('alt', exploreRestoRecord.name);
  cityDetailRecord.textContent = exploreRestoRecord.city;
  addressDetailRecord.textContent = `Address: ${exploreRestoRecord.address}`;
  ratingDetailRecord.textContent = `Rating: ${exploreRestoRecord.rating}`;
  nameDetailRecord.textContent = exploreRestoRecord.name;
  descDetailRecord.textContent = exploreRestoRecord.description || '-';
  seeDetailRecord.setAttribute('href', `/#/detail/${exploreRestoRecord.id}`);
  seeDetailRecord.setAttribute('data-record-id', exploreRestoRecord.id);
};

const createExploreItemTemplate = (index, exploreRestoRecord) => {
  if (!exploreRestoRecord) {
    throw new Error(`Data Restaurant tidak valid. The value is ${exploreRestoRecord}`);
  }

  if (!CONFIG) {
    throw new Error('CONFIG not found.');
  }

  return `
    <article class="card">
        <div class="card-header">
            <img class="lazyload" data-src="${
              CONFIG.SMALL_RESOLUTION_IMAGE + exploreRestoRecord.pictureId
            }" alt="${exploreRestoRecord.name}" crossorigin="anonymous" />
            <h4>${exploreRestoRecord.city}</h4>
        </div>

        <div class="card-body">
            
            <h4 class="card-rating">Rating: ${exploreRestoRecord.rating}</h4>
            <h3 class="card-title">${exploreRestoRecord.name}</h3>
            <a href="/#/detail/${exploreRestoRecord.id}" class="card-footer" data-record-id="${
              exploreRestoRecord.id
            }">lihat Resto</a>
        </div>
    </article>
  `;
};

const createExploreDetailFavoriteTemplate = (exploreRestoRecord) => {
  if (!exploreRestoRecord) {
    throw new Error(
      `Data detail favorite restaurant di unlike. The value is ${exploreRestoRecord}`,
    );
  }

  return `
<div class="detail-favorite">
  <div class ="detail-header-favorite">
      <article class="detail-title">
        <h2>${exploreRestoRecord.name}</h2>
      </article>
      <aside>
        <img class="detail-poster" src="${
          CONFIG.MEDIUM_RESOLUTION_IMAGE + exploreRestoRecord.pictureId
        }" alt="${exploreRestoRecord.name}" crossorigin="anonymous" />
        <h4>City: ${exploreRestoRecord.city}</h4>
        <p>Rating: ${exploreRestoRecord.rating}</p>
      </aside>

      <article class="detail-address">
              <p>Address: ${exploreRestoRecord.address}</p>
          </article>
      
      <div class="detail-menu">
          <article class="detail-menu-food">
            <h4>Menu Restaurants</h4>
            <p>Foods:</p>
            <ul>
              ${
                exploreRestoRecord.menus && exploreRestoRecord.menus.foods
                  ? exploreRestoRecord.menus.foods.map((food) => `<li>${food.name}</li>`).join('')
                  : ''
              }
            </ul>
          </article>

          <article class="detail-menu-drink">
            <p>Drinks:</p>
            <ul>
              ${
                exploreRestoRecord.menus && exploreRestoRecord.menus.drinks
                  ? exploreRestoRecord.menus.drinks
                      .map((drink) => `<li>${drink.name}</li>`)
                      .join('')
                  : ''
              }
            </ul>
          </article>
          
        </div>
  </div>
      <article class="detail-body-favorite">
        <h3>Description</h3>
        <p>${exploreRestoRecord.description}</p>
      </article>
      <article class="detail-footer-favorite">
      <h3>Customer Reviews</h3>
      <div class="add-review-container">
        <button aria-label="add review" id="addReviewButton" class="add-review" type="button">
          <i class="fa fa-plus"></i>
        </button>
      </div>
          ${
            exploreRestoRecord.customerReviews
              ? exploreRestoRecord.customerReviews
                  .map(
                    (review) => `<div class="review">
                                    <p><strong>${review.name}</strong></p>
                                    <p>${review.review}</p>
                                    <p>${review.date}</p>
                                </div>`,
                  )
                  .join('')
              : ''
          }
      </article>
</div>
`;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-star-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-star" aria-hidden="true"></i>
  </button>
`;

export {
  createExploreItemTemplate,
  createExploreDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createExploreDetailFavoriteTemplate,
};
