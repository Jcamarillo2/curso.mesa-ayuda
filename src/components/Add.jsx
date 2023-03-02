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
import {Redirect} from "react-router-dom"
// import {useHistory} from "react-router-dom"
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

}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Add = ({setPosts}) => {
  const PR = config.proxyRoute;
  const {user} = useContext(AuthContext)
  
  //const history = useHistory()

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [openAlert, setOpenAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState('success');
  const [messageAlert, setMessageAlert] = useState('Operación Exitosa');

  const [asunto, setAsunto] = useState('');
  const [descLargaAsunto, setDescLargaAsunto] = useState('');
  const [areaAtn, setAreaAtn] = useState('OPC');
  const [categoria, setCategoria] = useState('');

  const [categorias, setCategorias] = useState([{id:'OPC', value:' Elija Categoría'}]);
  //const [areasAtn, setAreasAtn] = useState([]);
  const [areasAtn, setAreasAtn] = useState([{id:'OPC', value:' Elija área de atención'}]);


  useEffect(()=>{
    async function fetchPosts() {
      //**** */ es NECESARio  agregar un registro con este valor " Elija Área" con valor "OPC" con ese validamos
      const res = await axios.get(PR+"areas");
      //setAreasAtn(res.data)  
      setAreasAtn([{id:'OPC', value:' Elija área de atención'}].concat(res.data))
      setCategorias([{id:'OPC', value:' Elija Categoría'}]);
      //setAreasAtn([...areasAtn, res.data])      
    }

    setAsunto('');
    setDescLargaAsunto('');
    setAreaAtn('');
    setCategoria('');
    fetchPosts()

  },[])

  useEffect(()=>{
    setAsunto('');
    setDescLargaAsunto('');
    setAreaAtn('');
    setCategoria('');
    
    //setAreasAtn([{id:'OPC', value:' Elija área de atención'}]);
    setCategorias([{id:'OPC', value:' Elija Categoría'}]);

  },[open])

  useEffect(() => {
        const fetchCategoria = async () =>{
            //const res = await axios.get(`/areas?IdArea='${areaAtn.idArea}'`)
            
            const res = await axios.get(PR + "areas/" + areaAtn );
            //console.log("catewgorias",res.data)
            setCategorias([{id:'OPC', value:' Elija Categoría'}].concat(res.data))

            // setCategorias( res.data)
           //setCategoria('Elija Categoría');
           setCategoria('OPC');
          //console.log(categorias)
        }
        fetchCategoria()
  },[areaAtn])


  const handleChange = (event) => {
    setAreaAtn(event.target.value);
    //console.log("area", event.target.value)
  };

  const handleChangeCat = (event) => {
    //console.log(event.target.value)
    setCategoria(event.target.value);
  
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleClick = async (e) => {
    e.preventDefault()
    // console.log("asunto" , asunto) 
    // console.log("descLargaAsunto" , descLargaAsunto) 
    //  console.log("idArea" , "HHHH" + areaAtn + "HHHH" ) 
    // console.log("idCategoria" , "--" + categoria + "--")
    // console.log(areaAtn)
    // console.log(categorias)
    // console.log(categorias[0].idResponsable)
//    if (asunto === "" || descLargaAsunto === "" || areaAtn === "" || categoria === "Elija Categoría" ){

// antes reincidencia    if (asunto === "" || descLargaAsunto === "" || areaAtn === ""  || areaAtn === "OPC" || categoria === "" || categoria === "OPC" ){
    if (asunto === "" || descLargaAsunto === "" || areaAtn === ""  || areaAtn === "OPC" ){
        //asunto.current.setCustomValidity("En necesario indicar un asunto!")   

        setSeverityAlert('error')
        setMessageAlert( asunto === "" ? 'Indique el Asunto para Atender' : 
                      ( descLargaAsunto === "" ? 'Indique la Descripción Larga' : 
                        areaAtn === "" || areaAtn === "OPC" ? 'Indique el Área de Atención' : 
                        'Indique la Categoría'
                      ))
        // setMessageAlert( asunto === "" ? 'Indique el Asunto para Atender' : 
        //               ( descLargaAsunto === "" ? 'Indique la Descripción Larga' : 
        //                 'Indique el Área de Atención' 
        //               ))

        setOpenAlert(true)
        
    } else {
        
        //console.log(areaAtn)
          var fileName = "";

          if (file) {
            const data = new FormData();
            fileName = Date.now() +'_'+ file.name;
            data.append("name", fileName);
            data.append("file", file);
            // newPost.img = fileName;
            // console.log(file);
            try {
              await axios.post(PR+"imagenes/usuarios/upload", data);
            } catch (err) {
              console.log("error upload",err)
            }
            setFile(null)
          }

          const ticket = {
            idUsuario: user.id,
            asunto : asunto, 
            descLargaAsunto : descLargaAsunto, 
            idArea : areaAtn, 
            idCategoria : "OPC",            
            //idCategoria : categoria,            
            //idCategoria : "GEN",            
            imagenComment: fileName ? 'images/' + fileName: fileName,                                                
            status: 'En Revisión',
            idAtiende: categorias[1].idResponsable, 
          }

          // // se agrega Comentario de inicio
          // try {
          //   const res =   await axios.put("tickets/status/"+ post.folio,ticket)
          // } catch (err) {
          //   console.log(err)
          // }

          var mFolio = ""
          var mNombreUsuario ="" 
          var mNomArea ="" 
          var mStatus =""
          var memailCoordinador  =""

          try {
              //  await axios.post("tickets",ticket)
            //console.log(ticket)
              const res =   await axios.post(PR+"tickets",ticket)
              //setPosts([...posts, ticket2])
              // console.log('res.data',res.data)
              mFolio = res.data[0].folio
              mNombreUsuario = res.data[0].nombreUsuario 
              mNomArea = res.data[0].nomArea 
              mStatus = res.data[0].status
              memailCoordinador = res.data[0].emailCoordinador

              setPosts(res.data)                          
              //console.log('post',posts)

              setSeverityAlert('success')
              setMessageAlert('El registro del TIcket # '+ mFolio + ' Exitoso')
              setOpenAlert(true)

          } catch (err) {
              console.log(err)
              setSeverityAlert('error')
              setMessageAlert('Error al guardar el registro')
              setOpenAlert(true)
              return
          }

          const bodyEmail = {
            to:memailCoordinador ,
            subject: "(Ticket # " + mFolio + " P/Revisión) " + asunto,
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
                                        FOLIO TICKET: <span>${mFolio}</span>
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
                                    Originó: <span style="font-weight: 500; color: blue;">${mNombreUsuario}</span>
                                  </h5>
                                  <h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
                                    Área Atención: <span style="font-weight: 500; color: blue;">${mNomArea}</span>
                                  </h5>
                                  <h5 style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 300; color: #3C5A65; line-height: 2px; text-align: left; margin: 10px 0 ;">
                                    Estatus: <span style="font-weight: 500; color: blue;">${mStatus}</span>
                                  </h5>
                              </td>
                          </tr>
                          <tr>
                                <td colspan="2">
                                    <p style="font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; color: #3C5A65; line-height: 24px; text-align: center; margin: 20px 0 15px 0;">
                                    Descripción asunto:
                                        <span style="font-weight: 500; color: blue;">${descLargaAsunto}</span>
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
            // es necesario formatear el correo de aviso
            //console.log(bodyEmail)
            const res =   await axios.post(PR+'email',bodyEmail)
          } catch (err) {
              console.log(err)
              setSeverityAlert('error')
              setMessageAlert('Ha fallado la entrega del correo')
              setOpenAlert(true)              
          }


          
          setOpen(false)
          {<Redirect to="/" />}
    }
}


  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>


      <Modal open={open}>
        <Container className={classes.container}>
          <form className={classes.form} onSubmit={handleClick} autoComplete="off">

            <div className={classes.item}>
              <TextField
                id="standard-basic"
                label="Asunto"
                required
                size="small"
                style={{ width: "100%" }}
                onChange={e => setAsunto(e.target.value)}
              />
            </div>


            <div className={classes.containerCat}>
                  <div className={classes.item}>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Área"
                        required
                        value={areaAtn}
                        onChange={handleChange}
                        SelectProps={{
                          native: true,
                        }}          
                        helperText="Indique el área de Atención"
                      >
                        {areasAtn.map((option) => (
                          <option
                          key={option.id} value={option.id}>
                          {option.value}
                        </option>
                        ))}
                      </TextField>
                  </div>

                  {false && <div className={classes.item}>
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
                  </div>  }

            </div>

            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                
                placeholder="Describa el caso..."
                variant="outlined"
                label="Requerimiento"
                size="small"
                style={{ width: "100%" }}
                onChange={e => setDescLargaAsunto(e.target.value)}
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
                onClick={() => setOpen(false)}
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
        <Alert onClose={handleClose} severity={severityAlert}>
          {messageAlert}
        </Alert>
        

      </Snackbar>
    </>
  );
};

export default Add;
