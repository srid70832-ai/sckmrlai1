import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { UploadModal } from './components/UploadModal';
import { DashboardView } from './views/DashboardView';
import { DocumentsView } from './views/DocumentsView';
import { DocumentDetailView } from './views/DocumentDetailView';
import { SemanticSearchView } from './views/SemanticSearchView';
import { AICopilotView } from './views/AICopilotView';
import { ChangeImpactSimulatorView } from './views/ChangeImpactSimulatorView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { RiskRadarView } from './views/RiskRadarView';
import { ConflictRadarView } from './views/ConflictRadarView';
import { ActionsDeadlinesView } from './views/ActionsDeadlinesView';
import { ComplianceView } from './views/ComplianceView';
import { ApprovalsWorkflowView } from './views/ApprovalsWorkflowView';
import { AuditTrailView } from './views/AuditTrailView';
import { AnalyticsView } from './views/AnalyticsView';
import { AdminSchemaView } from './views/AdminSchemaView';
import {
  DocumentRecord,
  RiskItem,
  ConflictItem,
  ChangeImpactReport,
  ActionItem,
  DeadlineItem,
  ComplianceCheck,
  AuditLog,
  DashboardMetrics,
  UserProfile,
  UserRole,
  ActionStatus,
} from './types';
import { SupportedLanguage, TRANSLATIONS } from './i18n/translations';
import { AlertCircle, CheckCircle2, X, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // RBAC Current User Simulation
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'user-01',
    name: 'Rajesh K. Varma',
    email: 'rajesh.varma@kmrl.kerala.gov.in',
    role: 'ADMIN',
    department: 'Signaling & Telecom',
    employeeId: 'KMRL-EMP-4092',
  });

  // App Data State
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [risks, setRisks] = useState<RiskItem[]>([]);
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [impactReports, setImpactReports] = useState<ChangeImpactReport[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [compliance, setCompliance] = useState<ComplianceCheck[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const t = TRANSLATIONS[language];

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchAllData();
  }, []);

  // Global Keyboard Shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCurrentTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [docsRes, risksRes, confRes, impactRes, actRes, dlRes, compRes, auditRes, metricsRes] =
        await Promise.all([
          fetch('/api/documents'),
          fetch('/api/risks'),
          fetch('/api/conflicts'),
          fetch('/api/impact/reports'),
          fetch('/api/actions'),
          fetch('/api/deadlines'),
          fetch('/api/compliance'),
          fetch('/api/audit'),
          fetch('/api/analytics'),
        ]);

      if (docsRes.ok) setDocuments(await docsRes.json());
      if (risksRes.ok) setRisks(await risksRes.json());
      if (confRes.ok) setConflicts(await confRes.json());
      if (impactRes.ok) setImpactReports(await impactRes.json());
      if (actRes.ok) setActions(await actRes.json());
      if (dlRes.ok) setDeadlines(await dlRes.json());
      if (compRes.ok) setCompliance(await compRes.json());
      if (auditRes.ok) setAuditLogs(await auditRes.json());
      if (metricsRes.ok) setMetrics(await metricsRes.json());
    } catch (e) {
      console.error('Failed to load KMRL operational data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSamples = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/documents/load-sample', { method: 'POST' });
      if (res.ok) {
        showToast('KMRL Operational Test Suite reloaded successfully');
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to load sample suite', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/documents/clear-all', { method: 'POST' });
      if (res.ok) {
        showToast('All operational records cleared (Empty state mode)', 'info');
        setSelectedDocId(null);
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to clear records', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Document removed from operational registry');
        setSelectedDocId(null);
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to delete document', 'error');
    }
  };

  const handleSimulateImpact = async (sourceDocId: string, targetDocId: string) => {
    try {
      const res = await fetch('/api/impact/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceDocId, targetDocId }),
      });
      if (res.ok) {
        const report = await res.json();
        showToast('Multi-department blast radius computed successfully');
        await fetchAllData();
        return report;
      }
    } catch (e) {
      showToast('Impact simulation failed', 'error');
    }
    return null;
  };

  const handleRecordImpactDecision = async (
    reportId: string,
    status: 'APPROVED' | 'REJECTED' | 'MODIFICATION_REQUESTED',
    remarks: string
  ) => {
    try {
      const res = await fetch('/api/impact/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          status,
          remarks,
          reviewedBy: `${currentUser.name} (${currentUser.role})`,
        }),
      });
      if (res.ok) {
        showToast(`Decision recorded: ${status}`);
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to record decision', 'error');
    }
  };

  const handleVerifyRisk = async (riskId: string) => {
    try {
      const res = await fetch(`/api/risks/${riskId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verifiedBy: `${currentUser.name} (${currentUser.role})`,
          status: 'VERIFIED',
        }),
      });
      if (res.ok) {
        showToast('Operational risk verified by Safety Officer');
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to verify risk', 'error');
    }
  };

  const handleResolveConflict = async (conflictId: string, remarks: string) => {
    try {
      const res = await fetch(`/api/conflicts/${conflictId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resolvedBy: `${currentUser.name} (${currentUser.role})`,
          resolutionRemarks: remarks,
        }),
      });
      if (res.ok) {
        showToast('Document conflict resolved & policy aligned');
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to resolve conflict', 'error');
    }
  };

  const handleApproveAction = async (actionId: string) => {
    try {
      const res = await fetch(`/api/actions/${actionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          humanApproved: true,
          approvedBy: `${currentUser.name} (${currentUser.role})`,
        }),
      });
      if (res.ok) {
        showToast('Action item approved for operational execution');
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to approve action', 'error');
    }
  };

  const handleUpdateActionStatus = async (actionId: string, status: ActionStatus) => {
    try {
      const res = await fetch(`/api/actions/${actionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(`Action marked as ${status}`);
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to update action', 'error');
    }
  };

  const handleRunCompliance = async (
    docId: string,
    ruleId: string,
    ruleName: string,
    category: string,
    requirement: string
  ) => {
    try {
      const res = await fetch('/api/compliance/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, ruleId, ruleName, category, requirement }),
      });
      if (res.ok) {
        showToast('Compliance audit evaluated with citations');
        await fetchAllData();
      }
    } catch (e) {
      showToast('Failed to evaluate compliance', 'error');
    }
  };

  const handleSelectDocument = (docId: string) => {
    setSelectedDocId(docId);
    setCurrentTab('documents');
  };

  const handleUploadSuccess = async (newDoc: DocumentRecord) => {
    showToast(`Successfully ingested: ${newDoc.title}`);
    await fetchAllData();
    setSelectedDocId(newDoc.id);
  };

  const currentDoc = selectedDocId ? documents.find((d) => d.id === selectedDocId) : null;

  const badgeCounts = {
    risks: risks.filter((r) => r.status === 'DETECTED').length,
    conflicts: conflicts.filter((c) => c.status === 'ACTIVE').length,
    actions: actions.filter((a) => !a.humanApproved).length,
    approvals:
      impactReports.filter((r) => !r.humanDecision || r.humanDecision.status === 'PENDING').length +
      actions.filter((a) => !a.humanApproved).length,
  };

  const getTabTitle = () => {
    if (selectedDocId && currentDoc) return currentDoc.title;
    switch (currentTab) {
      case 'dashboard': return t.navDashboard;
      case 'documents': return t.navDocuments;
      case 'search': return t.navSearch;
      case 'copilot': return t.navCopilot;
      case 'impact': return t.navChangeImpact;
      case 'graph': return t.navKnowledgeGraph;
      case 'risks': return t.navRiskRadar;
      case 'conflicts': return t.navConflictRadar;
      case 'actions': return t.navActions;
      case 'deadlines': return t.navDeadlines;
      case 'compliance': return t.navCompliance;
      case 'approvals': return t.navApprovals;
      case 'audit': return t.navAuditTrail;
      case 'analytics': return t.navAnalytics;
      case 'admin': return t.navAdmin;
      default: return 'KMRL IntelliDocs';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedDocId(null);
          setCurrentTab(tab);
          setIsMobileMenuOpen(false);
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        t={t}
        badgeCounts={badgeCounts}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Top Navbar */}
        <TopNav
          currentTitle={getTabTitle()}
          onOpenUpload={() => setIsUploadOpen(true)}
          onLoadSamples={handleLoadSamples}
          onClearAll={handleClearAll}
          onOpenSearch={() => {
            setSelectedDocId(null);
            setCurrentTab('search');
          }}
          language={language}
          onChangeLanguage={(lang) => setLanguage(lang)}
          currentUser={currentUser}
          onChangeRole={(role: UserRole) => {
            setCurrentUser({ ...currentUser, role });
            showToast(`Role switched to: ${role}`, 'info');
          }}
          t={t}
          isLoading={isLoading}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* View Routing Body */}
        <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar flex flex-col justify-between">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {selectedDocId && currentDoc ? (
                <motion.div
                  key={`doc-${selectedDocId}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <DocumentDetailView
                    document={currentDoc}
                    risks={risks.filter((r) => r.docId === currentDoc.id)}
                    actions={actions.filter((a) => a.docId === currentDoc.id)}
                    deadlines={deadlines.filter((d) => d.docId === currentDoc.id)}
                    compliance={compliance.filter((c) => c.docId === currentDoc.id)}
                    conflicts={conflicts.filter((c) => c.docAId === currentDoc.id || c.docBId === currentDoc.id)}
                    onBack={() => setSelectedDocId(null)}
                    onDelete={handleDeleteDocument}
                    onVerifyRisk={handleVerifyRisk}
                    onApproveAction={handleApproveAction}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {currentTab === 'dashboard' ? (
                    <DashboardView
                      metrics={metrics}
                      impactReports={impactReports}
                      documents={documents}
                      risks={risks}
                      onNavigate={(tab) => setCurrentTab(tab)}
                      onSelectDocument={handleSelectDocument}
                      t={t}
                      onLoadSamples={handleLoadSamples}
                    />
                  ) : currentTab === 'documents' ? (
                    <DocumentsView
                      documents={documents}
                      onSelectDocument={handleSelectDocument}
                      onOpenUpload={() => setIsUploadOpen(true)}
                      onLoadSamples={handleLoadSamples}
                      t={t}
                    />
                  ) : currentTab === 'search' ? (
                    <SemanticSearchView
                      onSelectDocument={handleSelectDocument}
                      t={t}
                    />
                  ) : currentTab === 'copilot' ? (
                    <AICopilotView
                      documents={documents}
                      onSelectDocument={handleSelectDocument}
                      language={language}
                      onChangeLanguage={setLanguage}
                      t={t}
                    />
                  ) : currentTab === 'impact' ? (
                    <ChangeImpactSimulatorView
                      documents={documents}
                      impactReports={impactReports}
                      onSimulate={handleSimulateImpact}
                      onRecordDecision={handleRecordImpactDecision}
                      userRole={currentUser.role}
                      t={t}
                    />
                  ) : currentTab === 'graph' ? (
                    <KnowledgeGraphView
                      onSelectDocument={handleSelectDocument}
                    />
                  ) : currentTab === 'risks' ? (
                    <RiskRadarView
                      risks={risks}
                      onVerifyRisk={handleVerifyRisk}
                      onSelectDocument={handleSelectDocument}
                      t={t}
                    />
                  ) : currentTab === 'conflicts' ? (
                    <ConflictRadarView
                      conflicts={conflicts}
                      onResolveConflict={handleResolveConflict}
                      onSelectDocument={handleSelectDocument}
                      t={t}
                    />
                  ) : currentTab === 'actions' || currentTab === 'deadlines' ? (
                    <ActionsDeadlinesView
                      actions={actions}
                      deadlines={deadlines}
                      onApproveAction={handleApproveAction}
                      onUpdateStatus={handleUpdateActionStatus}
                      onSelectDocument={handleSelectDocument}
                      t={t}
                    />
                  ) : currentTab === 'compliance' ? (
                    <ComplianceView
                      compliance={compliance}
                      documents={documents}
                      onRunCheck={handleRunCompliance}
                      onSelectDocument={handleSelectDocument}
                      t={t}
                    />
                  ) : currentTab === 'approvals' ? (
                    <ApprovalsWorkflowView
                      impactReports={impactReports}
                      actions={actions}
                      risks={risks}
                      onApproveImpact={handleRecordImpactDecision}
                      onApproveAction={handleApproveAction}
                      onVerifyRisk={handleVerifyRisk}
                      onSelectDocument={handleSelectDocument}
                      userRole={currentUser.role}
                      t={t}
                    />
                  ) : currentTab === 'audit' ? (
                    <AuditTrailView
                      logs={auditLogs}
                      t={t}
                    />
                  ) : currentTab === 'analytics' ? (
                    <AnalyticsView
                      metrics={metrics}
                      t={t}
                    />
                  ) : currentTab === 'admin' ? (
                    <AdminSchemaView
                      t={t}
                    />
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Global Enterprise Footer */}
          <footer className="mt-8 py-3 px-6 border-t border-slate-800/80 bg-slate-950/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span>Developed by SC TECH</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span>SIH25080 · Document Overload at KMRL</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline text-teal-400">Team NEGU</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Ingestion / Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Animated Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl text-xs font-semibold"
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
