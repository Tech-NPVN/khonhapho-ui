import { MenuType } from './layout.type';

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuType[],
  className?: string,
): MenuType => {
  return {
    key,
    icon,
    children,
    label,
    className,
  } as MenuType;
};

export { getItem };
