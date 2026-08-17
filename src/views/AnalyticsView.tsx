import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  ShieldAlert,
  CheckSquare,
  HardDrive,
  Files,
  ShieldCheck,
} from 'lucide-react';
import { DashboardMetrics } from '../types';
import { Translations } from '../i18n/translations';

interface AnalyticsViewProps {
  metrics: DashboardMetrics | null;
  t: Translations;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ metrics, t }) => {
  if (!metrics) {
    return (
      <div className="p-12 text-center text-slate-500 text-xs">
        No analytics data available.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          KMRL Operational Analytics & Workload Intelligence
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Computed live from authorized document registry & risk logs
        </p>
      </div>

      {/* Top 4 Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Ingested Volume</span>
            <HardDrive className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {metrics.processingVolumeMb} MB
          </div>
          <p className="text-[10px] text-slate-500 font-mono">{metrics.totalDocuments} total documents</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Regulatory Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-400">
            {metrics.complianceRate}%
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Against CMRS & RDSO rules</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Action Resolution Rate</span>
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {Math.round((metrics.completedActions / Math.max(metrics.pendingActions + metrics.completedActions, 1)) * 100)}%
          </div>
          <p className="text-[10px] text-slate-500 font-mono">{metrics.completedActions} completed of {metrics.pendingActions + metrics.completedActions}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active High Risk Ratio</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {metrics.activeRisks}
          </div>
          <p className="text-[10px] text-slate-500 font-mono">{metrics.verifiedConflicts} active cross-doc conflicts</p>
        </div>
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Workload Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            Department Workload & Risk Concentration
          </h2>

          <div className="space-y-3 pt-2">
            {metrics.departmentWorkload.map((dept) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{dept.department}</span>
                  <span className="font-mono text-slate-400">
                    {dept.count} docs · <strong className={dept.riskCount > 0 ? 'text-rose-400' : 'text-slate-500'}>{dept.riskCount} risks</strong>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
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

        {/* Risk & Action Status Distribution */}
        <div className="space-y-6">
          {/* Risk Severity Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Risk Severity Profile
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {metrics.riskSeverityBreakdown.map((r) => (
                <div
                  key={r.severity}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    {r.severity}
                  </span>
                  <div
                    className={`text-xl font-bold font-mono ${
                      r.severity === 'CRITICAL'
                        ? 'text-rose-400'
                        : r.severity === 'HIGH'
                        ? 'text-amber-400'
                        : 'text-slate-200'
                    }`}
                  >
                    {r.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Status Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-teal-400" />
              Action Execution Lifecycle
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {metrics.actionStatusBreakdown.map((a) => (
                <div
                  key={a.status}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    {a.status.replace(/_/g, ' ')}
                  </span>
                  <div className="text-xl font-bold font-mono text-teal-300">
                    {a.count}
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
