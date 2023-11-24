import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextAreaValidation extends LitWithoutShadowDom {
  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.required = false;
  }

  static get properties() {
    return {
      value: { type: String, reflect: true },
      rows: { type: Number, reflect: true },
      inputId: { type: String, reflect: true },

      validFeedbackMessage: { type: String, reflect: true },
      invalidFeedbackMessage: { type: String, reflect: true },

      required: { type: Boolean, reflect: true },
    };
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `Atribut "invalidFeedbackMessage" harus ditetapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <textarea
        id=${this.inputId || nothing}
        class="form-control"
        value=${this.value || nothing}
        ?required=${this.required}
        @input=${(e) => (this.value = e.target.value)}
      ></textarea>

      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }

    return html``;
  }
}

customElements.define('text-area-validation', TextAreaValidation);
