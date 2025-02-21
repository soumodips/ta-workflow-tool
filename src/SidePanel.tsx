import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

export const SidePanel = ({ open, onClose }: DrawerProps) => {
  const DrawerList = (
    <Box role='presentation' onClick={() => onClose} sx={{ width: 350 }}>
      <List>edit task</List>
      <Divider />
      <List>edit</List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor='right'>
        {DrawerList}
      </Drawer>
    </div>
  );
};
