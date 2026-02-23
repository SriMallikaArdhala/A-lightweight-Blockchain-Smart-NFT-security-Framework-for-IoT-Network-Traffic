import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission, Permission } from '@/lib/rbac';
import { Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
}

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-mono text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
        <Card className="max-w-md bg-card/80 backdrop-blur-sm border-destructive/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-destructive/10 border border-destructive/30">
                <Lock className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-xl font-mono text-destructive">ACCESS DENIED</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground font-mono">
              Your current role does not have permission to access this resource.
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Required permission: {requiredPermission}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

interface RoleGateProps {
  children: ReactNode;
  permission: Permission;
  fallback?: ReactNode;
}

export const RoleGate = ({ children, permission, fallback }: RoleGateProps) => {
  const { role } = useAuth();

  if (!hasPermission(role, permission)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};
