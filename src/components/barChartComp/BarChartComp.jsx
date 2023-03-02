import "./barChartComp.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,ResponsiveContainer
} from "recharts";

const data2 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 8,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 18,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, value} = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function BarChartComp({title, data}) {
  return (
    <div  className='barChartComp'>
      <h3 className="barChartCompTitle">{title}</h3>
      {/* <ResponsiveContainer className='barChartComp' width="60%" height={200}  aspect={3 / 1}>  */}
      <BarChart
        width={600}
        height={250}
        data={data}
        fontSize="10"
        fontFamily="sans-serif"
        margin={{
          top: 20,
          right: 20,
          left: 5,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Registrados" fill="#167ef5" minPointSize={5} fontFamily="sans-serif" fontSize="21">
          {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
        </Bar>

        {title !== "Tickets Reincidentes" && 
        <Bar dataKey="Cerrados"  fill="#7eecec" minPointSize={10} fontFamily="sans-serif" fontSize="21" >
          {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
        </Bar>
        }    
       
       {title !== "Tickets Reincidentes" && 
        <Bar dataKey="Reincidentes" fill="#7eb1ec" minPointSize={10} fontFamily="sans-serif" fontSize="21" >
          {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
        </Bar>
        } 

      </BarChart>
      {/* </ResponsiveContainer>  */}
    </div>
  );
}
