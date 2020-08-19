import {createElement} from "../utils.js";

const addSorting = () => {
  return (
    `<section class="board container">
      <div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>
      <div class="board__tasks"></div>
    </section>`
  );
};

export default class Sorting {
  constructor() {
    this._element = null;
  };

  _getTemplate () {
    return addSorting();
  };

  getElement() {
    if(!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  };

  removeElement() {
    this._element = null;
  };
};
