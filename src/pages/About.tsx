
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, BarChart3, Lock, Zap, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Gestión de Acceso Seguro",
      description: "Protocolos de seguridad de nivel empresarial que protegen tus datos y controlan el acceso con permisos personalizables basados en roles."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Jerarquía de Roles Avanzada",
      description: "Crea roles personalizados con configuraciones de permisos precisas para adaptarse exactamente a la estructura y necesidades de tu organización."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Análisis Completo",
      description: "Obtén información útil con informes detallados sobre la actividad de los usuarios, patrones de uso y utilización del sistema."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Controles de Privacidad de Datos",
      description: "Cumple con regulaciones globales como GDPR y CCPA mientras das a los usuarios control sobre su información personal."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Operaciones Simplificadas",
      description: "Automatiza la provisión de usuarios, la desprovisión y las revisiones de acceso para reducir la carga administrativa."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Cumplimiento Empresarial",
      description: "Cumple con los estándares de la industria con funciones de cumplimiento integradas y auditorías completas."
    }
  ];

  const benefits = [
    {
      title: "Reducción de Riesgos de Seguridad",
      description: "Minimiza el acceso no autorizado y posibles filtraciones de datos mediante controles de acceso detallados."
    },
    {
      title: "Mayor Productividad",
      description: "Optimiza los flujos de trabajo con aprovisionamiento automático de usuarios y solicitudes de acceso de autoservicio."
    },
    {
      title: "Menores Costos de TI",
      description: "Reduce los tickets de soporte y procesos manuales relacionados con la gestión de usuarios hasta en un 70%."
    },
    {
      title: "Mejora de la Experiencia del Usuario",
      description: "Proporciona acceso fluido a los recursos autorizados con inicio de sesión único e interfaces intuitivas."
    },
    {
      title: "Cumplimiento Simplificado",
      description: "Cumple con los requisitos regulatorios con informes automatizados y registros de auditoría completos."
    },
    {
      title: "Infraestructura Escalable",
      description: "Adáptate fácilmente al crecimiento de tu organización con una arquitectura flexible basada en la nube."
    }
  ];

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
              Acerca de UserManage
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Protegiendo y Simplificando la Gestión de Usuarios para Organizaciones Modernas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              UserManage ofrece una plataforma integral de gestión de identidad y acceso que ayuda a organizaciones de todos los tamaños a proteger, administrar y optimizar sus ciclos de vida de usuarios.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="px-6">
                  Empezar
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="px-6">
                  Contactar con Ventas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Nuestra Misión</h2>
              <p className="text-lg text-gray-600 mb-6">
                En UserManage, nuestra misión es revolucionar cómo las organizaciones manejan la gestión de identidad y acceso. Creemos que la seguridad robusta nunca debe ser a expensas de la usabilidad.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Fundada en 2020 por un equipo de expertos en ciberseguridad, UserManage se ha convertido rápidamente en la solución de confianza para miles de organizaciones en todo el mundo, desde startups hasta empresas Fortune 500.
              </p>
              <p className="text-lg text-gray-600">
                Nuestra plataforma combina seguridad de nivel empresarial con interfaces intuitivas, permitiendo a las empresas proteger sus activos más valiosos mientras empoderan a sus usuarios.
              </p>
            </div>
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">¿Por qué elegir UserManage?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Shield className="h-4 w-4" />
                  </span>
                  <p>Prácticas de seguridad líderes en la industria con certificación SOC 2 Tipo II</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Users className="h-4 w-4" />
                  </span>
                  <p>Garantía de tiempo de actividad del 99.9% con soporte empresarial dedicado</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Zap className="h-4 w-4" />
                  </span>
                  <p>Integración perfecta con más de 200 aplicaciones empresariales populares</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Award className="h-4 w-4" />
                  </span>
                  <p>Soporte al cliente premiado con tiempo de respuesta promedio de menos de 2 horas</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
              Características de la Plataforma
            </span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Solución Integral de Gestión de Usuarios
            </h2>
            <p className="text-lg text-gray-600">
              Nuestra plataforma proporciona todo lo que necesitas para gestionar identidades de usuarios, asegurar el acceso y garantizar el cumplimiento en toda tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="mb-4 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
              Beneficios Clave
            </span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Cómo UserManage Transforma Tu Negocio
            </h2>
            <p className="text-lg text-gray-600">
              Nuestros clientes experimentan mejoras significativas en seguridad, eficiencia y satisfacción del usuario después de implementar UserManage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 bg-primary rounded-full"></div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              ¿Listo para Transformar tu Gestión de Usuarios?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a miles de organizaciones que confían en UserManage para asegurar y optimizar sus operaciones de identidad.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-primary px-6">
                  Comienza tu Prueba Gratuita
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-6">
                  Ver Precios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
