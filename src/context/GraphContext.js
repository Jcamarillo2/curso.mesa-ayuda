import { createContext, useState } from "react";
import axios from "axios"
import config from "../config"

const mHoy= new Date()
const PR = config.proxyRoute;

const GraphContext = createContext()


const GraphProvider = ({children})=>{
  
  const [selectedDateInicio, setSelectedDateInicio] = useState(new Date((mHoy.getMonth()+1)+'-01-'+mHoy.getFullYear()));
  //const [selectedDateInicio, setSelectedDateInicio] = useState(new Date());
  const [selectedDateFin, setSelectedDateFin] = useState(new Date());
  const [regsTickets, setRegsTickets] = useState([])

  async function loadRegsTIckets() {
    let mFechaIni=selectedDateInicio.getFullYear() +'-'+(selectedDateInicio.getMonth()+1)  +'-'+  selectedDateInicio.getDate() 
    let mFechaFin=selectedDateFin.getFullYear() +'-'+(selectedDateFin.getMonth()+1)  +'-'+  selectedDateFin.getDate() 
    const res =   await axios.get(PR + "tickets/byarea/"+ mFechaIni+"/" + mFechaFin)
    setRegsTickets(res.data)
}

    const data={selectedDateInicio, setSelectedDateInicio, selectedDateFin, setSelectedDateFin, loadRegsTIckets, regsTickets}
    return <GraphContext.Provider value={data}>{children}</GraphContext.Provider>
}


export {GraphProvider}
export default GraphContext