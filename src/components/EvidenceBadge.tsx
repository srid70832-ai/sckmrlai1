import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

interface EvidenceBadgeProps {
  docTitle: string;
  pageNumber: number;
  evidenceText?: string;
  onClick?: () => void;
  className?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  docTitle,
  pageNumber,
  evidenceText,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/60 border border-cyan-700/50 text-cyan-200 hover:bg-cyan-900/60 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      title={evidenceText ? `Evidence: "${evidenceText}"` : undefined}
    >
      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span className="truncate max-w-[180px] font-sans font-medium text-slate-200">
        {docTitle}
      </span>
      <span className="bg-cyan-900/80 px-1.5 py-0.5 rounded text-[10px] text-cyan-300 font-semibold shrink-0">
        p.{pageNumber}
      </span>
      {onClick && (
        <ExternalLink className="w-3 h-3 text-cyan-400/70 group-hover:text-cyan-300 transition-colors shrink-0" />
      )}
    </div>
  );
};
