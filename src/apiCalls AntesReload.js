import axios from "axios";
import config from "./config"
export const loginCall = async (userCredential, dispatch, setErrorLogin)=>{
    
    
    dispatch({type: "LOGIN_START"})
    // let headers = new Headers();
    const PR = config.proxyRoute;
    
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    // headers.append('Origin','http://localhost:3000/build/');
    
    try {
        //const res = await axios.post("auth/login", userCredential)
        //const res = await axios.post("firma/login", userCredential)

        // const res = await axios.post("firma/login", userCredential,  {
        //     mode: 'cors',
        //     credentials: 'include',
        //     method: 'POST',
        //     headers: headers
        // })
        
        //console.log(res)
        //console.log(userCredential)
        
        const res = await axios.post(PR + "firma/login",userCredential )
        //console.log(res.data)
        setErrorLogin(res.data==='' ? true: false)
        dispatch ({type: "LOGIN_SUCCESS", payload:res.data})
    } catch (err) {
        setErrorLogin(true)
        dispatch ({type: "LOGIN_FAILURE", payload: err})
        //console.log("error apicall", err)
    }
}