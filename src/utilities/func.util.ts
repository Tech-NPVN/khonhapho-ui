import dayjs from 'dayjs';
import slugify from 'slugify';

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

const convertSlugify = (input: string, replacement: string = '-'): string => {
  return slugify(input, {
    replacement,
    trim: true,
    locale: 'vi',
    lower: true,
  }).replace(/[\s]+/g, replacement);
};

const getShortName = (fullname: string) => {
  if (!fullname || fullname.trim() === '') {
    return '';
  }
  const words = fullname.split(' ');
  let shortName = '';

  for (const word of words) {
    if (word) {
      shortName += word[0];
    }
  }

  return shortName.toUpperCase();
};

/**
 * Generates a URL query string from an object of parameters.
 *
 * @param {Object} params - The object containing parameters to be converted to a query string.
 * @returns {string} The URL query string generated from the parameters object.
 * @template T - The type of the object containing parameters. It extends an object with string keys and any values.
 */
const getSearchParams = <T extends Record<string, any>>(params: T): string => {
  const url = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (!value) {
      url.delete(key);
    }
    url.set(key, value as string);
  });

  return url.toString();
};

export {
  range,
  disablePastTime,
  debounce,
  formatMoneyVN,
  convertSlugify,
  getShortName,
  getSearchParams,
};
