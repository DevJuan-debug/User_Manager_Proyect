
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  ShieldAlert,
  Shield,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

// Datos de ejemplo
const initialUsers = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", rol: "Administrador", estado: "Activo", ultimaConexion: "Hace 2 horas" },
  { id: 2, nombre: "Carlos Rodríguez", email: "carlos@ejemplo.com", rol: "Editor", estado: "Activo", ultimaConexion: "Hace 5 min" },
  { id: 3, nombre: "Eva Martínez", email: "eva@ejemplo.com", rol: "Visualizador", estado: "Inactivo", ultimaConexion: "Hace 3 días" },
  { id: 4, nombre: "Miguel Sánchez", email: "miguel@ejemplo.com", rol: "Editor", estado: "Activo", ultimaConexion: "Justo ahora" },
  { id: 5, nombre: "Laura Fernández", email: "laura@ejemplo.com", rol: "Visualizador", estado: "Pendiente", ultimaConexion: "Nunca" },
];

// Roles disponibles
const roles = [
  { id: 1, nombre: "Administrador", descripcion: "Acceso completo a todas las funciones del sistema", permisos: ["crear", "editar", "eliminar", "ver"] },
  { id: 2, nombre: "Editor", descripcion: "Puede editar contenido pero no administrar usuarios", permisos: ["editar", "ver"] },
  { id: 3, nombre: "Visualizador", descripcion: "Solo puede ver información, sin modificar nada", permisos: ["ver"] },
];

