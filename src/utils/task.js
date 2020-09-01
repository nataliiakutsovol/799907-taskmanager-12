export const isExpired = (deadline) => {
  if (deadline === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() > deadline.getTime();
};

export const isTaskExpiringToday = (deadline) => {
  if (deadline === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate.getTime() === deadline.getTime();
};

export const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};
