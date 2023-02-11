import * as React from 'react';
import Box from '@mui/material/Box';
import { SwipeableDrawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AddExistingStationDialog } from "../stations/addExistingStationDialog";
import { AddNewStationDialog } from "../stations/addNewStationDialog";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { ChartsCombine } from "./components/Charts/chartsCombine.js";

type Anchor =  'left' 

export default function SwipeableTemporaryDrawer() {

  const [state, setState] = React.useState({
    left: false,
  });

  const [openAddExistingStation, setOpenAddExistingStation] =
    React.useState(false);
  const [openAddNewStation, setOpenaddNewStation] = React.useState(false);

  const handleAddExistingStationOpen = () => {
    setOpenAddExistingStation(true);
  };

  const handleAddExistingStationClose = () => {
    setOpenAddExistingStation(false);
  };

  const handleAddNewStationOpen = () => {
    setOpenaddNewStation(true);
  };

  const handleAddNewStationClose = () => {
    setOpenaddNewStation(false);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    }
  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Add new Station", "Add existing Station"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
                onClick={
                  index % 1 === 0 && index !== 0
                    ? handleAddExistingStationOpen
                    : handleAddNewStationOpen
                }
              >
                 <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
            <AddExistingStationDialog
                open={openAddExistingStation}
                onClose={handleAddExistingStationClose}
              />
              <AddNewStationDialog
                open={openAddNewStation}
                onClose={handleAddNewStationClose}
              />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (    
      <div className="mobileDrawer">
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <DehazeIcon 
          color="primary" onClick={toggleDrawer(anchor, true)}>{anchor} </DehazeIcon>
          <SwipeableDrawer
            swipeAreaWidth={15}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      </div>
  );
};