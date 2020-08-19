export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
export const TASK_COUNT = 15;
export const TASK_COUNT_PER_STEP = 8;
export const TASK_REPEATING = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

export const BLANK_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeating: TASK_REPEATING,
  isArchive: false,
  isFavorite: false
};