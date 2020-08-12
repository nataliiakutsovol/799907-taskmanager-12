import {addMenuContainer} from './view/menu.js';
import {addSorting} from './view/sorting.js';
import {createFilterTemplate} from './view/filter-item.js';
import {addTaskCard} from './view/task.js';
import {addEditTaskCard} from './view/edit-task.js';
import {addLoadingBtn} from './view/loading-btn.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from "./mock/filters.js";
import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";

const task = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(task);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);

const headerContainer = mainContainer.querySelector(`.main__control`);

render(headerContainer, addMenuContainer(), `beforeend`);

render(mainContainer, createFilterTemplate(filters), `beforeend`);

render(mainContainer, addSorting(), `beforeend`);

const boardMainContainer = mainContainer.querySelector(`.board`);

const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);

for (let i = 0; i < Math.min(task.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListContainer, addTaskCard(task[i]), `beforeend`);
}

render(taskListContainer, addEditTaskCard(task[0]), `beforeend`);

if (task.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  render(taskListContainer, addLoadingBtn(), `beforeend`);

  const loadMoreButton = taskListContainer.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    task.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach((task) => {
      render(taskListContainer, addTaskCard(task), `beforeend`);
    });

    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= task.length) {
      loadMoreButton.remove();
    }
  });
}
