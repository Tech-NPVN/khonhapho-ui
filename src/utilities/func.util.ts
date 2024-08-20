import dayjs from 'dayjs';

/**
 * Use in date/time picker
 */
const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disablePastTime = (minutesThreshold: number) => (currentDate: dayjs.Dayjs) => {
  const now = dayjs();
  if (currentDate.isSame(now, 'day')) {
    if (now.minute() >= minutesThreshold) {
      return {
        disabledHours: () => range(0, 24).splice(0, now.hour() + 1),
        disabledMinutes: () => range(0, 60).splice(0, now.minute() + minutesThreshold - 60),
      };
    }
    return {
      disabledHours: () => range(0, 24).splice(0, now.hour()),
      disabledMinutes: () => range(0, 60).splice(0, now.minute() + minutesThreshold),
    };
  }
};

/**
 * Debounce use for handling form, optimize performance
 */
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export { range, disablePastTime, debounce };
