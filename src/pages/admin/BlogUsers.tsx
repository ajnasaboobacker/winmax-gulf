import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  UserPlus, 
  MoreHorizontal, 
  Shield, 
  Trash2, 
  Loader2,
  Search,
  Crown,
  Edit,
  Eye,
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

type AppRole = "admin" | "editor" | "author";

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  username?: string;
  avatar_url: string | null;
  bio: string | null;
}

interface UserWithRoles {
  user_id: string;
  profile: Profile | null;
  roles: UserRole[];
}

interface LookedUpUser {
  user_id: string;
  email: string;
  created_at: string;
}

interface CreateUserForm {
  email: string;
  password: string;
  username: string;
  displayName: string;
  role: AppRole;
}

const ROLE_COLORS: Record<AppRole, string> = {
  admin: "bg-red-500/20 text-red-400 border-red-500/30",
  editor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  author: "bg-green-500/20 text-green-400 border-green-500/30",
};

const ROLE_ICONS: Record<AppRole, React.ReactNode> = {
  admin: <Crown className="h-3 w-3" />,
  editor: <Edit className="h-3 w-3" />,
  author: <Eye className="h-3 w-3" />,
};

const BlogUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [lookedUpUser, setLookedUpUser] = useState<LookedUpUser | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [newRole, setNewRole] = useState<AppRole>("author");
  
  // Create user form state
  const [createForm, setCreateForm] = useState<CreateUserForm>({
    email: "",
    password: "",
    username: "",
    displayName: "",
    role: "author",
  });
  const [createError, setCreateError] = useState<string | null>(null);

  // Fetch all user roles with profiles
  const { data: usersWithRoles, isLoading } = useQuery({
    queryKey: ["blog-users"],
    queryFn: async () => {
      // Get all user roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (rolesError) throw rolesError;

      // Get unique user IDs
      const userIds = [...new Set(roles?.map(r => r.user_id) || [])];
      
      if (userIds.length === 0) return [];

      // Get profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", userIds);

      if (profilesError) throw profilesError;

      // Group roles by user
      const usersMap = new Map<string, UserWithRoles>();
      
      for (const userId of userIds) {
        const userRoles = roles?.filter(r => r.user_id === userId) || [];
        const profile = profiles?.find(p => p.user_id === userId) || null;
        
        usersMap.set(userId, {
          user_id: userId,
          profile,
          roles: userRoles as UserRole[],
        });
      }

      return Array.from(usersMap.values());
    },
  });

  // Add role mutation
  const addRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-users"] });
      toast({ title: "Role added", description: "User role has been added successfully." });
      setIsAddUserOpen(false);
      setIsAddRoleOpen(false);
      setEmailInput("");
      setLookedUpUser(null);
      setLookupError(null);
      setSelectedUser(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to add role", 
        description: error.message.includes("duplicate") 
          ? "User already has this role." 
          : error.message,
        variant: "destructive" 
      });
    },
  });

  // Remove role mutation
  const removeRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", roleId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-users"] });
      toast({ title: "Role removed", description: "User role has been removed." });
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to remove role", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  // Validate email format
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (form: CreateUserForm) => {
      // Client-side validation
      if (!isValidEmail(form.email)) {
        throw new Error("Please enter a valid email address (e.g., user@example.com)");
      }
      if (form.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      if (form.username.length < 3) {
        throw new Error("Username must be at least 3 characters");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
        throw new Error("Username can only contain letters, numbers, and underscores");
      }

      const { data, error } = await supabase.functions.invoke("create-user", {
        body: form,
      });
      
      if (error) throw new Error(error.message || "Failed to create user");
      if (data?.error) throw new Error(data.error);
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-users"] });
      toast({ title: "User created", description: "New user has been created successfully." });
      setIsCreateUserOpen(false);
      setCreateForm({ email: "", password: "", username: "", displayName: "", role: "author" });
      setCreateError(null);
    },
    onError: (error: Error) => {
      setCreateError(error.message);
    },
  });

  const filteredUsers = usersWithRoles?.filter(user => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      user.profile?.display_name?.toLowerCase().includes(search) ||
      user.profile?.username?.toLowerCase().includes(search) ||
      user.user_id.toLowerCase().includes(search) ||
      user.roles.some(r => r.role.toLowerCase().includes(search))
    );
  });

  const handleAddRole = (user: UserWithRoles) => {
    setSelectedUser(user);
    setNewRole("author");
    setIsAddRoleOpen(true);
  };

  const handleRemoveRole = (roleId: string, roleName: string) => {
    if (confirm(`Are you sure you want to remove the ${roleName} role?`)) {
      removeRoleMutation.mutate(roleId);
    }
  };

  const availableRolesForUser = (user: UserWithRoles): AppRole[] => {
    const existingRoles = user.roles.map(r => r.role);
    return (["admin", "editor", "author"] as AppRole[]).filter(
      role => !existingRoles.includes(role)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 mt-1">Manage blog authors and their roles</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreateUserOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Create User
          </Button>
          <Button onClick={() => setIsAddUserOpen(true)} variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700"
        />
      </div>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2 text-sm">
          <Badge className={ROLE_COLORS.admin}>
            {ROLE_ICONS.admin}
            <span className="ml-1">Admin</span>
          </Badge>
          <span className="text-slate-400">Full access, manage users & settings</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge className={ROLE_COLORS.editor}>
            {ROLE_ICONS.editor}
            <span className="ml-1">Editor</span>
          </Badge>
          <span className="text-slate-400">Edit all posts, manage categories</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge className={ROLE_COLORS.author}>
            {ROLE_ICONS.author}
            <span className="ml-1">Author</span>
          </Badge>
          <span className="text-slate-400">Create & edit own posts</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-slate-300">User</TableHead>
                <TableHead className="text-slate-300">Roles</TableHead>
                <TableHead className="text-slate-300">Added</TableHead>
                <TableHead className="text-slate-300 w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.user_id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.profile?.avatar_url ? (
                        <img
                          src={user.profile.avatar_url}
                          alt={user.profile.display_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                          {user.profile?.display_name?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-white">
                          {user.profile?.display_name || "No profile"}
                        </p>
                        <p className="text-xs text-slate-400 font-mono">
                          {user.user_id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {user.roles.map((role) => (
                        <Badge 
                          key={role.id} 
                          className={`${ROLE_COLORS[role.role]} gap-1 cursor-default`}
                        >
                          {ROLE_ICONS[role.role]}
                          {role.role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {user.roles[0] && format(new Date(user.roles[0].created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        {availableRolesForUser(user).length > 0 && (
                          <DropdownMenuItem 
                            onClick={() => handleAddRole(user)}
                            className="gap-2 cursor-pointer"
                          >
                            <Shield className="h-4 w-4" />
                            Add Role
                          </DropdownMenuItem>
                        )}
                        {user.roles.map((role) => (
                          <DropdownMenuItem 
                            key={role.id}
                            onClick={() => handleRemoveRole(role.id, role.role)}
                            className="gap-2 text-red-400 cursor-pointer focus:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove {role.role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Users className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No users found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery ? "No users match your search." : "Add users to manage blog access."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsAddUserOpen(true)} variant="outline" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add First User
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add User Role Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={(open) => {
        setIsAddUserOpen(open);
        if (!open) {
          setEmailInput("");
          setLookedUpUser(null);
          setLookupError(null);
        }
      }}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add User Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Look up a user by email and assign a role. The user must have an account first.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Email Lookup */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">User Email</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setLookedUpUser(null);
                      setLookupError(null);
                    }}
                    className="bg-slate-700 border-slate-600 pl-10"
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={async () => {
                    if (!emailInput.trim()) return;
                    setIsLookingUp(true);
                    setLookupError(null);
                    setLookedUpUser(null);
                    
                    try {
                      const { data: { session } } = await supabase.auth.getSession();
                      const response = await supabase.functions.invoke("lookup-user-by-email", {
                        body: { email: emailInput.trim() },
                      });
                      
                      if (response.error) {
                        setLookupError(response.error.message || "Failed to look up user");
                      } else if (response.data?.error) {
                        setLookupError(response.data.error);
                      } else {
                        setLookedUpUser(response.data as LookedUpUser);
                      }
                    } catch (err) {
                      setLookupError("Failed to look up user");
                    } finally {
                      setIsLookingUp(false);
                    }
                  }}
                  disabled={!emailInput.trim() || isLookingUp}
                >
                  {isLookingUp ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Lookup Result */}
              {lookupError && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {lookupError}
                </div>
              )}
              
              {lookedUpUser && (
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-green-400 font-medium">User found!</p>
                    <p className="text-xs text-slate-400 truncate">{lookedUpUser.email}</p>
                    <p className="text-xs text-slate-500 font-mono">{lookedUpUser.user_id.slice(0, 8)}...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="editor">Editor - Edit all posts</SelectItem>
                  <SelectItem value="author">Author - Own posts only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (lookedUpUser) {
                  addRoleMutation.mutate({ userId: lookedUpUser.user_id, role: newRole });
                }
              }}
              disabled={!lookedUpUser || addRoleMutation.isPending}
            >
              {addRoleMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Add Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Role to Existing User Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new role to {selectedUser?.profile?.display_name || "this user"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {selectedUser && availableRolesForUser(selectedUser).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedUser) {
                  addRoleMutation.mutate({ userId: selectedUser.user_id, role: newRole });
                }
              }}
              disabled={addRoleMutation.isPending}
            >
              {addRoleMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Add Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={isCreateUserOpen} onOpenChange={(open) => {
        setIsCreateUserOpen(open);
        if (!open) {
          setCreateForm({ email: "", password: "", username: "", displayName: "", role: "author" });
          setCreateError(null);
        }
      }}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Create New User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new user account with a role assigned.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {createError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {createError}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Username</label>
                <Input
                  type="text"
                  placeholder="johndoe"
                  value={createForm.username}
                  onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Display Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={createForm.displayName}
                onChange={(e) => setCreateForm({ ...createForm, displayName: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
              <p className="text-xs text-slate-500">Minimum 8 characters</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <Select value={createForm.role} onValueChange={(v) => setCreateForm({ ...createForm, role: v as AppRole })}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="editor">Editor - Edit all posts</SelectItem>
                  <SelectItem value="author">Author - Own posts only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => createUserMutation.mutate(createForm)}
              disabled={
                createUserMutation.isPending || 
                !createForm.email || 
                !createForm.password || 
                !createForm.username || 
                !createForm.displayName
              }
            >
              {createUserMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogUsers;
