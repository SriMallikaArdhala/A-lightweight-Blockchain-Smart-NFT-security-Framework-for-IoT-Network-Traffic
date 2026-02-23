import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useThreatAlerts, severityConfig, ThreatSeverity } from '@/hooks/useThreatDetection';
import { AlertTriangle, CheckCircle, Trash2, Shield, Clock } from 'lucide-react';
import { format } from 'date-fns';

const severityOrder: Record<ThreatSeverity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const ThreatAlertPanel = () => {
  const { alerts, acknowledgeAlert, clearAlerts, unacknowledgedCount } = useThreatAlerts();
  const [filter, setFilter] = useState<ThreatSeverity | 'all'>('all');

  const filtered = alerts
    .filter(a => filter === 'all' || a.severity === filter)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.timestamp.getTime() - a.timestamp.getTime());

  const severityCounts = alerts.reduce((acc, a) => {
    acc[a.severity] = (acc[a.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            THREAT ALERTS
            {unacknowledgedCount > 0 && (
              <Badge variant="destructive" className="text-[10px] font-mono ml-1">
                {unacknowledgedCount} NEW
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
                  filter === s
                    ? 'bg-primary/20 border-primary/50 text-primary'
                    : 'bg-transparent border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {s.toUpperCase()}
                {s !== 'all' && severityCounts[s] ? ` (${severityCounts[s]})` : ''}
              </button>
            ))}
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={clearAlerts} title="Clear all">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-2">
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8 font-mono">
                No threat alerts detected.
              </p>
            ) : (
              filtered.map(alert => {
                const config = severityConfig[alert.severity];
                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border transition-all ${
                      alert.acknowledged
                        ? 'border-border/50 bg-background/20 opacity-60'
                        : `${config.className} animate-in fade-in-0 slide-in-from-top-1`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm">{config.icon}</span>
                        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 ${config.color}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-mono font-bold text-foreground truncate">
                          {alert.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {format(alert.timestamp, 'HH:mm:ss')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1 font-mono text-[11px]">
                      <div className="flex gap-4">
                        <span className="text-muted-foreground">Source:</span>
                        <span className="text-foreground">{alert.sourceIP}</span>
                        <span className="text-muted-foreground ml-auto">Port:</span>
                        <span className="text-foreground">{alert.targetPort}</span>
                      </div>
                      <div className="pt-1 border-t border-border/50">
                        <span className="text-muted-foreground">Recommendation: </span>
                        <span className="text-foreground">{alert.recommendation}</span>
                      </div>
                    </div>

                    {!alert.acknowledged && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 h-6 text-[10px] font-mono gap-1"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        <CheckCircle className="h-3 w-3" />
                        Acknowledge
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
