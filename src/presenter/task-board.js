import MenuContainer from './../view/menu.js';
import Sorting from './../view/sorting.js';
import FilterItem from './../view/filter-item.js';
import TaskCard from './../view/task.js';
import EditTask from './../view/edit-task.js';
import LoadBtn from './../view/loading-btn.js';

import {renderElement, renderPosition, replace, remove} from './../utils/render';
import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./../const.js";

export default class Board {
  constructor(mainContainer, headerContainer) {
    this._mainContainer = mainContainer;
    this._headerContainer = headerContainer;
    this._menuComponent = new MenuContainer();
    this._filterCoponent = new FilterItem();
    this._sortComponent = new Sorting();
    this._taskListContainer = new TaskCard();
    this._loadMoreButtonComponent = new LoadBtn();
  }

  init() {
    renderElement(this._headerContainer, this._menuComponent, renderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._mainContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  _renderTask(task) {
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
  
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderElement(_taskListContainer, taskElement, renderPosition.BEFOREEND);
  }

  _renderTasks() {
    // Метод для рендеринга N-задач за раз
  }

  _renderLoadMoreButton() {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadBtn();

    render(this._loadMoreButton, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => this._renderTask(boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= this._boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderBoard() {
    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}