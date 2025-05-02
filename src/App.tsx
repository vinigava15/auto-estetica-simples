
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Financeiro from "./pages/Financeiro";
import Clientes from "./pages/Clientes";
import Servicos from "./pages/Servicos";
import Vendas from "./pages/Vendas";
import Ordens from "./pages/Ordens";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Verificar se há um token salvo para autenticação
  const isAuthenticated = !!localStorage.getItem('userToken');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota raiz - redireciona para o dashboard se autenticado, ou para o login se não */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/ordens" element={<Ordens />} />
            
            {/* Rota 404 para páginas não encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
