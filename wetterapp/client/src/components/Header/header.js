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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Button } from "@material-ui/core";
// import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import { AddExistingStationDialog } from "../stations/addExistingStationDialog";
import { AddNewStationDialog } from "../stations/addNewStationDialog";

import { fetchStations, selectStation } from "../Slices/stationSlice";
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
  const [station, setStation] = React.useState("");

  const [stations, setStations] = React.useState([
    {
      location: "",
      name: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    getStations();
  }, []);

  const getStations = () => {
    dispatch(fetchStations()).then((res) => {
      console.log("payload:", res.payload);
      const stationsData = res.payload;
      setStations(stationsData);
      setDropdownStation(res.payload[0]);
      dispatch(selectStation(res.payload[0]));
    });
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload(false);
  };

  const handleChange = (event) => {
    dispatch(selectStation(event.target.value));
    console.log("hereNow:", event.target.value);
    setDropdownStation(event.target.value);
    localStorage.setItem(
      "location",
      JSON.stringify(event.target.value.location)
    );
  };

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

  const [dropdownStation, setDropdownStation] = useState("");

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
          {user?.result ? (
            <Box sx={{ minWidth: 140 }} className="Selection">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Station</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dropdownStation}
                  autoWidth
                  onChange={handleChange}
                  defaultValue={{ label: "test", value: "testst" }}
                >
                  {stations.map((stationData) => (
                    <MenuItem value={stationData}>{stationData.name}</MenuItem>
                  ))}
                  {/* <MenuItem value={"test"}>düdel</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box></Box>
          )}
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
          {[].map((text, index) => (
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
        <div className="signIn right">
          {user?.result ? (
            <div className={classes.profile}>
              <Button
                variant="contained"
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
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
