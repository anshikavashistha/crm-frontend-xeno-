import moment from 'moment';

// константы для работы с календарем:
// создаем константу для элементов календаря - отображаемых недель на экране,
// в заготовке должно быть 42 дня (7 дней на максимальное кол-во недель 6)
export const ITEMS_PER_DAY = 42;
export const isCurrentDay = (day) => moment().isSame(day, 'day');
export const isSelectedMonth = (day, today) => today.isSame(day, 'month');
export const isDayContainCurrentTimestamp = (a, b) =>
  a >= b.startOf('day').format('X') && a <= b.clone().endOf('day').format('X');
export const isDayContainCurrentEvent = (event, dayItem) =>
  isDayContainCurrentTimestamp(event.date, dayItem);

// выпадающие списки модалки
export const dataCanals = [
  { canal: 'Android Push', id: 2 },
  { canal: 'iOs Push', id: 3 },
  { canal: 'Email', id: 1 },
];

export const dataCategory = [
  { category: 'Gamers', id: 1 },
  { category: 'Shopers', id: 2 },
  { category: 'Music lovers', id: 3 },
  { category: 'Pet owners', id: 4 },
  { category: 'Tech enthusiasts', id: 5 },
  { category: 'Parents', id: 6 },
  { category: 'Travelers', id: 7 },
];