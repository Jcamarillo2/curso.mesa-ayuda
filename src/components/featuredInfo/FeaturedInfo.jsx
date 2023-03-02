import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import './featuredInfo.css'

export default function FeaturedInfo( {ticketsOpen, ticketsOpenMesAnt, ticketsCerr, ticketsCerrMesAnt, ticketsReincidentes, ticketsReincidentesAnt }) {
  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Registrados</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{ticketsOpen}</span>
                <span className="featuredMoneyRate">
                {ticketsOpenMesAnt}
                {(ticketsOpen >= ticketsOpenMesAnt) ? <ArrowDownward className='featuredIcon negative'/> : <ArrowUpward className='featuredIcon '/>    }
                </span>
            </div>
            <span className="featuredSub">Comparativo mes anterior</span>
        </div>
        
        <div className="featuredItem">
            <span className="featuredTitle">Cerrados</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{ticketsCerr}</span>
                <span className="featuredMoneyRate">
                    {ticketsCerrMesAnt} 
                    {(ticketsCerr >= ticketsCerrMesAnt) ? <ArrowDownward className='featuredIcon negative'/> : <ArrowUpward className='featuredIcon '/>    }
                    
                </span>
            </div>
            <span className="featuredSub">Comparativo mes anterior</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Reincidencia</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">{ticketsReincidentes}</span>
                <span className="featuredMoneyRate">
                    {ticketsReincidentesAnt} 
                    {(ticketsReincidentes >= ticketsReincidentesAnt) ? <ArrowDownward className='featuredIcon negative'/> : <ArrowUpward className='featuredIcon '/>    }
                </span>
            </div>
            <span className="featuredSub">Comparativo mes anterior</span>
        </div>

    </div>
    
  )
}
