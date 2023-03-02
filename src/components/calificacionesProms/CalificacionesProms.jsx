import {  Button,  Container,  Fab,  makeStyles,  Modal,  Snackbar,  TextField,  Tooltip,} from "@material-ui/core"
import "./calificacionesProms.css";
import _ from "lodash";
import { Star as StarIcon, StarBorderOutlined as StarBorderIcon } from "@material-ui/icons";
import config from "../../config"
const useStyles = makeStyles((theme) => ({
  starStyle:{
    color:'orange', fontSize:"20px",  paddingBottom:'5px'
  },
}));
export default function CalificacionesProms({tipo, califProms, title }) {
  const PF = config.proxyRoute;
  const classes = useStyles();
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{title}</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            { tipo === 'Calificacion' ? 
              <>
                <th className="widgetLgTh">Atendió</th>
                <th className="widgetLgTh">Calificación</th>
              </>
            :
            <>
              <th className="widgetLgTh">Generó</th>
              <th className="widgetLgTh">Núm. Tickets</th>
            </>
          }
          </tr>
          { tipo === 'Calificacion' ? 
            califProms.map((usuario) => (                                            
            <tr key={usuario.idAtiende} className="widgetLgTr">
              <td className="widgetLgUser">
              <img src={usuario.photo ? PF + usuario.photo : PF +'/users/noavatar.png'} alt="" className="widgetLgImg" />
                <span className="widgetLgName">{usuario.IngAtiende}</span>
              </td>
              <td className="widgetLgAmount">
                {_.times(usuario.promCalificacion, (i) => (
                  <StarIcon className={classes.starStyle}/>
                ))}
                </td>
            </tr>   
            )):
              califProms.map((usuario) => (                                            
              <tr key={usuario.idAtiende} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img src={usuario.photo ? PF + usuario.photo : PF +'/users/noavatar.png'} alt="" className="widgetLgImg" />
                  <span className="widgetLgName">{usuario.IngAtiende}</span>
                </td>
                <td className="widgetLgAmount">
                  <button className="userListEdit">{usuario.numTickets}</button>
                </td>
              </tr>   
              ))                        
            }

        </tbody>
      </table>
    </div>
  );
}
