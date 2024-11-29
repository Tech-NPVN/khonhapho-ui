export const convertImageClassName = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => {
  let css: string[] = [' '];
  if (typeof width === 'number') css.push(`w-[${width}px]`);
  if (typeof width === 'string') css.push(`w-[${width}]`);
  if (typeof height === 'number') css.push(`h-[${height}px]`);
  if (typeof height === 'string') css.push(`h-[${height}]`);
  return css.join(' ');
};

export const convertRootClass = ({
  root = '',
  gap = 2,
  imagePerRow = -1,
  wrap = true,
}: {
  gap?: number;
  root?: string;
  wrap?: boolean;
  imagePerRow?: number;
}): string => {
  const css: string[] = [root, 'flex w-full'];
  if (gap) css.push(`gap-[${gap}px]`);
  if (wrap) css.push('flex-wrap');
  if (imagePerRow > 0) css.push(`!grid`);
  return css.join(' ');
};
