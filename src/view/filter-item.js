import {createElement} from "./../utils/render.js"
import Abstract from "../abstract.js";

const filterItem = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
      type="radio"
      id="${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}/>
    <label for="${name}" class="filter__label">${name}<span class="filter__${name}-count">${count}</span></label>`
  );
};

export default class FilterItem extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _getTemplate(filters) {

    const filterItemTemplate = filters.map((filter, index) => filterItem(filter, index === 0)).join(``);

    return `<section class="main__filter filter container">
      ${filterItemTemplate}
    </section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._filters));
    }

    return this._element;
  }

}
