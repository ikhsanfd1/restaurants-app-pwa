import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalCardDetail extends LitWithoutShadowDom {
  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  render() {
    return html`
      <article class="modal-card">
        <div class="modal-card-header">
          <a href="#" class="close-icon">x</a>
          <img src="" alt="" id="imgDetailRecord" crossorigin="anonymous" />
          <h4 id="cityDetailRecord"></h4>
          <div id="likeButtonContainer"></div>
        </div>

        <div class="modal-card-body">
          <h4 class="modal-card-rating" id="ratingDetailRecord">Rating:</h4>
          <h3 class="modal-card-title" id="nameDetailRecord"></h3>
          <h4 class="modal-card-address" id="addressDetailRecord"></h4>
          <p class="modal-card-footer" id="descDetailRecord"></p>
          <a href="" class="modal-card-detail" data-record-id="">lihat Detail</a>
        </div>
      </article>
    `;
  }
}

customElements.define('modal-card-detail', ModalCardDetail);
