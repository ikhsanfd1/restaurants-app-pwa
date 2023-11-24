const ErrorContainer = {
  renderError(errorMessage) {
    console.error('Error occurred:', errorMessage);
    const errorContainer = document.querySelector('#errorContainer');
    if (errorContainer) {
      errorContainer.style.display = 'block';
      errorContainer.innerHTML = `<p style="margin-top:225px; margin-bottom:250px;">${errorMessage}</p>`;
    }

    const restoDetailContainer = document.querySelector('#restoDetail');
    if (restoDetailContainer) {
      restoDetailContainer.style.display = 'none';
    }
  },

  getContainerHtml() {
    return `
      <div id="errorContainer">
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    `;
  },
};

export default ErrorContainer;
