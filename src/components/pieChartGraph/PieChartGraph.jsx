import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import './pieChartGraph.css'
const data = [
  { name: 'Desarrollo de aplicaciones', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 5;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy-110} dy={2} textAnchor="middle" fill={fill} style={{fontSize: '14px', fontWeight: 500,}}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={1} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} textAnchor={textAnchor} fill="#02a34b" style={{fontSize: '12px'}} >{`TKS ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 1} y={ey} dy={15} textAnchor={textAnchor} fill="#999" style={{fontSize: '12px'}}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PieChartGraph extends PureComponent {
 // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { tickets } = this.props;
    //console.log(tickets)
    //const areasGraph = tickets.slice(0,1)
    // const {idArea, ...res} = tickets;
    // console.log('areasGraph',res)
    return (      
        <PieChart width={300} height={260}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={tickets}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
    );
  }
}
