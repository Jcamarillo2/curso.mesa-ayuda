//import { Grid, makeStyles } from "@material-ui/core";
//import {  makeStyles } from "@material-ui/core";
//import Home from "./pages/home/Home.jsx"
//import Login from "./components/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";

import Home from './pages/home/Home.jsx'
import Login from './components/login/Login.jsx';
//import Profile from './pages/profile/Profile.jsx';

import Register from "./components/register/Register";
import Error404 from './pages/Error404';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";

import Abiertos from "./pages/Abiertos/Abiertos.jsx";
import EnRevision from "./pages/EnRevision/EnRevision.jsx";
import EnAtencion from "./pages/EnAtencion/EnAtencion.jsx";
import Programados from "./pages/Programados/Programados.jsx";
import EnCierre from "./pages/EnCierre/EnCierre.jsx";
import Cerrados from "./pages/Cerrados/Cerrados.jsx";
import MisTickets from "./pages/MisTickets/MisTickets.jsx";
{/*
const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
*/}

const App = () => {
  const rutaServidor=""  //dev
  //const rutaServidor="/helpdeskasc"  //Prod
  //const classes = useStyles();
  const {user} =useContext(AuthContext)
  //const redirect = location.search se quitó porque me marcaba un error pero hay que investigar para que es?
  //console.log(user)
  return (
      
      <HashRouter>
        <Switch>
          <Route exact path= {rutaServidor + "/"}>
          { user ? <Home/>: <Login/>  }
          </Route>
          <Route exact path={rutaServidor + "/login"}>
              {user ? <Redirect to={rutaServidor + "/"} />:  <Login/> }
                 
          </Route>
          <Route exact path={rutaServidor + "/register"}>
              {user ? <Redirect to={rutaServidor + "/"} />:  <Register/> }
          </Route>
          {/*
          <Route exact path="/profile/:username">
              <Profile/> 
          </Route>
          */}
          <Route exact path={rutaServidor + "/abiertos"}>
              {user ? <Abiertos/> :  <Login/> }              
          </Route>
          <Route exact path={rutaServidor + "/enRevision"}>
              {user ? <EnRevision/> :  <Login/> }              
          </Route>
          <Route exact path={rutaServidor + "/enAtencion"}>
              {user ? <EnAtencion/> :  <Login/> }                   
          </Route>
          <Route exact path={rutaServidor + "/programados"}>
              {user ? <Programados/> :  <Login/> }                   
          </Route>
          <Route exact path={rutaServidor + "/enCierre"}>
              {user ? <EnCierre/> :  <Login/> }                                 
          </Route>
          <Route exact path={rutaServidor + "/misTickets"}>
              {user ? <MisTickets/> :  <Login/> }                                               
          </Route>
          <Route exact path={rutaServidor + "/cerrados"}>
              {user ? <Cerrados/> :  <Login/> }                                                             
          </Route>
          <Route path="*" children={<Error404/>} />        
          </Switch>
      </HashRouter>

    );
};

export default App;
