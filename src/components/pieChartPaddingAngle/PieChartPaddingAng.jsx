import React, { PureComponent } from 'react';
import { PieChart, Pie,  Tooltip,Legend, Sector, Cell, ResponsiveContainer } from 'recharts';
import './PieChartPaddingAng.css'
const data = [
  { name: 'Malo', value: 400 },
  { name: 'Regular', value: 300 },
  { name: 'Bueno', value: 300 },
  { name: 'Muy bueno', value: 100 },
  { name: 'Excelente', value: 200 },
  
];
const COLORS = [  '#ec2106',  '#f05b06e0', '#03b63e', '#0088FE', '#1708eb'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartPaddingAng extends PureComponent {  



  render() {
    const { data } = this.props;
    return (
      <div  className='pieChartPaddingAng'>
        <h3 className="pieChartPaddingAngTitle">{this.props.titleGrafico}</h3>      
        <PieChart width={300} height={230} onMouseEnter={this.onPieEnter}
                fontSize="12"
                fontFamily="sans-serif"
                margin={{
                  top: -10,
                  right: 20,
                  left: 5,
                  bottom: -10
                }}
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}

          >
            

            {data.map((entry, index) => (
              // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              <Cell key={`cell-${index}`} fill={COLORS[(entry.name === 'Malo') ? 0: (entry.name === 'Regular') ? 1 : (entry.name === 'Bueno') ? 2 : (entry.name === 'Muy bueno') ? 3 : 4 ]} />              
            ))}
          </Pie>
          
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  }
}
