import { Shield, Lock, Database, Activity, Settings } from "lucide-react";
import { RoleIndicator } from "./RoleIndicator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hasPermission } from "@/lib/rbac";

export function Header() {
  const { user, role } = useAuth();
  const canManageUsers = hasPermission(role, 'manage_users');

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                LIBLO Security Framework
              </h1>
              <p className="text-xs text-muted-foreground">
                Lightweight Blockchain & Smart NFT Based Network Traffic Security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <StatusIndicator
                icon={<Lock className="h-4 w-4" />}
                label="ChaCha20"
                status="active"
              />
              <StatusIndicator
                icon={<Database className="h-4 w-4" />}
                label="Ed-DSA"
                status="active"
              />
              <StatusIndicator
                icon={<Activity className="h-4 w-4" />}
                label="Blockchain"
                status="synced"
              />
            </div>
            
            {user ? (
              <RoleIndicator />
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="font-mono">
                  Sign In
                </Button>
              </Link>
            )}
            
            {/* Admin Link for admins */}
            {canManageUsers && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="font-mono">
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusIndicator({
  icon,
  label,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
      <span className="text-primary">{icon}</span>
      <div className="text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-success font-mono uppercase text-[10px]">{status}</p>
      </div>
    </div>
  );
}
