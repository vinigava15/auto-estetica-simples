
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import SideMenu from './SideMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!localStorage.getItem('userToken');

  if (!isAuthenticated) {
    // Redirecionar para o login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MobileHeader 
        title={title} 
        onMenuClick={() => setMenuOpen(true)} 
      />
      
      <SideMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />
      
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
