import { recentBlocks } from "@/lib/mockData";
import { CheckCircle, Link, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlockchainLedger() {
  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Blockchain Blocks
        </h3>
        <span className="text-xs font-mono text-primary">LIVE</span>
      </div>

      <div className="space-y-3">
        {recentBlocks.map((block, index) => (
          <div
            key={block.index}
            className={cn(
              "relative pl-6 pb-4",
              index !== recentBlocks.length - 1 && "border-l border-border"
            )}
          >
            {/* Connection dot */}
            <div
              className={cn(
                "absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full border-2",
                block.signatureValid
                  ? "bg-success border-success"
                  : "bg-destructive border-destructive"
              )}
            />

            <div className="cyber-card p-3 ml-2 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-primary">
                  Block #{block.index.toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  {block.signatureValid ? (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs text-destructive">Invalid</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-0.5">Hash</p>
                  <p className="font-mono text-foreground/80 truncate">
                    {block.hash}...
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Previous</p>
                  <p className="font-mono text-foreground/80 truncate flex items-center gap-1">
                    <Link className="h-3 w-3 text-primary" />
                    {block.previousHash}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(block.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
