import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  FileText,
  Loader2,
} from 'lucide-react';
import { ComplianceCheck, DocumentRecord } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface ComplianceViewProps {
  compliance: ComplianceCheck[];
  documents: DocumentRecord[];
  onRunCheck: (docId: string, ruleId: string, ruleName: string, category: string, requirement: string) => Promise<void>;
  onSelectDocument: (docId: string) => void;
  t: Translations;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({
  compliance,
  documents,
  onRunCheck,
  onSelectDocument,
  t,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [isRunning, setIsRunning] = useState(false);

  const predefinedRules = [
    {
      ruleId: 'CMRS-SAF-01',
      ruleName: 'CMRS Mandatory Track & Traction Isolation Protocol',
      category: 'Traction & Power',
      requirement: 'Work permits (PTW) must strictly record verified busbar earthing and shadow block boundaries before track occupation.',
    },
    {
      ruleId: 'RDSO-SIG-04',
      ruleName: 'RDSO Computer Based Interlocking (CBI) Verification',
      category: 'Signaling & Telecom',
      requirement: 'Signal aspects and point machine correlation must be physically megger tested and logged after any software version upgrade.',
    },
    {
      ruleId: 'KMRL-RS-09',
      ruleName: 'KMRL Rolling Stock Flange Wear Critical Limit',
      category: 'Rolling Stock',
      requirement: 'Wheelset flange thickness wear must not exceed 28.5 mm; any spalling requires immediate CNC lathe truing before passenger service.',
    },
  ];

  const handleExecuteRule = async (rule: typeof predefinedRules[0]) => {
    if (!selectedDocId) return;
    setIsRunning(true);
    await onRunCheck(selectedDocId, rule.ruleId, rule.ruleName, rule.category, rule.requirement);
    setIsRunning(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-teal-400" />
          Regulatory & Policy Compliance Matrix
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Automated evaluation against CMRS (Commissioner of Metro Railway Safety) & RDSO standards
        </p>
      </div>

      {/* Compliance Rule Tester Form */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-300">
              Run AI Compliance Verification on Target Document
            </h2>
            <p className="text-[11px] text-slate-400">
              Select an authorized document and test compliance against statutory safety rules
            </p>
          </div>

          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-teal-500"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.department})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {predefinedRules.map((rule) => (
            <div
              key={rule.ruleId}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800/50">
                  {rule.ruleId}
                </span>
                <h3 className="text-xs font-bold text-slate-200">{rule.ruleName}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{rule.requirement}</p>
              </div>

              <button
                onClick={() => handleExecuteRule(rule)}
                disabled={isRunning || !selectedDocId}
                className="mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow transition-all disabled:opacity-50"
              >
                {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Evaluate Document</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Audit Results Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-100">
          Compliance Evaluation History ({compliance.length})
        </h2>

        {compliance.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-500 text-xs">
            No compliance audits evaluated yet. Run an evaluation above.
          </div>
        ) : (
          <div className="space-y-3">
            {compliance.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                        c.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : c.status === 'FAIL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {c.status}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{c.ruleName}</h3>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Audited: {new Date(c.checkedAt).toLocaleDateString()} by {c.reviewer}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{c.requirement}</p>

                <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  <strong className="text-teal-300">Auditor Verdict & Analysis: </strong>
                  {c.decisionRemarks}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <EvidenceBadge
                    docTitle={c.docTitle}
                    pageNumber={c.pageNumber}
                    evidenceText={c.evidence}
                    onClick={() => onSelectDocument(c.docId)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
