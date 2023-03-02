// import { Grid, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import TicketList from "../../components/ticketList/TicketList"
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import axios from "axios"
import { useEffect, useState } from "react";
// import { useContext,useEffect, useState } from "react";
// import {AuthContext} from "../../context/AuthContext"
import config from "../../config"

// const useStyles = makeStyles((theme) => ({
//   right: {
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
// }));

const TicketsInforme = () => {
  const PR = config.proxyRoute;
  // const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  
  useEffect(()=>{
    async function fetchPosts() {
      const res = await axios.get(PR+  "tickets/informes" );
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
        <Grid item sm={10} xs={10}> 
           <TicketList posts={posts}/> 
        </Grid>
      </Grid>      
    </div>
  );
};

export default TicketsInforme;
