import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Button } from "@material-ui/core";
import * as actionType from "../constants/actionTypes";
import useStyles from "./styles";
import { AddExistingStationDialog } from "./stations/addExistingStationDialog";
import { AddNewStationDialog } from "./stations/addNewStationDialog";

import "./header.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

/*
  1. neue Collection Stations
  2. Collection "stationEntries" zu StationEntries
  3. Stations brauchen einen Namen und eine Location
  4. user Schema braucht ein weiteres Array für die Stations auf welche der User Zugriff
  4. Station Schema braucht ein weiteres String StationID, welcher die ID der Station beinhaltet
*/

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openAddExistingStation, setOpenAddExistingStation] =
    React.useState(false);
  const [openAddNewStation, setOpenaddNewStation] = React.useState(false);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addExistingStation = () => {
    console.log("add");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
          <div className="signIn right">
            {user?.result ? (
              <div className={classes.profile}>
                <Button
                  variant="contained"
                  style={{ marginLeft: "auto" }}
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className={classes.logout}
                style={{ float: "right", marginLeft: "auto" }}
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
