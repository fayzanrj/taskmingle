export const addZero = (item: number): string => {
  return item.toString().length === 1 ? `0${item}` : `${item}`;
};

export const getTime = (date: string, time: string): string => {
  const hours = addZero(new Date(`${date} ${time}`).getHours());
  const minutes = addZero(new Date(`${date} ${time}`).getMinutes());

  return `${hours}:${minutes}`;
};

export const getDate = (date: string): string => {
  // const year = new Date(date).getFullYear();
  // const month = new Date(date).getMonth();
  // const day = new Date(date).getDate();

  // console.log(`${year}-${month + 1}-${day}`);

  // return `${year}-${addZero(month + 1)}-${addZero(day)}`;
  return `${new Date(date).getFullYear()}-${
    new Date(date).getMonth() + 1
  }-${new Date(date).getDate()}`;
};
