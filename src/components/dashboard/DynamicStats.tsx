import { useState, useEffect } from 'react';
import { overviewStats } from '@/lib/mockData';
import { Database, Lock, Link, Fingerprint, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedStatProps {
  title: string;
  baseValue: number;
  suffix?: string;
  subtitle: string;
  icon: React.ReactNode;
  variant?: 'default' | 'success';
  increment?: number;
  updateInterval?: number;
}

const AnimatedStat = ({
  title,
  baseValue,
  suffix = '',
  subtitle,
  icon,
  variant = 'default',
  increment = 0,
  updateInterval = 3000,
}: AnimatedStatProps) => {
  const [value, setValue] = useState(baseValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (increment === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setValue((prev) => prev + Math.floor(Math.random() * increment) + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [increment, updateInterval]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border p-4 transition-all duration-300',
        'bg-card/50 backdrop-blur-sm',
        variant === 'success'
          ? 'border-green-500/30 hover:border-green-500/50'
          : 'border-primary/20 hover:border-primary/40',
        isAnimating && 'ring-2 ring-primary/20'
      )}
    >
      {/* Glow effect */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-500',
          isAnimating && 'opacity-100',
          variant === 'success' ? 'bg-green-500/5' : 'bg-primary/5'
        )}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <div
            className={cn(
              'p-1.5 rounded transition-colors',
              variant === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-primary/10 text-primary'
            )}
          >
            {icon}
          </div>
        </div>

        <div className="space-y-1">
          <p
            className={cn(
              'text-2xl font-bold font-mono transition-all duration-300',
              isAnimating && 'scale-105',
              variant === 'success' ? 'text-green-400' : 'text-foreground'
            )}
          >
            {formatNumber(value)}
            {suffix}
          </p>
          <p className="text-xs text-muted-foreground font-mono">{subtitle}</p>
        </div>

        {/* Progress bar for animated stats */}
        {increment > 0 && (
          <div className="mt-3 h-1 bg-muted/30 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000',
                variant === 'success' ? 'bg-green-500/50' : 'bg-primary/50'
              )}
              style={{ width: `${Math.min((value / (baseValue * 1.5)) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const DynamicStats = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <AnimatedStat
        title="Total Records"
        baseValue={overviewStats.totalRecords}
        subtitle="TON_IoT Dataset"
        icon={<Database className="h-5 w-5" />}
      />
      <AnimatedStat
        title="Processed"
        baseValue={overviewStats.processedRecords}
        subtitle="After preprocessing"
        icon={<Activity className="h-5 w-5" />}
        variant="success"
        increment={5}
        updateInterval={2000}
      />
      <AnimatedStat
        title="Encrypted"
        baseValue={overviewStats.encryptedRecords}
        subtitle="ChaCha20 256-bit"
        icon={<Lock className="h-5 w-5" />}
        variant="success"
        increment={5}
        updateInterval={2000}
      />
      <AnimatedStat
        title="Blocks"
        baseValue={overviewStats.blockchainBlocks}
        subtitle="SHA-256 chain"
        icon={<Link className="h-5 w-5" />}
        increment={1}
        updateInterval={3000}
      />
      <AnimatedStat
        title="Smart NFTs"
        baseValue={overviewStats.smartNFTs}
        subtitle="With RBAC"
        icon={<Fingerprint className="h-5 w-5" />}
        increment={1}
        updateInterval={3000}
      />
      <AnimatedStat
        title="Integrity"
        baseValue={overviewStats.integrityVerified}
        suffix="%"
        subtitle="Ed-DSA verified"
        icon={<ShieldCheck className="h-5 w-5" />}
        variant="success"
      />
    </section>
  );
};
