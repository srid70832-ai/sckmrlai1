import React from 'react';
import {
  LayoutDashboard,
  Files,
  Search,
  Bot,
  Network,
  ShieldAlert,
  GitCompare,
  Zap,
  CheckSquare,
  Clock,
  ShieldCheck,
  UserCheck,
  History,
  BarChart3,
  Database,
  ChevronLeft,
  ChevronRight,
  Train,
  X,
} from 'lucide-react';
import { Translations } from '../i18n/translations';

export type NavTab = 
  | 'dashboard'
  | 'documents'
  | 'search'
  | 'copilot'
  | 'graph'
  | 'risks'
  | 'conflicts'
  | 'impact'
  | 'actions'
  | 'deadlines'
  | 'compliance'
  | 'approvals'
  | 'audit'
  | 'analytics'
  | 'admin';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  t: Translations;
  badgeCounts: {
    risks: number;
    conflicts: number;
    actions: number;
    approvals: number;
  };
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  t,
  badgeCounts,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: t.navDashboard, icon: LayoutDashboard },
    { id: 'documents' as NavTab, label: t.navDocuments, icon: Files },
    { id: 'search' as NavTab, label: t.navSearch, icon: Search },
    { id: 'copilot' as NavTab, label: t.navCopilot, icon: Bot, isSpecial: true },
    { id: 'impact' as NavTab, label: t.navChangeImpact, icon: Zap, isKiller: true },
    { id: 'graph' as NavTab, label: t.navKnowledgeGraph, icon: Network },
    { id: 'risks' as NavTab, label: t.navRiskRadar, icon: ShieldAlert, badge: badgeCounts.risks },
    { id: 'conflicts' as NavTab, label: t.navConflictRadar, icon: GitCompare, badge: badgeCounts.conflicts },
    { id: 'actions' as NavTab, label: t.navActions, icon: CheckSquare, badge: badgeCounts.actions },
    { id: 'deadlines' as NavTab, label: t.navDeadlines, icon: Clock },
    { id: 'compliance' as NavTab, label: t.navCompliance, icon: ShieldCheck },
    { id: 'approvals' as NavTab, label: t.navApprovals, icon: UserCheck, badge: badgeCounts.approvals },
    { id: 'audit' as NavTab, label: t.navAuditTrail, icon: History },
    { id: 'analytics' as NavTab, label: t.navAnalytics, icon: BarChart3 },
    { id: 'admin' as NavTab, label: t.navAdmin, icon: Database },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 select-none ${
          isMobileOpen
            ? 'translate-x-0 w-72 shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div
            onClick={() => {
              onSelectTab('dashboard');
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/50 shrink-0">
              <Train className="w-5 h-5 text-white" />
            </div>
            {(!collapsed || isMobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-100 text-sm tracking-wide leading-tight truncate">
                  KMRL IntelliDocs
                </span>
                <span className="text-[10px] text-teal-400 font-mono tracking-wider font-semibold">
                  SIH25080 · TEAM NEGU
                </span>
              </div>
            )}
          </div>

          {/* Close on Mobile */}
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                  isActive
                    ? item.isKiller
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950/40'
                      : 'bg-cyan-950/70 text-cyan-300 border border-cyan-700/50 shadow-sm shadow-cyan-950/40'
                    : item.isKiller
                    ? 'text-amber-400 hover:bg-amber-950/30 hover:text-amber-200'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
                }`}
                title={collapsed && !isMobileOpen ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? item.isKiller
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                      : item.isKiller
                      ? 'text-amber-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {(!collapsed || isMobileOpen) && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {/* Killer Feature Tag */}
                {(!collapsed || isMobileOpen) && item.isKiller && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    USP
                  </span>
                )}

                {/* Special AI Copilot Tag */}
                {(!collapsed || isMobileOpen) && item.isSpecial && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                    AI
                  </span>
                )}

                {/* Badge Counter */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      collapsed && !isMobileOpen
                        ? 'absolute top-1 right-1 px-1 py-0 text-[8px] bg-rose-600 text-white'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle Footer (Desktop only) */}
        <div className="hidden md:flex p-3 border-t border-slate-800/80 items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-slate-400 font-mono">Engine: Active</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors mx-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
