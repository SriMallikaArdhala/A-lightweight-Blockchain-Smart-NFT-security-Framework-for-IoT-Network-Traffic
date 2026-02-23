import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  Shield,
  Activity,
  Eye,
  LineChart,
  Link as LinkIcon,
  Fingerprint,
  Users,
  ArrowLeft,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    name: "Administrator",
    key: "admin",
    color: "text-red-400 bg-red-400/10 border-red-400/30",
    description:
      "Full system access including user management, role assignment, and all security features. Admins oversee the entire LIBLO framework.",
    permissions: [
      "All dashboard views",
      "User management & role assignment",
      "Decrypt access",
      "Transfer ownership",
      "Verify integrity",
      "Threat alert monitoring",
    ],
  },
  {
    name: "Data Owner",
    key: "data_owner",
    color: "text-primary bg-primary/10 border-primary/30",
    description:
      "Access to all monitoring views plus data decryption and integrity verification. Data Owners manage their IoT data assets and Smart NFT tokens.",
    permissions: [
      "All dashboard views",
      "Decrypt access",
      "Verify integrity",
      "Smart NFT management",
      "Threat alert monitoring",
    ],
  },
  {
    name: "Authorized User",
    key: "authorized_user",
    color: "text-green-400 bg-green-400/10 border-green-400/30",
    description:
      "Can view security analytics, performance charts, and blockchain records. Authorized Users participate in integrity verification workflows.",
    permissions: [
      "Statistics & performance charts",
      "Security status & attack analysis",
      "Blockchain ledger",
      "Verify integrity",
      "Threat alert monitoring",
    ],
  },
  {
    name: "Auditor",
    key: "auditor",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    description:
      "Read-only access to security status and blockchain records for compliance auditing. Auditors can verify data integrity but cannot modify configurations.",
    permissions: [
      "Statistics overview",
      "Security status",
      "Blockchain ledger",
      "Verify integrity",
      "Threat alert monitoring",
    ],
  },
  {
    name: "Guest",
    key: "guest",
    color: "text-muted-foreground bg-muted border-border",
    description:
      "Limited access to basic statistics and the dashboard overview. Guests cannot view security details, blockchain data, or manage any resources.",
    permissions: ["Dashboard overview", "Basic statistics"],
  },
];

