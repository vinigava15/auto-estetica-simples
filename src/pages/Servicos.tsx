
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import ActionButton from '@/components/ActionButton';
import SimpleTable from '@/components/SimpleTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, SearchIcon, PenIcon, TrashIcon } from 'lucide-react';

// Dados de exemplo para serviços
const servicosDados = [
  { 
    id: 1, 
    nome: 'Lavagem Completa', 
    valor: 'R$ 80,00', 
    descricao: 'Lavagem externa e interna completa',
  },
  { 
    id: 2, 
    nome: 'Polimento', 
    valor: 'R$ 250,00', 
    descricao: 'Polimento completo da pintura',
  },
  { 
    id: 3, 
    nome: 'Aplicação de Cera', 
    valor: 'R$ 120,00', 
    descricao: 'Aplicação de cera de carnaúba',
  },
  { 
    id: 4, 
    nome: 'Higienização Interna', 
    valor: 'R$ 180,00', 
    descricao: 'Limpeza profunda de bancos e carpetes',
  }
];

const colunasServicos = [
  { key: 'nome', title: 'Nome', width: '30%' },
  { key: 'valor', title: 'Valor', width: '20%' },
  { key: 'descricao', title: 'Descrição', width: '40%' },
  { key: 'acoes', title: 'Ações', width: '10%' }
];

// Versão dos dados com as ações incluídas
const servicosComAcoes = servicosDados.map(servico => ({
  ...servico,
  acoes: (
    <div className="flex gap-2 justify-center">
      <Button variant="ghost" size="icon">
        <PenIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}));

const Servicos: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);

  // Filtragem de serviços
  const servicosFiltrados = servicosComAcoes.filter(servico => 
    servico.nome.toLowerCase().includes(busca.toLowerCase()) ||
    servico.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <DashboardLayout title="Serviços">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Catálogo de Serviços</h2>
          <p className="text-muted-foreground">Gerencie os serviços oferecidos</p>
        </div>

        <SimpleCard>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar serviço..."
                className="pl-10 input-large"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <ActionButton
                  icon={<PlusIcon />}
                  label="Novo Serviço"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Serviço</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium">Nome do serviço</label>
                    <Input id="nome" className="input-large" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="valor" className="text-sm font-medium">Valor (R$)</label>
                    <Input id="valor" type="number" step="0.01" className="input-large" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
                    <Textarea 
                      id="descricao" 
                      rows={3}
                      className="resize-none"
                    />
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
                      alert('Serviço seria salvo aqui!');
                      setDialogAberto(false);
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6">
            <SimpleTable 
              columns={colunasServicos} 
              data={servicosFiltrados}
            />
          </div>

          {servicosFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum serviço encontrado com os termos buscados.</p>
            </div>
          )}
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Servicos;
