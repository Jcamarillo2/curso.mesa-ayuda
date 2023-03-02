import { useContext, useRef, useState } from 'react'
import './login.css'
import {loginCall} from '../../apiCalls.js'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@material-ui/core/CircularProgress';
import { VisibilityOutlined  } from "@material-ui/icons";
//import {useHistory} from "react-router-dom"
import config from "../../config"

export default function Login() {
    const PF = config.publicFolder
    const email =useRef()
    const password =useRef()
    const [pass, setPass]=useState('password')
    //const history = useHistory()

    //console.log(AuthContext)
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    //console.log (user,isFetching,error,dispatch)
    const [errorLogin, setErrorLogin]= useState(false)
    const handlerClick = (e) => {
        e.preventDefault()        
        // console.log(email.current.value)
        loginCall({email:email.current.value, password:password.current.value}, dispatch, setErrorLogin)
    }

    
     //console.log(errorLogin)

    return (
        <div className="login">
                {/*
                            <div className="loginWrapper"> 

                <div className="loginLeft">
                    <h3 className="loginLogo">Asc Help Desk</h3>
                    <span className="loginDesc">Connect with friends and de the world around you on Dazapsocial</span>
                </div>
                <div className="loginRight">

                */}
                    <form className="loginBox" onSubmit={handlerClick}>
                        <img src={"assets/files/ascLogo.png"} alt="Asc Help Desk" className="loginLogo"  />
                        
                        <input className="loginInput" type="email" placeholder="Email" ref={email}/>
                        {/* <input className="loginInput" type="password" required minLength="6" placeholder="Password" ref={password}/> */}
                        <div className="loginInput  loginInputPassword" >
                            <input className="loginPassword" type={pass} name='inputBox' required minLength="6" placeholder="Password" ref={password}/>
                            <VisibilityOutlined style={{color:'gray', cursor:'pointer', fontSize:"32px"}}  onClick={() => {setPass((pass =='password') ? 'texto': 'password');
                             password.current.focus()
                        }}/>
                        </div>                        
                        <button className="loginButton" disabled={isFetching}>{isFetching ?  <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                        {/*
                        <button className="loginRegisterButton" >{isFetching ?  <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}</button>
                         <span className="loginForgot">Forgot Password?</span> */}
                        {errorLogin && <span className="loginError">Email o Password Incorrectos!</span>}
                    </form>
                
                {/* 
                </div>
                </div> */}
            </div>            
    )
}