const sections = [
  {
    name: "Overview",
    icon: <LayoutDashboard className="h-5 w-5" />,
    description:
      "The main landing view showing a welcome hero, dynamic system statistics, security status summary, and attack distribution chart. Provides a quick snapshot of the entire framework's health.",
    accessibleBy: ["admin", "data_owner", "authorized_user", "auditor", "guest"],
  },
  {
    name: "Statistics",
    icon: <BarChart3 className="h-5 w-5" />,
    description:
      "Detailed system statistics including real-time counters for encrypted packets, active connections, threats blocked, and blockchain transactions. Also shows protocol distribution and connection state charts based on TON_IoT dataset metrics.",
    accessibleBy: ["admin", "data_owner", "authorized_user", "auditor", "guest"],
  },
  {
    name: "Security Status",
    icon: <Shield className="h-5 w-5" />,
    description:
      "Comprehensive security posture view with encryption status indicators, attack distribution analysis, and the Threat Alerts Panel. Authorized users can filter, review, and acknowledge incoming threat alerts with severity levels, source IPs, and remediation recommendations.",
    accessibleBy: ["admin", "data_owner", "authorized_user", "auditor"],
  },
  {
    name: "Attack Analysis",
    icon: <Activity className="h-5 w-5" />,
    description:
      "Deep-dive into attack vectors detected by the framework, including DDoS, Backdoor, Injection, and other threat types from the TON_IoT dataset. Displays attack frequency charts alongside protocol and connection analytics.",
    accessibleBy: ["admin", "data_owner", "authorized_user"],
  },
  {
    name: "Live Feed",
    icon: <Eye className="h-5 w-5" />,
    description:
      "Real-time activity feed powered by live database subscriptions. Shows authentication events, security incidents, and system operations as they happen, paired with network performance metrics.",
    accessibleBy: ["admin", "data_owner", "authorized_user", "auditor"],
  },
  {
    name: "Performance",
    icon: <LineChart className="h-5 w-5" />,
    description:
      "Cryptographic performance analysis showing encryption time comparisons (ChaCha20 vs AES-256 vs RSA-2048), compression ratios across algorithms, and network throughput/latency metrics.",
    accessibleBy: ["admin", "data_owner", "authorized_user"],
  },
  {
    name: "Blockchain",
    icon: <LinkIcon className="h-5 w-5" />,
    description:
      "SHA-256 blockchain ledger view showing the immutable chain of security events. Each block displays its hash, previous hash, timestamp, and transaction data for full auditability.",
    accessibleBy: ["admin", "data_owner", "authorized_user", "auditor"],
  },
  {
    name: "Smart NFTs",
    icon: <Fingerprint className="h-5 w-5" />,
    description:
      "Smart NFT token management interface for IoT data ownership. Data Owners and Admins can view, mint, and manage NFT-based access tokens that represent data ownership rights within the framework.",
    accessibleBy: ["admin", "data_owner"],
  },
  {
    name: "User Management",
    icon: <Users className="h-5 w-5" />,
    description:
      "Administrative panel for managing user accounts and role assignments. Admins can view all registered users, promote or demote roles, and monitor system-wide user statistics.",
    accessibleBy: ["admin"],
  },
];

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold font-mono flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            LIBLO Security Framework — Documentation
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Role-Based Access Control (RBAC) dashboard for IoT security monitoring using the TON_IoT dataset.
          </p>
        </div>

        {/* ── Technology Stack ── */}
        <Card className="bg-card/30 border-border/50 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-mono">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3 text-xs font-mono text-muted-foreground">
            <div><span className="text-foreground">Encryption:</span> ChaCha20 stream cipher</div>
            <div><span className="text-foreground">Digital Signatures:</span> Ed-DSA</div>
            <div><span className="text-foreground">Blockchain:</span> SHA-256 hash chain</div>
            <div><span className="text-foreground">Access Control:</span> Smart NFT tokens + RBAC</div>
            <div><span className="text-foreground">Dataset:</span> TON_IoT (Telemetry of Networks)</div>
            <div><span className="text-foreground">Threat Detection:</span> Simulated DDoS, Backdoor, Injection</div>
          </CardContent>
        </Card>

        {/* ── User Roles ── */}
        <h2 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> User Roles & Permissions
        </h2>
        <div className="grid gap-4 mb-10">
          {roles.map((role) => (
            <Card key={role.key} className="bg-card/30 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-3">
                  <Badge variant="outline" className={cn("font-mono text-xs", role.color)}>
                    {role.name}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground font-mono">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-secondary/50 text-foreground border border-border"
                    >
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {perm}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8" />

        {/* ── Dashboard Views ── */}
        <h2 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-primary" /> Dashboard Views
        </h2>
        <div className="grid gap-4 mb-10">
          {sections.map((section) => (
            <Card key={section.name} className="bg-card/30 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-3">
                  <span className="text-primary">{section.icon}</span>
                  {section.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground font-mono">{section.description}</p>
                <div>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
                    Accessible by
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role) => {
                      const hasAccess = section.accessibleBy.includes(role.key);
                      return (
                        <span
                          key={role.key}
                          className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded border",
                            hasAccess
                              ? "bg-green-400/10 text-green-400 border-green-400/30"
                              : "bg-muted/30 text-muted-foreground/50 border-border/30 line-through"
                          )}
                        >
                          {hasAccess ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {role.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Access Matrix ── */}
        <h2 className="text-lg font-bold font-mono mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" /> Access Control Matrix
        </h2>
        <Card className="bg-card/30 border-border/50 mb-10 overflow-x-auto">
          <CardContent className="p-0">
            <table className="w-full text-[10px] font-mono">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground">View</th>
                  {roles.map((r) => (
                    <th key={r.key} className="p-3 text-center text-muted-foreground whitespace-nowrap">
                      {r.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr key={section.name} className="border-b border-border/50 hover:bg-secondary/20">
                    <td className="p-3 text-foreground whitespace-nowrap">{section.name}</td>
                    {roles.map((role) => (
                      <td key={role.key} className="p-3 text-center">
                        {section.accessibleBy.includes(role.key) ? (
                          <CheckCircle className="h-4 w-4 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <footer className="border-t border-border pt-6 pb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <ShieldCheck className="h-4 w-4 text-primary" />
            LIBLO Security Framework v1.0 — VVIT Information Technology © 2026
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Documentation;
