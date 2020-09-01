import Abstract from "../abstract.js";

const filterItem = (filters, isChecked) => {
  return filters.map(() => 
    `<input
    type="radio"
    id="${this._filters.name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${this._filters.count === 0 ? `disabled` : ``}/>
  <label for="${this._filters.name}" class="filter__label">${this._filters.name}<span class="filter__${this._filters.name}-count">${filter.count}</span></label>`
  ).join(``)
    

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
