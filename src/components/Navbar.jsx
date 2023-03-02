import {  useState } from "react";
import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";


import {Link} from "react-router-dom"

//import * as React from 'react';

import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import PersonAdd from '@material-ui/icons/PersonAdd';

import Settings from '@material-ui/icons/Settings';
import Logout from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

//import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
import {  Mail, Notifications } from "@material-ui/icons";
//import { useContext, useState } from "react";
import { useContext } from "react";
import {AuthContext} from "../context/AuthContext"
import config from "../config"
import Register from "./register/Register";
import {useHistory,  Redirect} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ?   "none": "flex"),
  },
  badge: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const history = useHistory()
  const {user} = useContext(AuthContext)
  const { dispatch } = useContext(AuthContext);
  const PF = config.proxyRoute
  //const PF = config.publicFolder
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  // menu avatar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // fin Menu avatar

  

  const classes = useStyles();
  return (
    <AppBar position="fixed" style={{ background: '#FFB50F' }}> 
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          <Link to="/" >
            <img src={"assets/files/logoTerraNova.png"} alt="Asc Help Desk" style={{height:'70px', width: "70px", paddingTop:"10px" }} />
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
        <Link to="/" >
            <img src={"assets/files/logoTerraNova.png"} alt="Asc Help Desk" style={{height:'50px', width: "50px" , paddingTop:"10px"}} />
          </Link>
        </Typography>
        {/* <div className={classes.icons}> */}
          {/* <Avatar alt="Remy Sharp" src={user.photo ? PF+user.photo: PF+'person/noavatar.png'} /> */}
        {/* <div> */}
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            
            <Typography sm={{ minWidth: 100, size:"small" }} style={{fontSize:13, marginTop:20}}> {user.nombre + ' ' + user.apellidoPaterno }  </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} src={user.photo ? PF + user.photo: PF +'/users/noavatar.png'} />
              </IconButton>
            </Tooltip>
        </Box>

        <Menu
        style={{marginTop:'40px', overflow: 'visible',  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'}}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
         PaperProps={{
           elevation: 0,
          
        //  son opciones para los avatars dentro del menu de opciones sx: {
        //     overflow: 'visible',
        //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //     mt: 1.5,
        //     '& .MuiAvatar-root': {
        //       width: 45,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     '&:before': {
        //       content: '""',
        //       display: 'block',
        //       position: 'absolute',
        //       top: 0,
        //       right: 14,
        //       width: 10,
        //       height: 10,
        //       bgcolor: 'background.paper',
        //       transform: 'translateY(-50%) rotate(45deg)',
        //       zIndex: 0,
        //     },
        //   },
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>*/}
        <MenuItem onClick={() => history.push('/changepw')}>  
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          Cambiar Contraseña
        </MenuItem>       
        <Divider />   
        <MenuItem onClick={() => dispatch({ type: "LOGOUT" })}>  
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      
      </Menu>

        {/* </div> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
