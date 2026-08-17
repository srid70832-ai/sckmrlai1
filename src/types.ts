/**
 * KMRL IntelliDocs - Core Type Definitions
 * SIH25080: Document Overload at Kochi Metro Rail Limited
 */

export type UserRole = 'ADMIN' | 'MANAGER' | 'OFFICER' | 'REVIEWER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  employeeId: string;
}

export type DocumentType = 
  | 'CONTRACT'
  | 'CIRCULAR'
  | 'WORK_ORDER'
  | 'INSPECTION_REPORT'
  | 'TENDER_NOTICE'
  | 'SAFETY_DIRECTIVE'
  | 'MAINTENANCE_MANUAL'
  | 'FINANCIAL_INVOICE'
  | 'POLICY_AMENDMENT';

export type DepartmentName = 
  | 'Operations'
  | 'Signaling & Telecom'
  | 'Rolling Stock'
  | 'Traction & Power'
  | 'Civil & Track'
  | 'Finance & Accounts'
  | 'Procurement & Contracts'
  | 'Safety & Quality'
  | 'Administration';

export type ProcessingStatus = 
  | 'UPLOADING'
  | 'PROCESSING'
  | 'EXTRACTING'
  | 'ANALYZING'
  | 'INDEXING'
  | 'COMPLETED'
  | 'FAILED';

export interface DocumentPage {
  pageNumber: number;
  text: string;
  ocrConfidence: number;
  extractedClauses?: string[];
  keyHighlights?: string[];
}

export type EntityType = 
  | 'PROJECT'
  | 'CONTRACT'
  | 'VENDOR'
  | 'WORK_ORDER'
  | 'INVOICE'
  | 'PAYMENT'
  | 'DEADLINE'
  | 'APPROVAL'
  | 'TASK'
  | 'EQUIPMENT'
  | 'STATION';

export interface DocumentEntity {
  id: string;
  docId: string;
  type: EntityType;
  name: string;
  value?: string;
  pageNumber: number;
  evidenceText: string;
  confidence: number;
}

export interface DocumentRecord {
  id: string;
  title: string;
  refNumber: string;
  docType: DocumentType;
  department: DepartmentName;
  recommendedDepartment?: DepartmentName;
  routingReason?: string;
  routingEvidence?: string;
  status: ProcessingStatus;
  uploadDate: string;
  version: string;
  previousVersionId?: string;
  fileSize: string;
  pagesCount: number;
  summary: string;
  confidenceScore: number;
  riskScore: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  pages: DocumentPage[];
  entities: DocumentEntity[];
  rawText?: string;
  uploadedBy: string;
  tags: string[];
}

export type RiskCategory = 
  | 'DEADLINE_RISK'
  | 'COMPLIANCE_RISK'
  | 'CONTRACT_RISK'
  | 'DEPENDENCY_RISK'
  | 'APPROVAL_RISK'
  | 'INFORMATION_CONFLICT';

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RiskStatus = 'DETECTED' | 'VERIFIED' | 'MITIGATED' | 'DISMISSED';

export interface RiskItem {
  id: string;
  docId: string;
  docTitle: string;
  title: string;
  category: RiskCategory;
  severity: RiskSeverity;
  status: RiskStatus;
  pageNumber: number;
  evidence: string;
  recommendedAction: string;
  department: DepartmentName;
  createdAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export type ConflictType = 
  | 'DATE_MISMATCH'
  | 'AMOUNT_DISCREPANCY'
  | 'SCOPE_CONTRADICTION'
  | 'STATUS_CONFLICT'
  | 'CLAUSE_INCONSISTENCY';

export interface ConflictItem {
  id: string;
  title: string;
  conflictType: ConflictType;
  severity: RiskSeverity;
  status: 'ACTIVE' | 'RESOLVED' | 'WAIVED';
  docAId: string;
  docATitle: string;
  pageA: number;
  evidenceA: string;
  docBId: string;
  docBTitle: string;
  pageB: number;
  evidenceB: string;
  explanation: string;
  recommendedResolution: string;
  detectedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface DiffItem {
  field: string;
  changeType: 'ADDED' | 'REMOVED' | 'MODIFIED';
  oldValue: string;
  newValue: string;
  pageNumber: number;
  clauseRef?: string;
  operationalImpactSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface BlastRadiusNode {
  step: number;
  entityType: EntityType;
  name: string;
  role: string;
  consequence: string;
  evidence: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'AFFECTED' | 'AT_RISK' | 'MITIGATED';
}

export interface ChangeImpactReport {
  id: string;
  title: string;
  sourceDocId: string;
  sourceDocTitle: string;
  targetDocId: string;
  targetDocTitle: string;
  oldVersion: string;
  newVersion: string;
  summary: string;
  diffs: DiffItem[];
  blastRadiusChain: BlastRadiusNode[];
  overallRisk: RiskSeverity;
  recommendedActions: string[];
  humanDecision?: {
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED';
    reviewedBy?: string;
    reviewedAt?: string;
    remarks?: string;
  };
  createdAt: string;
}

export type ActionStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' | 'OVERDUE';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ActionItem {
  id: string;
  docId: string;
  docTitle: string;
  title: string;
  description: string;
  owner: string;
  department: DepartmentName;
  priority: PriorityLevel;
  dueDate: string;
  pageNumber: number;
  evidence: string;
  status: ActionStatus;
  aiRecommended: boolean;
  humanApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface DeadlineItem {
  id: string;
  docId: string;
  docTitle: string;
  title: string;
  dueDate: string;
  owner: string;
  department: DepartmentName;
  pageNumber: number;
  evidence: string;
  status: 'UPCOMING' | 'DUE_SOON' | 'OVERDUE' | 'COMPLETED';
  priority: PriorityLevel;
}

export interface ComplianceCheck {
  id: string;
  docId: string;
  docTitle: string;
  ruleId: string;
  ruleName: string;
  category: string;
  requirement: string;
  status: 'PASS' | 'FAIL' | 'REVIEW_REQUIRED' | 'NOT_APPLICABLE';
  pageNumber: number;
  evidence: string;
  reviewer?: string;
  decisionRemarks?: string;
  checkedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  entityTitle: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface EvidenceCitation {
  docId: string;
  docTitle: string;
  pageNumber: number;
  evidenceText: string;
  matchScore?: number;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations: EvidenceCitation[];
  timestamp: string;
  modelUsed?: string;
  language?: 'en' | 'hi' | 'ml' | 'ta';
  hasSufficientEvidence: boolean;
}

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType | 'DOCUMENT';
  docId?: string;
  details?: string;
  status?: string;
  pageNumber?: number;
  evidence?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  evidence?: string;
  docId?: string;
  pageNumber?: number;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface DashboardMetrics {
  totalDocuments: number;
  documentsProcessed: number;
  pendingActions: number;
  overdueActions: number;
  activeRisks: number;
  verifiedConflicts: number;
  processingVolumeMb: number;
  completedActions: number;
  complianceRate: number;
  recentActivity: AuditLog[];
  departmentWorkload: { department: string; count: number; riskCount: number }[];
  actionStatusBreakdown: { status: string; count: number }[];
  riskSeverityBreakdown: { severity: string; count: number }[];
}
