import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Filter,
  CheckCircle2,
  Calendar,
  UserCheck,
  AlertCircle,
  ArrowRight,
  Search,
} from 'lucide-react';
import { ActionItem, DeadlineItem, ActionStatus, PriorityLevel } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface ActionsDeadlinesViewProps {
  actions: ActionItem[];
  deadlines: DeadlineItem[];
  onApproveAction: (actionId: string) => void;
  onUpdateStatus: (actionId: string, status: ActionStatus) => void;
  onSelectDocument: (docId: string) => void;
  t: Translations;
}

export const ActionsDeadlinesView: React.FC<ActionsDeadlinesViewProps> = ({
  actions,
  deadlines,
  onApproveAction,
  onUpdateStatus,
  onSelectDocument,
  t,
}) => {
  const [activeTab, setActiveTab] = useState<'actions' | 'deadlines'>('actions');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActions = actions.filter((act) => {
    const matchesStatus = selectedStatus === 'ALL' || act.status === selectedStatus;
    const matchesPriority = selectedPriority === 'ALL' || act.priority === selectedPriority;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.docTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const sortedDeadlines = [...deadlines].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-teal-400" />
            Operational Actions & Milestone Deadlines
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Auto-extracted action items from directives with human approval governance
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'actions'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-950/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Extracted Actions ({actions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('deadlines')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'deadlines'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-950/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Deadlines Timeline ({deadlines.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'actions' && (
        <div className="space-y-4">
          {/* Action Filters */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search action, owner, doc..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Action Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="OVERDUE">Overdue</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>
          </div>

          {/* Actions List */}
          {filteredActions.length === 0 ? (
            <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-300">No actions match current filters</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredActions.map((act) => (
                <div
                  key={act.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                            act.priority === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : act.priority === 'HIGH'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {act.priority}
                        </span>

                        <h3 className="text-sm font-bold text-slate-100">{act.title}</h3>
                      </div>
                      <p className="text-xs text-slate-300">{act.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onApproveAction(act.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          act.humanApproved
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-950/60'
                        }`}
                      >
                        {act.humanApproved ? 'Human Approved ✓' : 'Approve Execution'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-4">
                      <span>Owner: <strong className="text-slate-200">{act.owner}</strong> ({act.department})</span>
                      <span>Target Due Date: <strong className="text-amber-300">{act.dueDate}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <EvidenceBadge
                        docTitle={act.docTitle}
                        pageNumber={act.pageNumber}
                        evidenceText={act.evidence}
                        onClick={() => onSelectDocument(act.docId)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'deadlines' && (
        <div className="space-y-3">
          {sortedDeadlines.map((dl) => (
            <div
              key={dl.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4 shadow-md"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                      dl.priority === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {dl.priority}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100">{dl.title}</h3>
                </div>
                <div className="text-xs text-slate-400">
                  Assigned Lead: {dl.owner} · Directorate: {dl.department}
                </div>
                <EvidenceBadge
                  docTitle={dl.docTitle}
                  pageNumber={dl.pageNumber}
                  evidenceText={dl.evidence}
                  onClick={() => onSelectDocument(dl.docId)}
                />
              </div>

              <div className="text-right shrink-0">
                <div className="text-base font-bold font-mono text-amber-300">
                  {dl.dueDate}
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {dl.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
