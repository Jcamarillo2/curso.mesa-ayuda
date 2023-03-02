import "./widgetLg.css";

export default function WidgetLg({tickets}) {

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Tickets por área:</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Área</th>
            <th className="widgetLgTh">Tickets</th>
          </tr>

          {tickets.map((area) => (                                            
              <tr className="widgetLgTr" key={area.name}>
                <span className="widgetLgName">{area.name}</span>
                <td className="widgetLgAmount">{area.value}</td>
              </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
