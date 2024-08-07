import { MenuProps } from 'antd';
import { Dispatch, SetStateAction } from 'react';

type MenuType = Required<MenuProps>['items'][number];
type PopoverProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type { MenuType, PopoverProps };
