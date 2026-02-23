import { useAuth } from '@/hooks/useAuth';
import { hasPermission, getRoleLabel, getRoleColor, Permission, AppRole } from '@/lib/rbac';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Shield,
  Activity,
  Database,
  Lock,
  Fingerprint,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Link as LinkIcon,
  Eye,
  LineChart,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  section: string;
  permission?: Permission;
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" />, section: 'overview' },
  { label: 'Statistics', icon: <BarChart3 className="h-4 w-4" />, section: 'stats', permission: 'view_stats' },
  { label: 'Security Status', icon: <Shield className="h-4 w-4" />, section: 'security', permission: 'view_security_status' },
  { label: 'Attack Analysis', icon: <Activity className="h-4 w-4" />, section: 'attacks', permission: 'view_attack_distribution' },
  { label: 'Live Feed', icon: <Eye className="h-4 w-4" />, section: 'feed', permission: 'view_security_status' },
  { label: 'Performance', icon: <LineChart className="h-4 w-4" />, section: 'performance', permission: 'view_performance_charts' },
  { label: 'Blockchain', icon: <LinkIcon className="h-4 w-4" />, section: 'blockchain', permission: 'view_blockchain' },
  { label: 'Smart NFTs', icon: <Fingerprint className="h-4 w-4" />, section: 'nfts', permission: 'view_nft_manager' },
  { label: 'User Management', icon: <Users className="h-4 w-4" />, section: 'admin', permission: 'manage_users' },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const { user, role, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = navItems.filter(
    (item) => !item.permission || hasPermission(role, item.permission)
  );

  return (
    <aside
      className={cn(
        'h-[calc(100vh-65px)] sticky top-[65px] border-r border-border bg-card/30 backdrop-blur-sm transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Collapse toggle */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Role badge */}
      {user && role && !collapsed && (
        <div className="px-4 pb-4">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">
              Access Level
            </p>
            <Badge
              variant="outline"
              className={cn('font-mono text-xs', getRoleColor(role))}
            >
              {getRoleLabel(role)}
            </Badge>
            <p className="text-[10px] text-muted-foreground font-mono mt-2 truncate">
              {user.email}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2">
        <nav className="space-y-1">
          {filteredItems.map((item) => (
            <button
              key={item.section}
              onClick={() => onSectionChange(item.section)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-200',
                activeSection === item.section
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </ScrollArea>

      {/* Sign out */}
      {user && (
        <div className="p-2 border-t border-border">
          <button
            onClick={signOut}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-destructive hover:bg-destructive/10 transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      )}
    </aside>
  );
};
