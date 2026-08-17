import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { RiskItem, RiskCategory, RiskSeverity, DepartmentName } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface RiskRadarViewProps {
  risks: RiskItem[];
  onVerifyRisk: (riskId: string) => void;
  onSelectDocument: (docId: string) => void;
  t: Translations;
}

export const RiskRadarView: React.FC<RiskRadarViewProps> = ({
  risks,
  onVerifyRisk,
  onSelectDocument,
  t,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRisks = risks.filter((r) => {
    const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'ALL' || r.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.recommendedAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.docTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSeverity && matchesStatus && matchesSearch;
  });

  const categories: RiskCategory[] = [
    'DEADLINE_RISK',
    'COMPLIANCE_RISK',
    'CONTRACT_RISK',
    'DEPENDENCY_RISK',
    'APPROVAL_RISK',
    'INFORMATION_CONFLICT',
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          Proactive Operational Risk Radar
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Detecting critical vulnerabilities, technical threshold breaches & unfulfilled prerequisites
        </p>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search risks, actions, equipment..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">All Risk Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace(/_/g, ' ')}
              </option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="DETECTED">Detected (Pending Verification)</option>
            <option value="VERIFIED">Verified by Officer</option>
            <option value="MITIGATED">Mitigated</option>
          </select>
        </div>
      </div>

      {/* Risk Cards Grid */}
      {filteredRisks.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">
            No risks matching selected filter criteria
          </h3>
          <p className="text-xs text-slate-500">
            All detected operational parameters are within safe operational thresholds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRisks.map((risk) => {
            const isCritical = risk.severity === 'CRITICAL';
            const isHigh = risk.severity === 'HIGH';

            return (
              <div
                key={risk.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all shadow-lg ${
                  isCritical
                    ? 'bg-rose-950/30 border-rose-800/60 shadow-rose-950/20'
                    : isHigh
                    ? 'bg-amber-950/30 border-amber-800/60 shadow-amber-950/20'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : isHigh
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {risk.severity} SEVERITY
                      </span>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                        {risk.category.replace(/_/g, ' ')}
                      </span>
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

                  <h3 className="text-sm font-bold text-slate-100 leading-snug">
                    {risk.title}
                  </h3>

                  <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    <span className="font-bold text-teal-300 block mb-0.5">Recommended Action:</span>
                    {risk.recommendedAction}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <EvidenceBadge
                      docTitle={risk.docTitle}
                      pageNumber={risk.pageNumber}
                      evidenceText={risk.evidence}
                      onClick={() => onSelectDocument(risk.docId)}
                    />

                    <span className="text-[10px] font-mono text-slate-400">
                      Dept: <strong className="text-slate-300">{risk.department}</strong>
                    </span>
                  </div>

                  {risk.verifiedBy && (
                    <div className="text-[10px] font-mono text-emerald-400/90 pt-0.5">
                      ✓ Verified by {risk.verifiedBy} ({new Date(risk.verifiedAt!).toLocaleDateString()})
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
