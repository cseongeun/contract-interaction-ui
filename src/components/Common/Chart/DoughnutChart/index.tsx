import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  data: any;
  width: number;
  height: number;
  options?: any;
}
const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, width = 300, height = 300, options }) => {
  return (
    <>
      <Doughnut data={data} width={width} height={height} options={options} />
    </>
  );
};

export default DoughnutChart;
