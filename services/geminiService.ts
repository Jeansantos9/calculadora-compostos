import { GoogleGenAI } from "@google/genai";
import { SimulationResult, SimulationParams } from "../types";
import { formatCurrency } from "../utils/calculations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (
  params: SimulationParams, 
  result: SimulationResult
): Promise<string> => {
  try {
    const prompt = `
      Atue como um consultor financeiro experiente e amigável. Analise a seguinte simulação de investimento de juros compostos:
      
      DADOS DO INVESTIMENTO:
      - Aporte Inicial: ${formatCurrency(params.initialAmount)}
      - Aporte Mensal: ${formatCurrency(params.monthlyContribution)}
      - Taxa de Juros Anual: ${params.interestRate}%
      - Período: ${params.years} anos
      
      RESULTADOS:
      - Total Investido (do bolso): ${formatCurrency(result.totalInvested)}
      - Total Ganho em Juros: ${formatCurrency(result.totalInterest)}
      - Montante Final: ${formatCurrency(result.finalAmount)}
      
      Por favor, forneça:
      1. Uma breve análise sobre o poder dos juros compostos neste cenário (destaque a proporção entre dinheiro investido vs. juros ganhos).
      2. Avalie se a taxa de juros (${params.interestRate}%) é realista para o mercado atual (considere renda fixa e variável no Brasil como contexto geral, mas sem recomendar ativos específicos).
      3. Dê 3 dicas práticas para o investidor maximizar esse resultado ou se proteger da inflação.
      
      Mantenha a resposta formatada em Markdown, concisa e motivadora.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on simple query
      }
    });

    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Ocorreu um erro ao conectar com o consultor de IA. Verifique sua chave de API ou tente novamente mais tarde.";
  }
};