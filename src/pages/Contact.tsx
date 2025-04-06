
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Por favor introduce un correo electrónico válido",
  }),
  subject: z.string().min(5, {
    message: "El asunto debe tener al menos 5 caracteres",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Here you would typically send the form data to your backend
    toast.success("¡Tu mensaje ha sido enviado! Te responderemos pronto.");
    form.reset();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros servicios? ¿Necesitas ayuda para comenzar? Nuestro equipo está aquí para ayudarte.
            No dudes en contactarnos a través de cualquiera de los métodos a continuación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Envíanos un Email</h3>
                <p className="text-gray-600 mb-2">
                  Nuestro equipo de soporte generalmente responde dentro de las 24 horas
                </p>
                <a
                  href="mailto:support@usermanage.com"
                  className="text-primary font-medium hover:underline"
                >
                  support@usermanage.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Llámanos</h3>
                <p className="text-gray-600 mb-2">
                  Disponible de lunes a viernes, de 9am a 6pm (hora del Este)
                </p>
                <a
                  href="tel:+15551234567"
                  className="text-primary font-medium hover:underline"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Visítanos</h3>
                <p className="text-gray-600 mb-2">
                  123 Tech Plaza, Suite 400
                </p>
                <p className="text-primary font-medium">
                  San Francisco, CA 94103
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-xl shadow-sm p-8 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="juan@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="¿Cómo podemos ayudarte?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Por favor comparte los detalles de tu consulta..." 
                          rows={5} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full md:w-auto">
                  Enviar Mensaje
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="order-1 lg:order-2">
            <Card className="shadow-sm overflow-hidden">
              <CardHeader className="bg-primary text-white">
                <CardTitle>Horario de Oficina</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Cuándo puedes contactarnos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Lunes - Viernes</p>
                      <p className="text-gray-600">9:00 AM - 6:00 PM (hora del Este)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Sábado</p>
                      <p className="text-gray-600">10:00 AM - 4:00 PM (hora del Este)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Domingo</p>
                      <p className="text-gray-600">Cerrado</p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-2">¿Necesitas asistencia urgente?</h3>
                  <p className="text-gray-600 mb-4">
                    Para consultas urgentes, por favor llama a nuestra línea de soporte prioritario.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="tel:+15551234567" className="inline-flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Llamar a Soporte Prioritario
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-medium mb-2 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Suscríbete a nuestro boletín
              </h3>
              <p className="text-gray-600 mb-4">
                Mantente actualizado con nuestras últimas características y anuncios.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Tu correo electrónico" className="bg-white" />
                <Button>Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
