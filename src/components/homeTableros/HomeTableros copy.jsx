//import Chart from "../chart/Chart"

import "./home.css"
import {userData} from "../../dummyData.js"
// import WidgetSm from "../../componentes/widgetSm/WidgetSm"
// import WidgetLg from "../../componentes/widgetLg/WidgetLg"

import { useState, useEffect } from 'react';

import {  MuiPickersUtilsProvider,  KeyboardTimePicker,  KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios"
import { useContext } from "react";
import  GraphContext  from "../../context/GraphContext.js"
import config from "../../config"

import FeaturedInfo from "../featuredInfo/FeaturedInfo"
import BarChartComp from "../barChartComp/BarChartComp"
import PieChartPaddingAng from "../pieChartPaddingAngle/PieChartPaddingAng"
import PieChartDiasServs from "../pieChartPaddingAngle/PieChartDiasServs"
import {     TextField, makeStyles,    Typography,  } from "@material-ui/core";
import TinyBarChar from "../tinyBarChar/TinyBarChar";

  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(10),
      position: "sticky",  
      top: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      color: "#555",
      marginTop:'35px',
      marginRight:'320px'
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

  const meses = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },    
  ];

export default function Home() {
  var today = new Date();
  var anioIni = today.getFullYear();
  var mesIni = today.getMonth()

    //var anioIni = new Date().getFullYear();
    const PR = config.proxyRoute;
    const classes = useStyles();
   

    const {setSelectedDateInicio, selectedDateInicio,  setSelectedDateFin, selectedDateFin, loadRegsTIckets, regsTickets} = useContext(GraphContext)

    const [ticketsRegsyCerradosAnual, setTicketsRegsyCerradosAnual] = useState([])    

    const [ticketsOpen, setTicketsOpen] = useState(0)
    const [ticketsOpenMesAnt, setTicketsOpenMesAnt] = useState(0)
    const [ticketsCerr, setTicketsCerr] = useState(0)
    const [ticketsCerrMesAnt, setTicketsCerrMesAnt] = useState(0)

    const [ticketsReincidentes, setTicketsReincidentes] = useState(0)
    const [ticketsReincidentesAnt, setTicketsReincidentesAnt] = useState(0)
    

    const [calificacionAnioMes, setCalificacionAnioMes] = useState([])    
    const [reincidenciaAnioMes, setReincidenciaAnioMes] = useState([])  
    const [diasServicioaAnioMes, setDiasServicioaAnioMes] = useState([])  

    const [areaAtn, setAreaAtn] = useState('');
    const [areasAtn, setAreasAtn] = useState([{id:'SO', value:'Todas las áreas'}]);
    
    

    const [anios, setAnios] = useState([{id:anioIni, value:anioIni}, {id:anioIni-1, value:anioIni-1}, {id:anioIni-2, value:anioIni-2}]);
    const [anio, setAnio] = useState(anioIni);
    const [mes, setMes] = useState(mesIni);

    const [value, setValue]=useState('')
    const loadTIckets  = async ()=>{

       //if (areasAtn.length===0) { 
          const resAreaSol = await axios.get(PR+"areas/Solicitantes");
          //console.log(resAreaSol.data)
          //console.log(anios)
          //[...theArray, newElement]
          setAreasAtn(areasAtn.concat(resAreaSol.data))  
          
          //console.log(areasAtn)
      //  }

        let mFechaIni=selectedDateInicio.getFullYear() +'-'+(selectedDateInicio.getMonth()+1)  +'-'+  selectedDateInicio.getDate() 
        let mFechaFin=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+1)  +'-'+  selectedDateFin.getDate() 

        let mFechaFinAct=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+2)  +'-01' 
        let mFechaIniAct=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+1)  +'-01'

        let mFechaFinAnt=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+1)  +'-01' 
        let mFechaIniAnt=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth())  +'-01'
        

       

        if (selectedDateFin.getMonth() === 12) {
            // Cálculo fecha diciembre año anterior
            mFechaIniAnt=selectedDateInicio.getFullYear()-1 +'-12-01'
            mFechaFinAnt=selectedDateFin.getFullYear() +'-01-01'
        } 
        
        //const res =   await axios.get(PR + "tickets/abiertosYcerradosAnual/"+ selectedDateFin.getFullYear())
        const res =   await axios.get(PR + "tickets/abiertosYcerradosAnual/"+ anio)
        setTicketsRegsyCerradosAnual(res.data)

