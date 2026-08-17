import React, { useState } from 'react';
import {
  History,
  Shield,
  Search,
  Filter,
  User,
  Clock,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { AuditLog } from '../types';
import { Translations } from '../i18n/translations';

interface AuditTrailViewProps {
  logs: AuditLog[];
  t: Translations;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs, t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedAction, setSelectedAction] = useState<string>('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesRole = selectedRole === 'ALL' || log.userRole === selectedRole;
    const matchesAction = selectedAction === 'ALL' || log.action.includes(selectedAction);
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesAction && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <History className="w-6 h-6 text-cyan-400" />
          Enterprise Tamper-Evident Audit Trail
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Immutable chronological ledger tracking all ingestions, AI copilot queries, verifications, and sign-offs
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 shadow-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, officer, document..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All User Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="OFFICER">OFFICER</option>
          <option value="REVIEWER">REVIEWER</option>
        </select>

        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Actions</option>
          <option value="INGESTION">Ingestion</option>
          <option value="IMPACT">Change Impact</option>
          <option value="RISK">Risk Verification</option>
          <option value="COPILOT">Copilot Query</option>
          <option value="ACTION">Action Governance</option>
        </select>
      </div>

      {/* Audit Timeline */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {log.action}
                </span>
                <span className="font-bold text-slate-200">{log.entityTitle}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed font-mono">
              {log.details}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-teal-400" />
                <span>Actor: <strong className="text-slate-200">{log.userName}</strong></span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-950 border border-slate-800 text-amber-300">
                ROLE: {log.userRole}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
