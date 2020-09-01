import Abstract from "../abstract.js";

const filterItem = (filters, isChecked) => {
  return filters.map((filter) =>
    `<input
    type="radio"
    id="${filter.name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${filter.count === 0 ? `disabled` : ``}/>
  <label for="${filter.name}" class="filter__label">${filter.name}<span class="filter__${filter.name}-count">${filter.count}</span></label>`
  ).join(``);

};

export default class FilterItem extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _getTemplate() {
    const filterItemTemplate = filterItem(this._filters);

    return `<section class="main__filter filter container">
      ${filterItemTemplate}
    </section>`;
  }
}
