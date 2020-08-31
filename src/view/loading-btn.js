import Abstract from "../abstract.js";

export default class LoadBtn extends Abstract {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _getTemplate(text) {
    text = `load more`;
    return (
      `<button class="load-more" type="button">${text}</button>`
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.onClick();
  }

  setClickHandler(callback) {
    this._callback.onClick = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
