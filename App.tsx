import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, DollarSign, PiggyBank, TrendingUp, RefreshCw } from 'lucide-react';
import { InputGroup } from './components/InputGroup';
import { SummaryCard } from './components/SummaryCard';
import { ChartSection } from './components/ChartSection';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { calculateCompoundInterest } from './utils/calculations';
import { SimulationParams, SimulationResult } from './types';

function App() {
  const [params, setParams] = useState<SimulationParams>({
    initialAmount: 5000,
    monthlyContribution: 500,
    interestRate: 10.5, // 10.5% yearly is a reasonable default for Brazil (Selic context)
    years: 20
  });

  const [results, setResults] = useState<SimulationResult>({
    totalInvested: 0,
    totalInterest: 0,
    finalAmount: 0,
    breakdown: []
  });

  // Calculate whenever params change
  useEffect(() => {
    const calculated = calculateCompoundInterest(params);
    setResults(calculated);
  }, [params]);

  const updateParam = (key: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-600/20 text-white">
              <Calculator size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Juros Compostos Pro</h1>
              <p className="text-slate-500 mt-1">Planeje seu futuro financeiro com precisão</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-slate-400">
             Cotações e taxas baseadas em dados inseridos
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <RefreshCw size={18} className="text-blue-500" />
                Parâmetros
              </h2>
              
              <div className="space-y-5">
                <InputGroup
                  label="Valor Inicial"
                  value={params.initialAmount}
                  onChange={(v) => updateParam('initialAmount', v)}
                  prefix="R$"
                />
                
                <InputGroup
                  label="Aporte Mensal"
                  value={params.monthlyContribution}
                  onChange={(v) => updateParam('monthlyContribution', v)}
                  prefix="R$"
                />
                
                <InputGroup
                  label="Taxa de Juros (Anual)"
                  value={params.interestRate}
                  onChange={(v) => updateParam('interestRate', v)}
                  suffix="%"
                  step={0.1}
                />
                
                <InputGroup
                  label="Período"
                  value={params.years}
                  onChange={(v) => updateParam('years', v)}
                  suffix="anos"
                  step={1}
                  min={1}
                />
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700 leading-relaxed">
                  <strong>Nota:</strong> O cálculo assume juros compostos mensais baseados na taxa anual informada. Aportes são feitos no início de cada mês.
                </p>
              </div>
            </div>

            {/* AI Advisor - Mobile/Tablet placement (moved to main flow on desktop) */}
            <div className="hidden lg:block">
              <GeminiAdvisor params={params} results={results} />
            </div>
          </div>

          {/* Right Column: Results & Charts (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard 
                title="Total Investido" 
                amount={results.totalInvested} 
                colorClass="text-slate-700"
                icon={<PiggyBank size={24} className="text-slate-500" />}
              />
              <SummaryCard 
                title="Total em Juros" 
                amount={results.totalInterest} 
                colorClass="text-emerald-600"
                icon={<TrendingUp size={24} className="text-emerald-500" />}
              />
              <SummaryCard 
                title="Valor Final" 
                amount={results.finalAmount} 
                colorClass="text-blue-600"
                icon={<DollarSign size={24} className="text-blue-500" />}
              />
            </div>

            {/* Chart */}
            <ChartSection data={results.breakdown} />

            {/* AI Advisor - Mobile only */}
            <div className="lg:hidden">
              <GeminiAdvisor params={params} results={results} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;