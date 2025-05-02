
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import ActionButton from '@/components/ActionButton';
import SimpleTable from '@/components/SimpleTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon, SearchIcon, Calendar, FileIcon, ImageIcon, ClipboardIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Dados de exemplo para ordens de serviço
const ordensDados = [
  { 
    id: 1, 
    data: '02/05/2025', 
    cliente: 'João Silva', 
    servicos: 'Lavagem Completa, Polimento',
    valor: 'R$ 330,00',
    status: 'Pendente'
  },
  { 
    id: 2, 
    data: '01/05/2025', 
    cliente: 'Maria Santos', 
    servicos: 'Polimento, Aplicação de Cera',
    valor: 'R$ 370,00',
    status: 'Aprovado'
  },
  { 
    id: 3, 
    data: '30/04/2025', 
    cliente: 'Pedro Oliveira', 
    servicos: 'Higienização Interna',
    valor: 'R$ 180,00',
    status: 'Concluído'
  },
  { 
    id: 4, 
    data: '28/04/2025', 
    cliente: 'Ana Costa', 
    servicos: 'Lavagem Completa',
    valor: 'R$ 80,00',
    status: 'Concluído'
  }
];

const colunasOrdens = [
  { key: 'data', title: 'Data', width: '15%' },
  { key: 'cliente', title: 'Cliente', width: '20%' },
  { key: 'servicos', title: 'Serviços', width: '30%' },
  { key: 'valor', title: 'Valor', width: '15%' },
  { key: 'status', title: 'Status', width: '15%' }
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

const Ordens: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dataOrdem, setDataOrdem] = useState<Date | undefined>(new Date());

  // Filtragem de ordens
  const ordensFiltradas = ordensDados.filter(ordem => 
    ordem.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    ordem.servicos.toLowerCase().includes(busca.toLowerCase()) ||
    ordem.status.toLowerCase().includes(busca.toLowerCase())
  );

  const handleGerarPDF = () => {
    alert('Funcionalidade para gerar PDF será implementada aqui.');
  };

  return (
    <DashboardLayout title="Ordens de Serviço">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Ordens de Serviço</h2>
          <p className="text-muted-foreground">Gerencie orçamentos e ordens de serviço</p>
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
                  label="Nova Ordem"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Nova Ordem de Serviço</DialogTitle>
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
                    <label className="text-sm font-medium">Serviços</label>
                    <Select>
                      <SelectTrigger className="input-large">
                        <SelectValue placeholder="Selecione os serviços" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoesServicos.map((servico) => (
                          <SelectItem key={servico.value} value={servico.value}>
                            {servico.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Será implementada seleção múltipla
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "input-large w-full justify-start text-left font-normal",
                            !dataOrdem && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dataOrdem ? format(dataOrdem, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={dataOrdem}
                          onSelect={setDataOrdem}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="valor" className="text-sm font-medium">Valor Total (R$)</label>
                    <Input id="valor" type="number" step="0.01" className="input-large" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="observacoes" className="text-sm font-medium">Observações</label>
                    <Textarea 
                      id="observacoes" 
                      rows={3}
                      className="resize-none"
                      placeholder="Detalhes adicionais sobre o serviço..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fotos do Veículo</label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Arraste fotos ou clique para selecionar
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Selecionar Fotos
                      </Button>
                    </div>
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
                      alert('Ordem seria criada aqui!');
                      setDialogAberto(false);
                    }}
                  >
                    Criar Ordem
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6">
            <SimpleTable 
              columns={colunasOrdens} 
              data={ordensFiltradas} 
              onRowClick={(ordem) => {
                alert(`Detalhes da ordem: ${ordem.id} para ${ordem.cliente}`);
              }}
            />
          </div>

          {ordensFiltradas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma ordem encontrada com os termos buscados.</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <ActionButton
              icon={<FileIcon />}
              label="Exportar Ordens"
              variant="outline"
              onClick={handleGerarPDF}
              className="mr-4"
            />
            <ActionButton
              icon={<ClipboardIcon />}
              label="Gerar PDF de Orçamento"
              onClick={handleGerarPDF}
            />
          </div>
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Ordens;
