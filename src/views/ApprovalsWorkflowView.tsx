import React from 'react';
import {
  UserCheck,
  Zap,
  CheckSquare,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { ChangeImpactReport, ActionItem, RiskItem, UserRole } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface ApprovalsWorkflowViewProps {
  impactReports: ChangeImpactReport[];
  actions: ActionItem[];
  risks: RiskItem[];
  onApproveImpact: (reportId: string, status: 'APPROVED' | 'REJECTED' | 'MODIFICATION_REQUESTED', remarks: string) => void;
  onApproveAction: (actionId: string) => void;
  onVerifyRisk: (riskId: string) => void;
  onSelectDocument: (docId: string) => void;
  userRole: UserRole;
  t: Translations;
}

export const ApprovalsWorkflowView: React.FC<ApprovalsWorkflowViewProps> = ({
  impactReports,
  actions,
  risks,
  onApproveImpact,
  onApproveAction,
  onVerifyRisk,
  onSelectDocument,
  userRole,
  t,
}) => {
  const pendingImpacts = impactReports.filter(
    (r) => !r.humanDecision || r.humanDecision.status === 'PENDING'
  );
  const pendingActions = actions.filter((a) => !a.humanApproved);
  const unverifiedRisks = risks.filter((r) => r.status === 'DETECTED');

  const totalPending = pendingImpacts.length + pendingActions.length + unverifiedRisks.length;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-teal-400" />
            Human-in-the-Loop Governance & Approvals
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            AI provides risk scores & blast radius models; Authorized Officers make binding operational decisions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            Active Role: <strong className="text-amber-400">{userRole}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-teal-950 text-teal-300 border border-teal-700/60 text-xs font-bold font-mono">
            {totalPending} Items Pending Sign-Off
          </span>
        </div>
      </div>

      {/* SECTION 1: CHANGE IMPACT SIMULATION SIGN-OFFS */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Pending Amendment & Change Impact Decisions ({pendingImpacts.length})
        </h2>

        {pendingImpacts.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All change impact simulations and contract amendments have been reviewed.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingImpacts.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase font-mono">
                      {report.overallRisk} RISK LEVEL
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-1">
                      {report.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Generated: {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {report.summary}
                </p>

                {/* Blast Radius Node Summary */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400">
                    Operational Blast Radius Sequence ({report.blastRadiusChain.length} steps):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {report.blastRadiusChain.map((node) => (
                      <span
                        key={node.step}
                        className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                      >
                        {node.step}. {node.entityType}: {node.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decision Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => onApproveImpact(report.id, 'REJECTED', 'Sanction declined.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800/60 hover:bg-rose-900 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => onApproveImpact(report.id, 'MODIFICATION_REQUESTED', 'Clarification required.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60 hover:bg-amber-900 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Request Revision</span>
                  </button>
                  <button
                    onClick={() => onApproveImpact(report.id, 'APPROVED', 'Officially sanctioned under delegated power.')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sanction & Approve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: OPERATIONAL ACTION APPROVALS */}
      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-teal-400" />
          Pending Required Actions ({pendingActions.length})
        </h2>

        {pendingActions.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All required actions have been sanctioned by section engineers.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingActions.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-amber-500/20 text-amber-300">
                      {act.priority} PRIORITY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Due: {act.dueDate}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-200">{act.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{act.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <EvidenceBadge
                    docTitle={act.docTitle}
                    pageNumber={act.pageNumber}
                    evidenceText={act.evidence}
                    onClick={() => onSelectDocument(act.docId)}
                  />

                  <button
                    onClick={() => onApproveAction(act.id)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: UNVERIFIED RISKS */}
      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          Unverified Detected Risks ({unverifiedRisks.length})
        </h2>

        {unverifiedRisks.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All detected risks have been verified by Safety Directorate Officers.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unverifiedRisks.map((risk) => (
              <div
                key={risk.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-rose-900/40 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono bg-rose-500/20 text-rose-300">
                      {risk.severity} SEVERITY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{risk.department}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-200">{risk.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{risk.recommendedAction}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <EvidenceBadge
                    docTitle={risk.docTitle}
                    pageNumber={risk.pageNumber}
                    evidenceText={risk.evidence}
                    onClick={() => onSelectDocument(risk.docId)}
                  />

                  <button
                    onClick={() => onVerifyRisk(risk.id)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow"
                  >
                    Verify Risk
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
