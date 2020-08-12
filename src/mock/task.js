import {getRandomInteger} from "../utils.js";
import {COLORS, TASK_REPEATING} from "../const.js";

const generateDesc = () => {
  const descriptions = [`1`, `2`, `3`];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {

  if (!!(getRandomInteger(0, 1))) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  };
};

const generateColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

export const generateTask = () => {
  const deadline = generateDate();
  const repeating = deadline === null ? generateRepeating() : TASK_REPEATING;
  return {
    color: generateColor(),
    description: generateDesc(),
    deadline,
    repeating,
    settings: {
      isArchive: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
