export const isValidTime = (timeString: string): boolean => {
  const [hours, minutes] = timeString.split(":").map(Number);

  return (
    !Number.isNaN(hours) &&
    !Number.isNaN(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
};
