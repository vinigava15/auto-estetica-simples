
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Verificar se o usuário está autenticado
  const isAuthenticated = !!localStorage.getItem('userToken');

  useEffect(() => {
    document.title = "Estética Automotiva - Sistema de Gerenciamento";
  }, []);

  // Redirecionar automaticamente para o dashboard ou login
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Index;
