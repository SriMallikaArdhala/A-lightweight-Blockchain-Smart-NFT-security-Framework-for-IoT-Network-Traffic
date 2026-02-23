// Mock data based on the TON_IoT dataset and implementation

export const overviewStats = {
  totalRecords: 211043,
  processedRecords: 174664,
  encryptedRecords: 174664,
  blockchainBlocks: 174664,
  smartNFTs: 174664,
  integrityVerified: 100,
};

export const attackDistribution = [
  { type: "backdoor", count: 45892, percentage: 26.3 },
  { type: "ddos", count: 38124, percentage: 21.8 },
  { type: "injection", count: 29847, percentage: 17.1 },
  { type: "xss", count: 22156, percentage: 12.7 },
  { type: "password", count: 18934, percentage: 10.8 },
  { type: "scanning", count: 12845, percentage: 7.4 },
  { type: "mitm", count: 6866, percentage: 3.9 },
];

export const protocolDistribution = [
  { name: "TCP", value: 142531, color: "#00ffff" },
  { name: "UDP", value: 24876, color: "#00cc99" },
  { name: "ICMP", value: 7257, color: "#0099cc" },
];

export const connectionStates = [
  { state: "S0", count: 52341, desc: "Connection attempt" },
  { state: "SF", count: 48726, desc: "Normal establishment" },
  { state: "REJ", count: 35892, desc: "Rejected" },
  { state: "RSTO", count: 21543, desc: "Reset by originator" },
  { state: "RSTR", count: 8934, desc: "Reset by responder" },
  { state: "OTH", count: 7228, desc: "Other" },
];

export const encryptionPerformance = {
  rounds: [1, 2, 3, 4, 5],
  sitEcc: {
    encryption: [4.2, 8.5, 12.8, 17.1, 21.4],
    decryption: [0.001, 0.002, 0.003, 0.004, 0.005],
  },
  chacha20EdDSA: {
    encryption: [5.1, 10.2, 15.3, 20.4, 25.5],
    decryption: [0.0008, 0.0016, 0.0024, 0.0032, 0.004],
  },
};

export const compressionComparison = {
  rounds: [1, 2, 3, 4, 5],
  noCompression: {
    encryption: [74.6, 18.2, 36.9, 52.8, 18.7],
    decryption: [10.7, 17.0, 19.4, 55.6, 16.8],
    throughput: [1.34, 10.98, 8.13, 7.58, 26.75],
    memory: [152917, 152917, 152917, 152917, 152917],
  },
  withCompression: {
    encryption: [19.5, 21.1, 28.8, 21.5, 38.8],
    decryption: [12.5, 20.0, 28.4, 18.5, 42.2],
    throughput: [5.13, 9.49, 10.42, 18.63, 12.90],
    memory: [140819, 140819, 140819, 140819, 140819],
  },
};

export const networkPerformance = {
  metrics: ["Bandwidth", "Storage", "Congestion", "Latency"],
  noCompression: [1.0, 1.0, 1.0, 1.0],
  withCompression: [0.72, 0.65, 0.58, 0.68],
};

export const recentBlocks = [
  {
    index: 174663,
    hash: "428dd84f56501a1c",
    previousHash: "833bb39e14ae8f98",
    signature: "c66ad6b9fe4e17ac",
    signatureValid: true,
    timestamp: "2026-01-22T09:05:42",
  },
  {
    index: 174662,
    hash: "a9f2c3d4e5b6a7c8",
    previousHash: "428dd84f56501a1c",
    signature: "d78be9c0a1b2f3e4",
    signatureValid: true,
    timestamp: "2026-01-22T09:05:41",
  },
  {
    index: 174661,
    hash: "b1c2d3e4f5a6b7c8",
    previousHash: "a9f2c3d4e5b6a7c8",
    signature: "e89fa0b1c2d3e4f5",
    signatureValid: true,
    timestamp: "2026-01-22T09:05:40",
  },
  {
    index: 174660,
    hash: "c2d3e4f5a6b7c8d9",
    previousHash: "b1c2d3e4f5a6b7c8",
    signature: "f90ab1c2d3e4f5a6",
    signatureValid: true,
    timestamp: "2026-01-22T09:05:39",
  },
  {
    index: 174659,
    hash: "d3e4f5a6b7c8d9e0",
    previousHash: "c2d3e4f5a6b7c8d9",
    signature: "a01bc2d3e4f5a6b7",
    signatureValid: true,
    timestamp: "2026-01-22T09:05:38",
  },
];

export const smartNFTs = [
  {
    nftId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    owner: "owner_1",
    createdBy: "admin_1",
    encryptedDataHash: "3a7bd3c...f8e2a1b",
    blockHash: "428dd84f...83923b",
    timestamp: "2026-01-22T09:05:42",
    permissions: {
      admin_1: ["view_metadata", "verify_integrity", "decrypt_access", "transfer_ownership"],
      owner_1: ["view_metadata", "verify_integrity", "decrypt_access"],
      user_1: ["view_metadata", "verify_integrity"],
      auditor_1: ["view_metadata", "verify_integrity"],
      guest_1: ["no_access"],
    },
  },
  {
    nftId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    owner: "owner_1",
    createdBy: "admin_1",
    encryptedDataHash: "4b8ce4d...g9f3b2c",
    blockHash: "a9f2c3d4...e5b6a7c8",
    timestamp: "2026-01-22T09:05:41",
    permissions: {
      admin_1: ["view_metadata", "verify_integrity", "decrypt_access", "transfer_ownership"],
      owner_1: ["view_metadata", "verify_integrity", "decrypt_access"],
      user_1: ["view_metadata", "verify_integrity"],
      auditor_1: ["view_metadata", "verify_integrity"],
      guest_1: ["no_access"],
    },
  },
];

export const systemUsers = [
  { id: "admin_1", role: "Admin", permissions: 4, status: "active" },
  { id: "owner_1", role: "DataOwner", permissions: 3, status: "active" },
  { id: "user_1", role: "AuthorizedUser", permissions: 2, status: "active" },
  { id: "auditor_1", role: "Auditor", permissions: 2, status: "active" },
  { id: "guest_1", role: "Unauthorized", permissions: 0, status: "restricted" },
];

export const securityMetrics = {
  confidentiality: { algorithm: "ChaCha20", keySize: "256-bit", status: "secure" },
  integrity: { algorithm: "Ed-DSA (Ed25519)", signatureSize: "64-byte", status: "verified" },
  immutability: { mechanism: "SHA-256 Hash Chain", blockCount: 174664, status: "intact" },
  ownership: { mechanism: "Smart NFTs", nftCount: 174664, status: "tracked" },
  accessControl: { mechanism: "Role-Based (RBAC)", roles: 5, status: "enforced" },
};
