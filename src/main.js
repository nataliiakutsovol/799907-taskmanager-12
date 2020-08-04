import {addMenuContainer} from './view/menu.js';
import {addSorting} from './view/sorting.js';
import {addFilers} from './view/filters.js';
import {filterObj, filterItem} from './view/filter-item.js';
import {addTaskCard} from './view/task.js';
import {addDeadlineTaskCard} from './view/deadline-task.js';
import {addEditTaskCard} from './view/edit-task.js';
import {REPEAT_DAY_VALUE, addRepeatDay} from './view/repeat-day.js';
import {addLoadingBtn} from './view/loading-btn.js';

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);

const headerContainer = mainContainer.querySelector(`.main__control`);

render(headerContainer, addMenuContainer(), `beforeend`);

render(mainContainer, addFilers(), `beforeend`);

const filterItemContainer = mainContainer.querySelector(`.main__filter`);

for (let i = 0; i < filterObj.id.length; i++) {
  render(filterItemContainer, filterItem(i), `beforeend`);
}

render(mainContainer, addSorting(), `beforeend`);

const boardMainContainer = mainContainer.querySelector(`.board`);

const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListContainer, addTaskCard(i), `beforeend`);
}

render(taskListContainer, addDeadlineTaskCard(), `beforeend`);

render(taskListContainer, addEditTaskCard(), `beforeend`);

render(taskListContainer, addLoadingBtn(), `beforeend`);

const taskEditDays = boardMainContainer.querySelector(`.card__repeat-days-inner`);

for (let i = 0; i < REPEAT_DAY_VALUE.length; i++) {
  render(taskEditDays, addRepeatDay(i), `beforeend`);
}
