import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import FavoriteIcon from '@material-ui/icons/Favorite'; 
//import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import {format} from 'timeago.js'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import ChangeStatus2 from "./ChangeStatus2";
import axios from "axios"
import config from "../config"

const optionsEnRevision = [
  {estatus:'En Cierre', solicitante:''},
  {estatus:'En Atención', solicitante:''},
  {estatus:'Ticket Programado', solicitante:''},  
  {estatus:'Incluir nota', solicitante:'*'},  
];

const optionsEnRevisionUser = [
  {estatus:'Incluir nota', solicitante:'*'},  
];


const optionsEnAtnTick = [
  {estatus:'En Cierre', solicitante:''},
  {estatus:'Incluir nota', solicitante:'*'},  
];

const optionsEnAtnTickUser = [
  {estatus:'Incluir nota', solicitante:'*'},  
];


const optionsEnRevCierre = [
  {estatus:'En Revisión', solicitante:'*'},
  {estatus:'Cerrado', solicitante:'*'},
];

const ITEM_HEIGHT = 30;
const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 500,
    margin:"15px",
    width: "95%",
    //height: "50px",
    
    borderRadius: "10px",

    boxShadow: "1px -1px 30px -7px rgba(0,0,0,0.75)",

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  subheaderContainer:{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2px",
    fontFamily: "Verdana",
    fontSize:"12px",    
    [theme.breakpoints.down("sm")]: {
    display:"block",
    },      
  },
  subheaderContainerUser:{
    color:"blue"
  },
  subheaderContainerArea:{
    color:"orange"
  },
  subheaderContainerStatus:{
    color:"green"
  },
  subheaderContainerLabel:{
    color:"black"
  },
  titleFecha:{
    fontSize:"12px",
    color:"blue",
  },

  postImg:{
      margin: "20px 0",
      
      width: "80%",
      height: "70%",
      objectFit: "contain",

}
}));

const Ticket = ({post})=> {
  const {user} =useContext(AuthContext)
  const PF = config.proxyRoute; //config.publicFolder
  const PR = config.proxyRoute;

  const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

//console.log(post)
//console.log(user)

// button and menu
const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const [selectItem, setSelectItem]= useState("")

// nuevo modal 
const [changeStatus, setChangeStatus] = useState(false)

// Opciones del menú de estatus
const [ticketDate, setTicketDate] = useState( 
    user.tipoUsuario === "Solicitante" && post.status === "En Cierre" ? optionsEnRevCierre: 
    user.tipoUsuario === "Coordinador" && user.id === post.idUsuario && post.status === "En Cierre" ? optionsEnRevCierre:

    user.tipoUsuario === "Coordinador" && user.id === post.idResponsable && post.status === "En Revisión" ? optionsEnRevision : 
    user.tipoUsuario === "Solicitante" && user.id === post.idUsuario && post.status === "En Revisión" ? optionsEnRevisionUser : 

    user.tipoUsuario === "Coordinador" && user.id === post.idResponsable && ( post.status === "En Atención" || post.status === "Ticket Programado") ? optionsEnAtnTick :
    user.tipoUsuario === "Solicitante" && user.id === post.idUsuario && ( post.status === "En Atención" || post.status === "Ticket Programado") ? optionsEnAtnTickUser :
    [{estatus:'',solicitante:'*'}]  
  )

// post.status === "En Revisión" ? optionsEnRevision : ( post.status === "En Atención" || post.status === "Ticket Programado" ? optionsEnAtnTick : (post.status === "En Cierre" ? optionsEnRevCierre: [])) 

// Opción seleccionada

const [statusSelection, setStatusSelection] = useState('')

function zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */ 
  var zero = "0"; /* String de cero */  
  
  if (width <= length) {
      if (number < 0) {
           return ("-" + numberOutput.toString()); 
      } else {
           return numberOutput.toString(); 
      }
  } else {
      if (number < 0) {
          return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
      } else {
          return ((zero.repeat(width - length)) + numberOutput.toString()); 
      }
  }
}

const [comentarios, setComentarios] = useState([])
  
