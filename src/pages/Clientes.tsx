
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import ActionButton from '@/components/ActionButton';
import SimpleTable from '@/components/SimpleTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon, FileIcon, SearchIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dados de exemplo para clientes
const clientesDados = [
  { 
    id: 1, 
    nome: 'João Silva', 
    telefone: '(11) 98765-4321', 
    email: 'joao@exemplo.com',
    origem: 'Instagram'
  },
  { 
    id: 2, 
    nome: 'Maria Santos', 
    telefone: '(11) 91234-5678', 
    email: 'maria@exemplo.com',
    origem: 'Indicação'
  },
  { 
    id: 3, 
    nome: 'Pedro Oliveira', 
    telefone: '(11) 97777-8888', 
    email: 'pedro@exemplo.com',
    origem: 'Google'
  },
  { 
    id: 4, 
    nome: 'Ana Costa', 
    telefone: '(11) 95555-6666', 
    email: 'ana@exemplo.com',
    origem: 'Instagram'
  }
];

const colunasClientes = [
  { key: 'nome', title: 'Nome', width: '30%' },
  { key: 'telefone', title: 'Telefone', width: '20%' },
  { key: 'email', title: 'E-mail', width: '30%' },
  { key: 'origem', title: 'Origem', width: '20%' }
];

const Clientes: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [origemFiltro, setOrigemFiltro] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);

  // Filtragem de clientes
  const clientesFiltrados = clientesDados.filter(cliente => {
    const matchBusca = cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       cliente.email.toLowerCase().includes(busca.toLowerCase());
    const matchOrigem = origemFiltro === '' || cliente.origem === origemFiltro;
    
    return matchBusca && matchOrigem;
  });

  const handleExportar = () => {
    alert('Funcionalidade de exportação será implementada aqui.');
  };

  return (
    <DashboardLayout title="Clientes">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Gerenciamento de Clientes</h2>
          <p className="text-muted-foreground">Cadastre e gerencie seus clientes</p>
        </div>

        <SimpleCard>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  className="pl-10 input-large"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={origemFiltro} onValueChange={setOrigemFiltro}>
                <SelectTrigger className="input-large">
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas origens</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Indicação">Indicação</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-between">
            <ActionButton
              icon={<FileIcon />}
              label="Exportar lista"
              variant="outline"
              onClick={handleExportar}
            />
            
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <ActionButton
                  icon={<PlusIcon />}
                  label="Novo Cliente"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium">Nome completo</label>
                    <Input id="nome" className="input-large" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="text-sm font-medium">Telefone</label>
                    <Input id="telefone" className="input-large" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                    <Input id="email" type="email" className="input-large" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="origem" className="text-sm font-medium">Origem</label>
                    <Select>
                      <SelectTrigger className="input-large">
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
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
                      alert('Cliente seria salvo aqui!');
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
              columns={colunasClientes} 
              data={clientesFiltrados} 
              onRowClick={(cliente) => {
                alert(`Detalhes do cliente: ${cliente.nome}`);
              }}
            />
          </div>

          {clientesFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum cliente encontrado com os filtros atuais.</p>
            </div>
          )}
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Clientes;
