export interface SimulationParams {
  initialAmount: number;
  monthlyContribution: number;
  interestRate: number; // Annual rate in percent
  years: number;
}

export interface YearlyResult {
  year: number;
  invested: number;
  interest: number;
  total: number;
}

export interface SimulationResult {
  totalInvested: number;
  totalInterest: number;
  finalAmount: number;
  breakdown: YearlyResult[];
}

export interface AIAnalysisResponse {
  analysis: string;
}
