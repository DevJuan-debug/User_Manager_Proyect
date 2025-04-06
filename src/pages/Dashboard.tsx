
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { 
  BarChart, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  MoreHorizontal,
  ChevronDown,
  UserPlus,
  UserX,
  Edit,
  Trash,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for users
const mockUsers = [
  { id: 1, name: "Alejandro Jiménez", email: "alejandro@ejemplo.com", role: "Administrador", status: "Activo", lastActive: "Justo ahora" },
  { id: 2, name: "Sandra Wilson", email: "sandra@ejemplo.com", role: "Visualizador", status: "Activo", lastActive: "Hace 5 min" },
  { id: 3, name: "Jessica Parker", email: "jessica@ejemplo.com", role: "Administrador", status: "Inactivo", lastActive: "Hace 2 días" },
  { id: 4, name: "Miguel Moreno", email: "miguel@ejemplo.com", role: "Visualizador", status: "Activo", lastActive: "Hace 1 hora" },
  { id: 5, name: "Emma Díaz", email: "emma@ejemplo.com", role: "Visualizador", status: "Activo", lastActive: "Hace 3 horas" },
  { id: 6, name: "Roberto Martínez", email: "roberto@ejemplo.com", role: "Visualizador", status: "Pendiente", lastActive: "Nunca" },
  { id: 7, name: "Olivia Thompson", email: "olivia@ejemplo.com", role: "Administrador", status: "Activo", lastActive: "Hace 2 horas" },
];

// Summary stats
const summaryStats = [
  { label: "Usuarios Totales", value: 856, icon: <Users className="w-5 h-5" />, change: "+12%" },
  { label: "Usuarios Activos", value: 732, icon: <BarChart className="w-5 h-5" />, change: "+5%" },
  { label: "Nuevos Esta Semana", value: 43, icon: <UserPlus className="w-5 h-5" />, change: "+18%" },
];

const Dashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`${selectedUser.name} ha sido eliminado`);
      setShowDeleteDialog(false);
    }
  };
  
  const handleChangeRole = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast.success(`Rol de usuario actualizado a ${newRole}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="text-gray-600 mt-1">Administra los usuarios y permisos de tu organización</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              Añadir Nuevo Usuario
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {summaryStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-enter"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2 text-gray-900">{stat.value.toLocaleString()}</h3>
                  <p className="text-green-500 text-sm font-medium mt-1">{stat.change} desde el mes pasado</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
          <Tabs defaultValue="all-users">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-100">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="all-users">Todos los Usuarios</TabsTrigger>
                <TabsTrigger value="administrators">Administradores</TabsTrigger>
                <TabsTrigger value="viewers">Visualizadores</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar usuarios..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filtrar Por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Estado: Activo</DropdownMenuItem>
                    <DropdownMenuItem>Estado: Inactivo</DropdownMenuItem>
                    <DropdownMenuItem>Rol: Administrador</DropdownMenuItem>
                    <DropdownMenuItem>Rol: Visualizador</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon">
                  <Download size={18} />
                </Button>
              </div>
            </div>
            
            <TabsContent value="all-users" className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actividad</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  className={`text-sm px-3 py-1 h-auto flex items-center gap-1 ${
                                    user.role === "Administrador" ? "text-primary" : "text-gray-600"
                                  }`}
                                >
                                  {user.role}
                                  <ChevronDown size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => handleChangeRole(user.id, "Administrador")}>
                                  Administrador
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleChangeRole(user.id, "Visualizador")}>
                                  Visualizador
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "Activo" 
                                ? "bg-green-100 text-green-800" 
                                : user.status === "Inactivo"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{user.lastActive}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit size={14} className="mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="cursor-pointer text-red-600 focus:text-red-600"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowDeleteDialog(true);
                                  }}
                                >
                                  <Trash size={14} className="mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          <UserX size={40} className="mx-auto mb-4 text-gray-400" />
                          <p className="text-lg font-medium">No se encontraron usuarios</p>
                          <p className="mt-1">Prueba ajustando tu búsqueda o filtro para encontrar lo que estás buscando.</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => setSearchQuery("")}
                          >
                            Limpiar búsqueda
                          </Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Mostrando <span className="font-medium">{filteredUsers.length}</span> de <span className="font-medium">{users.length}</span> usuarios
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm" disabled>Siguiente</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="administrators">
              {/* Similar structure for administrators tab */}
              <div className="p-8 text-center text-gray-500">
                <p>Vista de gestión de administradores iría aquí</p>
              </div>
            </TabsContent>
            
            <TabsContent value="viewers">
              {/* Similar structure for viewers tab */}
              <div className="p-8 text-center text-gray-500">
                <p>Vista de gestión de visualizadores iría aquí</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar a {selectedUser?.name}? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Dashboard;
