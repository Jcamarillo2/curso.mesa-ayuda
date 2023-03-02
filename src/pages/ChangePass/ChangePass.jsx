import { Grid, makeStyles } from "@material-ui/core";
import Navbar from "../../components/Navbar";
import axios from "axios"
import { useContext,useEffect, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import config from "../../config"
import CambiarPass  from "../../components/changePass/CambiarPass";
import Login from "../../components/login/Login";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const ChangePass = () => {
  const PR = config.proxyRoute;
  const classes = useStyles();
  const {user} = useContext(AuthContext)

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={12} xs={12}>
          <CambiarPass />
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ChangePass;
