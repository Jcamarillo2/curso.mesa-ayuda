import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import profile from "../image/logoAscCompacto.png"
import email from "../image/email.png"
import pass from "../image/Pass.png"

const useStyles = makeStyles((theme) => ({
  profile:{    
   maxHeight:"100px",
   maxWidth:"100px"  , 
   marginBottom:20,
  },

  imgs:{
    paddingTop:10,
    display:"flex",
    justifyContent:"center",        
  },
  
  containerImage:{
      backgroundColor:"rgb(223,221,221)",
      borderRadius:150,
      alignItems:"center",
      display:"flex",
      height:115,
      width:115,
  },

  input:{
    width:300,
    height:50,
    borderRadius:60,
    boxShadow: "inset 0px 0px 25px 0px #888",
    border:"none",
    outline:"none",
    backgroundColor:"#fff",
    display:"flex",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginBottom:15
  },

  email:{
    height:30,
    width:30,  
    padding: "14px",
  },

  name:{
    paddingLeft: "15px",
    fontSize:15,
    border:"none",
    outline:"none",
    height:25,
    width:200,
    opacity: 1,
  },
  buttonLogin:{
    width:300,
    height:40,
    borderRadius:"15px",
    marginBottom:10,
    color:"White",
    fontSize:"12px",
    border:"none"
  } ,

  link:{
    fontSize:"18px",
    fontWeight:400,
  },

  a_link:{
    color:"blue",
  },

  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  
  container: {
    width: "28%",
    height: 350,
    backgroundColor: "white",
    paddingTop:10,
    borderRadius:40,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",


    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal open={open}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.imgs}>
                <img src={profile} alt="profile" className={classes.profile}/>
            </div>
            <div >
              
              <div className={classes.input} >
                <img src={email} alt="email" className={classes.email}/>
                <input type="text" placeholder="user name" className={classes.name}/>                
              </div>     
              <div className={classes.input} >
                <img src={pass} alt="Password" className={classes.email}/>
                <input type="password" placeholder="Contraseña" className={classes.name}/>                
              </div>                      
      
            </div>

            <div className={classes.item}>
              <Button
                variant="contained"
                color="primary"                
                className={classes.buttonLogin}
                onClick={() => setOpenAlert(true)}
              >
                login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonLogin}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

            </div>
            <div className={classes.item}>
              <p className={classes.link}>
                  <a href="#" className={classes.a_link}>Olvidó contraseña</a>
                  o 
                  <a href="#" className={classes.a_link}> Alta de Usuario</a>  
                </p>
            </div>
          </form>
        </Container>
      </Modal>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
