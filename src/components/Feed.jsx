import { Container, makeStyles } from "@material-ui/core";
//import Post from "./Post";
import Ticket from "./Ticket";
import ChangeStatus from "./ChangeStatus";
//import {Posts} from "../dummyData";
// import axios from "axios"

import {  useState } from "react";
//import {AuthContext} from "../context/AuthContext"


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(12),
  },
}));

const Feed = ({posts}) => {
  //const {user} = useContext(AuthContext)
  const classes = useStyles();
  //console.log(posts)
  const [changeStatus, setChangeStatus] = useState(false)
  const [ticketDate, setTicketDate] = useState({})
  // useEffect(()=>{
  //   async function fetchPosts() {
  //     const res = await axios.get("tickets/user/" + user.id);
  //     //const res = await axios.get("tickets");
  //     //console.log(res)
  //     //console.log(res, "26:29");
  //     setPosts(res.data)
  //   }
  //   fetchPosts()
  // },[])

  return (
    <Container className={classes.container}>
      {
        //Posts.map((p)=>(
        posts.map((p)=>(
          //<Ticket key={p.folio}  post={p} setChangeStatus={setChangeStatus} setTicketDate={setTicketDate}/>          
          <Ticket key={p.folio}  post={p} />          
        ))
      }       
      {/* <ChangeStatus setChangeStatus={setChangeStatus} changeStatus={changeStatus} ticketDate={ticketDate}/> */}
    </Container>
  );
};

export default Feed;
