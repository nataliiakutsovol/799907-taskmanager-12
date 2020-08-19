import {createElement} from "../utils.js";

const addLoadingBtn = (text) => {
  text = `load more`;
  return (
    `<button class="load-more" type="button">${text}</button>`
  );
};

export default class LoadBtn {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return addLoadingBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
