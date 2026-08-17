import React from 'react';
import { motion } from 'motion/react';
import {
  Files,
  FileCheck,
  Clock,
  AlertTriangle,
  ShieldAlert,
  GitCompare,
  HardDrive,
  CheckSquare,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Train,
  Sparkles,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { DashboardMetrics, ChangeImpactReport, DocumentRecord, RiskItem } from '../types';
import { Translations } from '../i18n/translations';
import { NavTab } from '../components/Sidebar';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface DashboardViewProps {
  metrics: DashboardMetrics | null;
  impactReports: ChangeImpactReport[];
  documents: DocumentRecord[];
  risks: RiskItem[];
  onNavigate: (tab: NavTab) => void;
  onSelectDocument: (docId: string) => void;
  t: Translations;
  onLoadSamples: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  impactReports,
  documents,
  risks,
  onNavigate,
  onSelectDocument,
  t,
  onLoadSamples,
}) => {
  // If no data, render a pristine empty state conforming strictly to "No fake data" rule
  if (!metrics || metrics.totalDocuments === 0) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/70 border border-cyan-700/50 flex items-center justify-center text-cyan-400 mx-auto">
            <Train className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-100">
              KMRL Operational Intelligence Dashboard
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              {t.emptyNoDocs}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onLoadSamples}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/60 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              {t.loadSampleBtn}
            </button>
            <button
              onClick={() => onNavigate('documents')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-xs transition-colors"
            >
              <Files className="w-4 h-4" />
              Upload Custom Document
            </button>
          </div>
        </div>

        {/* Core USP Flow Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-teal-400 font-bold">
              Autonomous Intelligence Pipeline
            </span>
            <div className="text-xs text-slate-200 font-semibold">
              DOCUMENT → INTELLIGENCE → IMPACT → ACTION → DECISION → AUDIT
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500">Zero Simulated Data · Strictly Verified</span>
        </div>
      </div>
    );
  }

  const latestImpact = impactReports[0];
  const criticalRisks = risks.filter((r) => r.severity === 'CRITICAL' || r.severity === 'HIGH');

  const statCards = [
    {
      label: t.totalDocs,
      value: metrics.totalDocuments,
      icon: Files,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-800/40',
      tab: 'documents' as NavTab,
    },
    {
      label: t.activeRisks,
      value: metrics.activeRisks,
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-950/40 border-rose-800/40',
      tab: 'risks' as NavTab,
    },
    {
      label: t.pendingActions,
      value: metrics.pendingActions,
      icon: CheckSquare,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/40',
      tab: 'actions' as NavTab,
    },
    {
      label: t.verifiedConflicts,
      value: metrics.verifiedConflicts,
      icon: GitCompare,
      color: 'text-orange-400',
      bg: 'bg-orange-950/40 border-orange-800/40',
      tab: 'conflicts' as NavTab,
    },
    {
      label: t.overdueActions,
      value: metrics.overdueActions,
      icon: Clock,
      color: metrics.overdueActions > 0 ? 'text-rose-400' : 'text-slate-400',
      bg: 'bg-slate-900/60 border-slate-800',
      tab: 'deadlines' as NavTab,
    },
    {
      label: t.completedActions,
      value: metrics.completedActions,
      icon: FileCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-800/40',
      tab: 'actions' as NavTab,
    },
    {
      label: 'Compliance Pass Rate',
      value: `${metrics.complianceRate}%`,
      icon: ShieldCheck,
      color: 'text-teal-400',
      bg: 'bg-teal-950/40 border-teal-800/40',
      tab: 'compliance' as NavTab,
    },
    {
      label: t.processingVol,
      value: `${metrics.processingVolumeMb} MB`,
      icon: HardDrive,
      color: 'text-blue-400',
      bg: 'bg-blue-950/40 border-blue-800/40',
      tab: 'documents' as NavTab,
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-700/60">
              SIH25080 · KOCHI METRO
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Real-Time Operational State
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            Operational Intelligence Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('impact')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold transition-all shadow-md shadow-amber-950/40"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            Launch Blast Radius Simulator
          </button>
        </div>
      </div>

      {/* Metrics 8-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: idx * 0.03 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(card.tab)}
              className={`p-3.5 rounded-xl border ${card.bg} cursor-pointer transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400 truncate">
                  {card.label}
                </span>
                <Icon className={`w-3.5 h-3.5 ${card.color} shrink-0`} />
              </div>
              <div className={`text-xl font-bold font-mono mt-2 ${card.color}`}>
                {card.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* KILLER FEATURE HIGHLIGHT CARD: Change Impact & Operational Blast Radius */}
      {latestImpact && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                    Killer Feature · Change Impact Simulator
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {latestImpact.overallRisk} RISK
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-100">
                  {latestImpact.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => onNavigate('impact')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors self-start sm:self-auto"
            >
              <span>Inspect Full Blast Radius</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {latestImpact.summary}
          </p>

          {/* Blast Radius Visual Chain */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
              Operational Blast Radius Sequence:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {latestImpact.blastRadiusChain.slice(0, 6).map((node, i) => (
                <React.Fragment key={node.step}>
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                      node.severity === 'CRITICAL'
                        ? 'bg-rose-950/60 border-rose-700/60 text-rose-200'
                        : node.severity === 'HIGH'
                        ? 'bg-amber-950/60 border-amber-700/60 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="font-semibold text-[11px]">{node.entityType}:</span>
                    <span className="truncate max-w-[140px] text-[11px]">{node.name}</span>
                  </div>
                  {i < Math.min(latestImpact.blastRadiusChain.length, 6) - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left Recent Docs & Active Risks, Right Department Workload & Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Documents & Critical Risks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Documents Table/Cards */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Files className="w-4 h-4 text-cyan-400" />
                Active Authorized Documents ({documents.length})
              </h3>
              <button
                onClick={() => onNavigate('documents')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onSelectDocument(doc.id)}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-700/50 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-300 font-bold text-xs shrink-0">
                      v{doc.version}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                        {doc.title}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="text-teal-400">{doc.department}</span>
                        <span>·</span>
                        <span>{doc.refNumber}</span>
                        <span>·</span>
                        <span>{doc.pagesCount} pages</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.riskScore === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : doc.riskScore === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {doc.riskScore}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Risks Radar Mini-Widget */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                High & Critical Priority Risks ({criticalRisks.length})
              </h3>
              <button
                onClick={() => onNavigate('risks')}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
              >
                Risk Radar <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {criticalRisks.slice(0, 3).map((risk) => (
                <div
                  key={risk.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 uppercase font-mono">
                          {risk.severity}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          {risk.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Dept: {risk.department} · Category: {risk.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                    <span className="font-semibold text-teal-300">Action: </span>
                    {risk.recommendedAction}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <EvidenceBadge
                      docTitle={risk.docTitle}
                      pageNumber={risk.pageNumber}
                      evidenceText={risk.evidence}
                    />
                    <span className="text-[10px] font-mono text-slate-400">
                      Status: {risk.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Department Workload & Audit Stream */}
        <div className="space-y-6">
          {/* Department Workload Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              Department Distribution
            </h3>

            <div className="space-y-2.5">
              {metrics.departmentWorkload.map((dept) => (
                <div key={dept.department} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate max-w-[170px]">
                      {dept.department}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {dept.count} docs ·{' '}
                      <span className={dept.riskCount > 0 ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                        {dept.riskCount} risks
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (dept.count / Math.max(metrics.totalDocuments, 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chronological Audit Stream */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live Audit Activity
              </h3>
              <button
                onClick={() => onNavigate('audit')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Log trail
              </button>
            </div>

            <div className="space-y-3">
              {metrics.recentActivity.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-teal-300 font-semibold">{log.action}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="font-medium text-slate-200 line-clamp-1">
                    {log.entityTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">
                    {log.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
