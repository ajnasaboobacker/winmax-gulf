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
  Eye
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
  avatar_url: string | null;
  bio: string | null;
}

interface UserWithRoles {
  user_id: string;
  profile: Profile | null;
  roles: UserRole[];
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
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<AppRole>("author");

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
      setNewUserId("");
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

  const filteredUsers = usersWithRoles?.filter(user => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      user.profile?.display_name?.toLowerCase().includes(search) ||
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
        <Button onClick={() => setIsAddUserOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User Role
        </Button>
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
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add User Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter the user ID and select a role to assign. Users must have an account first.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">User ID</label>
              <Input
                placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                className="bg-slate-700 border-slate-600 font-mono text-sm"
              />
              <p className="text-xs text-slate-500">
                The user's UUID from the authentication system.
              </p>
            </div>
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
              onClick={() => addRoleMutation.mutate({ userId: newUserId, role: newRole })}
              disabled={!newUserId.trim() || addRoleMutation.isPending}
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
    </div>
  );
};

export default BlogUsers;
