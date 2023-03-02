import {  Button,  Container,  Fab,  makeStyles,  Modal,  Snackbar,  TextField,  Tooltip,} from "@material-ui/core"

// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider,  KeyboardTimePicker,  KeyboardDatePicker,} from '@material-ui/pickers';

import { React, useState, useContext,useEffect } from 'react'
//import {PermMedia,Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons'
import {PermMedia} from '@material-ui/icons'
import { Star as StarIcon, StarBorderOutlined as StarBorderIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios"
import {AuthContext} from "../context/AuthContext"
import {useHistory, Link, Redirect} from "react-router-dom"

import config from "../config"

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
      height: "calc(100vh - 10%)",
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
starContainer:{
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  height: '50px',
  width: '100%',
  borderRadius: '10px',
  border:'1px solid #d3d3d3',    
  fontSize: '18px',
  marginBottom:'10px'
},
starStyle:{
  color:'orange', cursor:'pointer', fontSize:"30px", paddingRight:'5px', paddingBottom:'5px'
},
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ChangeStatus2 = ({setChangeStatus, changeStatus, post, statusSelection, setTicketDate, optionsEnRevision, optionsEnAtnTick,optionsEnRevCierre}) => {
  const history = useHistory()

  //const rutaServidor="/helpdeskasc"  //Prod

  //console.log(post)
  const PR = config.proxyRoute;
  const {user} = useContext(AuthContext)
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [openAlert, setOpenAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState('success');
  const [messageAlert, setMessageAlert] = useState('Operación Exitosa');

  const [asunto, setAsunto] = useState(post.asunto);
  const [descLargaAsunto, setDescLargaAsunto] = useState(post.descLargaAsunto);

  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([{id:'OPC', value:' Elija Categoría'}]);

  const [descAtencion, setDescAtencion] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [respsAtencion, setRespsAtencion] = useState([]);
  const [respAtencion, setRespAtencion] = useState('');
  const [calificacion, setCalificacion] = useState(0)

  useEffect(()=>{
    async function fetchPosts() {
      //**** */ es NECESARio  agregar un registro con este valor " Elija Área" con valor "OPC" con ese validamos
      const res = await axios.get(PR+"areas/areasAtiende/"+ post.idArea);
      setRespsAtencion(res.data)  
    }

    setRespAtencion('');
    fetchPosts()
  },[])

  useEffect(()=>{
    console.log("Post UseEfect: ",post)
    const fetchCategoria = async () =>{
      const res = await axios.get(PR + "areas/" + post.idArea );
      setCategorias([{id:'OPC', value:' Elija Categoría'}].concat(res.data))
      // en el Módulo ADD.jsx se asigna el valor 'OPC'
      setCategoria( post.idCategoria !== 'OPC' ? post.idCategoria : 'OPC');    
    }
    fetchCategoria()    
  },[changeStatus])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

 const handleChangeRespAtn = (event) => {
    //console.log(event.target.value)
    setRespAtencion(event.target.value);
  
  };

  const handleChangeCat = (event) => {
    //console.log(event.target.value)
    setCategoria(event.target.value);
  
  };

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
    var mFechaProgramacion=''
    var mFechaProgramacionFormatoMx=''
    var mEmail =''

    //console.log (post)
    if ( post.idAtiende === user.id  & statusSelection !=='Incluir nota') {
      if ( categoria === "" || categoria === "OPC" ){
        setSeverityAlert('error')
        setMessageAlert( 'Indique la Categoría')
        setOpenAlert(true)
        return
      }
    }

    if (statusSelection === "Reasignar") {
        if ( respAtencion ==='' ){
          setSeverityAlert('error')
          setMessageAlert('Operación cancelada: Es necesario indicar al resp. de Atención')
          setOpenAlert(true)
          return
         }
        // else {
        //   setSeverityAlert('success')
        //   setMessageAlert('Operación cancelada: resp. de Atención' + respAtencion)
        //   setOpenAlert(true)
        //   return
        // }
    }
    if (statusSelection === "Cerrado") {
      if ( calificacion === 0 ){
        setSeverityAlert('error')
        setMessageAlert('Operación cancelada: Es necesario indicar la calificación del Servicio')
        setOpenAlert(true)
        return
       }
    }
    if (statusSelection === "Ticket Programado") {
      if (selectedDate === null) {
        setSeverityAlert('error')
        setMessageAlert('Operación cancelada: Fecha Programada no puede estar vacía')
        setOpenAlert(true)
        return
      }
      else{
        // fechas bien explicado
        // https://www.freecodecamp.org/espanol/news/javascript-date-now-como-obtener-la-fecha-actual-con-javascript/ 
        // compara fechas
        // https://programarfacil.com/tutoriales/fragmentos/javascript/comparar-fechas-en-javascript/
        //console.log("selected date:",(selectedDate.getMonth()+1) + '-' +  selectedDate.getDate() + '-' +  selectedDate.getFullYear() )
        try {
          mFechaProgramacion=(selectedDate.getMonth()+1) + '-' +  selectedDate.getDate() + '-' +  selectedDate.getFullYear()
          mFechaProgramacionFormatoMx= selectedDate.getDate() + '/' + (selectedDate.getMonth()+1) + '/' +    selectedDate.getFullYear()
          const res =   await axios.get(PR + "tickets/dateCompare/"+ mFechaProgramacion)
          //console.log(res.data.resultado)         
          if (res.data.resultado==='Menor') {
            setSeverityAlert('error')
            setMessageAlert('Operación cancelada: La Fecha Programada no puede ser menor a la fecha actual ' )
            setOpenAlert(true)
            return
          }
        } catch (err) {
          console.log("error date compare",err)
          return
        }

      }
    }

    if (descAtencion === ""){
        //asunto.current.setCustomValidity("En necesario indicar un asunto!")
        setSeverityAlert('error')
        setMessageAlert( 'Indique la Descripción del Estatus')
        setOpenAlert(true)        
    } else {
        //console.log(asunto)
        var fileName = "";
        if (file) {
          const data = new FormData();
          fileName = Date.now() +'_'+ file.name;
          data.append("name", fileName);
          data.append("file", file);
          // newPost.img = fileName;
          // console.log(file);
          try {
            await axios.post(PR + "imagenes/usuarios/upload", data);
          } catch (err) {
            console.log("error upload",err)
          }
          setFile(null)
        }

        // es necesario obtener el estado actual y mandar una nota al api de que es un comentario
        // statusSelection y post.status
        const ticket= {
            folio: post.folio,
            idUsuario:user.id,            
            comentario: ( statusSelection ==='Incluir nota' ? 'NOTA: ': 
                          statusSelection ==='Reasignar' ? 'Reasignación: ':
                          statusSelection ==='Reincidencia' ? 'Reincidencia: ':
            '') + descAtencion,
            imagenComment: fileName ? 'images/' + fileName: fileName,                                                
            status: (statusSelection ==='Incluir nota' || statusSelection ==='Reasignar' ? post.status: (statusSelection ==='Reincidencia' ? "En Revisión" :  statusSelection)),
            fechaProg: mFechaProgramacion,
            idAtiende: (statusSelection ==='Reasignar' ? respAtencion : 0),            
            calificacion: calificacion, 
            idCategoria : categoria,
          }
          
         // console.log(ticket)
        try {
           const res =   await 
           (  statusSelection ==='Incluir nota' ? axios.post(PR + "tickets/comment/", ticket ) :
              statusSelection ==='Reasignar'    ? axios.put(PR + "tickets/reasignar/" + post.folio, ticket ) :
              statusSelection ==='Reincidencia' ? axios.put(PR + "tickets/reincidencia/" + post.folio, ticket ) :
            axios.put(PR + "tickets/status/"+ post.folio,ticket)
           )

            //setPosts(res.data)            
            post.status= (statusSelection ==='Incluir nota' || statusSelection ==='Reasignar' ) ?  post.status : (statusSelection ==='Reincidencia' ? 'En Revisión' : statusSelection )
//            setTicketDate( post.status === "En Revisión" ? optionsEnRevision : ( post.status === "En Atención" || post.status === "Ticket Programado" ? optionsEnAtnTick : (post.status === "En Cierre" ? optionsEnRevCierre: [])) )
            // statusSelection !=='Incluir nota' && 
            // setTicketDate( 
            //   user.tipoUsuario === "Solicitante" && post.status === "En Cierre" ? optionsEnRevCierre: 
            //   user.tipoUsuario === "Coordinador" && user.id === post.idUsuario && post.status === "En Cierre" ? optionsEnRevCierre:
            //   user.tipoUsuario === "Coordinador" && user.id === post.idResponsable && post.status === "En Revisión" ? optionsEnRevision : 
            //   user.tipoUsuario === "Coordinador" && user.id === post.idResponsable && ( post.status === "En Atención" || post.status === "Ticket Programado") ? optionsEnAtnTick :
            //   [{estatus:'',solicitante:'*'}]  
            // )


            var mAcciones=[]

            if (statusSelection !=='Incluir nota' && statusSelection !=='Reasignar') {
              // Si es solicitante
              if (user.id === post.idUsuario && post.status !== "En Cierre")  { mAcciones.push({estatus:'Incluir nota'})    }
              if (user.id === post.idUsuario && post.status === "En Cierre") { mAcciones.push({estatus:'En Revisión'}, {estatus:'Cerrado'})}     
          
              // Si es solicitante y además es el mismo usuario el que atiende
              if (user.id === post.idAtiende && post.status === "En Revisión") {mAcciones.push({estatus:'En Atención'}, {estatus:'Ticket Programado'}, {estatus:'En Cierre'}, {estatus:'Incluir nota'})}
              if (user.id === post.idAtiende && (post.status === "En Atención") || post.status === "Ticket Programado") {mAcciones.push({estatus:'En Cierre'}, {estatus:'Incluir nota'})}      
              if (user.id === post.idAtiende && post.status === "En Cierre")  { mAcciones.push({estatus:'Incluir nota'})    }

              // Si es solicitante y además es el mismo usuario el coordinador
              if (user.id === post.idResponsable && post.status !== "Cerrado")  {mAcciones.push( {estatus:'Reasignar'}, {estatus:'Incluir nota'})}
              
              //console.log (mAcciones)
              const unique = [...new Set(mAcciones.map(item => item.estatus))];
              //console.log (unique)              
              setTicketDate(unique)
            }
         
            setSeverityAlert('success')
            setMessageAlert('Operación Exitosa')
            setOpenAlert(true)

            //setOpen(false)
            setChangeStatus(false)
            setCalificacion(0)
            //window.location.reload();
            
            switch(statusSelection) {
              case 'En Revisión': 
                  history.push('/enRevision')
                  break;
              case 'En Atención': 
                  history.push('/enAtencion')
                  break;
              case 'Ticket Programado': 
                history.push('/programados')
                break;
              case 'En Cierre': 
                history.push('/enCierre')
                break;
              case 'Cerrado': 
                history.push('/cerrados')
                break;                
              case 'Incluir nota': 
                break;                 
              case 'Reasignar': 
                break;   
              default: 
                history.push('/')
                break;
            }

        } catch (err) {
            console.log("Error de actualización",err.message)
            setSeverityAlert('error')
            setMessageAlert('Ticket # ' + post.folio + ' no se pudo actualizar')
            setOpenAlert(true)             
            return
        }
            
            mEmail= post.emailSolicitante 
            if (post.emailAtiende=post.emailCoordinador){
              mEmail= mEmail + ", " + post.emailAtiende
            } else {
              mEmail= mEmail + ", " + post.emailAtiende + ", " + post.emailCoordinador
            }

            //console.log(mEmail)
            //console.log(post)
            const bodyEmail = {
              to: mEmail,              
              subject: "(Ticket # " + post.folio + "; Estatus:  "+ statusSelection + ") " + post.asunto,
              contenido:`
              <!-- 
  
              colors
                background       #EBEBEB
                mail container   #FFFFFF
                deep blue        #3C5A65
                light blue       #00AFC0
                border bottom    #EBEBEB
              
              -->
  
  <head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500" rel="stylesheet">
      <style>
          .asc-logo {
              font-family: Verdana, Tahoma;
              font-weight: bold;
              font-size: 26px;
          }
  
          .asc-logo i:first-child {
              color: #253b80;
          }
  
          .asc-logo i:last-child {
              color: #179bd7;
          }
  
          .asc-button {
              padding: 15px 30px;
              border: 0 solid #FF9933;
              border-radius: 5px;
              margin: 0 auto;
              display: block;
              min-width: 138px;
              position: relative;
              width: 250px;
              text-align: center;
          }
  
          .asc-button-title {
              font-size: 15px;
              color: #505050;
              vertical-align: baseline;
              font-family: Arial;
          }
  
          .asc-button .asc-logo {
              display: inline-block;
              font-size: 20px;
          }
          .asc-table {
            min-width: 600px; max-width: 100%; padding: 32px; background: #0d9be6;
          }        
      </style>
  </head>
  
  <!--
                =========   C O N T A I N E R   =========
               -->
  
  <body style="margin: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
          class="asc-table">
  
          <td>
              <table bgcolor="#FFFFFF" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                  style="min-width: 400px; max-width: 600px; border-radius: 4px;">
  
                  <!--
                      =========    H E A D E R    =========
                     -->
  
                  <tr>
                      <td>
                          <table align="center" border="0" cellpadding="2" cellspacing="0" width="100%"
                              style="padding: 20px; border-bottom: 1px solid #EBEBEB;">
                              <tr>
  
                                  <!--
                        =========
                        S O C I A L   N E T W O R K
                        =========
                      -->
                                  <td align="left" valign="middle"></td>
  
                                  <!--
                        =========
                        L O G O T Y P E
                        =========
                      -->
                                  <td align="right" valign="middle">
                                      <img width="120" style="width: 120px;"
                                      src="http://apihd3.asc.com.mx:8096/helpdeskasc/assets/files/ascLogo.png" alt="logo-asc"/>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
                  <!--
                      =========    B O D Y    =========
                     -->
  
                  <tr>
                      <td style="padding: 32px; border-bottom: 1px solid #EBEBEB;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 400px;">
                              <tr>
  
                                  <!--
                    ======================= = ==  =  =   =
                    W E L C O M E    O R    T I T L E
                    ======================== ==  =  ==  =  =
                   -->
  
                                  <td colspan="2">
                                      <h1
                                          style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 400; color: #3C5A65; line-height: 40px; text-align: center; margin: 0;">
                                          FOLIO TICKET: <span>${post.folio}</span>
                                      </h1>
                                  </td>
                              </tr>
  
                              <!--
                  ========= = ==  =  =   =
                  C O N T E N T
                  ========= ==  =  ==  =  =
                 -->
  
                            <tr>
                                <td colspan="2">
                                    <h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
                                      Originó: <span style="font-weight: 500; color: blue;">${post.nombreUsuario}</span>
                                    </h5>
                                    <h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
                                      Área Atención: <span style="font-weight: 500; color: blue;">${post.nomArea}</span>
                                    </h5>
                                    <h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
                                      Estatus: <span style="font-weight: 500; color: blue;">${statusSelection}</span>
                                    </h5>
${
  mFechaProgramacion && 
 
 `<h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
  Fecha programada: <span style="font-weight: 500; color: blue;">${mFechaProgramacionFormatoMx}</span>
 </h5>`
}

                                </td>
                            </tr>
                            <tr>
                                  <td colspan="2">
                                      <p style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; color: #3C5A65; line-height: 24px; text-align: center; margin: 20px 0 15px 0;">
                                      Descripción asunto:
                                          <span style="font-weight: 500; color: blue;">${post.descLargaAsunto}</span>
                                          <!--<span style="white-space: pre-wrap;"></span> -->
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                              <td colspan="2">
                                  <p style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; color: #3C5A65; line-height: 24px; text-align: center; margin: 20px 0 15px 0;">
                                  Comentarios de Estado:
                                      <span style="font-weight: 500; color: blue;">${descAtencion}</span>
                                      <!--<span style="white-space: pre-wrap;"></span> -->
                                  </p>
                              </td>
                          </tr>

                              
                              
                              <!--
                  ========= = ==  =  =   =
                  A D D I T I O N A L
                  ========= ==  =  ==  =  =
                 -->
  
                              <tr>
                                  <td colspan="2" width="50%">
                                      <p
                                          style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; color: #3C5A65; line-height: 24px; text-align: center; margin: 24px 0 24px 0;">
                                          Puede revisar el ticket en la siguiente direcci&oacute;n... 
                                      </p>
  
                                      <p
                                          style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; color: #3C5A65; line-height: 24px; text-align: center; margin: 24px 0 24px 0;">
                                          <a style="text-decoration: none;" href="http://apihd3.asc.com.mx:8096/soporteHD">
                                              <span style="font-weight: 500; color: #00AFC0;">http://apihd3.asc.com.mx:8096/soporteHD</span>
                                          </a>
                                      </p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
  
  
                  <!--
                        =========    F O O T E R    =========
                       -->
  
                  <tr>
                      <td bgcolor="#3C5A65"
                          style="padding: 8px 30px 8px 30px; background-size: 120%; background-position: bottom right; background-color: #0071BC;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td>
                                      <p
                                          style="font-family: 'Montserrat', -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 20px; text-align: center; margin: 16px 0 16px 0;">
                                          <a href="https://asc.com.mx"
                                              style="color: #ffffff; text-decoration: none;" target="_blank">
  
                                              <span>
                                                  <span>Visita nuestra página y conoce nuestros servicios</span><br />
                                                  <span style="color: #00AFC0; line-height: 20px;">www.asc.com.mx</span>
                                              </span>
                                          </a>
                                          
                                      </p>
                                 </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
  
              </table>
          </td>
  
      </table>
  </body>
              `,            
            }

            // bloqueo del email 07 dic 22 (desbloquear)
            try {
              //console.log(bodyEmail)
              const res =   await axios.post(PR+'email',bodyEmail)
            } catch (err) {
                console.log(err)
                setSeverityAlert('error')
                setMessageAlert('Ha fallado la entrega del correo')
                setOpenAlert(true) 
            }  

    }
}


  return (
    <>
      <Modal open={changeStatus}>
        <Container className={classes.container}>
          <form className={classes.form} onSubmit={handleClick} autoComplete="off">
            <label>Acción siguiente: '{statusSelection}'</label>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Asunto:"
                size="small"
                value={post.asunto}
                style={{ width: "100%" }}
                onChange={e => setAsunto(e.target.value)}
              />
            </div>

            {(post.status === 'En Revisión' & post.idCategoria === 'OPC' & post.idAtiende === user.id) ?
                <div className={classes.item}>
                      <TextField
                        id="standard-select-currency-native"
                        select
                        label="Categoría"
                        value={categoria}
                        //defaultValue={categoria}
                        required
                        onChange={handleChangeCat}
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Indique Categoría del asunto"
                      >
                        {                        
                        categorias.map((option,i) => (    
                          <option key={i} value={option.id}>
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                </div>  
                :
                <div className={classes.item}>
                  <TextField
                    id="standard-basic"
                    label="Categoría: "
                    size="small"
                    value={post.idCategoria}
                    style={{ width: "30%" }}
                    onChange={e => setAsunto(e.target.value)}
                  />
                </div>
            }

            {false && <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={post.descLargaAsunto}
                placeholder="Describa el caso..."
                variant="outlined"
                label="Requerimiento"
                size="small"
                style={{ width: "100%" }}
                onChange={e => setDescLargaAsunto(e.target.value)}
              />
            </div>
            }

            { statusSelection === "Reasignar" && 
                  <div className={classes.item}>
                      <TextField
                        id="standard-select-currency-native"
                        select
                        label="Reasignar a :"
                        value={respAtencion}
                        defaultValue={respAtencion}
                        required
                        onChange={handleChangeRespAtn}
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Indique responsable de atención"
                      >
                        {                        
                        respsAtencion.map((option) => (                        
                          
                          <option key={option.id} value={option.id}>
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                  </div>  
            }

            { statusSelection === "Ticket Programado" && 
            <div className={classes.item}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha de Programación"
                
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              </MuiPickersUtilsProvider>
            </div>
            }

            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                placeholder="Describa la situación del Estatus del ticket..."
                variant="outlined"
                label="Estatus"
                size="small"
                style={{ width: "100%" }}
                onChange={e => setDescAtencion(e.target.value)}
              />
            </div>
            <hr className={classes.shareHr}/>

            <div className={classes.shareBottom}>                                    
              <div className={classes.shareOptions}>
                  <label htmlFor="file" className={classes.shareOption}>
                      <PermMedia className={classes.shareIcon} htmlColor="tomato"/>
                      <span className={classes.shareOptionText}>Imagen</span>
                      <input onChange={(e)=>setFile(e.target.files[0])} style={{display: 'none'}} type="file" id="file" accept=".png, .jpeg, .jpg"/>
                      <span className={classes.shareOptionText}>{file ? file.name:''}</span>
                    </label>
              </div>
            </div>
            { (statusSelection === "Cerrado") && 
              <div className={classes.starContainer}>
                <label style={{fontSize:'12px', color:'blue', paddingTop:'10px'}}>Califica el servicio por favor</label>
                <div>
                  {calificacion === 1 ? <StarIcon className={classes.starStyle} /> : <StarBorderIcon className={classes.starStyle} onClick={()=>setCalificacion(1)}/>  }
                  {calificacion === 2 ? <StarIcon className={classes.starStyle} /> : <StarBorderIcon className={classes.starStyle} onClick={()=>setCalificacion(2)}/>  }
                  {calificacion === 3 ? <StarIcon className={classes.starStyle} /> : <StarBorderIcon className={classes.starStyle} onClick={()=>setCalificacion(3)}/>  }
                  {calificacion === 4 ? <StarIcon className={classes.starStyle} /> : <StarBorderIcon className={classes.starStyle} onClick={()=>setCalificacion(4)}/>  }
                  {calificacion === 5 ? <StarIcon className={classes.starStyle} /> : <StarBorderIcon className={classes.starStyle} onClick={()=>setCalificacion(5)}/>  }
                </div>
              </div>
              }
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                type="submit"
                //onClick={() => setOpenAlert(true)}
              >Actualizar</Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setChangeStatus(false)}
              >Cancel</Button>
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
        {/* <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert> */}
        <Alert onClose={handleClose} severity={severityAlert}>
          {messageAlert}
        </Alert>

      </Snackbar>
    </>
  );
};

export default ChangeStatus2;
