import {isExpired, isRepeating, createElement} from "../utils.js";

export const addTaskCard = (task) => {
  const {color, description, deadline, repeating, isArchive, isFavorite} = task;
  const date = deadline !== null
    ? deadline.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;
  const deadlineClass = isExpired(deadline) ? `card--deadline` : ``;
  const repeatingClass = isRepeating(repeating) ? `card--repeat` : ``;
  const isArchiveClass = isArchive ? `card__btn--archive card__btn--disabled` : `card__btn--archive`;
  const isFavoriteClass = isFavorite ? `card__btn--favorites card__btn--disabled` : `card__btn--favorites`;

  return (
    `<article class="card card--${color} ${deadlineClass} ${repeatingClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn ${isArchiveClass}">archive</button>
            <button type="button" class="card__btn ${isFavoriteClass}">favorites</button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class TaskCard {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  _getTemplate() {
    return addTaskCard(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._task));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
