import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Shield, Lock, Link, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityLog {
  id: string;
  action: string;
  details: Record<string, unknown> | null;
  created_at: string;
}

const actionIcons: Record<string, React.ReactNode> = {
  block_created: <Link className="h-4 w-4 text-primary" />,
  encryption: <Lock className="h-4 w-4 text-green-400" />,
  attack_detected: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
  verification: <CheckCircle className="h-4 w-4 text-green-400" />,
  access_granted: <Shield className="h-4 w-4 text-primary" />,
  default: <Activity className="h-4 w-4 text-muted-foreground" />,
};

const actionColors: Record<string, string> = {
  block_created: 'bg-primary/10 text-primary border-primary/30',
  encryption: 'bg-green-400/10 text-green-400 border-green-400/30',
  attack_detected: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  verification: 'bg-green-400/10 text-green-400 border-green-400/30',
  access_granted: 'bg-primary/10 text-primary border-primary/30',
};

// Simulated real-time activity generator
const generateActivity = (): Omit<ActivityLog, 'id'> => {
  const actions = [
    { action: 'block_created', details: { block_index: Math.floor(Math.random() * 100000 + 174664), hash: Math.random().toString(36).substring(2, 10) } },
    { action: 'encryption', details: { algorithm: 'ChaCha20', records: Math.floor(Math.random() * 100 + 1) } },
    { action: 'attack_detected', details: { type: ['backdoor', 'ddos', 'injection', 'xss'][Math.floor(Math.random() * 4)], blocked: true } },
    { action: 'verification', details: { signature: 'Ed-DSA', valid: true } },
    { action: 'access_granted', details: { role: ['admin', 'data_owner', 'authorized_user'][Math.floor(Math.random() * 3)] } },
  ];
  const selected = actions[Math.floor(Math.random() * actions.length)];
  return {
    ...selected,
    created_at: new Date().toISOString(),
  };
};

export const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time activity
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities((prev) => [
        { id: crypto.randomUUID(), ...newActivity },
        ...prev.slice(0, 19), // Keep only last 20
      ]);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Subscribe to real database changes
  useEffect(() => {
    const channel = supabase
      .channel('activity-logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs' },
        (payload) => {
          const newLog = payload.new as ActivityLog;
          setActivities((prev) => [newLog, ...prev.slice(0, 19)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            LIVE ACTIVITY FEED
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-muted'}`} />
            <button
              onClick={() => setIsLive(!isLive)}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {isLive ? 'LIVE' : 'PAUSED'}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8 font-mono">
                Waiting for activity...
              </p>
            ) : (
              activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border bg-background/30 transition-all duration-500 ${
                    index === 0 ? 'animate-pulse border-primary/50' : 'border-border'
                  }`}
                >
                  <div className="mt-0.5">
                    {actionIcons[activity.action] || actionIcons.default}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono ${actionColors[activity.action] || ''}`}
                      >
                        {activity.action.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {format(new Date(activity.created_at), 'HH:mm:ss')}
                      </span>
                    </div>
                    {activity.details && (
                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {Object.entries(activity.details)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' | ')}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
