import {createElement} from "../utils";

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

const createFilterTemplate = (filterItems) => {
  const filterItemTemplate = filterItems.map((filter, index) => filterItem(filter, index === 0)).join(``);

  return `<section class="main__filter filter container">
    ${filterItemTemplate}
  </section>`;
};

export default class FilterItem {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  _getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._filters));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
