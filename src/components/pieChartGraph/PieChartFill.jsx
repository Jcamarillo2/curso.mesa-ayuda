import "./pieChartGraph.css";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'En Revisión', value: 400 },
//   { name: 'En Atención', value: 300 },
//   { name: 'Programados', value: 300 },
//   { name: 'En Cierre', value: 200 },
//   { name: 'Cerrados', value: 200 },
// ];
const data = []
//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4245ff'];
const COLORS = ['#8884d8'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize: '10px'}}>      
        {`${name}`}
      </text>
        <text x={x} y={y+10} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize: '10px'}}>      
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

export default class PieChartFill extends PureComponent {
 // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
// con labels https://stackoverflow.com/questions/72214818/recharts-have-both-outside-and-inside-label-on-pie-chart
  render() {
    const { ticketsEdos } = this.props;
    return (
      //<ResponsiveContainer width="100%" height="100%">
        <PieChart width={260} height={200}>
          <Pie
            data={ticketsEdos}
            cx="60%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      //</ResponsiveContainer>
    );
  }
}
