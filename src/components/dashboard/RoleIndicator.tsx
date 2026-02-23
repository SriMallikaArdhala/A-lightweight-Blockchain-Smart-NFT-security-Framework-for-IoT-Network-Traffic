import { useAuth } from '@/hooks/useAuth';
import { getRoleLabel, getRoleColor } from '@/lib/rbac';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Shield, ChevronDown } from 'lucide-react';

export const RoleIndicator = () => {
  const { user, role, signOut } = useAuth();

  if (!user || !role) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">
                {user.email}
              </span>
              <Badge 
                variant="outline" 
                className={`text-[10px] px-1.5 py-0 font-mono ${getRoleColor(role)}`}
              >
                {getRoleLabel(role)}
              </Badge>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-mono text-xs text-muted-foreground">
          OPERATOR ACCOUNT
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <p className="text-sm font-mono truncate">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-primary" />
            <Badge 
              variant="outline" 
              className={`text-xs font-mono ${getRoleColor(role)}`}
            >
              {getRoleLabel(role)}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="text-destructive focus:text-destructive font-mono cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
