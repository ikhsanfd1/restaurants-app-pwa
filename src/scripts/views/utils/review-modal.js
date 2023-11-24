const ReviewModal = {
  showModal() {
    const addReviewModal = document.querySelector('#addReviewModal');
    if (addReviewModal) {
      addReviewModal.style.display = 'block';

      const closeModalAnchor = addReviewModal.querySelector('.close-icon');
      const modalContainer = document.querySelector('#addReviewModal .modal-add-container');

      if (closeModalAnchor) {
        closeModalAnchor.addEventListener('click', (e) => {
          e.preventDefault();
          this._handleCloseModal();
        });
      }

      if (modalContainer) {
        modalContainer.addEventListener('click', this._handleClickOutsideModal.bind(this));
      }

      addReviewModal.addEventListener('close-modal', this._handleCloseModal.bind(this));
      document.addEventListener('click', this._handleClickOutsideModal.bind(this));
    }
  },

  _handleClickOutsideModal(event) {
    const addReviewModal = document.querySelector('#addReviewModal');
    if (addReviewModal && !addReviewModal.contains(event.target)) {
      this._handleCloseModal();
    }
  },

  _handleCloseModal() {
    const addReviewModal = document.querySelector('#addReviewModal');
    if (addReviewModal) {
      addReviewModal.style.display = 'none';
    }
  },
};

export default ReviewModal;
