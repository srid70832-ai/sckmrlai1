import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  GitCompare,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Building2,
  Coins,
  Clock,
  UserCheck,
  ChevronRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { ChangeImpactReport, DocumentRecord, UserRole } from '../types';
import { Translations } from '../i18n/translations';

interface ChangeImpactSimulatorViewProps {
  documents: DocumentRecord[];
  impactReports: ChangeImpactReport[];
  onSimulate: (sourceDocId: string, targetDocId: string) => Promise<ChangeImpactReport | null>;
  onRecordDecision: (reportId: string, status: 'APPROVED' | 'REJECTED' | 'MODIFICATION_REQUESTED', remarks: string) => void;
  userRole: UserRole;
  t: Translations;
}

export const ChangeImpactSimulatorView: React.FC<ChangeImpactSimulatorViewProps> = ({
  documents,
  impactReports,
  onSimulate,
  onRecordDecision,
  userRole,
  t,
}) => {
  const [sourceDocId, setSourceDocId] = useState<string>(
    documents.find((d) => d.id === 'kmrl-doc-002')?.id || documents[0]?.id || ''
  );
  const [targetDocId, setTargetDocId] = useState<string>(
    documents.find((d) => d.id === 'kmrl-doc-003')?.id || documents[1]?.id || ''
  );
  const [activeReport, setActiveReport] = useState<ChangeImpactReport | null>(
    impactReports[0] || null
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [decisionRemarks, setDecisionRemarks] = useState('');

  const handleRunSimulation = async () => {
    if (!sourceDocId || !targetDocId || sourceDocId === targetDocId) return;
    setIsSimulating(true);
    const report = await onSimulate(sourceDocId, targetDocId);
    if (report) {
      setActiveReport(report);
    }
    setIsSimulating(false);
  };

  const handleDecision = (status: 'APPROVED' | 'REJECTED' | 'MODIFICATION_REQUESTED') => {
    if (!activeReport) return;
    onRecordDecision(activeReport.id, status, decisionRemarks);
    setDecisionRemarks('');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header with Killer Feature USP Branding */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md shadow-amber-950/50 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  CORE USP · KILLER FEATURE
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Autonomous Multi-Department Blast Radius
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-100 mt-0.5">
                Change Impact & Operational Blast Radius Simulator
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          When a technical circular, vendor contract, or safety directive is modified, IntelliDocs traces not just what changed, but what that change affects across the entire KMRL ecosystem:
          <span className="font-mono text-amber-300 font-semibold block mt-1">
            PROJECT → CONTRACT → VENDOR → WORK ORDER → INVOICE → PAYMENT → DEADLINE → APPROVAL → TASK
          </span>
        </p>
      </div>

      {/* Simulator Control Selector Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-4">
        <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
          Select Baseline Document vs Revised / Amendment Document
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Baseline Select */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Baseline Document (v1.0 / Original)</span>
            </label>
            <select
              value={sourceDocId}
              onChange={(e) => setSourceDocId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} (v{d.version}) — {d.department}
                </option>
              ))}
            </select>
          </div>

          {/* VS Divider */}
          <div className="md:col-span-2 flex items-center justify-center pt-4 md:pt-0">
            <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs font-mono">
              VS
            </div>
          </div>

          {/* Revised Select */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
              <GitCompare className="w-3.5 h-3.5 text-amber-400" />
              <span>Revised / Amendment Document (v2.0 / New)</span>
            </label>
            <select
              value={targetDocId}
              onChange={(e) => setTargetDocId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} (v{d.version}) — {d.department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-mono">
            {sourceDocId === targetDocId ? (
              <span className="text-rose-400">Please select two different documents to compare.</span>
            ) : (
              <span>Ready to compute organizational dependencies & financial impact</span>
            )}
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating || !sourceDocId || !targetDocId || sourceDocId === targetDocId}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSimulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Simulating Blast Radius...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Compute Operational Blast Radius</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Impact Simulation Report Results */}
      {activeReport ? (
        <div className="space-y-6">
          {/* Executive Summary & Risk Badge */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Simulation Result Analysis
                </span>
                <h2 className="text-base font-bold text-slate-100 mt-0.5">
                  {activeReport.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                    activeReport.overallRisk === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : activeReport.overallRisk === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {activeReport.overallRisk} RISK LEVEL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeReport.summary}
            </p>
          </div>

          {/* VISUAL OPERATIONAL BLAST RADIUS SEQUENCE */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Multi-Node Organizational Blast Radius Chain ({activeReport.blastRadiusChain.length} steps)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                End-to-End Inter-Departmental Impact
              </span>
            </div>

            {/* Organizational Propagation Pipeline Tracker */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 overflow-x-auto custom-scrollbar">
              <div className="flex items-center gap-1.5 min-w-max text-[11px] font-mono">
                {[
                  'PROJECT',
                  'CONTRACT',
                  'VENDOR',
                  'WORK ORDER',
                  'INVOICE',
                  'PAYMENT',
                  'DEADLINE',
                  'APPROVAL',
                  'TASK',
                ].map((item, idx) => (
                  <React.Fragment key={item}>
                    <span className="px-2.5 py-1 rounded-md bg-amber-950/40 text-amber-300 font-bold border border-amber-800/50 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      {item}
                    </span>
                    {idx < 8 && <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeReport.blastRadiusChain.map((node, i) => (
                <motion.div
                  key={node.step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 transition-all ${
                    node.severity === 'CRITICAL'
                      ? 'bg-rose-950/40 border-rose-800/60 shadow-lg shadow-rose-950/20'
                      : node.severity === 'HIGH'
                      ? 'bg-amber-950/40 border-amber-800/60 shadow-lg shadow-amber-950/20'
                      : 'bg-slate-950/70 border-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                        STEP {node.step} · {node.entityType}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold flex items-center gap-1 ${
                          node.severity === 'CRITICAL'
                            ? 'text-rose-400'
                            : node.severity === 'HIGH'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${node.severity === 'CRITICAL' ? 'bg-rose-400 animate-ping' : node.severity === 'HIGH' ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`} />
                        {node.severity}
                      </span>
                    </div>

                    <div className="font-bold text-slate-200 text-xs pt-1">
                      {node.name}
                    </div>
                    <div className="text-[11px] text-teal-400 font-medium font-mono">
                      {node.role}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                    {node.consequence}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono truncate pt-1 border-t border-slate-800/60">
                    {node.evidence}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CLAUSE-BY-CLAUSE SIDE-BY-SIDE DIFF TABLE */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-cyan-400" />
              Clause-by-Clause Modification Matrix ({activeReport.diffs.length} differences)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase font-mono text-slate-400 bg-slate-950/60">
                    <th className="p-3">Clause / Parameter</th>
                    <th className="p-3">Change Type</th>
                    <th className="p-3 text-rose-300">Baseline Value (v{activeReport.oldVersion})</th>
                    <th className="p-3 text-emerald-300">Revised Value (v{activeReport.newVersion})</th>
                    <th className="p-3 text-right">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {activeReport.diffs.map((diff, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">
                        {diff.field}
                        <span className="block text-[10px] text-slate-500 font-mono">{diff.clauseRef}</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            diff.changeType === 'ADDED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : diff.changeType === 'REMOVED'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {diff.changeType}
                        </span>
                      </td>
                      <td className="p-3 text-rose-300/90 font-mono bg-rose-950/20 max-w-[200px]">
                        {diff.oldValue || '—'}
                      </td>
                      <td className="p-3 text-emerald-300/90 font-mono bg-emerald-950/20 max-w-[200px]">
                        {diff.newValue || '—'}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                            diff.operationalImpactSeverity === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {diff.operationalImpactSeverity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HUMAN-IN-THE-LOOP SIGN-OFF / DECISION MODULE */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-800/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    Human-in-the-Loop Sign-Off & Governance Authority
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    AI detects and quantifies risk; authorized KMRL Officer / Manager makes the legally binding operational decision.
                  </p>
                </div>
              </div>

              {activeReport.humanDecision && activeReport.humanDecision.status !== 'PENDING' && (
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                    activeReport.humanDecision.status === 'APPROVED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  STATUS: {activeReport.humanDecision.status}
                </span>
              )}
            </div>

            {activeReport.humanDecision && activeReport.humanDecision.status !== 'PENDING' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Decision recorded by: <strong className="text-slate-200">{activeReport.humanDecision.reviewedBy}</strong>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {activeReport.humanDecision.reviewedAt && new Date(activeReport.humanDecision.reviewedAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic bg-slate-900 p-2.5 rounded border border-slate-800">
                  "{activeReport.humanDecision.remarks}"
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={decisionRemarks}
                  onChange={(e) => setDecisionRemarks(e.target.value)}
                  placeholder="Enter official executive remarks, risk mitigation provisos, or instructions for the procurement/operations wing..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-teal-500 transition-colors"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-slate-400">
                    Current Active Role: <strong className="text-amber-400">{userRole}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecision('REJECTED')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800/60 hover:bg-rose-900 transition-colors"
                    >
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Reject Amendment</span>
                    </button>
                    <button
                      onClick={() => handleDecision('MODIFICATION_REQUESTED')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800/60 hover:bg-amber-900 transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Request Proviso</span>
                    </button>
                    <button
                      onClick={() => handleDecision('APPROVED')}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/60 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Sanction & Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <Zap className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">
            No Impact Simulation Generated Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select a baseline document and revised amendment above, then click "Compute Operational Blast Radius" to analyze inter-departmental consequences.
          </p>
        </div>
      )}
    </div>
  );
};
