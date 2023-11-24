import ReviewModal from './review-modal';

const HandleAddReviewClick = {
  handleAddReviewClick() {
    ReviewModal.showModal();

    const submitReviewButton = document.querySelector('#addReviewModal #btnSubmitReview');
    if (submitReviewButton) {
      submitReviewButton.addEventListener('click', this._handleSubmitReview.bind(this));
    }
  },
};

export default HandleAddReviewClick;
