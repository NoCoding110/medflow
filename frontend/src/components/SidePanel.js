import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, Box } from '@mui/material';
import navigation from '../config/navigation';

const drawerWidth = 240;

const SidePanel = () => {
  const location = useLocation();

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <ListItem
        button
        component={Link}
        to={item.path}
        key={item.path}
        selected={location.pathname === item.path}
      >
        <ListItemIcon>
          <span className="material-icons">{item.icon}</span>
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    ));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        {Object.entries(navigation).map(([section, config]) => (
          <React.Fragment key={section}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <span className="material-icons">{config.icon}</span>
                </ListItemIcon>
                <ListItemText primary={config.title} />
              </ListItem>
              {renderMenuItems(config.items)}
            </List>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default SidePanel; 