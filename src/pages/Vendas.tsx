
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import ActionButton from '@/components/ActionButton';
import SimpleTable from '@/components/SimpleTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon, SearchIcon, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Dados de exemplo para vendas
const vendasDados = [
  { 
    id: 1, 
    data: '02/05/2025', 
    cliente: 'João Silva', 
    servico: 'Lavagem Completa',
    valor: 'R$ 80,00'
  },
  { 
    id: 2, 
    data: '01/05/2025', 
    cliente: 'Maria Santos', 
    servico: 'Polimento',
    valor: 'R$ 250,00'
  },
  { 
    id: 3, 
    data: '30/04/2025', 
    cliente: 'Pedro Oliveira', 
    servico: 'Aplicação de Cera',
    valor: 'R$ 120,00'
  },
  { 
    id: 4, 
    data: '28/04/2025', 
    cliente: 'Ana Costa', 
    servico: 'Higienização Interna',
    valor: 'R$ 180,00'
  }
];

const colunasVendas = [
  { key: 'data', title: 'Data', width: '15%' },
  { key: 'cliente', title: 'Cliente', width: '30%' },
  { key: 'servico', title: 'Serviço', width: '30%' },
  { key: 'valor', title: 'Valor', width: '15%' }
];

// Opções para o select de cliente
const opcoesClientes = [
  { value: '1', label: 'João Silva' },
  { value: '2', label: 'Maria Santos' },
  { value: '3', label: 'Pedro Oliveira' },
  { value: '4', label: 'Ana Costa' }
];

// Opções para o select de serviço
const opcoesServicos = [
  { value: '1', label: 'Lavagem Completa - R$ 80,00' },
  { value: '2', label: 'Polimento - R$ 250,00' },
  { value: '3', label: 'Aplicação de Cera - R$ 120,00' },
  { value: '4', label: 'Higienização Interna - R$ 180,00' }
];

const Vendas: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dataVenda, setDataVenda] = useState<Date | undefined>(new Date());

  // Filtragem de vendas
  const vendasFiltradas = vendasDados.filter(venda => 
    venda.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    venda.servico.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <DashboardLayout title="Vendas">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Registro de Vendas</h2>
          <p className="text-muted-foreground">Cadastre e gerencie suas vendas</p>
        </div>

        <SimpleCard>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente ou serviço..."
                className="pl-10 input-large"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <ActionButton
                  icon={<PlusIcon />}
                  label="Nova Venda"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Venda</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="cliente" className="text-sm font-medium">Cliente</label>
                    <Select>
                      <SelectTrigger className="input-large">
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoesClientes.map((cliente) => (
                          <SelectItem key={cliente.value} value={cliente.value}>
                            {cliente.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="servico" className="text-sm font-medium">Serviço</label>
                    <Select>
                      <SelectTrigger className="input-large">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoesServicos.map((servico) => (
                          <SelectItem key={servico.value} value={servico.value}>
                            {servico.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "input-large w-full justify-start text-left font-normal",
                            !dataVenda && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dataVenda ? format(dataVenda, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={dataVenda}
                          onSelect={setDataVenda}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="valor" className="text-sm font-medium">Valor Final (R$)</label>
                    <Input id="valor" type="number" step="0.01" className="input-large" />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogAberto(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      alert('Venda seria registrada aqui!');
                      setDialogAberto(false);
                    }}
                  >
                    Registrar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6">
            <SimpleTable 
              columns={colunasVendas} 
              data={vendasFiltradas} 
              onRowClick={(venda) => {
                alert(`Detalhes da venda: ${venda.servico} para ${venda.cliente}`);
              }}
            />
          </div>

          {vendasFiltradas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma venda encontrada com os termos buscados.</p>
            </div>
          )}
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Vendas;
