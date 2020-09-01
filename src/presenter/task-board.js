import MenuContainer from './../view/menu.js';
import Sorting from './../view/sorting.js';
import FilterItem from './../view/filter-item.js';
import TaskCard from './../view/task.js';
import EditTask from './../view/edit-task.js';
import LoadBtn from './../view/loading-btn.js';

import {renderElement, renderPosition, replace} from './../utils/render';
import {TASK_COUNT_PER_STEP} from "./../const.js";

export default class Board {
  constructor(mainContainer, headerContainer) {
    this._mainContainer = mainContainer;
    this._headerContainer = headerContainer;
    this._menuComponent = new MenuContainer();
    this._sortComponent = new Sorting();

    this._loadMoreButtonComponent = new LoadBtn();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    renderElement(this._headerContainer, this._menuComponent, renderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    renderElement(this._mainContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  _renderFilters(filters) {
    this._filterCoponent = new FilterItem(filters);
    renderElement(this._mainContainer, this._filterCoponent, renderPosition.BEFOREEND);
  }

  _renderTask(task) {
    const taskElement = new TaskCard(task);
    const taskEditElement = new EditTask(task);
    const boardMainContainer = this._mainContainer.querySelector(`.board`);
    const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);

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

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderElement(taskListContainer, taskElement, renderPosition.BEFOREEND);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderLoadMoreButton() {
    const boardMainContainer = this._mainContainer.querySelector(`.board`);
    const taskListContainer = boardMainContainer.querySelector(`.board__tasks`);
    const loadMoreButton = taskListContainer.querySelector(`.load-more`);

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      let renderedTaskCount = TASK_COUNT_PER_STEP;
      renderElement(taskListContainer, new LoadBtn(), renderPosition.BEFOREEND);

      loadMoreButton.setClickHandler(() => {
        this._boardTasks.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach((task) => {
          _renderTasks(taskListContainer, task);
        });

        renderedTaskCount += TASK_COUNT_PER_STEP;
        if (renderedTaskCount >= this._boardTasks.length) {
          loadMoreButton.remove();
        }
      });
    }
  }

  _renderBoard() {

    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
