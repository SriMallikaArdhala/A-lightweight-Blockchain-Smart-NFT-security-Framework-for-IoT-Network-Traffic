import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { SecurityStatus } from "@/components/dashboard/SecurityStatus";
import { AttackDistribution } from "@/components/dashboard/AttackDistribution";
import { ProtocolDistribution, ConnectionStateChart } from "@/components/dashboard/ProtocolChart";
import {
  EncryptionTimeChart,
  CompressionComparisonChart,
  NetworkPerformanceChart,
} from "@/components/dashboard/PerformanceCharts";
import { BlockchainLedger } from "@/components/dashboard/BlockchainLedger";
import { SmartNFTManager, UserRolesTable } from "@/components/dashboard/SmartNFTManager";
import { DynamicStats } from "@/components/dashboard/DynamicStats";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { ThreatAlertPanel } from "@/components/dashboard/ThreatAlertPanel";
import { RoleGate } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RestrictedSection = ({ title }: { title: string }) => (
  <Card className="bg-card/30 border-border/50">
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-mono flex items-center gap-2 text-muted-foreground">
        <Lock className="h-4 w-4" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground font-mono text-center py-8">
        Requires elevated permissions to view
      </p>
    </CardContent>
  </Card>
);

const Index = () => {
  const { user, role } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <WelcomeHero />
            <DynamicStats />
            <section className="grid lg:grid-cols-3 gap-4">
              <RoleGate
                permission="view_security_status"
                fallback={<RestrictedSection title="Security Status" />}
              >
                <SecurityStatus />
              </RoleGate>
              <div className="lg:col-span-2">
                <RoleGate
                  permission="view_attack_distribution"
                  fallback={<RestrictedSection title="Attack Distribution" />}
                >
                  <AttackDistribution />
                </RoleGate>
              </div>
            </section>
          </div>
        );

      case "stats":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">System Statistics</h2>
            <DynamicStats />
            <section className="grid md:grid-cols-2 gap-4">
              <ProtocolDistribution />
              <ConnectionStateChart />
            </section>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">Security Status</h2>
            <section className="grid lg:grid-cols-2 gap-4">
              <SecurityStatus />
              <RoleGate
                permission="view_attack_distribution"
                fallback={<RestrictedSection title="Attack Distribution" />}
              >
                <AttackDistribution />
              </RoleGate>
            </section>
            <RoleGate
              permission="view_security_status"
              fallback={<RestrictedSection title="Threat Alerts" />}
            >
              <ThreatAlertPanel />
            </RoleGate>
          </div>
        );

      case "attacks":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">Attack Analysis</h2>
            <AttackDistribution />
            <section className="grid md:grid-cols-2 gap-4">
              <ProtocolDistribution />
              <ConnectionStateChart />
            </section>
          </div>
        );

      case "feed":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">Live Activity Feed</h2>
            <section className="grid lg:grid-cols-2 gap-4">
              <LiveActivityFeed />
              <RoleGate
                permission="view_performance_charts"
                fallback={<RestrictedSection title="Network Performance" />}
              >
                <NetworkPerformanceChart />
              </RoleGate>
            </section>
          </div>
        );

      case "performance":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">
              Cryptographic Performance Analysis
            </h2>
            <div className="grid lg:grid-cols-3 gap-4">
              <EncryptionTimeChart />
              <CompressionComparisonChart />
              <NetworkPerformanceChart />
            </div>
          </div>
        );

      case "blockchain":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">Blockchain Ledger</h2>
            <BlockchainLedger />
          </div>
        );

      case "nfts":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">Smart NFT Manager</h2>
            <SmartNFTManager />
          </div>
        );

      case "admin":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-mono">User Management</h2>
            <UserRolesTable />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        <div className="scan-line absolute inset-0" />
      </div>

      <Header />

      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="flex-1 min-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="container mx-auto px-6 py-6 space-y-6 max-w-6xl">
            {renderSection()}

            {/* Footer */}
            <footer className="border-t border-border pt-6 pb-4 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="font-mono">
                    LIBLO Security Framework v1.0 | TON_IoT Dataset
                  </span>
                </div>
                <div className="font-mono text-center">
                  ChaCha20 • Ed-DSA • SHA-256 Blockchain • Smart NFTs • RBAC
                </div>
                <div className="font-mono">
                  © 2026 VVIT Information Technology
                  {role && <span className="ml-2">| Role: {role}</span>}
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
