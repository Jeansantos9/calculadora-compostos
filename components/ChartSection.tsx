import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { YearlyResult } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ChartSectionProps {
  data: YearlyResult[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Projeção de Crescimento</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Anos', position: 'insideBottomRight', offset: -5 }} 
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(val) => `R$ ${(val/1000).toFixed(0)}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Area 
            type="monotone" 
            dataKey="total" 
            name="Montante Total"
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="invested" 
            name="Total Investido"
            stroke="#64748b" 
            fillOpacity={1} 
            fill="url(#colorInvested)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};