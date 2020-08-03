export const REPEAT_DAY_VALUE = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const addRepeatDay = (i) => {
  return (
    `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-" name="repeat" value="${REPEAT_DAY_VALUE[i]}"/>
    <label class="card__repeat-day" for="repeat-mo-4">${REPEAT_DAY_VALUE[i]}</label>`
  );
};