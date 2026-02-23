import { smartNFTs, systemUsers } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, User, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const roleColors: Record<string, string> = {
  Admin: "bg-primary/20 text-primary border-primary/30",
  DataOwner: "bg-success/20 text-success border-success/30",
  AuthorizedUser: "bg-accent/20 text-accent border-accent/30",
  Auditor: "bg-warning/20 text-warning border-warning/30",
  Unauthorized: "bg-destructive/20 text-destructive border-destructive/30",
};

export function SmartNFTManager() {
  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Smart NFT Registry
        </h3>
        <Badge variant="outline" className="font-mono text-xs">
          {smartNFTs.length.toLocaleString()} NFTs
        </Badge>
      </div>

      <div className="space-y-4">
        {smartNFTs.map((nft) => (
          <div
            key={nft.nftId}
            className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-primary/10">
                  <Fingerprint className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">NFT ID</p>
                  <p className="font-mono text-sm">{nft.nftId.slice(0, 18)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(nft.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
              <div>
                <p className="text-muted-foreground mb-1">Owner</p>
                <p className="font-mono flex items-center gap-1">
                  <User className="h-3 w-3 text-success" />
                  {nft.owner}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Created By</p>
                <p className="font-mono flex items-center gap-1">
                  <Shield className="h-3 w-3 text-primary" />
                  {nft.createdBy}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Data Hash</p>
                <p className="font-mono truncate">{nft.encryptedDataHash}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Block Hash</p>
                <p className="font-mono truncate">{nft.blockHash}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Access Permissions</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(nft.permissions).map(([userId, perms]) => (
                  <div
                    key={userId}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-mono border",
                      roleColors[
                        systemUsers.find((u) => u.id === userId)?.role || "Unauthorized"
                      ]
                    )}
                  >
                    {userId}: {Array.isArray(perms) ? perms.length : 0} perms
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserRolesTable() {
  return (
    <div className="cyber-card p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        System Users & Roles
      </h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {systemUsers.map((user) => (
            <tr key={user.id}>
              <td className="font-mono">{user.id}</td>
              <td>
                <Badge
                  variant="outline"
                  className={cn("font-mono text-xs", roleColors[user.role])}
                >
                  {user.role}
                </Badge>
              </td>
              <td className="font-mono">{user.permissions}</td>
              <td>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                    user.status === "active"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      user.status === "active" ? "bg-success" : "bg-destructive"
                    )}
                  />
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
