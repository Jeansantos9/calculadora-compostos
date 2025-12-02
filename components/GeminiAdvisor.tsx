import React, { useState } from 'react';
import { Sparkles, Loader2, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getFinancialAdvice } from '../services/geminiService';
import { SimulationParams, SimulationResult } from '../types';

interface GeminiAdvisorProps {
  params: SimulationParams;
  results: SimulationResult;
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ params, results }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const text = await getFinancialAdvice(params, results);
    setAnalysis(text);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} className="text-indigo-600" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <h3 className="text-xl font-bold text-indigo-900">Análise de IA</h3>
        </div>

        {!analysis && !loading && (
          <div className="text-center py-6">
            <p className="text-indigo-700 mb-6">
              Descubra insights valiosos sobre sua simulação. Nossa IA avalia seus números e oferece dicas personalizadas para otimizar seus rendimentos.
            </p>
            <button
              onClick={handleAnalyze}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <TrendingUp size={18} />
              Gerar Análise Financeira
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-indigo-600">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="font-medium animate-pulse">Consultando o especialista de IA...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="prose prose-indigo prose-sm max-w-none bg-white/60 p-6 rounded-lg shadow-sm backdrop-blur-sm">
            <ReactMarkdown>{analysis}</ReactMarkdown>
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleAnalyze}
                    className="text-xs text-indigo-500 hover:text-indigo-700 font-medium underline"
                >
                    Atualizar Análise
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};