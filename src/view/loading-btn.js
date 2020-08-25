import {createElement} from "../utils.js";

export default class LoadBtn {
  constructor() {
    this._element = null;
  }

  _getTemplate(text) {
    text = `load more`;
    return (
      `<button class="load-more" type="button">${text}</button>`
    );
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
