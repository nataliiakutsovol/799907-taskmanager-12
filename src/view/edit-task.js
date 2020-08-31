import {isExpired, isRepeating} from "../utils/task.js";
import {COLORS, BLANK_TASK} from "../const.js";
import Abstract from "../abstract.js";


const createTaskEditRepeatingTemplate = (repeating) => {
  return (
    `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
    ${Object.entries(repeating).map(([day, repeat]) =>
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}"
        name="repeat"
        value="${day}"
        ${repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}">${day}</label>`).join(``)}
    </div>
  </fieldset>`
  );
};

const createTaskEditColorTemplate = (currentColor) => {
  return COLORS.map((color) =>
    `<input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${currentColor === color ? `checked` : ``}
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}">${color}
    </label>`).join(``);
};

const addEditTaskCard = (task) => {
  const {color, description, deadline, repeating} = task;
  const date = deadline !== null
    ? deadline.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;
  const deadlineClass = isExpired(deadline)
    ? `card--deadline`
    : ``;
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeating);
  const repeatingClass = isRepeating(repeating) ? `card--repeat` : ``;

  const colorTemplate = createTaskEditColorTemplate(color);
  return (
    `<article class="card card--edit card--${color} ${deadlineClass} ${repeatingClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
  
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${deadline !== null ? `yes` : `no`}</span>
                </button>
  
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${date}"
                    />
                  </label>
                </fieldset>
  
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating(repeating) ? `yes` : `no`}</span>
                </button> 
                ${repeatingTemplate}
              </div>
            </div>
  
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
              ${colorTemplate}
              </div>
            </div>
          </div>
  
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class EditTask extends Abstract {
  constructor(task) {
    super();
    this._task = task || BLANK_TASK;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _getTemplate() {
    return addEditTaskCard(this._task);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.onSubmit();
  }

  setSubmitClickHandler(callback) {
    this._callback.onSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
