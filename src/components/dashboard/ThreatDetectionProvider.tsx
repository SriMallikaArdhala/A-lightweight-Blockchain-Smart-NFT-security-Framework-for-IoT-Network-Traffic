import { ReactNode } from 'react';
import { ThreatDetectionProvider as ThreatProvider } from '@/hooks/useThreatDetection';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission } from '@/lib/rbac';

interface ThreatDetectionProviderProps {
  children: ReactNode;
}

export const ThreatDetectionProvider = ({ children }: ThreatDetectionProviderProps) => {
  const { role } = useAuth();
  const canViewSecurityStatus = hasPermission(role, 'view_security_status');

  return (
    <ThreatProvider enabled={canViewSecurityStatus} interval={20000}>
      {children}
    </ThreatProvider>
  );
};
