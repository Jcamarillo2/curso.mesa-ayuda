import {
  Button,
  Container,
  Fab,
  makeStyles,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";

import { React, useState, useContext,useEffect } from 'react'
//import {PermMedia,Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons'
import {PermMedia} from '@material-ui/icons'
import { Add as AddIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import {Link, Redirect} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    borderRadius:"30px",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 10%)",
      height: "calc(100vh - 20%)",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
  shareHr:{
    marginBottom: "20px",    
  },
  shareBottom:{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
  },
  
  shareOptions:{
      display: "flex",
      justifyContent: "space-between",    
  },
  
  shareOption:{
      display: "flex",
      alignItems: "center",
      marginRight: "15px",
      cursor: "pointer",
  },
  shareIcon:{
    fontSize: "18px",
    marginRight: "5px",
  },

  shareOptionText:{
    fontSize: "14px",
    fontWeight: "500",
  },

  shareButton:{
    border: "none",
    padding:"7px",
    borderRadius: "5px",
    backgroundColor:"green",
    fontWeight: 500,
    marginBottom: "20px",
    cursor: "pointer",
    color: "white",
    
} , 
containerCat: {
  display: "flex",
  justifyContent: "space-between", 
  [theme.breakpoints.down("sm")]: {
    flexDirection:"column",
  },
},

}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChangeStatus = ({setChangeStatus, changeStatus, ticketDate}) => {
  //console.log(ticketDate.asunto)
  const {user} = useContext(AuthContext)
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  
  const [openAlert, setOpenAlert] = useState(false);

  const [asunto, setAsunto] = useState(ticketDate.asunto);
  const [descLargaAsunto, setDescLargaAsunto] = useState(ticketDate.descLargaAsunto);

  const [descAtencion, setDescAtencion] = useState('');

  // cierre de la alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  // cierre de formulario
  const handleClick = async (e) => {
    e.preventDefault()
    
    if (descAtencion === ""){
        //asunto.current.setCustomValidity("En necesario indicar un asunto!")
    } else {
        //console.log(asunto)
        const ticket = {
            folio: ticketDate.folio,  
            status: 'En Atención', 
            descAtencion : descAtencion,                                               
          }
        try {
            //  await axios.post("tickets",ticket)

            const res =   await axios.put("tickets/status/"+ ticketDate.folio,ticket)
            
            //setPosts(res.data)            
            
            // es necesario formatear el correo de aviso
            //const res =   await axios.post("email",{body:'ticket'})

            setOpenAlert(true)
            //setOpen(false)
            setChangeStatus(false)
            {<Redirect to="/" />}
        } catch (err) {
            console.log(err)
        }
    }
}


  return (
    <>
      <Modal open={changeStatus}>
        <Container className={classes.container}>
          <form className={classes.form} onSubmit={handleClick} autoComplete="off">

            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Asunto"
                size="small"
                value={ticketDate.asunto}
                style={{ width: "100%" }}
                onChange={e => setAsunto(e.target.value)}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={ticketDate.descLargaAsunto}
                placeholder="Describa el caso..."
                variant="outlined"
                label="Requerimiento"
                size="small"
                style={{ width: "100%" }}
                onChange={e => setDescLargaAsunto(e.target.value)}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Describa la solución..."
                variant="outlined"
                label="Solución"
                size="small"
                style={{ width: "100%" }}
                onChange={e => setDescAtencion(e.target.value)}
              />
            </div>
           
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                type="submit"
                //onClick={() => setOpenAlert(true)}
              >
                Crear Ticket
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setChangeStatus(false)}
              >
                Cancel
              </Button>
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

export default ChangeStatus;
