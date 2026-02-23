import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Crown, ArrowLeft, RefreshCw, UserCog } from 'lucide-react';
import { hasPermission, getRoleLabel, getRoleColor, AppRole } from '@/lib/rbac';

interface UserWithRole {
  user_id: string;
  email: string;
  display_name: string | null;
  role: AppRole;
  created_at: string;
}

const Admin = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const canManageUsers = hasPermission(role, 'manage_users');
  const canManageRoles = hasPermission(role, 'manage_roles');

  useEffect(() => {
    if (!loading && (!user || !canManageUsers)) {
      navigate('/');
    }
  }, [user, role, loading, navigate, canManageUsers]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      // Fetch profiles with roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, display_name, created_at');

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const usersWithRoles: UserWithRole[] = profiles.map((profile) => {
        const userRole = roles.find((r) => r.user_id === profile.user_id);
        return {
          user_id: profile.user_id,
          email: profile.display_name || 'Unknown',
          display_name: profile.display_name,
          role: (userRole?.role as AppRole) || 'guest',
          created_at: profile.created_at,
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch users',
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (canManageUsers) {
      fetchUsers();
    }
  }, [canManageUsers]);

  const updateUserRole = async (userId: string, newRole: AppRole) => {
    if (!canManageRoles) {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: 'You do not have permission to change roles',
      });
      return;
    }

    // Prevent self-demotion from admin
    if (userId === user?.id && role === 'admin' && newRole !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Action Blocked',
        description: 'You cannot demote yourself from admin',
      });
      return;
    }

    setUpdatingRole(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.user_id === userId ? { ...u, role: newRole } : u))
      );

      // Log the activity
      await supabase.from('activity_logs').insert({
        user_id: user?.id,
        action: 'role_change',
        details: { target_user: userId, new_role: newRole },
      });

      toast({
        title: 'Role Updated',
        description: `User role changed to ${getRoleLabel(newRole)}`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update user role',
      });
    } finally {
      setUpdatingRole(null);
    }
  };

  const roleOptions: AppRole[] = ['admin', 'data_owner', 'authorized_user', 'auditor', 'guest'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-mono">Loading...</div>
      </div>
    );
  }

  if (!canManageUsers) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line absolute inset-0" />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="font-mono text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-mono tracking-tight">
                Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground font-mono">
                Manage users and roles
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={fetchUsers}
            disabled={loadingUsers}
            className="font-mono"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold font-mono">{users.length}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold font-mono">
                    {users.filter((u) => u.role === 'admin').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <UserCog className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold font-mono">
                    {users.filter((u) => u.role !== 'guest').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Active Roles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold font-mono">
                    {users.filter((u) => u.role === 'auditor').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Auditors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
            <CardDescription className="font-mono">
              View and manage user roles across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 font-mono text-muted-foreground">
                  Loading users...
                </span>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground font-mono">
                No users found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="font-mono">User</TableHead>
                    <TableHead className="font-mono">Current Role</TableHead>
                    <TableHead className="font-mono">Joined</TableHead>
                    <TableHead className="font-mono text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((userItem) => (
                    <TableRow key={userItem.user_id} className="border-border/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <span className="text-xs font-mono text-primary">
                              {(userItem.display_name || 'U')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-mono text-sm">
                              {userItem.display_name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {userItem.user_id.slice(0, 8)}...
                            </p>
                          </div>
                          {userItem.user_id === user?.id && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`font-mono ${getRoleColor(userItem.role)}`}>
                          {getRoleLabel(userItem.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {new Date(userItem.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {canManageRoles ? (
                          <Select
                            value={userItem.role}
                            onValueChange={(value) =>
                              updateUserRole(userItem.user_id, value as AppRole)
                            }
                            disabled={updatingRole === userItem.user_id}
                          >
                            <SelectTrigger className="w-40 font-mono text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions.map((roleOption) => (
                                <SelectItem
                                  key={roleOption}
                                  value={roleOption}
                                  className="font-mono text-xs"
                                >
                                  {getRoleLabel(roleOption)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-xs text-muted-foreground font-mono">
                            View only
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
