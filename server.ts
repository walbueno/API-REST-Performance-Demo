import express, { Request, Response } from 'express';
import { performance } from 'perf_hooks';

// --- DEFINIÇÕES DE TIPOS (TypeScript) ---
interface Transaction {
    id: string;
    userId: string;
    amount: number;
    timestamp: number;
    category: 'Vendas' | 'Serviços' | 'Logística' | 'Outros';
}

interface PerformanceResult {
    data: Transaction[];
    queryTimeMs: number;
    source: 'In-Memory Cache' | 'Database Mock';
}

// --- SIMULAÇÃO DE DADOS (In-Memory Cache) ---
// Em ambientes de alta performance, grandes conjuntos de dados frequentemente acessados são mantidos em memória.
// Isto simula o uso de Redis ou cache de aplicação.
const MOCK_DATA_SIZE = 10000;
const mockTransactions: Transaction[] = [];

for (let i = 0; i < MOCK_DATA_SIZE; i++) {
    mockTransactions.push({
        id: `T-${i + 1}`,
        userId: `U-${Math.floor(Math.random() * 100) + 1}`, // 100 usuários
        amount: parseFloat((Math.random() * 1000).toFixed(2)),
        timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // Últimos 30 dias
        category: ['Vendas', 'Serviços', 'Logística', 'Outros'][Math.floor(Math.random() * 4)] as any,
    });
}

const app = express();
const PORT = 3000;

// Middleware de segurança básica e parsing
app.use(express.json());

// --- LÓGICA DE OTIMIZAÇÃO DE PERFORMANCE ---
/**
 * Endpoint otimizado para buscar transações recentes.
 * Otimização: Filtra dados diretamente da memória (simulando cache) e usa otimização no loop de filtragem/transformação.
 */
app.get('/api/v1/transactions/recent', (req: Request, res: Response) => {
    const startTime = performance.now();
    const limit = parseInt(req.query.limit as string) || 50;

    // 1. Acesso Otimizado (Cache Hit Simulado)
    // Em vez de consultar um banco de dados lento, buscamos direto do cache in-memory.
    const filteredData = mockTransactions
        .filter(t => t.timestamp > (Date.now() - 7 * 24 * 60 * 60 * 1000)) // Transações da última semana
        .sort((a, b) => b.timestamp - a.timestamp) // Ordenação por data (mais recente)
        .slice(0, limit); // Limita o número de resultados

    const endTime = performance.now();
    const result: PerformanceResult = {
        data: filteredData,
        queryTimeMs: parseFloat((endTime - startTime).toFixed(3)),
        source: 'In-Memory Cache',
    };

    console.log(`Query executada em: ${result.queryTimeMs}ms`);

    // Adiciona headers para demonstrar o tempo de resposta no cliente
    res.setHeader('X-Query-Time', result.queryTimeMs.toString());
    res.status(200).json({
        message: 'Transações recentes carregadas rapidamente.',
        metadata: {
            totalResults: filteredData.length,
            timeElapsed: `${result.queryTimeMs}ms`,
            source: result.source,
        },
        data: result.data,
    });
});

// --- Rota de Exemplo Lenta (Para Comparação - Simulando um "Cache Miss" ou Query Complexa) ---
app.get('/api/v1/transactions/slow-mock', (req: Request, res: Response) => {
    const startTime = performance.now();

    // Simulação de latência de banco de dados ou processamento complexo
    setTimeout(() => {
        const result: PerformanceResult = {
            data: mockTransactions.slice(0, 10),
            queryTimeMs: parseFloat((performance.now() - startTime).toFixed(3)),
            source: 'Database Mock',
        };

        res.setHeader('X-Query-Time', result.queryTimeMs.toString());
        res.status(200).json({
            message: 'Busca lenta (simulada) para demonstração de gargalo.',
            metadata: {
                totalResults: result.data.length,
                timeElapsed: `${result.queryTimeMs}ms`,
                source: result.source,
            },
            data: result.data,
        });
    }, 500); // 500ms de latência simulada
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
    console.log(`[API Demo] Servidor rodando na porta ${PORT}`);
    console.log(`Endpoint otimizado: http://localhost:${PORT}/api/v1/transactions/recent`);
    console.log(`Endpoint lento: http://localhost:${PORT}/api/v1/transactions/slow-mock`);
});
