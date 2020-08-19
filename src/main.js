import MenuContainer from './view/menu.js';
import Sorting from './view/sorting.js';
import FilterItem from './view/filter-item.js';
import TaskCard from './view/task.js';
import EditTask from './view/edit-task.js';
import LoadBtn from './view/loading-btn.js';
// mocks
import {generateTask} from './mock/task.js';
import {generateFilter} from "./mock/filters.js";
// helpers
import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
import {renderElement, renderPosition} from './utils';

const task = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(task);

const mainContainer = document.querySelector(`.main`);

const headerContainer = mainContainer.querySelector(`.main__control`);

renderElement(headerContainer, new MenuContainer().getElement(), renderPosition.BEFOREEND);

renderElement(mainContainer, new FilterItem(filters).getElement(), renderPosition.BEFOREEND);

renderElement(mainContainer, new Sorting().getElement(), renderPosition.BEFOREEND);

const boardMainContainer = mainContainer.querySelector(`.board`);

const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);

const renderTask = (taskListContainer, task) => {
  const taskElement = new TaskCard(task);
  const taskEditElement = new EditTask(task);

  const replaceTaskToEdit = () => {
    taskListContainer.replaceChild(taskEditElement.getElement(), taskElement.getElement());
  };

  const replaceEditToTask = () => {
    taskListContainer.replaceChild(taskElement.getElement(), taskEditElement.getElement());
  };

  taskElement.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceTaskToEdit();
  });

  taskEditElement.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
  });

  renderElement(taskListContainer, taskElement.getElement(), renderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(task.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(taskListContainer, task[i]);
}

if (task.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  renderElement(taskListContainer, new LoadBtn().getElement(), renderPosition.BEFOREEND);

  const loadMoreButton = taskListContainer.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    task.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach((task) => {
      renderTask(taskListContainer, task);
    });

    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= task.length) {
      loadMoreButton.remove();
    }
  });
}
