import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { encryptionPerformance, compressionComparison, networkPerformance } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="cyber-card p-3 border border-primary/30">
        <p className="text-xs font-mono text-muted-foreground mb-2">Round {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-mono" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(4)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function EncryptionTimeChart() {
  const data = encryptionPerformance.rounds.map((round, i) => ({
    round,
    "SIT + ECC": encryptionPerformance.sitEcc.encryption[i],
    "ChaCha20 + EdDSA": encryptionPerformance.chacha20EdDSA.encryption[i],
  }));

  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Encryption Time vs Rounds
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 30% 18%)" />
          <XAxis
            dataKey="round"
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
          />
          <YAxis
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
            label={{
              value: "Time (ms)",
              angle: -90,
              position: "insideLeft",
              fill: "hsl(220 20% 50%)",
              fontSize: 11,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", fontFamily: "JetBrains Mono" }}
          />
          <Line
            type="monotone"
            dataKey="SIT + ECC"
            stroke="#ff6b6b"
            strokeWidth={2}
            dot={{ fill: "#ff6b6b", strokeWidth: 0, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="ChaCha20 + EdDSA"
            stroke="#00ffff"
            strokeWidth={2}
            dot={{ fill: "#00ffff", strokeWidth: 0, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompressionComparisonChart() {
  const data = compressionComparison.rounds.map((round, i) => ({
    round,
    "No Compression": compressionComparison.noCompression.throughput[i],
    "With Compression": compressionComparison.withCompression.throughput[i],
  }));

  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Throughput Comparison (ops/sec)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 30% 18%)" />
          <XAxis
            dataKey="round"
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
          />
          <YAxis
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", fontFamily: "JetBrains Mono" }}
          />
          <Bar dataKey="No Compression" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="With Compression" fill="#00cc99" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NetworkPerformanceChart() {
  const data = networkPerformance.metrics.map((metric, i) => ({
    metric,
    "No Compression": networkPerformance.noCompression[i],
    "With Compression": networkPerformance.withCompression[i],
  }));

  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Network Performance (Normalized)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 30% 18%)" />
          <XAxis
            type="number"
            domain={[0, 1.2]}
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
          />
          <YAxis
            type="category"
            dataKey="metric"
            tick={{ fill: "hsl(220 20% 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(220 30% 18%)" }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", fontFamily: "JetBrains Mono" }}
          />
          <Bar dataKey="No Compression" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          <Bar dataKey="With Compression" fill="#10b981" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
