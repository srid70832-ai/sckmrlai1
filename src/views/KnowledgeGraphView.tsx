import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network,
  Filter,
  Layers,
  FileText,
  Building2,
  Cpu,
  Clock,
  CheckSquare,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Tag,
  ChevronRight,
  Info,
} from 'lucide-react';
import { KnowledgeGraphData, GraphNode, GraphEdge } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface KnowledgeGraphViewProps {
  onSelectDocument: (docId: string) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  onSelectDocument,
}) => {
  const [graphData, setGraphData] = useState<KnowledgeGraphData>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/graph');
      const data = await res.json();
      setGraphData(data);
      if (data.nodes.length > 0) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (e) {
      console.error('Failed to load graph:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNodes = graphData.nodes.filter(
    (n) => filterType === 'ALL' || n.type === filterType
  );

  const nodeTypes = [
    'ALL',
    'DOCUMENT',
    'CONTRACT',
    'VENDOR',
    'EQUIPMENT',
    'STATION',
    'DEADLINE',
    'APPROVAL',
    'TASK',
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Network className="w-6 h-6 text-cyan-400" />
            KMRL Operational Knowledge Graph
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Cross-Document Entity & Organizational Dependency Topology
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {nodeTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors shrink-0 ${
                filterType === t
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main View: Left Graph Node Map, Right Selected Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Visual Interactive Map */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col min-h-[520px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-xs font-mono text-slate-400">
              Showing {filteredNodes.length} nodes · {graphData.edges.length} connected relationships
            </span>
            <button
              onClick={fetchGraphData}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title="Refresh Graph"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Layout of Connected Graph Nodes */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-1 custom-scrollbar max-h-[500px]">
            {filteredNodes.map((node, i) => {
              const isSelected = selectedNode?.id === node.id;
              const isDoc = node.type === 'DOCUMENT';

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-500 shadow-lg shadow-cyan-950/50'
                      : isDoc
                      ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-700/50'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          node.type === 'DOCUMENT'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : node.type === 'EQUIPMENT'
                            ? 'bg-amber-500/20 text-amber-300'
                            : node.type === 'VENDOR'
                            ? 'bg-purple-500/20 text-purple-300'
                            : node.type === 'DEADLINE'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {node.type}
                      </span>
                      {node.pageNumber && (
                        <span className="text-[10px] font-mono text-slate-500">
                          p.{node.pageNumber}
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-slate-200 text-xs truncate">
                      {node.label}
                    </div>
                  </div>

                  {node.details && (
                    <div className="text-[11px] text-slate-400 line-clamp-2">
                      {node.details}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 Cols): Selected Node Deep Inspector */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="border-b border-slate-800 pb-3 space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                    {selectedNode.type} NODE
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-1">
                    {selectedNode.label}
                  </h3>
                </div>

                {selectedNode.details && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Details / Value</span>
                    <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono">
                      {selectedNode.details}
                    </p>
                  </div>
                )}

                {selectedNode.evidence && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Verifiable Source Citation</span>
                    <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed font-mono">
                      "{selectedNode.evidence}"
                    </div>
                    {selectedNode.pageNumber && (
                      <div className="pt-1">
                        <EvidenceBadge
                          docTitle="Referenced Document"
                          pageNumber={selectedNode.pageNumber}
                          evidenceText={selectedNode.evidence}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Connected Relationships for this node */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Connected Graph Edges
                  </span>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar">
                    {graphData.edges
                      .filter(
                        (e) => e.source === selectedNode.id || e.target === selectedNode.id
                      )
                      .map((edge) => (
                        <div
                          key={edge.id}
                          className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between"
                        >
                          <span className="text-teal-400 font-mono">{edge.label}</span>
                          {edge.pageNumber && (
                            <span className="text-slate-500 font-mono">p.{edge.pageNumber}</span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                Click any node in the topology to inspect its properties and connected clauses.
              </div>
            )}
          </AnimatePresence>

          {selectedNode?.docId && (
            <button
              onClick={() => onSelectDocument(selectedNode.docId!)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950/50 transition-all"
            >
              <span>Inspect Source Document</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
