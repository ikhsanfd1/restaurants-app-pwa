import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import './form/InputWithValidation';
import './form/TextAreaValidation';

class ModalAddReview extends LitWithoutShadowDom {
  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  render() {
    return html`
      <article class="modal-add-container">
        <form class="form-add-review" id="addReviewForm" novalidate>
          <div class="modal-add-header">
            <h5 class="modal-title">${this.title}</h5>
            <a href="#" class="close-icon">x</a>
          </div>
          <div class="modal-add-body">
            <label for="reviewerName" class="form-label">Nama</label>
            <input-with-validation
              id="reviewerNameInput"
              type="text"
              inputId="reviewerName"
              invalidFeedbackMessage=""
              validFeedbackMessage=""
              required
            ></input-with-validation>
            <div id="reviewerNameError" class="invalid-feedback" role="alert"></div>
            <label for="reviewContent" class="form-label">Deskripsi</label>
            <text-area-validation
              id="reviewerContentInput"
              inputId="reviewContent"
              invalidFeedbackMessage=""
              validFeedbackMessage=""
              required
            ></text-area-validation>
            <div id="reviewContentError" class="invalid-feedback" role="alert"></div>
            <div id="successMessage" class="valid-feedback" role="alert"></div>
          </div>
          <div class="modal-add-footer">
            <button
              id="btnSubmitReview"
              class="btn-submit-review"
              aria-label="Submit Review"
              type="submit"
            >
              Submit Review
            </button>
          </div>
        </form>
      </article>
    `;
  }
}

customElements.define('modal-add-review', ModalAddReview);
