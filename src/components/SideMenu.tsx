
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  HomeIcon,
  DollarSignIcon,
  UsersIcon,
  ShoppingCartIcon,
  ClipboardIcon,
  TagIcon,
  LogOutIcon
} from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5 mr-2" />, path: '/dashboard' },
    { name: 'Financeiro', icon: <DollarSignIcon className="h-5 w-5 mr-2" />, path: '/financeiro' },
    { name: 'Clientes', icon: <UsersIcon className="h-5 w-5 mr-2" />, path: '/clientes' },
    { name: 'Serviços', icon: <TagIcon className="h-5 w-5 mr-2" />, path: '/servicos' },
    { name: 'Vendas', icon: <ShoppingCartIcon className="h-5 w-5 mr-2" />, path: '/vendas' },
    { name: 'Ordens de Serviço', icon: <ClipboardIcon className="h-5 w-5 mr-2" />, path: '/ordens' }
  ];

  const handleLogout = () => {
    // Lógica para fazer logout (a ser implementada)
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={onClose}
        ></div>
      )}
      
      {/* Side Menu */}
      <div className={cn(
        "fixed top-0 left-0 bottom-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-xl font-bold">Estética Automotiva</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                    onClick={() => navigateTo(item.path)}
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
