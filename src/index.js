//import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider} from "./context/AuthContext"
import  {GraphProvider} from "./context/GraphContext.js"

ReactDOM.render(
  //<React.StrictMode>
    <AuthContextProvider>
       <GraphProvider> 
        <App />
      </GraphProvider> 
    </AuthContextProvider>, 
  //</React.StrictMode>,
  document.getElementById("root")
);
