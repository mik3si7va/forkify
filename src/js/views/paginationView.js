import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      //   console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkupButton(control, page) {
    return `<button data-goto="${
      control === 'prev' ? page - 1 : page + 1
    }" class="btn--inline pagination__btn--${control}">
    ${
      control === 'prev'
        ? `<svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>Page ${page - 1}</span>`
        : `<span>Page ${page + 1}</span>
  <svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>`
    }
  </button>`;
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    // console.log(numPages);
    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    // other pages
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('next', curPage) +
        this._generateMarkupButton('prev', curPage)
      );
    }
    // page1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
