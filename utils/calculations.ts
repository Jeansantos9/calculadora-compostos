import { SimulationParams, SimulationResult, YearlyResult } from '../types';

export const calculateCompoundInterest = (params: SimulationParams): SimulationResult => {
  const { initialAmount, monthlyContribution, interestRate, years } = params;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;
  
  let currentBalance = initialAmount;
  let totalInvested = initialAmount;
  const breakdown: YearlyResult[] = [];

  // Initial point
  breakdown.push({
    year: 0,
    invested: initialAmount,
    interest: 0,
    total: initialAmount
  });

  for (let m = 1; m <= totalMonths; m++) {
    // Add interest first (usually calculated on balance at start of period)
    const interestEarned = currentBalance * monthlyRate;
    currentBalance += interestEarned;
    
    // Add contribution
    currentBalance += monthlyContribution;
    totalInvested += monthlyContribution;

    // Record yearly snapshot
    if (m % 12 === 0) {
      breakdown.push({
        year: m / 12,
        invested: Number(totalInvested.toFixed(2)),
        interest: Number((currentBalance - totalInvested).toFixed(2)),
        total: Number(currentBalance.toFixed(2)),
      });
    }
  }

  return {
    totalInvested: Number(totalInvested.toFixed(2)),
    totalInterest: Number((currentBalance - totalInvested).toFixed(2)),
    finalAmount: Number(currentBalance.toFixed(2)),
    breakdown,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};