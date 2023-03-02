import { useRef } from 'react'
import axios from 'axios';
import {useHistory} from "react-router-dom"
import './register.css'

export default function Register() {   
    const apellidoPaterno = useRef()
    const apellidoMaterno = useRef()
    const nombre = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                apellidoPaterno : apellidoPaterno.current.value, 
                apellidoMaterno : apellidoMaterno.current.value, 
                nombre : nombre.current.value, 
                email : email.current.value, 
                username : username.current.value, 
                password : password.current.value, 
                photo : 'person/5.jpeg', 
            }
            try {
                await axios.post("register",user)
                history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Help Desk ASC</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Help Desk Asc</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input className="loginInput" required ref={apellidoPaterno} placeholder="Apellido Paterno"/>
                        <input className="loginInput" required ref={apellidoMaterno} placeholder="Apellido Materno"/>
                        <input className="loginInput" required ref={nombre} placeholder="Nombre"/>
                        <input className="loginInput" required ref={username} placeholder="Username"/>
                        <input className="loginInput" type="email" required ref={email} placeholder="Email"/>


                        <input className="loginInput" minLength="6" type="password" required ref={password} placeholder="Password"/>                        
                        <input className="loginInput" minLength="6" type="password" required ref={passwordAgain} placeholder="Password Again"/>

                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Log Into Account</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
