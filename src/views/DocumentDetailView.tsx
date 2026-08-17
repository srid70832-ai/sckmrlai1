import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  ShieldAlert,
  CheckSquare,
  Clock,
  GitCompare,
  ShieldCheck,
  Tag,
  Copy,
  Check,
  Sparkles,
  Layers,
  Building2,
  Trash2,
  ChevronRight,
  Info,
  ExternalLink,
} from 'lucide-react';
import { DocumentRecord, RiskItem, ActionItem, DeadlineItem, ComplianceCheck, ConflictItem } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface DocumentDetailViewProps {
  document: DocumentRecord;
  risks: RiskItem[];
  actions: ActionItem[];
  deadlines: DeadlineItem[];
  compliance: ComplianceCheck[];
  conflicts: ConflictItem[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onVerifyRisk: (riskId: string) => void;
  onApproveAction: (actionId: string) => void;
}

type DetailTab = 'overview' | 'entities' | 'actions' | 'deadlines' | 'risks' | 'conflicts' | 'compliance';

export const DocumentDetailView: React.FC<DocumentDetailViewProps> = ({
  document,
  risks,
  actions,
  deadlines,
  compliance,
  conflicts,
  onBack,
  onDelete,
  onVerifyRisk,
  onApproveAction,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [activePageNumber, setActivePageNumber] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const currentPage = document.pages.find((p) => p.pageNumber === activePageNumber) || document.pages[0];

  const handleCopyText = () => {
    if (currentPage) {
      navigator.clipboard.writeText(currentPage.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs: { id: DetailTab; label: string; count?: number; icon: any }[] = [
    { id: 'overview', label: 'Overview & Routing', icon: Info },
    { id: 'entities', label: 'Extracted Entities', count: document.entities.length, icon: Tag },
    { id: 'actions', label: 'Extracted Actions', count: actions.length, icon: CheckSquare },
    { id: 'deadlines', label: 'Deadlines', count: deadlines.length, icon: Clock },
    { id: 'risks', label: 'Operational Risks', count: risks.length, icon: ShieldAlert },
    { id: 'conflicts', label: 'Conflicts', count: conflicts.length, icon: GitCompare },
    { id: 'compliance', label: 'Compliance Checks', count: compliance.length, icon: ShieldCheck },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                v{document.version}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {document.refNumber}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  document.riskScore === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : document.riskScore === 'HIGH'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {document.riskScore} RISK
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-slate-100 mt-1">
              {document.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(document.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Two-Pane Workspace: Left Page Viewer, Right Extracted Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Multi-Page Document Reader */}
        <div className="lg:col-span-5 flex flex-col space-y-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">
                Document Pages ({document.pagesCount})
              </span>
            </div>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Page Text'}</span>
            </button>
          </div>

          {/* Page Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {document.pages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => setActivePageNumber(p.pageNumber)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 ${
                  activePageNumber === p.pageNumber
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Page {p.pageNumber}
              </button>
            ))}
          </div>

          {/* Page Content Display */}
          <div className="flex-1 min-h-[420px] max-h-[600px] overflow-y-auto p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar whitespace-pre-wrap selection:bg-cyan-900">
            {currentPage ? currentPage.text : 'No text content.'}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
            <span>OCR Confidence: {Math.round((currentPage?.ocrConfidence || 0.98) * 100)}%</span>
            <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Right Column (7 Cols): Multi-Tab Structured Intelligence Engine */}
        <div className="lg:col-span-7 flex flex-col space-y-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800 pb-3 custom-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-cyan-800 text-cyan-100' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW & ROUTING */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono text-cyan-400">
                  Executive AI Summary
                </h3>
                <p className="text-slate-300 leading-relaxed">{document.summary}</p>
              </div>

              {/* Department Routing Intelligence */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-teal-950/30 border border-teal-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-slate-200">Department Routing Analysis</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    97% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Assigned Department</span>
                    <div className="font-bold text-slate-200 text-sm mt-0.5">{document.department}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">AI Recommended</span>
                    <div className="font-bold text-teal-300 text-sm mt-0.5">{document.recommendedDepartment || document.department}</div>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Routing Justification</span>
                  <p className="text-slate-300">{document.routingReason || 'Assigned based on operational terminology analysis.'}</p>
                  {document.routingEvidence && (
                    <div className="pt-1">
                      <EvidenceBadge
                        docTitle={document.title}
                        pageNumber={1}
                        evidenceText={document.routingEvidence}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Specs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Doc Type</span>
                  <div className="font-bold text-slate-200 mt-0.5">{document.docType.replace(/_/g, ' ')}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Uploaded By</span>
                  <div className="font-bold text-slate-200 mt-0.5">{document.uploadedBy}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Status</span>
                  <div className="font-bold text-emerald-400 mt-0.5">{document.status}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXTRACTED ENTITIES */}
          {activeTab === 'entities' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {document.entities.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No entities extracted.</div>
              ) : (
                document.entities.map((ent) => (
                  <div
                    key={ent.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                          {ent.type}
                        </span>
                        <span className="font-bold text-slate-200 text-xs">{ent.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {Math.round(ent.confidence * 100)}% Match
                      </span>
                    </div>

                    {ent.value && (
                      <div className="text-xs text-slate-300 font-mono bg-slate-900/80 p-2 rounded border border-slate-800">
                        {ent.value}
                      </div>
                    )}

                    <EvidenceBadge
                      docTitle={document.title}
                      pageNumber={ent.pageNumber}
                      evidenceText={ent.evidenceText}
                      onClick={() => setActivePageNumber(ent.pageNumber)}
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: EXTRACTED ACTIONS */}
          {activeTab === 'actions' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {actions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No required actions identified in this document.</div>
              ) : (
                actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${
                              act.priority === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : act.priority === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {act.priority}
                          </span>
                          <span className="font-bold text-slate-200 text-xs">{act.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{act.description}</p>
                      </div>

                      <button
                        onClick={() => onApproveAction(act.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                          act.humanApproved
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                            : 'bg-teal-600 hover:bg-teal-500 text-white'
                        }`}
                      >
                        {act.humanApproved ? 'Approved ✓' : 'Approve Action'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                      <span>Owner: <strong className="text-slate-200">{act.owner}</strong> ({act.department})</span>
                      <span>Due: <strong className="text-amber-300">{act.dueDate}</strong></span>
                    </div>

                    <EvidenceBadge
                      docTitle={document.title}
                      pageNumber={act.pageNumber}
                      evidenceText={act.evidence}
                      onClick={() => setActivePageNumber(act.pageNumber)}
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: DEADLINES */}
          {activeTab === 'deadlines' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {deadlines.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No explicit timestamp deadlines extracted.</div>
              ) : (
                deadlines.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-slate-200 text-xs">{dl.title}</div>
                      <div className="text-[11px] text-slate-400">Assigned: {dl.owner} · Dept: {dl.department}</div>
                      <EvidenceBadge
                        docTitle={document.title}
                        pageNumber={dl.pageNumber}
                        evidenceText={dl.evidence}
                        onClick={() => setActivePageNumber(dl.pageNumber)}
                      />
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold font-mono text-amber-300">{dl.dueDate}</div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {dl.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: OPERATIONAL RISKS */}
          {activeTab === 'risks' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {risks.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No operational risks identified for this document.</div>
              ) : (
                risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                              risk.severity === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : risk.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {risk.severity}
                          </span>
                          <span className="font-bold text-slate-200 text-xs">{risk.title}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Category: {risk.category} · Status: {risk.status}
                        </div>
                      </div>

                      <button
                        onClick={() => onVerifyRisk(risk.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                          risk.status === 'VERIFIED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                            : 'bg-rose-600 hover:bg-rose-500 text-white'
                        }`}
                      >
                        {risk.status === 'VERIFIED' ? 'Verified ✓' : 'Verify Risk'}
                      </button>
                    </div>

                    <div className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                      <span className="font-bold text-teal-300">Recommended Mitigation: </span>
                      {risk.recommendedAction}
                    </div>

                    <EvidenceBadge
                      docTitle={document.title}
                      pageNumber={risk.pageNumber}
                      evidenceText={risk.evidence}
                      onClick={() => setActivePageNumber(risk.pageNumber)}
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: CONFLICTS */}
          {activeTab === 'conflicts' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {conflicts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No cross-document conflicts detected against this document.</div>
              ) : (
                conflicts.map((conf) => (
                  <div
                    key={conf.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-orange-900/40 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-200 text-xs flex items-center gap-2">
                        <GitCompare className="w-4 h-4 text-orange-400" />
                        {conf.title}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                        {conf.conflictType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{conf.explanation}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Doc A (p.{conf.pageA})</span>
                        <span className="text-slate-200">"{conf.evidenceA}"</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Doc B (p.{conf.pageB})</span>
                        <span className="text-slate-200">"{conf.evidenceB}"</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 7: COMPLIANCE CHECKS */}
          {activeTab === 'compliance' && (
            <div className="space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
              {compliance.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No compliance audits recorded for this document.</div>
              ) : (
                compliance.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-200 text-xs">{comp.ruleName}</div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          comp.status === 'PASS'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : comp.status === 'FAIL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {comp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{comp.requirement}</p>

                    <div className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="font-bold text-teal-300">Auditor Verdict: </span>
                      {comp.decisionRemarks}
                    </div>

                    <EvidenceBadge
                      docTitle={document.title}
                      pageNumber={comp.pageNumber}
                      evidenceText={comp.evidence}
                      onClick={() => setActivePageNumber(comp.pageNumber)}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
