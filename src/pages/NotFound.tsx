
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">
          Oops! Página não encontrada
        </p>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button 
          className="btn-large mt-4" 
          onClick={() => navigate('/')}
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
