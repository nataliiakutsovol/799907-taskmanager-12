import FilterItem from './view/filter-item.js';
// mocks
import {generateTask} from './mock/task.js';
import {generateFilter} from "./mock/filters.js";
// helpers
import {TASK_COUNT} from "./const.js";
import {renderElement, renderPosition} from './utils/render';
import Board from "./presenter/task-board.js";

const task = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(task);

const mainContainer = document.querySelector(`.main`);

const headerContainer = mainContainer.querySelector(`.main__control`);

renderElement(mainContainer, new FilterItem(filters), renderPosition.BEFOREEND);

const boardPresenter = new Board(mainContainer, headerContainer);
boardPresenter.init(task, filters);
