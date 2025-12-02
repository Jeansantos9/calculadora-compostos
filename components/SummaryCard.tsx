import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface SummaryCardProps {
  title: string;
  amount: number;
  colorClass: string;
  icon?: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, colorClass, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full transition-transform hover:-translate-y-1 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        {icon && <div className={`p-2 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>{icon}</div>}
      </div>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  );
};