// Estadísticas resumen
const estadisticas = [
  { 
    label: "Usuarios Totales", 
    valor: 847, 
    icono: <Users className="h-5 w-5" />, 
    cambio: "+3%",
    color: "blue"
  },
  { 
    label: "Administradores", 
    valor: 12, 
    icono: <ShieldAlert className="h-5 w-5" />, 
    cambio: "0%",
    color: "purple"
  },
  { 
    label: "Usuarios Activos", 
    valor: 721, 
    icono: <CheckCircle className="h-5 w-5" />, 
    cambio: "+5%",
    color: "green"
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [rolesData, setRolesData] = useState(roles);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("usuarios");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteRoleDialog, setShowDeleteRoleDialog] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Formulario para usuarios
  const userForm = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      rol: "",
      estado: "Activo"
    }
  });

  // Formulario para roles
  const roleForm = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      permisos: [] as string[]
    }
  });

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar eliminación de usuario
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`Usuario ${selectedUser.nombre} eliminado correctamente`);
      setShowDeleteDialog(false);
    }
  };

  // Manejar eliminación de rol
  const handleDeleteRole = () => {
    if (selectedRole) {
      // Verificar si el rol está en uso
      const usersWithRole = users.filter(user => user.rol === selectedRole.nombre);
      if (usersWithRole.length > 0) {
        toast.error(`No se puede eliminar el rol porque está asignado a ${usersWithRole.length} usuarios`);
        setShowDeleteRoleDialog(false);
        return;
      }
      
      setRolesData(rolesData.filter(role => role.id !== selectedRole.id));
      toast.success(`Rol ${selectedRole.nombre} eliminado correctamente`);
      setShowDeleteRoleDialog(false);
    }
  };

  // Manejar envío del formulario de usuario
  const handleUserSubmit = userForm.handleSubmit((data) => {
    if (isEditing && selectedUser) {
      // Actualizar usuario existente
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...data } : user
      ));
      toast.success(`Usuario ${data.nombre} actualizado correctamente`);
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...data,
        ultimaConexion: "Nunca"
      };
      setUsers([...users, newUser]);
      toast.success(`Usuario ${data.nombre} creado correctamente`);
    }
    
    setShowUserForm(false);
    userForm.reset();
  });

  // Manejar envío del formulario de rol
  const handleRoleSubmit = roleForm.handleSubmit((data) => {
    if (isEditing && selectedRole) {
      // Actualizar rol existente
      setRolesData(rolesData.map(role => 
        role.id === selectedRole.id ? { ...role, ...data } : role
      ));
      
      // Actualizar usuarios con este rol si el nombre cambió
      if (selectedRole.nombre !== data.nombre) {
        setUsers(users.map(user => 
          user.rol === selectedRole.nombre ? { ...user, rol: data.nombre } : user
        ));
      }
      
      toast.success(`Rol ${data.nombre} actualizado correctamente`);
    } else {
      // Crear nuevo rol
      const newRole = {
        id: rolesData.length > 0 ? Math.max(...rolesData.map(r => r.id)) + 1 : 1,
        ...data,
      };
      setRolesData([...rolesData, newRole]);
      toast.success(`Rol ${data.nombre} creado correctamente`);
    }
    
    setShowRoleForm(false);
    roleForm.reset();
  });

  // Configurar formulario para edición de usuario
  const setupUserEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditing(true);
    userForm.reset({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      estado: user.estado
    });
    setShowUserForm(true);
  };

  // Configurar formulario para edición de rol
  const setupRoleEdit = (role: any) => {
    setSelectedRole(role);
    setIsEditing(true);
    roleForm.reset({
      nombre: role.nombre,
      descripcion: role.descripcion,
      permisos: role.permisos
    });
    setShowRoleForm(true);
  };

  // Configurar formulario para nuevo usuario
  const setupNewUser = () => {
    setIsEditing(false);
    setSelectedUser(null);
    userForm.reset({
      nombre: "",
      email: "",
      rol: "",
      estado: "Activo"
    });
    setShowUserForm(true);
  };

  // Configurar formulario para nuevo rol
  const setupNewRole = () => {
    setIsEditing(false);
    setSelectedRole(null);
    roleForm.reset({
      nombre: "",
      descripcion: "",
      permisos: []
    });
    setShowRoleForm(true);
  };

  // Renderizar color según estado
  const renderEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800";
      case "Inactivo":
        return "bg-gray-100 text-gray-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios y Roles</h1>
            <p className="text-gray-600 mt-1">Administra los usuarios y permisos de tu organización</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            {activeTab === "usuarios" ? (
              <Button 
                className="flex items-center gap-2"
                onClick={setupNewUser}
              >
                <UserPlus size={16} />
                Añadir Usuario
              </Button>
            ) : (
              <Button 
                className="flex items-center gap-2"
                onClick={setupNewRole}
              >
                <Shield size={16} />
                Crear Nuevo Rol
              </Button>
            )}
          </div>
        </div>
        
        {/* Panel de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {estadisticas.map((stat, index) => (
            <Card 
              key={index} 
              className="animate-enter"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-900">{stat.valor.toLocaleString()}</h3>
                    <p className="text-green-500 text-sm font-medium mt-1">{stat.cambio} desde el mes pasado</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-50 rounded-full flex items-center justify-center text-${stat.color}-500`}>
                    {stat.icono}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pestañas para cambiar entre gestión de usuarios y roles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === "usuarios"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("usuarios")}
              >
                <Users className="inline-block mr-2 h-4 w-4" />
                Usuarios
              </button>
              <button
                className={`inline-block py-4 px-4 text-sm font-medium ${
                  activeTab === "roles"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("roles")}
              >
                <Shield className="inline-block mr-2 h-4 w-4" />
                Roles y Permisos
              </button>
            </div>
          </div>
          
          {/* Contenido de la pestaña de Usuarios */}
          {activeTab === "usuarios" && (
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar usuarios..."
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filtrar Por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Rol: Administrador</DropdownMenuItem>
                      <DropdownMenuItem>Rol: Editor</DropdownMenuItem>
                      <DropdownMenuItem>Rol: Visualizador</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Estado: Activo</DropdownMenuItem>
                      <DropdownMenuItem>Estado: Inactivo</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="icon">
                    <Download size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Última Conexión</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{user.nombre}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                              {user.rol}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${renderEstadoColor(user.estado)}`}>
                              {user.estado}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">{user.ultimaConexion}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  className="cursor-pointer"
                                  onClick={() => setupUserEdit(user)}
                                >
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
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          <div className="flex flex-col items-center">
                            <XCircle className="h-8 w-8 text-gray-400 mb-2" />
                            <p>No se encontraron usuarios</p>
                            <p className="text-sm mt-1">Intenta con otra búsqueda o agrega un nuevo usuario</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                <p>
                  Mostrando <span className="font-medium">{filteredUsers.length}</span> de <span className="font-medium">{users.length}</span> usuarios
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm" disabled>Siguiente</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Contenido de la pestaña de Roles */}
          {activeTab === "roles" && (
            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Gestiona los roles y permisos para controlar el acceso a las funcionalidades del sistema.
                </p>
              </div>
              
              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Rol</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Permisos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rolesData.map((role) => (
                      <TableRow key={role.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{role.nombre}</TableCell>
                        <TableCell>{role.descripcion}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permisos.map((permiso, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
                              >
                                {permiso}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => setupRoleEdit(role)}
                              >
                                <Edit size={14} className="mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-600 focus:text-red-600"
                                onClick={() => {
                                  setSelectedRole(role);
                                  setShowDeleteRoleDialog(true);
                                }}
                              >
                                <Trash size={14} className="mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Diálogo de confirmación para eliminar usuario */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar a {selectedUser?.nombre}? Esta acción no se puede deshacer.
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
      
      {/* Diálogo de confirmación para eliminar rol */}
      <Dialog open={showDeleteRoleDialog} onOpenChange={setShowDeleteRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Rol</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar el rol {selectedRole?.nombre}? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteRoleDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteRole}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para crear/editar usuario */}
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Actualiza los datos del usuario seleccionado" 
                : "Completa el formulario para crear un nuevo usuario"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUserSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <FormLabel htmlFor="nombre">Nombre Completo</FormLabel>
                <Input
                  id="nombre"
                  placeholder="Ingresa el nombre completo"
                  {...userForm.register("nombre", { required: true })}
                  className="w-full"
                />
                {userForm.formState.errors.nombre && (
                  <p className="text-red-500 text-sm">El nombre es requerido</p>
                )}
              </div>
              
              <div className="space-y-2">
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  {...userForm.register("email", { required: true })}
                  className="w-full"
                />
                {userForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">El correo es requerido</p>
                )}
              </div>
              
              <div className="space-y-2">
                <FormLabel htmlFor="rol">Rol</FormLabel>
                <Select 
                  onValueChange={(value) => userForm.setValue("rol", value)}
                  defaultValue={userForm.getValues("rol")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesData.map((role) => (
                      <SelectItem key={role.id} value={role.nombre}>
                        {role.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <FormLabel htmlFor="estado">Estado</FormLabel>
                <Select 
                  onValueChange={(value) => userForm.setValue("estado", value)}
                  defaultValue={userForm.getValues("estado")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowUserForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para crear/editar rol */}
      <Dialog open={showRoleForm} onOpenChange={setShowRoleForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Rol" : "Crear Nuevo Rol"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Actualiza la información del rol seleccionado" 
                : "Define un nuevo rol y sus permisos en el sistema"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRoleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <FormLabel htmlFor="nombre">Nombre del Rol</FormLabel>
                <Input
                  id="nombre"
                  placeholder="Ej: Editor, Moderador..."
                  {...roleForm.register("nombre", { required: true })}
                  className="w-full"
                />
                {roleForm.formState.errors.nombre && (
                  <p className="text-red-500 text-sm">El nombre del rol es requerido</p>
                )}
              </div>
              
              <div className="space-y-2">
                <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                <Input
                  id="descripcion"
                  placeholder="Describe brevemente las funciones de este rol"
                  {...roleForm.register("descripcion", { required: true })}
                  className="w-full"
                />
                {roleForm.formState.errors.descripcion && (
                  <p className="text-red-500 text-sm">La descripción es requerida</p>
                )}
              </div>
              
              <div className="space-y-2">
                <FormLabel>Permisos</FormLabel>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="ver" 
                      value="ver"
                      checked={roleForm.getValues("permisos")?.includes("ver")}
                      onChange={(e) => {
                        const permisos = roleForm.getValues("permisos") || [];
                        if (e.target.checked) {
                          roleForm.setValue("permisos", [...permisos, "ver"]);
                        } else {
                          roleForm.setValue("permisos", permisos.filter(p => p !== "ver"));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="ver" className="text-sm">Ver</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="crear" 
                      value="crear"
                      checked={roleForm.getValues("permisos")?.includes("crear")}
                      onChange={(e) => {
                        const permisos = roleForm.getValues("permisos") || [];
                        if (e.target.checked) {
                          roleForm.setValue("permisos", [...permisos, "crear"]);
                        } else {
                          roleForm.setValue("permisos", permisos.filter(p => p !== "crear"));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="crear" className="text-sm">Crear</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="editar" 
                      value="editar"
                      checked={roleForm.getValues("permisos")?.includes("editar")}
                      onChange={(e) => {
                        const permisos = roleForm.getValues("permisos") || [];
                        if (e.target.checked) {
                          roleForm.setValue("permisos", [...permisos, "editar"]);
                        } else {
                          roleForm.setValue("permisos", permisos.filter(p => p !== "editar"));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="editar" className="text-sm">Editar</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="eliminar" 
                      value="eliminar"
                      checked={roleForm.getValues("permisos")?.includes("eliminar")}
                      onChange={(e) => {
                        const permisos = roleForm.getValues("permisos") || [];
                        if (e.target.checked) {
                          roleForm.setValue("permisos", [...permisos, "eliminar"]);
                        } else {
                          roleForm.setValue("permisos", permisos.filter(p => p !== "eliminar"));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="eliminar" className="text-sm">Eliminar</label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRoleForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Guardar Cambios" : "Crear Rol"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default UserManagement;
