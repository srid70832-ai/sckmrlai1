import React, { useState } from 'react';
import {
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ConflictItem } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface ConflictRadarViewProps {
  conflicts: ConflictItem[];
  onResolveConflict: (conflictId: string, remarks: string) => void;
  onSelectDocument: (docId: string) => void;
  t: Translations;
}

export const ConflictRadarView: React.FC<ConflictRadarViewProps> = ({
  conflicts,
  onResolveConflict,
  onSelectDocument,
  t,
}) => {
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionRemarks, setResolutionRemarks] = useState('');

  const handleOpenResolve = (id: string) => {
    setResolvingId(id);
    setResolutionRemarks('');
  };

  const handleSubmitResolve = (id: string) => {
    onResolveConflict(id, resolutionRemarks);
    setResolvingId(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <GitCompare className="w-6 h-6 text-orange-400" />
          Cross-Document Conflict Radar
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Detecting policy contradictions, SLA discrepancies & overlapping vendor obligations across documents
        </p>
      </div>

      {conflicts.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">
            No contradictory document clauses detected
          </h3>
          <p className="text-xs text-slate-500">
            All active operational documents and vendor agreements are aligned.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {conflicts.map((conf) => (
            <div
              key={conf.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-orange-900/40 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                      {conf.conflictType}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-1">
                      {conf.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                      conf.status === 'RESOLVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {conf.status}
                  </span>
                  {conf.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleOpenResolve(conf.id)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white transition-colors"
                    >
                      Resolve Conflict
                    </button>
                  )}
                </div>
              </div>

              {/* Contradiction Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-orange-300">Conflict Explanation: </strong>
                {conf.explanation}
              </p>

              {/* Side-by-Side Contradictory Citations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Doc A Citation */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                      Document A (Page {conf.pageA})
                    </span>
                    <EvidenceBadge
                      docTitle={conf.docATitle}
                      pageNumber={conf.pageA}
                      evidenceText={conf.evidenceA}
                      onClick={() => onSelectDocument(conf.docAId)}
                    />
                  </div>
                  <div className="text-xs text-slate-200 font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    "{conf.evidenceA}"
                  </div>
                </div>

                {/* Doc B Citation */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                      Document B (Page {conf.pageB})
                    </span>
                    <EvidenceBadge
                      docTitle={conf.docBTitle}
                      pageNumber={conf.pageB}
                      evidenceText={conf.evidenceB}
                      onClick={() => onSelectDocument(conf.docBId)}
                    />
                  </div>
                  <div className="text-xs text-slate-200 font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    "{conf.evidenceB}"
                  </div>
                </div>
              </div>

              {/* Resolution Form or Status */}
              {resolvingId === conf.id && (
                <div className="p-4 rounded-xl bg-slate-950 border border-orange-500/50 space-y-3">
                  <span className="text-xs font-bold text-orange-300">
                    Record Executive Resolution
                  </span>
                  <input
                    type="text"
                    value={resolutionRemarks}
                    onChange={(e) => setResolutionRemarks(e.target.value)}
                    placeholder="e.g. Revised contract amendment v2.0 takes precedence over baseline circular."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-orange-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setResolvingId(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitResolve(conf.id)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                    >
                      Confirm Resolution
                    </button>
                  </div>
                </div>
              )}

              {conf.resolvedBy && (
                <div className="text-[11px] text-emerald-400 font-mono pt-1">
                  ✓ Resolved by {conf.resolvedBy} on {new Date(conf.resolvedAt!).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
