
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: El usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
      <div className="text-center animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Página No Encontrada</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <HomeIcon size={18} />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
