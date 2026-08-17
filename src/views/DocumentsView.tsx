import React, { useState } from 'react';
import {
  Files,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  FileText,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { DocumentRecord, DepartmentName, DocumentType } from '../types';
import { Translations } from '../i18n/translations';

interface DocumentsViewProps {
  documents: DocumentRecord[];
  onSelectDocument: (docId: string) => void;
  onOpenUpload: () => void;
  onLoadSamples: () => void;
  t: Translations;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onSelectDocument,
  onOpenUpload,
  onLoadSamples,
  t,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'ALL' || doc.department === selectedDept;
    const matchesType = selectedType === 'ALL' || doc.docType === selectedType;
    const matchesRisk = selectedRisk === 'ALL' || doc.riskScore === selectedRisk;

    return matchesSearch && matchesDept && matchesType && matchesRisk;
  });

  const departments: DepartmentName[] = [
    'Signaling & Telecom',
    'Rolling Stock',
    'Traction & Power',
    'Operations',
    'Civil & Track',
    'Procurement & Contracts',
    'Finance & Accounts',
    'Safety & Quality',
    'Administration',
  ];

  const docTypes: DocumentType[] = [
    'SAFETY_DIRECTIVE',
    'CIRCULAR',
    'CONTRACT',
    'POLICY_AMENDMENT',
    'INSPECTION_REPORT',
    'WORK_ORDER',
    'TENDER_NOTICE',
    'MAINTENANCE_MANUAL',
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Files className="w-6 h-6 text-cyan-400" />
            Document Intelligence Registry
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {documents.length} Authorized KMRL Technical Records · Full OCR & Entity Traceability
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onLoadSamples}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-700/60 hover:bg-cyan-900 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Load KMRL Suite</span>
          </button>
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-md shadow-teal-950/60 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Document</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, ref, clauses, tags..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Document Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Document Types</option>
            {docTypes.map((t) => (
              <option key={t} value={t}>
                {t.replace(/_/g, ' ')}
              </option>
            ))}
          </select>

          {/* Risk Score Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">
            No matching documents found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search filters or ingest a new document into the operational database.
          </p>
        </div>
      ) : (
        /* Document Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-700/60 hover:bg-slate-900 transition-all cursor-pointer shadow-lg hover:shadow-cyan-950/30 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Card Top Meta */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                      v{doc.version}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">
                      {doc.refNumber}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      doc.riskScore === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : doc.riskScore === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {doc.riskScore} RISK
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  {doc.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-teal-400 font-medium">{doc.department}</span>
                  <span className="font-mono">{doc.pagesCount} pages · {doc.fileSize}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {doc.entities.length} entities mapped
                    </span>
                  </div>

                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    Open Workspace <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
