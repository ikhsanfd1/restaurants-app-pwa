const SuccessMessage = {
  renderSuccess(successMessage) {
    const successElement = document.querySelector('#successMessage');
    successElement.textContent = '';
    successElement.textContent = successMessage;
    successElement.style.color = 'green';
    successElement.style.display = 'block';
  },

  getContainerHtml() {
    return `<div id="successMessage"></div>`;
  },
};

export default SuccessMessage;
