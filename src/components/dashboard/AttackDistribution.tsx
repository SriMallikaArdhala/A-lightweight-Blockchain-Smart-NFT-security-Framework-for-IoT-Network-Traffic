import { attackDistribution } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  backdoor: "bg-destructive",
  ddos: "bg-warning",
  injection: "bg-orange-500",
  xss: "bg-yellow-500",
  password: "bg-purple-500",
  scanning: "bg-primary",
  mitm: "bg-accent",
};

export function AttackDistribution() {
  const maxCount = Math.max(...attackDistribution.map((a) => a.count));

  return (
    <div className="cyber-card p-5 h-full">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Attack Type Distribution
      </h3>
      <div className="space-y-3">
        {attackDistribution.map((attack) => (
          <div key={attack.type} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-mono uppercase text-xs tracking-wider">
                {attack.type}
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                {attack.count.toLocaleString()} ({attack.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  colorMap[attack.type] || "bg-primary"
                )}
                style={{ width: `${(attack.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
