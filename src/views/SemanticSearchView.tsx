import React, { useState } from 'react';
import {
  Search,
  FileText,
  Filter,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { DepartmentName } from '../types';
import { Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface SemanticSearchViewProps {
  onSelectDocument: (docId: string) => void;
  t: Translations;
}

export const SemanticSearchView: React.FC<SemanticSearchViewProps> = ({
  onSelectDocument,
  t,
}) => {
  const [query, setQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleSearchQueries = [
    'Emergency braking distance and ATP safety interlock',
    'Chiller preventative maintenance penalty clause SLA',
    'Trainset TS-09 wheel flange spalling defect lathe schedule',
    'Payment settlement terms 30 days vs 45 days',
    'Muttom depot 33kV traction shadow block maintenance',
  ];

  const handleSearch = async (overrideQuery?: string) => {
    const q = overrideQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          department: selectedDept,
        }),
      });

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <Search className="w-6 h-6 text-cyan-400" />
          Semantic Vector Search (pgvector)
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Query meaning across multi-page circulars, specifications & contracts with exact page citations
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts e.g. 'traction power block', 'HVAC chiller SLA', 'flange wear threshold'..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Signaling & Telecom">Signaling & Telecom</option>
            <option value="Rolling Stock">Rolling Stock</option>
            <option value="Traction & Power">Traction & Power</option>
            <option value="Operations">Operations</option>
            <option value="Procurement & Contracts">Procurement & Contracts</option>
          </select>

          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/60 transition-all disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Semantic Search</span>
          </button>
        </form>

        {/* 1-Click Fast Queries */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold block">
            Suggested Semantic Test Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleSearchQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(sq);
                  handleSearch(sq);
                }}
                className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-700/60 text-slate-300 hover:text-cyan-300 text-xs transition-colors"
              >
                🔍 {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Feed */}
      {isSearching ? (
        <div className="p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">
            Searching embedding vector space and ranking matched clauses...
          </p>
        </div>
      ) : hasSearched && results.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
          <FileText className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">
            No matching semantic passages found
          </h3>
          <p className="text-xs text-slate-500">
            Try a different search phrasing or ensure documents are loaded into the operational database.
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Found {results.length} verified citations with evidence</span>
            <span>Cosine similarity ranking</span>
          </div>

          <div className="space-y-3">
            {results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => onSelectDocument(res.docId)}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-700/60 hover:bg-slate-900 transition-all cursor-pointer shadow-lg space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                        {res.department}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {res.refNumber}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {res.docTitle}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 shrink-0">
                    {Math.round(res.matchScore * 100)}% Similarity
                  </span>
                </div>

                {/* Evidence Quote Passage */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono leading-relaxed selection:bg-cyan-900">
                  "{res.evidenceText}"
                </div>

                <div className="flex items-center justify-between pt-1">
                  <EvidenceBadge
                    docTitle={res.docTitle}
                    pageNumber={res.pageNumber}
                    evidenceText={res.evidenceText}
                  />

                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    Inspect in Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
