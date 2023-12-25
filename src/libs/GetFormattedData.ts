// function to add zero in the time string
const addZero = (item: number): string => {
  return item.toString().length === 1 ? `0${item}` : `${item}`;
};

// Function to get time for edit task input field
export const getTime = (date: string, time: string): string => {
  const hours = addZero(new Date(`${date} ${time}`).getHours());
  const minutes = addZero(new Date(`${date} ${time}`).getMinutes());

  return `${hours}:${minutes}`;
};

// Function to get time for edit task date input field
export const getDate = (date: string): string => {
  return `${new Date(date).getFullYear()}-${
    new Date(date).getMonth() + 1
  }-${new Date(date).getDate()}`;
};
