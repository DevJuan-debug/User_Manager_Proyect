
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      if (email === "admin@example.com" && password === "password") {
        toast.success("Inicio de sesión exitoso");
        navigate("/dashboard");
      } else if (email === "user@example.com" && password === "password") {
        toast.success("Inicio de sesión exitoso");
        navigate("/dashboard");
      } else {
        toast.error("Credenciales inválidas");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-scale-in">
          <div className="p-8">
            <div className="text-center mb-6">
              <Link to="/" className="inline-block">
                <span className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  UM
                </span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h1>
              <p className="text-gray-600 mt-1">Inicia sesión en tu cuenta</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Recordarme por 30 días
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-5" 
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Cuentas de prueba</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmail("admin@example.com");
                    setPassword("password");
                  }}
                  className="text-xs h-auto py-2"
                >
                  Acceso Administrador
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmail("user@example.com");
                    setPassword("password");
                  }}
                  className="text-xs h-auto py-2"
                >
                  Acceso Visualizador
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
