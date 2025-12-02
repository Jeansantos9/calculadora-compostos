import React from 'react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  prefix, 
  suffix,
  step = 0.01,
  min = 0
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-slate-400 transition-colors">
        {prefix && <span className="mr-2 text-slate-500 select-none">{prefix}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="block w-full border-none p-0 bg-transparent text-slate-900 placeholder-slate-400 focus:ring-0 outline-none"
        />
        {suffix && <span className="ml-2 text-slate-500 select-none">{suffix}</span>}
      </div>
    </div>
  );
};