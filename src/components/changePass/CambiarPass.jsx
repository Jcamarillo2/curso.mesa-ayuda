import { useContext, useRef, useState } from 'react'
import './cambiarPass.css'
import {loginCall} from '../../apiCalls.js'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@material-ui/core/CircularProgress';
import { VisibilityOutlined  } from "@material-ui/icons";
import {useHistory} from "react-router-dom"
import config from "../../config"
import axios from "axios"
import MuiAlert from "@material-ui/lab/Alert";

import {   Snackbar } from "@material-ui/core"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CambiarPass() {
    const history = useHistory()
    const PF = config.publicFolder
    const PR = config.proxyRoute;
    const email =useRef()
    const password =useRef()
    const passwordNew =useRef()
    const passwordConf =useRef()

    const [pass, setPass]=useState('password')
    const [passNew, setPassNew]=useState('passwordNew')
    const [passConfirm, setPassConfirm]=useState('passwordConf')

    const [openAlert, setOpenAlert] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [messageAlert, setMessageAlert] = useState('Operación Exitosa');

    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const [errorLogin, setErrorLogin]= useState(false)
      // cierre de la alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

    const handlerClick = async (e) => {
        e.preventDefault()   

     if (passwordConf.current.value !== passwordNew.current.value){
            passwordConf.current.setCustomValidity("La contraseñas no coinciden!")
            setSeverityAlert('error')
            setMessageAlert('La contraseñas no coinciden!')
            setOpenAlert(true) 
        } else {
            const userUpdate = {
                password : password.current.value, 
            }
            try {
                const res =  await axios.put(PR + "firma/change/"+ user.id ,userUpdate)
                
                setSeverityAlert('success')
                setMessageAlert('Operación Exitosa')
                setOpenAlert(true)

                history.push("/abiertos")


            } catch (err) {
                console.log(err)
                setSeverityAlert('error')
                setMessageAlert('No se pudo actualizar el password')
                setOpenAlert(true)                  
            }
        }
    }

    
     //console.log(errorLogin)

    return (
        <div className="login">
                    <form className="loginBox" onSubmit={handlerClick}>
                        <img src={"assets/files/ascLogo.png"} alt="Asc Help Desk" className="loginLogo"  />
                        <div className="loginLeft">
                            <h3 className="loginDesc">Cambio de Contraseña</h3>
                        </div>                        
                        <div className="loginInput  loginInputPassword" >
                            <input className="loginPassword" type={pass} name='inputBox' required minLength="6" placeholder="Password Actual" ref={password}/>
                            <VisibilityOutlined style={{color:'gray', cursor:'pointer', fontSize:"32px"}}  onClick={() => {setPass((pass =='password') ? 'texto': 'password');
                             password.current.focus()
                        }}/>
                        </div>                        
                        <div className="loginInput  loginInputPassword" >
                            <input className="loginPassword" type={pass} name='inputBox' required minLength="6" placeholder="Password Nuevo" ref={passwordNew}/>
                            <VisibilityOutlined style={{color:'gray', cursor:'pointer', fontSize:"32px"}}  onClick={() => {setPass((pass =='password') ? 'texto': 'password');
                             
                        }}/>
                        </div>                        
                        <div className="loginInput  loginInputPassword" >
                            <input className="loginPassword" type={pass} name='inputBox' required minLength="6" placeholder="Password Confirmación" ref={passwordConf}/>
                            <VisibilityOutlined style={{color:'gray', cursor:'pointer', fontSize:"32px"}}  onClick={() => {setPass((pass =='password') ? 'texto': 'password');
                             
                        }}/>
                        </div>                        

                        <button className="loginButton" > Cambiar contraseña</button>
                        <button className="loginRegisterButton" onClick={()=> history.push('/abiertos')}>Cancelar</button>
                        {/* <span className="loginForgot">Forgot Password?</span> */}
                        {errorLogin && <span className="loginError">Email o Password Incorrectos!</span>}
                    </form>
                

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

            </div>    
            

    )
}
