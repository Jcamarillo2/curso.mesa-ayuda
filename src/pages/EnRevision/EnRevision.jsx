import { Grid, makeStyles } from "@material-ui/core";
import Add from "../../components/Add";
import Feed from "../../components/Feed";
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import axios from "axios"
import { useContext,useEffect, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import config from "../../config"

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const EnRevision = () => {
  const PR = config.proxyRoute;
  const classes = useStyles();
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  
  useEffect(()=>{
    async function fetchPosts() {
      //const res = await axios.get("tickets/user/" + user.id);

      //const res = await axios.get(PR+(user.tipoUsuario==='Solicitante' ? "tickets/usuario/": "tickets/coord/" ) +  user.id + "/En Revisión" );
      const res = await axios.get(PR + "tickets/usuario/" +  user.id + "/En Revisión" );      
      //const res = await axios.get("tickets");
      //console.log(res.data)
      //console.log(res, "26:29");
      setPosts(res.data)
    }
    fetchPosts()
  },[])


  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed posts={posts}  />
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar />
        </Grid>
      </Grid>
      
      <Add setPosts={setPosts} />
    </div>
  );
};

export default EnRevision;
