
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Users, 
  BarChart, 
  Lock, 
  Zap,
  Mail,
  Phone
} from "lucide-react";

const Index = () => {
  // Refs for animation elements
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-enter");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Features section data
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Gestión de Acceso Seguro",
      description: "Controla quién tiene acceso a tu sistema con permisos basados en roles y autenticación segura."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Jerarquía de Roles de Usuario",
      description: "Define roles personalizados con permisos específicos para administradores y usuarios estándar."
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Análisis Detallado",
      description: "Rastrea la actividad de los usuarios y obtén información valiosa con paneles de análisis completos."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Controles de Privacidad",
      description: "Permite a los usuarios gestionar su configuración de privacidad y visibilidad de datos."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Rendimiento Rápido",
      description: "Disfruta de tiempos de carga mínimos y experiencias de usuario fluidas en todos los dispositivos."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sara Jiménez",
      role: "Gerente de Producto",
      company: "TechStart Inc.",
      quote: "UserManage ha transformado cómo manejamos los permisos de usuarios. La interfaz intuitiva hace que gestionar nuestro equipo sea muy sencillo.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Miguel Chen",
      role: "CTO",
      company: "Innovate Solutions",
      quote: "El panel de administración es increíblemente potente pero simple de usar. Ha ahorrado a nuestro equipo innumerables horas de gestión.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Elena Rodríguez",
      role: "Directora de RRHH",
      company: "Global Services Ltd.",
      quote: "UserManage ofrece el equilibrio perfecto entre seguridad y accesibilidad. Nuestros empleados adoran la interfaz limpia.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <MainLayout className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-20 md:py-28">
        <div className="container mx-auto px-4" ref={heroRef}>
          <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0">
            <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-primary rounded-full mb-4">
              Plataforma de Gestión de Usuarios
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Simplifica la Gestión de Usuarios con Elegante Simplicidad
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Crea, gestiona y analiza cuentas de usuario con una plataforma intuitiva diseñada para empresas modernas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="px-8 py-6 text-base">
                  Empezar
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base">
                  Contactar con Ventas
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="hidden md:block absolute top-40 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="hidden md:block absolute top-60 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-primary rounded-full mb-4">
              Características
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Potentes Herramientas de Gestión de Usuarios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma proporciona todo lo que necesitas para gestionar usuarios eficientemente y controlar el acceso a tus sistemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll opacity-0">
            <Link to="/features">
              <Button variant="outline">
                Explorar Todas las Características
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              ¿Listo para Elevar tu Gestión de Usuarios?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de empresas que usan UserManage para optimizar sus operaciones.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 text-primary">
                Comienza tu Prueba Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-primary rounded-full mb-4">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre cómo UserManage ha ayudado a empresas como la tuya a simplificar la gestión de usuarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-on-scroll opacity-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Contáctanos</h2>
                <p className="text-gray-600 mb-6">
                  ¿Tienes preguntas o estás listo para comenzar? Ponte en contacto con nuestro equipo para obtener asistencia personalizada.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Mail className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Envíanos un Email</p>
                      <p className="font-medium">contacto@usermanage.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Phone className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Llámanos</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button>Contáctanos</Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary to-blue-600 p-8 md:p-12 text-white flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tu gestión de usuarios?</h3>
                  <p className="mb-6 text-blue-100">
                    Únete a miles de empresas que confían en UserManage para una administración de usuarios segura y eficiente.
                  </p>
                  <Link to="/register">
                    <Button variant="secondary" className="text-primary">
                      Comenzar Prueba Gratuita
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
