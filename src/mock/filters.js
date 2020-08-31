import {isExpired, isTaskExpiringToday, isRepeating} from "../utils/task.js";

const taskFilterMap = {
  all: (task) => task.filter((task) => !task.isArchive).length,
  overdue: (task) => task.filter((task) => !task.isArchive).filter((task) => isExpired(task.deadline)).length,
  today: (task) => task.filter((task) => !task.isArchive).filter((task) => isTaskExpiringToday(task.deadline)).length,
  favorites: (task) => task.filter((task) => !task.isArchive).filter((task) => task.isFavorite).length,
  repeating: (task) => task.filter((task) => !task.isArchive).filter((task) => isRepeating(task.repeating)).length,
  archive: (task) => task.filter((task) => !task.isArchive).filter((task) => task.isArchive).length,
};

export const generateFilter = (task) => {
  return Object.entries(taskFilterMap).map(([filterName, taskCount]) => ({
    name: filterName,
    count: taskCount(task),
  }));
};
