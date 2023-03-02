import { useState, useEffect } from 'react';
import {  MuiPickersUtilsProvider,  KeyboardTimePicker,  KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { useContext } from "react";
import  GraphContext  from "../context/GraphContext.js"

import {
  Container,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { red } from '@material-ui/core/colors';
import WidgetLg from './widgetLg/WidgetLg';
import PieChartGraph from './pieChartGraph/PieChartGraph.jsx';
import config from "../config"
import axios from "axios"
import PieChartFill from './pieChartGraph/PieChartFill.jsx';
import PieChartOfTwoLevels from './pieChartGraph/PieChartOfTwoLevels.jsx';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(13),
    position: "sticky",  
    top: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
  item: {
    width:'150px',
    fontSize: 12,
  },
  link: {
    marginRight: theme.spacing(2),
    color: "#555",
    fontSize: 16,
  },
}));

const Rightbar = () => {
  const PR = config.proxyRoute;
  const classes = useStyles();
  const {setSelectedDateInicio, selectedDateInicio,  setSelectedDateFin, selectedDateFin, loadRegsTIckets, regsTickets} = useContext(GraphContext)

  const [tickets, setTickets] = useState([])
  const [ticketsEdos, setTicketsEdos] = useState([])

  // var diff = fechaFin - fechaInicio;

  // console.log(diff/(1000*60*60*24) );

  const loadTIckets  = async ()=>{
     let mFechaIni=selectedDateInicio.getFullYear() +'-'+(selectedDateInicio.getMonth()+1)  +'-'+  selectedDateInicio.getDate() 
     let mFechaFin=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+1)  +'-'+  selectedDateFin.getDate() 
     //console.log('mFechaIni', mFechaIni)
     //console.log('mFechaFin', mFechaFin)
     const res =   await axios.get(PR + "tickets/byarea/"+ mFechaIni+"/" + mFechaFin)
     setTickets(res.data)
     const res2 =   await axios.get(PR + "tickets/bystatus/"+ mFechaIni+"/" + mFechaFin)
     setTicketsEdos(res2.data)
     //console.log(res.data)
  }

  useEffect(()=>{
    loadTIckets()
    //<loadRegsTIckets()
  }, [])

  useEffect(()=>{
    loadTIckets()
    
  }, [selectedDateInicio,selectedDateFin])


  const handleDateChange = (date) => {
    setSelectedDateInicio(date);
  };
  const handleDateChangeFin = (date) => {
    setSelectedDateFin(date);
  };
  return (
    <Container className={classes.container}>

      <Typography className={classes.title} gutterBottom component={'span'} >
        Tableros:
        <div >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Del:"
                
                value={selectedDateInicio}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',                  
                }}
                InputProps={{
                  style: {
                      fontSize: 15,
                      height: 30,                      
                  }}}                
                style={{
                  width: 140,
                  marginRight:5,
              }}                
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Al:"
                
                value={selectedDateFin}
                onChange={handleDateChangeFin}
                KeyboardButtonProps={{
                  'aria-label': 'change date',                  
                }}
                InputProps={{
                  style: {
                      fontSize: 15,
                      height: 30,                      
                  }}}                
                style={{
                  width: 140,
              }}
              />
              </MuiPickersUtilsProvider>
        </div>        
      </Typography>
       <WidgetLg tickets={tickets} />
       {/* <PieChartOfTwoLevels ticketsEdos={ticketsEdos} tickets={tickets}/>        */}

       <PieChartGraph tickets={tickets}/> 
    
      {ticketsEdos?.length > 0  ?       
        <Typography className={classes.title} style={{color:"#8884d8", textAlign:'center'}} gutterBottom>
          Estado de los Tikets:
        </Typography >        
        : 
        <></>
      }
       <PieChartFill ticketsEdos={ticketsEdos}/>
      {/*
      <Divider flexItem style={{marginBottom:5}}/>
      <Link href="#" className={classes.link} variant="body2">
        Tecnologías de Información
      </Link>
      <Divider flexItem style={{marginBottom:5}}/>
      <Link href="#" className={classes.link} variant="body2">
        Planta Física
      </Link> */}

    </Container>
  );
};

export default Rightbar;

