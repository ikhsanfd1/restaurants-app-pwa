import FavoriteExploreIdb from '../../data/favorite-explore-idb';
import SuccessMessage from './success-message';
import RenderUI from './render-ui';

const HandleSubmitReview = {
  handleSubmitReview(event, context) {
    event.preventDefault();

    const reviewerNameInput = document.querySelector('#reviewerName');
    const reviewContentInput = document.querySelector('#reviewContent');

    const reviewerName = reviewerNameInput ? reviewerNameInput.value : '';
    const reviewContent = reviewContentInput ? reviewContentInput.value : '';

    const reviewerNameError = document.querySelector('#reviewerNameError');
    const reviewContentError = document.querySelector('#reviewContentError');
    reviewerNameError.textContent = '';
    reviewContentError.textContent = '';

    const validationError = HandleSubmitReview._validateReviewForm(reviewerName, reviewContent);

    if (validationError) {
      if (validationError.reviewerName) {
        reviewerNameError.textContent = validationError.reviewerName;
      }

      if (validationError.reviewContent) {
        reviewContentError.textContent = validationError.reviewContent;
      }

      return;
    }

    const newReview = {
      name: reviewerName,
      review: reviewContent,
      date: new Date().toLocaleDateString(),
    };

    FavoriteExploreIdb.addReview(context._exploreResto.id, newReview);

    SuccessMessage.renderSuccess('Review berhasil ditambahkan.');

    RenderUI.renderUI();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  },

  _validateReviewForm(reviewerName, reviewContent) {
    let validationError = {};

    if (!reviewerName) {
      validationError.reviewerName = 'Nama tidak boleh kosong.';
    } else if (/[~!@#$%^&*-_=+{};:'"<>,.?/|`()0123456789]/.test(reviewerName)) {
      validationError.reviewerName = 'Nama tidak boleh mengandung karakter khusus atau angka.';
    } else if (reviewerName.length < 3) {
      validationError.reviewerName = 'Nama harus memiliki setidaknya 3 karakter.';
    }

    if (!reviewContent) {
      validationError.reviewContent = 'Deskripsi tidak boleh kosong.';
    }

    return Object.keys(validationError).length ? validationError : null;
  },
};

export default HandleSubmitReview;
