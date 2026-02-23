import { useAuth } from '@/hooks/useAuth';
import { getRoleLabel, getRoleColor, rolePermissions, AppRole } from '@/lib/rbac';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  BarChart3,
  Activity,
  Fingerprint,
  Users,
  Eye,
  Database,
  Link as LinkIcon,
  LineChart,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roleDescriptions: Record<AppRole, string> = {
  admin: 'Full system access. Manage users, roles, security protocols, and all dashboard modules.',
  data_owner: 'Manage encrypted data, verify integrity, and control Smart NFT ownership.',
  authorized_user: 'View security analytics, attack distributions, and verify data integrity.',
  auditor: 'Audit security status, blockchain records, and verify system integrity.',
  guest: 'View basic system statistics and overview metrics.',
};

const roleFeatures: Record<AppRole, { icon: React.ReactNode; label: string }[]> = {
  admin: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'All Statistics' },
    { icon: <Shield className="h-4 w-4" />, label: 'Security Status' },
    { icon: <Activity className="h-4 w-4" />, label: 'Attack Analysis' },
    { icon: <LinkIcon className="h-4 w-4" />, label: 'Blockchain Ledger' },
    { icon: <Fingerprint className="h-4 w-4" />, label: 'Smart NFTs' },
    { icon: <Users className="h-4 w-4" />, label: 'User Management' },
    { icon: <LineChart className="h-4 w-4" />, label: 'Performance Charts' },
    { icon: <Lock className="h-4 w-4" />, label: 'Decrypt Access' },
  ],
  data_owner: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'All Statistics' },
    { icon: <Shield className="h-4 w-4" />, label: 'Security Status' },
    { icon: <Activity className="h-4 w-4" />, label: 'Attack Analysis' },
    { icon: <LinkIcon className="h-4 w-4" />, label: 'Blockchain Ledger' },
    { icon: <Fingerprint className="h-4 w-4" />, label: 'Smart NFTs' },
    { icon: <Lock className="h-4 w-4" />, label: 'Decrypt Access' },
  ],
  authorized_user: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Statistics' },
    { icon: <Shield className="h-4 w-4" />, label: 'Security Status' },
    { icon: <Activity className="h-4 w-4" />, label: 'Attack Analysis' },
    { icon: <LinkIcon className="h-4 w-4" />, label: 'Blockchain Ledger' },
    { icon: <LineChart className="h-4 w-4" />, label: 'Performance Charts' },
  ],
  auditor: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Statistics' },
    { icon: <Shield className="h-4 w-4" />, label: 'Security Status' },
    { icon: <LinkIcon className="h-4 w-4" />, label: 'Blockchain Ledger' },
    { icon: <Eye className="h-4 w-4" />, label: 'Integrity Verification' },
  ],
  guest: [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Overview Stats' },
    { icon: <Database className="h-4 w-4" />, label: 'Basic Metrics' },
  ],
};

export const WelcomeHero = () => {
  const { user, role } = useAuth();

  if (!user || !role) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h2 className="text-2xl font-bold font-mono mb-2">
            LIBLO Security Framework
          </h2>
          <p className="text-muted-foreground font-mono text-sm max-w-xl mb-6">
            Lightweight Blockchain & Smart NFT Based Network Traffic Security for IoT.
            Sign in to access role-specific dashboard modules.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(['admin', 'data_owner', 'authorized_user', 'auditor', 'guest'] as AppRole[]).map(
              (r) => (
                <div
                  key={r}
                  className="p-3 rounded-lg border border-border bg-card/50 text-center"
                >
                  <Badge variant="outline" className={cn('text-[10px] font-mono mb-1', getRoleColor(r))}>
                    {getRoleLabel(r)}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {rolePermissions[r].length} permissions
                  </p>
                </div>
              )
            )}
          </div>
          <Link to="/auth">
            <Button className="mt-6 font-mono">
              Sign In to Access <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Welcome back
            </p>
            <h2 className="text-xl font-bold font-mono">
              {user.email?.split('@')[0]}
            </h2>
          </div>
          <Badge variant="outline" className={cn('font-mono text-sm px-3 py-1', getRoleColor(role))}>
            {getRoleLabel(role)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground font-mono mb-4">
          {roleDescriptions[role]}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {roleFeatures[role].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 border border-border/50"
            >
              <div className="text-primary">{feature.icon}</div>
              <span className="text-xs font-mono text-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
