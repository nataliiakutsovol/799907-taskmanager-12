export const filterObj = {
  id: [`filter__all`, `filter__overdue`, `filter__today`, `filter__favorites`, `filter__repeating`, `filter__archive`],
  text: [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Archive`],
  class: [`filter__all-count`, `filter__overdue-count`, `filter__today-count`, `filter__favorites-count`, `filter__repeating-count`, `filter__archive-count`]
};
  
export const filterItem = (i) => {
  return (
    `<input
      type="radio"
      id="${filterObj.id[i]}"
      class="filter__input visually-hidden"
      name="filter"
      checked/>
    <label for="${filterObj.id[i]}" class="filter__label">${filterObj.text[i]}<span class="${filterObj.class[i]}"> 13</span></label>`
  );
};
