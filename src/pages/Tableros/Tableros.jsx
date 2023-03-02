import { Grid } from "@material-ui/core";
import HomeTableros from "../../components/homeTableros/HomeTableros";
import Leftbar from "../../components/Leftbar";
import Navbar from "../../components/Navbar";
import axios from "axios"
import { useEffect, useState } from "react";
import config from "../../config"

const TicketsInforme = () => {
  const PR = config.proxyRoute;
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
           {/* <TicketList posts={posts}/>  */}
           <HomeTableros />
        </Grid>
      </Grid>      
    </div>
  );
};

export default TicketsInforme;
