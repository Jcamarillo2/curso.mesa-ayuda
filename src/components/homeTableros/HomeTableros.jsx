//import Chart from "../chart/Chart"

import "./home.css"
import {userData} from "../../dummyData.js"
import CalificacionesProms from "../calificacionesProms/CalificacionesProms"

//import WidgetLg from "../../componentes/widgetLg/WidgetLg"

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
  var mesIni = today.getMonth()+1

    const PR = config.proxyRoute;
    const classes = useStyles();
   

    const { loadRegsTIckets, regsTickets} = useContext(GraphContext)

    const [ticketsRegsyCerradosAnual, setTicketsRegsyCerradosAnual] = useState([])    

    const [ticketsOpen, setTicketsOpen] = useState(0)
    const [ticketsOpenMesAnt, setTicketsOpenMesAnt] = useState(0)
    const [ticketsCerr, setTicketsCerr] = useState(0)
    const [ticketsCerrMesAnt, setTicketsCerrMesAnt] = useState(0)

    const [ticketsReincidentes, setTicketsReincidentes] = useState(0)
    const [ticketsReincidentesAnt, setTicketsReincidentesAnt] = useState(0)
    

    const [calificacionAnioMes, setCalificacionAnioMes] = useState([])    
    const [calificacionProm, setCalificacionProm] = useState([])    
    const [calificacionPromDos, setCalificacionPromDos] = useState([])   
    const [calificacionPromTres, setCalificacionPromTres] = useState([])   

    const [top3Generadores, setTop3Generadores] = useState([])    
    const [top3GeneradoresDos, setTop3GeneradoresDos] = useState([])   
    const [top3GeneradoresTres, setTop3GeneradoresTres] = useState([])   

    

    const [reincidenciaAnioMes, setReincidenciaAnioMes] = useState([])  

    const [diasServicioaAnioMes, setDiasServicioaAnioMes] = useState([])  
    const [diasServicioaAnioMesDos, setDiasServicioaAnioMesDos] = useState([])  
    const [diasServicioaAnioMesTres, setDiasServicioaAnioMesTres] = useState([])  
    
    const [diasRespuestaAnioMes, setDiasRespuestaAnioMes] = useState([])  
    const [diasRespuestaAnioMesDos, setDiasRespuestaAnioMesDos] = useState([])  
    const [diasRespuestaAnioMesTres, setDiasRespuestaAnioMesTres] = useState([])     


    const [areaAtn, setAreaAtn] = useState('TI');
    const [areasAtn, setAreasAtn] = useState([{id:'SO', value:'Todas las áreas'}]);
    
    const [areaSolicitante, setAreaSolicitante] = useState('SO');
    const [areasSolicitantes, setAreasSolicitantes] = useState([{id:'SO', value:'Todas las áreas'}]);


    const [respsAtencion, setRespsAtencion] = useState([{id:'SO', value:'Todos los responsables'}]);
    const [respAtencion, setRespAtencion] = useState('SO');
    

    const [anios, setAnios] = useState([{id:anioIni, value:anioIni}, {id:anioIni-1, value:anioIni-1}, {id:anioIni-2, value:anioIni-2}]);
    const [anio, setAnio] = useState(anioIni);
    const [mes, setMes] = useState(mesIni);

    const [value, setValue]=useState('')

    const loadAreasSolcitantes  = async ()=>{
      const resAreaAtn = await axios.get(PR+"areas");
      setAreasAtn([{id:'SO', value:'Todas las áreas'}].concat(resAreaAtn.data))
      //setAreasAtn(areasAtn.concat(resAreaSol.data))  

      const resAreaSol = await axios.get(PR+"areas/Solicitantes");
      setAreasSolicitantes([{id:'SO', value:'Todas las áreas'}].concat(resAreaSol.data))

      const resAtiendeArea = await axios.get(PR+"areas/areasAtiende/TI") //"+ post.idArea);
      setRespsAtencion([{id:'SO', value:'Todos los responsables'}].concat(resAtiendeArea.data))  
    }

    const loadTIckets  = async ()=>{    

        
        const res =   await axios.get(PR + "tickets/abiertosYcerradosAnual/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio)
        setTicketsRegsyCerradosAnual(res.data)

        const calif =   await axios.get(PR + "tickets/calificacion/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + mes )
        setCalificacionAnioMes(calif.data)

        const califProm =   await axios.get(PR + "tickets/calificacionProm/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + mes )
        setCalificacionProm(califProm.data)
        const califProm2 =   await axios.get(PR + "tickets/calificacionProm/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + ((mes === 1 ) ? anio-1: anio )+ "/" + ((mes===1) ?  12 : mes-1) )
        setCalificacionPromDos(califProm2.data)
        const califProm3 =   await axios.get(PR + "tickets/calificacionProm/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + (mes === 1 || mes === 2 ? anio-1: anio) + "/" + (mes === 1 ? 11 : mes===2 ? 12 : mes-2) )
        setCalificacionPromTres(califProm3.data)

        const diasServicio =   await axios.get(PR + "tickets/countDiasServicio/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + anio + "/" + mes )
        setDiasServicioaAnioMes(diasServicio.data)
        const diasServicio2 =   await axios.get(PR + "tickets/countDiasServicio/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + ((mes === 1 ) ? anio-1: anio )+ "/" + ((mes===1) ?  12 : mes-1) )
        setDiasServicioaAnioMesDos(diasServicio2.data)
        const diasServicio3 =   await axios.get(PR + "tickets/countDiasServicio/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + (mes === 1 || mes === 2 ? anio-1: anio) + "/" + (mes === 1 ? 11 : mes===2 ? 12 : mes-2) )
        setDiasServicioaAnioMesTres(diasServicio3.data)

        const diasRespuesta =   await axios.get(PR + "tickets/countDiasRespuesta/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + anio + "/" + mes )
        setDiasRespuestaAnioMes(diasRespuesta.data)
        const diasRespuesta2 =   await axios.get(PR + "tickets/countDiasRespuesta/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + ((mes === 1 ) ? anio-1: anio )+ "/" + ((mes===1) ?  12 : mes-1) )
        setDiasRespuestaAnioMesDos(diasRespuesta2.data)
        const diasRespuesta3 =   await axios.get(PR + "tickets/countDiasRespuesta/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + (mes === 1 || mes === 2 ? anio-1: anio) + "/" + (mes === 1 ? 11 : mes===2 ? 12 : mes-2) )
        setDiasRespuestaAnioMesTres(diasRespuesta3.data)

        const top3Generador =   await axios.get(PR + "tickets/topGeneradores/"+ areaAtn +"/" + areaSolicitante + "/" + respAtencion  + "/" + anio + "/" + mes )
        setTop3Generadores(top3Generador.data)
        const top3Generador2 =   await axios.get(PR + "tickets/topGeneradores/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion  + "/" + ((mes === 1 ) ? anio-1: anio )+ "/" + ((mes===1) ?  12 : mes-1) )
        setTop3GeneradoresDos(top3Generador2.data)
        const top3Generador3 =   await axios.get(PR + "tickets/topGeneradores/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion  + "/" + (mes === 1 || mes === 2 ? anio-1: anio) + "/" + (mes === 1 ? 11 : mes===2 ? 12 : mes-2) )
        setTop3GeneradoresTres(top3Generador3.data)

        const reincidencia =   await axios.get(PR + "tickets/reincidencia/"+ anio  )
        setReincidenciaAnioMes(reincidencia.data)

        const res3 =   await axios.get(PR + "tickets/count/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + mes )
        setTicketsOpen(res3.data)        
        const res4 =   await axios.get(PR + "tickets/count/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion  + "/"+ anio + "/" + (mes!==1 ? mes-1 : 12) )
        setTicketsOpenMesAnt(res4.data)

        const resCerrAct =   await axios.get(PR + "tickets/countCerrados/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + mes )
        setTicketsCerr(resCerrAct.data)
        const resCerrAnt =   await axios.get(PR + "tickets/countCerrados/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + (mes!==1 ? mes-1 : 12) )
        setTicketsCerrMesAnt(resCerrAnt.data)

        const resReincidentesAct =   await axios.get(PR + "tickets/countReincidentes/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion + "/" + anio + "/" + mes)
        setTicketsReincidentes(resReincidentesAct.data)
        const resReincidentesAnt =   await axios.get(PR + "tickets/countReincidentes/"+ areaAtn + "/" + areaSolicitante + "/" + respAtencion  + "/" + anio + "/" + (mes!==1 ? mes-1 : 12) )
        setTicketsReincidentesAnt(resReincidentesAnt.data)
        
     }
   
     useEffect(()=>{
        loadAreasSolcitantes()
        loadTIckets()
     }, [])
   
     useEffect(()=>{
       loadTIckets() 

      }, [ anio, mes, areaAtn,areaSolicitante, respAtencion])



  return (
    <>

    <div style={{ width:'80%', zIndex:900 ,height:'125px', position: 'fixed', top:0, backgroundColor: 'white', borderBottom:'1px solid lightgray'}}>
      <div style={{marginTop:'70px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{marginLeft:'20px'}}>Rendimientos </h2>
        <div style={{width:'78%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <TextField

                  InputProps={{
                      style: {
                          fontSize:"12px"
                      }
                  }}
                      id="standard-select-currency"
                      select
                      label="Área Atención"
                      //required
                      // defaultValue={'nada'}
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
          <TextField
          
          InputProps={{
            style: {
                fontSize:"14px"
            }
        }}
                      id="standard-select-currency"
                      select
                      label="Año"
                      //required
                      value={anio}
                      // defaultValue={anio}
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
          
          InputProps={{
            style: {
                fontSize:"14px"
            }
        }}
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
          
          InputProps={{
            style: {
                fontSize:"14px"
            }
        }}
                      id="standard-select-currency"
                      select
                      label="Área solicitante"
                      //required
                      // defaultValue={'nada'}
                      value={areaSolicitante}

                      onChange={(event)=>setAreaSolicitante(event.target.value)}
                      SelectProps={{
                        native: true,
                      }}          
                      //helperText="Indique el área de Solicitante"
                    >
                      {areasSolicitantes.map((option) => (
                        <option
                        key={option.id} value={option.id}>
                        {option.value}
                      </option>
                      ))}
          </TextField>

          <TextField
          
          InputProps={{
            style: {
                fontSize:"14px"
            }
        }}
                        id="standard-select-currency-native"
                        select
                        label="Atendió"
                        value={respAtencion}
                        //defaultValue={respAtencion}
                        //required
                        onChange={(event)=>setRespAtencion(event.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                        //helperText="Indique responsable de atención"
                      >
                        {                        
                        respsAtencion.map((option) => (                        
                          
                          <option key={option.id} value={option.id}>
                            {option.value}
                          </option>
                        ))}
          </TextField>
        </div>
      </div>                
    </div>

    <div className='home'>    
        
        <div style={{ width:'90%',  marginTop:'90px', marginLeft:'20px', marginBottom:'20px'}}>
            <FeaturedInfo   ticketsOpen={ticketsOpen} ticketsOpenMesAnt={ticketsOpenMesAnt}                             
                            ticketsCerr={ticketsCerr} ticketsCerrMesAnt={ticketsCerrMesAnt}
                            ticketsReincidentes={ticketsReincidentes}  ticketsReincidentesAnt={ticketsReincidentesAnt}

            />
        </div>
        <div style={{width:'90%',marginLeft:'20px',display:'flex', justifyContent:'space-between',alignItems:'center', flexDirection:'row', marginBottom:'10px'}}>  

        </div>

        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <BarChartComp data={ticketsRegsyCerradosAnual} title="Tickets registrados, reincidentes y cerrados" grid dataKey="Active User"/>
          <PieChartPaddingAng data={calificacionAnioMes} titleGrafico={'Calificación de Servicios'}/> 
        </div>
        
        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>                    
          <PieChartDiasServs data={diasServicioaAnioMesTres} titleGrafico={`Tiempo atención: ${meses[mes===1 ? 10: mes===2 ? 11 : mes-3].name}`}/> 
          <PieChartDiasServs data={diasServicioaAnioMesDos} titleGrafico={`Tiempo atención: ${meses[mes===1 ? 11: mes-2].name}`}/> 
          <PieChartDiasServs data={diasServicioaAnioMes} titleGrafico={`Tiempo atención: ${meses[mes-1].name}`} />           
        </div>

        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>          
          <PieChartDiasServs data={diasRespuestaAnioMesTres} titleGrafico={`Tiempo respuesta: ${meses[mes===1 ? 10: mes===2 ? 11 : mes-3].name}`}/> 
          <PieChartDiasServs data={diasRespuestaAnioMesDos} titleGrafico={`Tiempo respuesta: ${meses[mes===1 ? 11: mes-2].name}`}/> 
          <PieChartDiasServs data={diasRespuestaAnioMes} titleGrafico={`Tiempo respuesta: ${meses[mes-1].name}`} />           
        </div>

        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>          
          <CalificacionesProms tipo={'top3'} califProms={top3GeneradoresTres} title={`Top 3 Usuarios: ${meses[mes===1 ? 10: mes===2 ? 11 : mes-3].name}`}/>
          <CalificacionesProms tipo={'top3'} califProms={top3GeneradoresDos} title={`Top 3 Usuarios: ${meses[mes===1 ? 11: mes-2].name}`}/>
          <CalificacionesProms tipo={'top3'} califProms={top3Generadores} title={`Top 3 Usuarios: ${meses[mes-1].name}`}/>
        </div>

        <div style={{ width:'90%', margin:'0 20px 30px', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>          
          <CalificacionesProms tipo={'Calificacion'} califProms={calificacionPromTres} title={`Calificación promedio: ${meses[mes===1 ? 10: mes===2 ? 11 : mes-3].name}`}/>
          <CalificacionesProms tipo={'Calificacion'} califProms={calificacionPromDos} title={`Calificación promedio: ${meses[mes===1 ? 11: mes-2].name}`}/>
          <CalificacionesProms tipo={'Calificacion'} califProms={calificacionProm} title={`Calificación promedio: ${meses[mes-1].name}`}/>
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
