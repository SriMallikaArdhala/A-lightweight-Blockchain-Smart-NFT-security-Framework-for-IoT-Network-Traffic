import { useEffect, useCallback, useState, createContext, useContext, ReactNode } from 'react';
import { attackDistribution } from '@/lib/mockData';

export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface ThreatAlert {
  id: string;
  type: string;
  severity: ThreatSeverity;
  message: string;
  recommendation: string;
  timestamp: Date;
  sourceIP?: string;
  targetPort?: number;
  acknowledged?: boolean;
}

export const severityConfig: Record<ThreatSeverity, { 
  variant: 'default' | 'destructive';
  className: string;
  icon: string;
  color: string;
}> = {
  critical: { 
    variant: 'destructive', 
    className: 'border-red-500 bg-red-950/90',
    icon: '🚨',
    color: 'text-red-400',
  },
  high: { 
    variant: 'destructive', 
    className: 'border-orange-500 bg-orange-950/90',
    icon: '⚠️',
    color: 'text-orange-400',
  },
  medium: { 
    variant: 'default', 
    className: 'border-yellow-500 bg-yellow-950/90',
    icon: '⚡',
    color: 'text-yellow-400',
  },
  low: { 
    variant: 'default', 
    className: 'border-blue-500 bg-blue-950/90',
    icon: 'ℹ️',
    color: 'text-blue-400',
  },
};

const threatRecommendations: Record<string, { severity: ThreatSeverity; recommendation: string }> = {
  backdoor: {
    severity: 'critical',
    recommendation: 'Immediately isolate affected systems. Scan for persistence mechanisms. Reset all credentials.',
  },
  ddos: {
    severity: 'high',
    recommendation: 'Enable rate limiting. Activate DDoS mitigation. Scale infrastructure if needed.',
  },
  injection: {
    severity: 'critical',
    recommendation: 'Validate and sanitize all inputs. Review database access logs. Patch vulnerable endpoints.',
  },
  xss: {
    severity: 'high',
    recommendation: 'Enable CSP headers. Sanitize user input. Review frontend security policies.',
  },
  password: {
    severity: 'medium',
    recommendation: 'Enable MFA for affected accounts. Force password reset. Monitor for lateral movement.',
  },
  scanning: {
    severity: 'low',
    recommendation: 'Monitor source IP. Update firewall rules if persistent. Log for threat intelligence.',
  },
  mitm: {
    severity: 'critical',
    recommendation: 'Verify SSL/TLS certificates. Enable HSTS. Check for ARP spoofing on network.',
  },
};

const generateRandomIP = () =>
  `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const generateRandomPort = () => {
  const commonPorts = [22, 80, 443, 3306, 5432, 8080, 8443, 27017];
  return commonPorts[Math.floor(Math.random() * commonPorts.length)];
};

interface ThreatContextType {
  alerts: ThreatAlert[];
  acknowledgeAlert: (id: string) => void;
  clearAlerts: () => void;
  unacknowledgedCount: number;
}

const ThreatContext = createContext<ThreatContextType>({
  alerts: [],
  acknowledgeAlert: () => {},
  clearAlerts: () => {},
  unacknowledgedCount: 0,
});

export const useThreatAlerts = () => useContext(ThreatContext);

export const ThreatDetectionProvider = ({
  children,
  enabled = true,
  interval = 20000,
}: {
  children: ReactNode;
  enabled?: boolean;
  interval?: number;
}) => {
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);

  const generateThreat = useCallback((): ThreatAlert => {
    const attackTypes = attackDistribution.map(a => a.type);
    const type = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    const config = threatRecommendations[type] || { severity: 'medium', recommendation: 'Investigate and monitor.' };

    return {
      id: `threat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity: config.severity,
      message: `${type.toUpperCase()} attack detected`,
      recommendation: config.recommendation,
      timestamp: new Date(),
      sourceIP: generateRandomIP(),
      targetPort: generateRandomPort(),
      acknowledged: false,
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const initialTimeout = setTimeout(() => {
      setAlerts(prev => [generateThreat(), ...prev].slice(0, 50));
    }, 5000);

    const intervalId = setInterval(() => {
      if (Math.random() < 0.4) {
        setAlerts(prev => [generateThreat(), ...prev].slice(0, 50));
      }
    }, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [enabled, interval, generateThreat]);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <ThreatContext.Provider value={{ alerts, acknowledgeAlert, clearAlerts, unacknowledgedCount }}>
      {children}
    </ThreatContext.Provider>
  );
};
