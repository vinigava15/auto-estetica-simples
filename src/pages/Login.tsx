
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de login (a ser substituído por API real)
    setTimeout(() => {
      // Demo: aceita qualquer email com senha 'senha123'
      if (password === 'senha123') {
        localStorage.setItem('userToken', 'demo-token');
        localStorage.setItem('userName', email.split('@')[0]);
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro de login",
          description: "E-mail ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Estética Automotiva</h1>
          <p className="text-muted-foreground mt-2">Faça login para acessar o sistema</p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6 border">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-large w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Link
                  to="/reset-password"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-large w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-large bg-primary text-white hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/registro" className="text-primary hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Demo - use qualquer email com a senha: senha123</p>
      </div>
    </div>
  );
};

export default Login;