useEffect(()=>{
  async function fetchComentarios() {
    //const res = await axios.get("tickets/user/" + user.id);

    const res = await axios.get(PR +  "tickets/comment/" +  post.folio);
    
    //const res = await axios.get("tickets");
    //console.log(res.data)
    //console.log(res, "26:29");
    setComentarios(res.data)
  }
  fetchComentarios()
},[])

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    //console.log(value)
    setAnchorEl(null);
    
  };
  
  const onMenuItemClick= (event, index, option) =>{
    
    setAnchorEl(null);

    
    //console.log(index, post)
    setSelectItem(index)
    setChangeStatus(true)
    setStatusSelection(option)
    
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src= {
            post.photo ? PF + post.photo: PF +'/users/noavatar.png'} />
        }
        action={
          <div>
           
              <IconButton aria-label="settings"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              >
              <MoreVertIcon />            
              </IconButton>
              { ticketDate[0].estatus !==''  &&
                <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      {                      
                      
                      ticketDate.map((option, index) => (
                        <MenuItem key={option.estatus}  onClick={(event)=>onMenuItemClick(event, index, option.estatus)} selected={index===selectItem}>
                          {option.estatus}
                        </MenuItem>
                      ))

                      }                      
                </Menu>                
              } 
          </div>
          
        }
        
        
        title={<div> {zfill(post.folio, 5)} : <span className={classes.subheaderContainerLabel}> {post.asunto} </span> </div>}
        subheader={
           <div className= {classes.subheaderContainer}>
            <div className={classes.subheaderContainerUser}>
              <label><span>{post.nombreUsuario}</span>  </label>               
            </div>
            <div >
              <label className={classes.subheaderContainerLabel} >Área: <span className={classes.subheaderContainerArea}>{post.nomArea}</span>  </label>               
            </div>
            <div className={classes.subheaderContainerStatus}>
              <label className={classes.subheaderContainerLabel}>Estatus: <span className={classes.subheaderContainerStatus}>{post.status}</span>  </label>               
            </div>
            <div className={classes.subheaderContainerLabel}>              
              {/* {format(post.fechaCreacion)} */}
              {post.fechaCreatFormat}
            </div>            
          </div>        
        } 
      />
        {/* <Divider/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {post.descLargaAsunto}
        </Typography>
      </CardContent> */}

       { comentarios.length ?  
      <div> 
      <CardActions disableSpacing>
        
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        
      </CardActions>
    
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {  
            comentarios.map((option) => (
              <div key={option.ContCommentTicket}  > 
                    <Divider/> 
                    <div  className= {classes.subheaderContainer}>
                        <div className={classes.subheaderContainerStatus}>
                          <label className={classes.subheaderContainerLabel}>Estatus: <span className={classes.subheaderContainerStatus}>{option.status==="Ticket Programado" ? option.status + " (" + (option.fechaProgFormat ? option.fechaProgFormat: '**NOTA')  +  ")" : option.status }  </span>  </label>               
                        </div>

                        <div className={classes.subheaderContainerUser}>
                          <label><span>{option.nombreUsuario}</span>  </label>               
                        </div>
                        <div className={classes.subheaderContainerLabel}>              
                          {option.fechaCreatFormat}
                        </div>            
                  </div>
                  <Typography className= {classes.subheaderContainer} paragraph>
                          {option.comentario}
                  </Typography>           
                  {option.imagenComment && 
                  <div  className= {classes.subheaderContainer}>
                    <img className={classes.postImg} src={PF + option.imagenComment} alt={option.imagenComment} />
                  </div> }
            </div>   
            ))
          }                    
        </CardContent>
        
      </Collapse>
      </div> : <div></div>
      } 
  {/*
      <CardActions disableSpacing>
      
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
    </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
        
      </Collapse>
      */}

  
      <ChangeStatus2 setChangeStatus={setChangeStatus} 
      changeStatus={changeStatus} 
      post={post} 
      statusSelection={statusSelection}
      setTicketDate={setTicketDate}
      optionsEnRevision={optionsEnRevision}
      optionsEnAtnTick={optionsEnAtnTick}
      optionsEnRevCierre={optionsEnRevCierre}
      />
    </Card>
  );
}

export default Ticket