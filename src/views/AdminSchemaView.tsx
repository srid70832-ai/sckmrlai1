import React, { useState, useEffect } from 'react';
import {
  Database,
  Copy,
  Check,
  Server,
  Shield,
  Layers,
  Cpu,
  Download,
} from 'lucide-react';
import { Translations } from '../i18n/translations';

interface AdminSchemaViewProps {
  t: Translations;
}

export const AdminSchemaView: React.FC<AdminSchemaViewProps> = ({ t }) => {
  const [schemaSql, setSchemaSql] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/system/schema.sql')
      .then((res) => res.text())
      .then((data) => setSchemaSql(data))
      .catch((err) => console.error('Failed to load DDL schema:', err));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Database className="w-6 h-6 text-cyan-400" />
            Supabase / PostgreSQL Production Architecture & DDL
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            SIH25080 · Multi-tenant RLS, pgvector Cosine Indexing & Entity Relational Schema
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-700/60 hover:bg-cyan-900 transition-colors text-xs font-bold shadow"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy DDL Schema'}</span>
        </button>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono uppercase">
            <Server className="w-4 h-4" />
            <span>pgvector Semantic Index</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stores 768-dimensional embeddings for document chunks with IVFFlat cosine similarity indexes for sub-50ms citation queries.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono uppercase">
            <Shield className="w-4 h-4" />
            <span>Row-Level Security (RLS)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strict role-based policies ensuring Officers, Managers, and Reviewers access only authorized directorate documents.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
            <Layers className="w-4 h-4" />
            <span>Entity Relationship Graph</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Foreign-keyed topological models connecting Projects, Contracts, Vendors, Invoices, Deadlines, Approvals, and Equipment.
          </p>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            schema.sql (Production Ready Supabase DDL)
          </span>
          <span className="text-[11px] font-mono text-slate-500">PostgreSQL 15+ / Supabase</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar whitespace-pre selection:bg-cyan-900">
          {schemaSql || 'Loading schema.sql...'}
        </div>
      </div>
    </div>
  );
};
