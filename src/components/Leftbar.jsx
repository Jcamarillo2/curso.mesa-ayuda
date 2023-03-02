import { Container, makeStyles, Typography } from "@material-ui/core";
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
  Timelapse,
  Build,
  HowToReg,  
  Update,
  ThumbsUpDown,
  Https,
  Web,
  PieChart,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import MenuLink from "./menuLink/MenuLink";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(13),
    backgroundColor:  '#FFB50F',
    // backgroundColor:  theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    cursor:"pointer",
    color:"white",
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",      
      color:"gray",
    },
  },
  text: {
    fontWeight: 500,
    color:"gray",
    [theme.breakpoints.down("sm")]: {
      color:"white",
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const {user} =useContext(AuthContext)
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <MenuLink icon={<Update/>} text="Homepage" /> */}
      <div className={classes.item}>        
         <Link to="/abiertos" style={{textDecoration:"none"}}> 
            <Update className={classes.icon} />
        </Link>
        <Link to="/abiertos" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>Tickets Abiertos</Typography>
        </Link>
      </div>
      <div className={classes.item}>
        <Link to="/enRevision" style={{textDecoration:"none"}}> 
          <HowToReg className={classes.icon} />
        </Link> 
        <Link to="/enRevision" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>En Revisión Ticket</Typography>
        </Link> 
      </div>

      <div className={classes.item}>
        <Link to="/enAtencion" style={{textDecoration:"none"}}> 
          <Build className={classes.icon} />
        </Link> 
        <Link to="/enAtencion" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>En Atención</Typography>
        </Link>   
      </div>

      <div className={classes.item}>
        <Link to="/programados" style={{textDecoration:"none"}}> 
          <Timelapse className={classes.icon} />
        </Link>
        <Link to="/programados" style={{textDecoration:"none"}}>    
          <Typography className={classes.text}>Programados</Typography>
        </Link>  
      </div>

      <div className={classes.item}>
        <Link to="/enCierre" style={{textDecoration:"none"}}> 
          <ThumbsUpDown className={classes.icon} />
        </Link>  
        <Link to="/enCierre" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>En Revisión Cierre</Typography>
        </Link>  
      </div>
      { user.tipoUsuario === 'Coordinador' &&
        <div className={classes.item}>
          <Link to="/tableros" style={{textDecoration:"none"}}> 
            <PieChart className={classes.icon} />
          </Link>  
          <Link to="/tableros" style={{textDecoration:"none"}}> 
            <Typography className={classes.text}>Indicadores</Typography>
          </Link>    
        </div>      
      }      
      { user.tipoUsuario === 'Coordinador' &&
      <div className={classes.item}>
        <Link to="/misTickets" style={{textDecoration:"none"}}> 
          <Person className={classes.icon} />
        </Link>
        <Link to="/misTickets" style={{textDecoration:"none"}}>   
          <Typography className={classes.text}>Mis Tickets</Typography>
        </Link>  
      </div>
      }
      <div className={classes.item}>
        <Link to="/cerrados" style={{textDecoration:"none"}}> 
          <Https className={classes.icon} />
        </Link>  
        <Link to="/cerrados" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>Cerrados</Typography>
        </Link>    
      </div>
      <div className={classes.item}>
        <Link to="/changepw" style={{textDecoration:"none"}}> 
          <Https className={classes.icon} />
        </Link>  
        <Link to="/changepw" style={{textDecoration:"none"}}> 
          <Typography className={classes.text}>Change Pass</Typography>
        </Link>    
      </div>

      { user.tipoUsuario === 'Coordinador' &&
        <div className={classes.item}>
          <Link to="/informe" style={{textDecoration:"none"}}> 
            <Web className={classes.icon} />
          </Link>  
          <Link to="/informe" style={{textDecoration:"none"}}> 
            <Typography className={classes.text}>Informe Gral.</Typography>
          </Link>    
        </div>      
      }
      <div className={classes.item}>
        <ExitToApp className={classes.icon} onClick={() => dispatch({ type: "LOGOUT" })} />
        <Typography className={classes.text} onClick={() => dispatch({ type: "LOGOUT" })}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
