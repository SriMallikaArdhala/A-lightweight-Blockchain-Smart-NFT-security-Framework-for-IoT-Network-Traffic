import { Shield, Lock, Link, Fingerprint, Users } from "lucide-react";
import { securityMetrics } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const iconMap = {
  confidentiality: Lock,
  integrity: Fingerprint,
  immutability: Link,
  ownership: Shield,
  accessControl: Users,
};

const labelMap = {
  confidentiality: "Confidentiality",
  integrity: "Integrity",
  immutability: "Immutability",
  ownership: "Ownership",
  accessControl: "Access Control",
};

export function SecurityStatus() {
  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Security Guarantees
      </h3>
      <div className="space-y-3">
        {(Object.keys(securityMetrics) as Array<keyof typeof securityMetrics>).map(
          (key) => {
            const metric = securityMetrics[key];
            const Icon = iconMap[key];
            const isSecure =
              metric.status === "secure" ||
              metric.status === "verified" ||
              metric.status === "intact" ||
              metric.status === "tracked" ||
              metric.status === "enforced";

            return (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded",
                      isSecure ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                <div>
                    <p className="text-sm font-medium">{labelMap[key]}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {"algorithm" in metric ? metric.algorithm : metric.mechanism}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium uppercase tracking-wider",
                    isSecure
                      ? "bg-success/10 text-success border border-success/20"
                      : "bg-warning/10 text-warning border border-warning/20"
                  )}
                >
                  {metric.status}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
