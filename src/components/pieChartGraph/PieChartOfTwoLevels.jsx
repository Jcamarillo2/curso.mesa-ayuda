import "./pieChartGraph.css";
import React, { useState } from "react";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useEffect } from "react";
// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];


const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4245ff'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <><text x={x-10} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="hanging" style={{ fontSize: '10px' }}>
          {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    </>
    
  );
};

export default function PieChartOfTwoLevels({ ticketsEdos, tickets}) {


  return (
    <PieChart width={250} height={250}>
      <Pie
        data={ticketsEdos}
        dataKey="value"
        cx="60%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"        
        labelLine={false}
        label={renderCustomizedLabel}                        

      >
            {ticketsEdos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
      </Pie>
      

      <Pie
        data={tickets}
        dataKey="value"
        cx="60%"
        cy="50%"
        innerRadius={70}
        outerRadius={90}
        fill="#8884d8"
        label
      />
    </PieChart>
  )
}
