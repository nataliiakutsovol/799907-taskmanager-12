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
import {renderElement, renderPosition, replace, remove} from './utils/render';
import Board from "./presenter/task-board.js";



const task = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(task);

const mainContainer = document.querySelector(`.main`);

const headerContainer = mainContainer.querySelector(`.main__control`);

//renderElement(headerContainer, new MenuContainer(), renderPosition.BEFOREEND);

renderElement(mainContainer, new FilterItem(filters), renderPosition.BEFOREEND);

//renderElement(mainContainer, new Sorting(), renderPosition.BEFOREEND);
const boardPresenter = new Board(mainContainer, headerContainer);
boardPresenter.init();

const boardMainContainer = mainContainer.querySelector(`.board`);

const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);

const renderTask = (taskListContainer, task) => {
  const taskElement = new TaskCard(task);
  const taskEditElement = new EditTask(task);

  const replaceTaskToEdit = () => {
    replace(taskEditElement, taskElement);
  };

  const replaceEditToTask = () => {
    replace(taskElement, taskEditElement);
  };

  taskElement.setEditClickHandler(() => {
    replaceTaskToEdit();
  });

  taskEditElement.setSubmitClickHandler(() => {
    replaceEditToTask();
  });

  renderElement(taskListContainer, taskElement, renderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(task.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(taskListContainer, task[i]);
}

if (task.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  renderElement(taskListContainer, new LoadBtn(), renderPosition.BEFOREEND);

  const loadMoreButton = taskListContainer.querySelector(`.load-more`);

  loadMoreButton.setClickHandler(() => {
    task.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach((task) => {
      renderTask(taskListContainer, task);
    });

    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= task.length) {
      loadMoreButton.remove();
    }
  });
}

