// Role-Based Access Control Configuration

export type AppRole = 'admin' | 'data_owner' | 'authorized_user' | 'auditor' | 'guest';

export type Permission = 
  | 'view_dashboard'
  | 'view_stats'
  | 'view_security_status'
  | 'view_attack_distribution'
  | 'view_blockchain'
  | 'view_nft_manager'
  | 'view_performance_charts'
  | 'manage_users'
  | 'manage_roles'
  | 'decrypt_access'
  | 'transfer_ownership'
  | 'verify_integrity'
  | 'view_metadata';

// Role hierarchy and permissions
export const rolePermissions: Record<AppRole, Permission[]> = {
  admin: [
    'view_dashboard',
    'view_stats',
    'view_security_status',
    'view_attack_distribution',
    'view_blockchain',
    'view_nft_manager',
    'view_performance_charts',
    'manage_users',
    'manage_roles',
    'decrypt_access',
    'transfer_ownership',
    'verify_integrity',
    'view_metadata',
  ],
  data_owner: [
    'view_dashboard',
    'view_stats',
    'view_security_status',
    'view_attack_distribution',
    'view_blockchain',
    'view_nft_manager',
    'view_performance_charts',
    'decrypt_access',
    'verify_integrity',
    'view_metadata',
  ],
  authorized_user: [
    'view_dashboard',
    'view_stats',
    'view_security_status',
    'view_attack_distribution',
    'view_blockchain',
    'view_performance_charts',
    'verify_integrity',
    'view_metadata',
  ],
  auditor: [
    'view_dashboard',
    'view_stats',
    'view_security_status',
    'view_blockchain',
    'verify_integrity',
    'view_metadata',
  ],
  guest: [
    'view_dashboard',
    'view_stats',
  ],
};

export const hasPermission = (role: AppRole | null, permission: Permission): boolean => {
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) ?? false;
};

export const getRoleLabel = (role: AppRole): string => {
  const labels: Record<AppRole, string> = {
    admin: 'Administrator',
    data_owner: 'Data Owner',
    authorized_user: 'Authorized User',
    auditor: 'Auditor',
    guest: 'Guest',
  };
  return labels[role];
};

export const getRoleColor = (role: AppRole): string => {
  const colors: Record<AppRole, string> = {
    admin: 'text-red-400 bg-red-400/10 border-red-400/30',
    data_owner: 'text-primary bg-primary/10 border-primary/30',
    authorized_user: 'text-green-400 bg-green-400/10 border-green-400/30',
    auditor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    guest: 'text-muted-foreground bg-muted border-border',
  };
  return colors[role];
};