//        const calif =   await axios.get(PR + "tickets/calificacion/"+ selectedDateFin.getFullYear() + "/" + (selectedDateFin.getMonth()+1) )
        const calif =   await axios.get(PR + "tickets/calificacion/"+ anio + "/" + mes )

        setCalificacionAnioMes(calif.data)
        //const diasServicio =   await axios.get(PR + "tickets/countDiasServicio/"+ selectedDateFin.getFullYear() + "/" + (selectedDateFin.getMonth()+1) )
        const diasServicio =   await axios.get(PR + "tickets/countDiasServicio/"+ anio + "/" + mes )
        setDiasServicioaAnioMes(diasServicio.data)

        const reincidencia =   await axios.get(PR + "tickets/reincidencia/"+ anio  )
        setReincidenciaAnioMes(reincidencia.data)

                // Contador de Tickets abiertos y cerrados
        //const res3 =   await axios.get(PR + "tickets/count/"+ mFechaIniAct+"/" + mFechaFinAct)
        const res3 =   await axios.get(PR + "tickets/count/"+ anio + "/" + mes )
        setTicketsOpen(res3.data)
        //const res4 =   await axios.get(PR + "tickets/count/"+ mFechaIniAnt+"/" + mFechaFinAnt)
        const res4 =   await axios.get(PR + "tickets/count/"+ anio + "/" + (mes!==12 ? mes : 12) )
        setTicketsOpenMesAnt(res4.data)

        //const resCerrAct =   await axios.get(PR + "tickets/countCerrados/"+ mFechaIniAct+"/" + mFechaFinAct)
        const resCerrAct =   await axios.get(PR + "tickets/countCerrados/"+ anio + "/" + mes )
        setTicketsCerr(resCerrAct.data)
        //const resCerrAnt =   await axios.get(PR + "tickets/countCerrados/"+ mFechaIniAnt+"/" + mFechaFinAnt)
        const resCerrAnt =   await axios.get(PR + "tickets/countCerrados/"+ anio + "/" + (mes!==12 ? mes : 12) )
        setTicketsCerrMesAnt(resCerrAnt.data)

        //const resReincidentesAct =   await axios.get(PR + "tickets/countReincidentes/"+ selectedDateFin.getFullYear() + "/" + (selectedDateFin.getMonth()+1))
        const resReincidentesAct =   await axios.get(PR + "tickets/countReincidentes/"+ anio + "/" + mes)
        setTicketsReincidentes(resReincidentesAct.data)
        //const resReincidentesAnt =   await axios.get(PR + "tickets/countReincidentes/"+ selectedDateFin.getFullYear() + "/" + selectedDateFin.getMonth())
        const resReincidentesAnt =   await axios.get(PR + "tickets/countReincidentes/"+ anio + (mes!==12 ? mes : 12) )
        setTicketsReincidentesAnt(resReincidentesAnt.data)
        
     }
   
     useEffect(()=>{
      console.log(anio)
       loadTIckets()



       //<loadRegsTIckets()
     }, [])
   
     useEffect(()=>{
       loadTIckets()
       
       //console.log(anios)
    //    setAnios({id:anioIni, anio:anioIni})
    //    setAnios(...[{id:anioIni-1, anio:anioIni-1}])
    //    setAnios(...[{id:anioIni-2, anio:anioIni-2}])
      }, [selectedDateInicio,selectedDateFin, anio, mes])

    const handleDateChange = (date) => {
        setSelectedDateInicio(date);
      };
      const handleDateChangeFin = (date) => {
        setSelectedDateFin(date);
      };

      const handleChange = (event) => {
                  setAreaAtn(event.target.value);
          setValue(event.target.value);
      };

  return (
    <>

    <div style={{ width:'100%', zIndex:900 , marginTop:'20px',height:'105px', textAlign:'right', position: 'fixed', top:0, backgroundColor: 'white'}}>
          <Typography component={'span'} className={classes.title} gutterBottom>        
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
            
        </Typography>
    </div>
    <div className='home'>

      
        
        <div style={{ width:'90%',  marginTop:'90px', marginLeft:'20px', marginBottom:'20px'}}>
            <FeaturedInfo   ticketsOpen={ticketsOpen} ticketsOpenMesAnt={ticketsOpenMesAnt} 
                            ticketsCerr={ticketsCerr} ticketsCerrMesAnt={ticketsCerrMesAnt}
                            ticketsReincidentes={ticketsReincidentes}  ticketsReincidentesAnt={ticketsReincidentesAnt}
            />
        </div>
        <div style={{width:'90%',marginLeft:'20px',display:'flex', justifyContent:'space-between',alignItems:'center', flexDirection:'row', marginBottom:'10px'}}>  
          <h2>Indicadores de Rendimiento</h2>

              <TextField
                          id="standard-select-currency"
                          select
                          label="Año"
                          //required
                          value={anio}
                          defaultValue={anio}
                          onChange={(event)=>setAnio(event.target.value)}
                          SelectProps={{
                            native: true,
                          }}          
                          //helperText="Indique el Año"
                        >
                          {anios.map((option) => (
                            <option
                            key={option.id} value={option.id}>
                            {option.value}
                          </option>
                          ))}
              </TextField>

              <TextField
                          id="standard-select-currency"
                          select
                          label="Mes"
                          //required
                          value={mes}
                          onChange={(event)=>setMes(event.target.value)}
                          SelectProps={{
                            native: true,
                          }}          
                          //helperText="Indique el Año"
                        >
                          {meses.map((option) => (
                            <option
                            key={option.value} value={option.value}>
                            {option.name}
                          </option>
                          ))}
              </TextField>
              <TextField
                          id="standard-select-currency"
                          select
                          label="Área"
                          //required
                          defaultValue={'nada'}
                          value={areaAtn}

                          onChange={(event)=>setAreaAtn(event.target.value)}
                          SelectProps={{
                            native: true,
                          }}          
                          //helperText="Indique el área de Solicitante"
                        >
                          {areasAtn.map((option) => (
                            <option
                            key={option.id} value={option.id}>
                            {option.value}
                          </option>
                          ))}
              </TextField>

      </div>
        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <BarChartComp data={ticketsRegsyCerradosAnual} title="Tickets registrados y cerrados" grid dataKey="Active User"/>
          <PieChartPaddingAng data={calificacionAnioMes} titleGrafico={'Calificación de Servicios'}/> 
        </div>
        
        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>          
          {/* <TinyBarChar data={setReincidenciaAnioMes} /> 
          <BarChartComp data={reincidenciaAnioMes} title="Tickets Reincidentes" grid dataKey="Active User"/>
          */}
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes uno'} /> 
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes Dos'}/> 
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes Tres'}/> 
        </div>
        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>          
          {/* <TinyBarChar data={setReincidenciaAnioMes} /> 
          <BarChartComp data={reincidenciaAnioMes} title="Tickets Reincidentes" grid dataKey="Active User"/>
          */}
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes uno'} /> 
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes uno'} /> 
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={'Tiempo de Cierre Mes uno'} /> 
        </div>

        {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div> */}
    </div>
    </>
  )
}
