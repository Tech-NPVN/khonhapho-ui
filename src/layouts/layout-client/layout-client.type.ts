import { MenuProps } from 'antd';

type MenuType = Required<MenuProps>['items'][number];
type MenuClick = MenuProps['onClick'];

export type { MenuType, MenuClick };
