import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { protocolDistribution, connectionStates } from "@/lib/mockData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="cyber-card p-3 border border-primary/30">
        <p className="text-sm font-medium" style={{ color: data.color || payload[0].color }}>
          {data.name || data.state}
        </p>
        <p className="text-xs font-mono text-muted-foreground">
          {(data.value || data.count).toLocaleString()} records
        </p>
        {data.desc && (
          <p className="text-xs text-muted-foreground mt-1">{data.desc}</p>
        )}
      </div>
    );
  }
  return null;
};

export function ProtocolDistribution() {
  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Protocol Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={protocolDistribution}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {protocolDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs font-mono text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConnectionStateChart() {
  const COLORS = ["#00ffff", "#00cc99", "#0099cc", "#6366f1", "#f59e0b", "#ef4444"];

  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Connection States
      </h3>
      <div className="space-y-2">
        {connectionStates.map((state, index) => {
          const total = connectionStates.reduce((sum, s) => sum + s.count, 0);
          const percentage = ((state.count / total) * 100).toFixed(1);

          return (
            <div key={state.state} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="font-mono font-medium">{state.state}</span>
                  <span className="text-muted-foreground">({state.desc})</span>
                </div>
                <span className="font-mono text-muted-foreground">{percentage}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[index],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
