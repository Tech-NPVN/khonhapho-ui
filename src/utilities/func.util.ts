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

const formatMoneyVN = (price: number): string => {
  if (!price) {
    return `0 đồng`;
  }

  if (price < 1000) {
    return `${price} đồng`;
  } else if (price < 1_000_000) {
    return `${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 3)} nghìn`;
  } else if (price < 1_000_000_000) {
    return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 3)} triệu`;
  } else {
    return `${(price / 1_000_000_000).toFixed(price % 1_000_000_000 === 0 ? 0 : 3)} tỷ`;
  }
};

export { range, disablePastTime, debounce, formatMoneyVN };
