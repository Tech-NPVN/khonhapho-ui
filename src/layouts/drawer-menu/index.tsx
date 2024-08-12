import { DarkIcon, LightIcon } from '@/components/icons';
import { Button, Drawer } from 'antd';
import { useTheme } from 'next-themes';
import { memo, useMemo } from 'react';

type DrawerMenuProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const DrawerMenu = ({ open, handleClose, children }: DrawerMenuProps) => {
  const { theme, setTheme } = useTheme();

  const isLightMode = useMemo(() => {
    return theme === 'light';
  }, [theme]);

  return (
    <Drawer
      onClose={handleClose}
      open={open}
      placement="right"
      extra={
        <Button
          type="text"
          className="flex items-center gap-4"
          onClick={() => (isLightMode ? setTheme('dark') : setTheme('light'))}
        >
          Chế độ {isLightMode ? 'tối' : 'sáng'} {isLightMode ? <DarkIcon /> : <LightIcon />}
        </Button>
      }
    >
      {children}
    </Drawer>
  );
};

export default memo(DrawerMenu);
