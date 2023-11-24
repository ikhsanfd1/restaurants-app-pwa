import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CardItem extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  static get properties() {
    return {
      title: { type: String },
      imgSrc: { type: String },
      imgAlt: { type: String },
      city: { type: String },
      rating: { type: String },
      detailHref: { type: String },
      dataRecordId: { type: String },
    };
  }

  render() {
    return html`
      <article class="card">
        <div class="card-header">
          <img src="${this.imgSrc}" alt="${this.imgAlt}" crossorigin="anonymous" />
          <h4>${this.city}</h4>
        </div>

        <div class="card-body">
          <h4 class="card-rating">Rating: ${this.rating}</h4>
          <h3 class="card-title">${this.title}</h3>
          <a href="${this.detailHref}" class="card-footer" data-record-id="${this.dataRecordId}">
            lihat Detail
          </a>
        </div>
      </article>
    `;
  }
}

customElements.define('card-item', CardItem);
