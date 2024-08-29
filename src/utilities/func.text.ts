const isTextClamped = (elm: HTMLDivElement) => {
  return elm?.scrollHeight > elm?.clientHeight || elm?.scrollWidth > elm?.clientWidth;
};
export { isTextClamped };
