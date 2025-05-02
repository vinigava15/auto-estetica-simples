
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SimpleTable from '@/components/SimpleTable';

// Dados de exemplo para o gráfico
const financialData = [
  { month: 'Jan', receitas: 4000, despesas: 2400 },
  { month: 'Fev', receitas: 3000, despesas: 1398 },
  { month: 'Mar', receitas: 2000, despesas: 9800 },
  { month: 'Abr', receitas: 2780, despesas: 3908 },
  { month: 'Mai', receitas: 1890, despesas: 4800 },
  { month: 'Jun', receitas: 2390, despesas: 3800 },
];

// Transações de exemplo
const transacoes = [
  { 
    id: 1, 
    data: '02/05/2025', 
    descricao: 'Polimento completo', 
    categoria: 'Receita', 
    valor: 'R$ 350,00' 
  },
  { 
    id: 2, 
    data: '01/05/2025', 
    descricao: 'Lavagem detalhada', 
    categoria: 'Receita', 
    valor: 'R$ 120,00' 
  },
  { 
    id: 3, 
    data: '30/04/2025', 
    descricao: 'Compra de produtos', 
    categoria: 'Despesa', 
    valor: '-R$ 250,00' 
  },
  { 
    id: 4, 
    data: '28/04/2025', 
    descricao: 'Aplicação de cerâmica', 
    categoria: 'Receita', 
    valor: 'R$ 800,00' 
  }
];

const colunasTransacoes = [
  { key: 'data', title: 'Data', width: '15%' },
  { key: 'descricao', title: 'Descrição', width: '40%' },
  { key: 'categoria', title: 'Categoria', width: '20%' },
  { key: 'valor', title: 'Valor', width: '15%' }
];

const Financeiro: React.FC = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mensal");

  return (
    <DashboardLayout title="Financeiro">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Dashboard Financeiro</h2>
          <p className="text-muted-foreground">Acompanhe suas receitas e despesas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SimpleCard className="bg-green-50 border-green-200">
            <div className="text-center">
              <h3 className="text-green-800 font-medium">Total de Receitas</h3>
              <p className="text-3xl font-bold text-green-700">R$ 12.450,00</p>
            </div>
          </SimpleCard>

          <SimpleCard className="bg-red-50 border-red-200">
            <div className="text-center">
              <h3 className="text-red-800 font-medium">Total de Despesas</h3>
              <p className="text-3xl font-bold text-red-700">R$ 4.850,00</p>
            </div>
          </SimpleCard>

          <SimpleCard className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <h3 className="text-blue-800 font-medium">Saldo</h3>
              <p className="text-3xl font-bold text-blue-700">R$ 7.600,00</p>
            </div>
          </SimpleCard>
        </div>

        <SimpleCard title="Gráfico de Movimentações">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Análise de Movimentações</h3>
              <div className="flex gap-2">
                <Button 
                  variant={periodoSelecionado === "mensal" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPeriodoSelecionado("mensal")}
                >
                  Mensal
                </Button>
                <Button 
                  variant={periodoSelecionado === "trimestral" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPeriodoSelecionado("trimestral")}
                >
                  Trimestral
                </Button>
                <Button 
                  variant={periodoSelecionado === "anual" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setPeriodoSelecionado("anual")}
                >
                  Anual
                </Button>
              </div>
            </div>

            <Tabs defaultValue="line" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="line">Linha</TabsTrigger>
                <TabsTrigger value="bar">Barras</TabsTrigger>
              </TabsList>
              <TabsContent value="line" className="pt-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="receitas" 
                        stroke="#22c55e" 
                        name="Receitas" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="despesas" 
                        stroke="#ef4444" 
                        name="Despesas" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="bar" className="pt-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="receitas" 
                        fill="#22c55e" 
                        name="Receitas" 
                      />
                      <Bar 
                        dataKey="despesas" 
                        fill="#ef4444" 
                        name="Despesas" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SimpleCard>

        <SimpleCard title="Últimas Transações">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Histórico de Transações</h3>
              <Button size="sm">Nova Transação</Button>
            </div>
            
            <SimpleTable 
              columns={colunasTransacoes} 
              data={transacoes} 
              onRowClick={(row) => console.log("Clicou na transação:", row)}
            />
            
            <div className="flex justify-center">
              <Button variant="outline">Ver todas as transações</Button>
            </div>
          </div>
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Financeiro;
