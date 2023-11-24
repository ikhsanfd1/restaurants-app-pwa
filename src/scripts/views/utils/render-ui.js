import ErrorContainer from './error-container';

const RenderUI = {
  renderUI() {
    return `
      <div id="restoDetail" class="resto-detail"></div>
      <div id="likeButtonContainer"></div>
      ${ErrorContainer.getContainerHtml()}
    `;
  },
};

export default RenderUI;
