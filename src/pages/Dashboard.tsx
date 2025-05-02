
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SimpleCard from '@/components/SimpleCard';
import ActionButton from '@/components/ActionButton';
import { UsersIcon, TagIcon, ShoppingCartIcon, ClipboardIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuário';

  const quickActions = [
    { 
      label: 'Clientes', 
      icon: <UsersIcon />, 
      path: '/clientes',
      color: 'bg-blue-500'
    },
    { 
      label: 'Serviços', 
      icon: <TagIcon />, 
      path: '/servicos',
      color: 'bg-green-500'
    },
    { 
      label: 'Vendas', 
      icon: <ShoppingCartIcon />, 
      path: '/vendas',
      color: 'bg-purple-500'
    },
    { 
      label: 'Orçamentos', 
      icon: <ClipboardIcon />, 
      path: '/ordens',
      color: 'bg-amber-500'
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold">Bem-vindo, {userName}!</h2>
          <p className="text-muted-foreground">O que deseja fazer hoje?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <SimpleCard key={index} className="p-0 overflow-hidden">
              <div className={`${action.color} h-2`}></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">{action.label}</h3>
                <ActionButton
                  icon={action.icon}
                  label={`Acessar ${action.label}`}
                  onClick={() => navigate(action.path)}
                  className="w-full"
                />
              </div>
            </SimpleCard>
          ))}
        </div>

        <SimpleCard title="Resumo do dia">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-md">
              <p className="text-sm text-blue-800">Vendas de hoje</p>
              <p className="text-2xl font-bold text-blue-800">R$ 0,00</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-sm text-green-800">Clientes atendidos</p>
              <p className="text-2xl font-bold text-green-800">0</p>
            </div>
            <div className="bg-amber-100 p-4 rounded-md">
              <p className="text-sm text-amber-800">Orçamentos pendentes</p>
              <p className="text-2xl font-bold text-amber-800">0</p>
            </div>
          </div>
        </SimpleCard>

        <SimpleCard title="Atividades recentes">
          <div className="text-center py-6 text-muted-foreground">
            <p>Não há atividades recentes para exibir</p>
          </div>
        </SimpleCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
