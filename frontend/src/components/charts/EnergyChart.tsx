import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyChartProps {
  data: Array<{
    date: string;
    energy: number;
    solar: number;
  }>;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Enerji Üretim Trendi
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energy" stroke="#0ea5e9" name="Üretim (MWh)" />
          <Line type="monotone" dataKey="solar" stroke="#f59e0b" name="Solar Radyasyon" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;
