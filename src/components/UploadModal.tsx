import React, { useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Cpu,
  BrainCircuit,
  Database,
  Network,
  ShieldAlert,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DepartmentName, DocumentType } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: any) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [docType, setDocType] = useState<DocumentType>('CIRCULAR');
  const [department, setDepartment] = useState<DepartmentName>('Signaling & Telecom');
  const [rawContent, setRawContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Exact 7-Step AI Ingestion Pipeline mandated by SIH Architecture
  const steps = [
    { title: 'INGESTING', desc: 'Validating payload, file schema & security headers', icon: Layers },
    { title: 'READING', desc: 'Executing high-accuracy OCR & multi-page text parsing', icon: Cpu },
    { title: 'EXTRACTING', desc: 'Parsing technical clauses, dates, amounts & responsibilities', icon: Database },
    { title: 'UNDERSTANDING', desc: 'Semantic reasoning & automatic department classification', icon: BrainCircuit },
    { title: 'CONNECTING', desc: 'Mapping entity dependencies & cross-department blast radius', icon: Network },
    { title: 'ANALYZING', desc: 'Evaluating compliance gaps, conflicts & operational risks', icon: ShieldAlert },
    { title: 'READY', desc: 'Vector indexed & operational intelligence live', icon: FileCheck2 },
  ];

  if (!isOpen) return null;

  const handlePreloadTemplate = (type: 'traction' | 'signaling' | 'finance') => {
    if (type === 'traction') {
      setTitle('Kalamassery Traction Substation 110kV Transformer Overhaul');
      setRefNumber('KMRL/T&P/CIR/2026/92');
      setDocType('SAFETY_DIRECTIVE');
      setDepartment('Traction & Power');
      setRawContent(`KOCHI METRO RAIL LIMITED (KMRL)
TRACTION & POWER DISTRIBUTION WING - SUBSTATION DIVISION
Doc Ref: KMRL/T&P/CIR/2026/92                                Date: 16th August 2026

SUBJECT: 110kV / 33kV MAIN TRACTION POWER TRANSFORMER OVERHAUL AT KALAMASSERY RSS

1.0 Scope of Preventive Maintenance:
Main Traction Power Transformer TR-02 (40 MVA, 110/33kV) at Kalamassery Receiving Substation has accumulated 45,000 operational hours. Periodic Dissolved Gas Analysis (DGA) indicated acetylene gas traces (C2H2 = 8.5 ppm), mandating comprehensive oil filtration and bushing thermography inspection.

2.0 Operational Window & Track Isolation:
All maintenance works shall be executed during midnight shadow power block between 00:45 AM and 04:30 AM on 26th August 2026. Traction SCADA Engineer Sri. Harikumar M. must issue Permit to Work (PTW) after verified busbar earthing.

3.0 Mandatory Actions & Deadlines:
- Action 1: Deploy high-vacuum transformer oil degasification plant at Kalamassery yard by 24th August 2026. Assigned: Executive Engineer (Power).
- Action 2: Submit post-filtration dielectric breakdown voltage (BDV > 65 kV) lab test certificate before 29th August 2026 to Central Control Centre.`);
    } else if (type === 'signaling') {
      setTitle('Aluva Interlocking Signal Cable Megger Audit Notice');
      setRefNumber('KMRL/S&T/DIR/2026/18');
      setDocType('CIRCULAR');
      setDepartment('Signaling & Telecom');
      setRawContent(`KOCHI METRO RAIL LIMITED
SIGNALING & TELECOM DIRECTORATE
Doc Ref: KMRL/S&T/DIR/2026/18                                Date: 15th August 2026

SUBJECT: MANDATORY SIGNALLING CABLE SHEATH INTEGRITY AUDIT - ALUVA TO COCHIN UNIVERSITY

1.0 Directive:
In response to monsoon waterlogging reports near NH-544 culvert crossings, all 24-core signaling copper control cables between Aluva and Cochin University stations must undergo core-to-core and core-to-earth insulation resistance testing using 1000V DC Megger.

2.0 Standard & Thresholds:
Insulation resistance between conductor and metallic armour shall not be less than 50 Mega-Ohms/km. Any cable section recording below 20 Mega-Ohms must be marked for emergency jointing within 48 hours.

3.0 Assigned Responsible Engineer:
Senior Section Engineer Sri. Rahul V. must complete testing across 12 location boxes and upload signed Megger log sheets by 28th August 2026.`);
    } else {
      setTitle('Phase 1B Solar Roof Tariff Purchase Agreement Addendum');
      setRefNumber('KMRL/FIN/CONT/2026/41');
      setDocType('POLICY_AMENDMENT');
      setDepartment('Finance & Accounts');
      setRawContent(`KOCHI METRO RAIL LIMITED - FINANCE & ACCOUNTS DIVISION
Contract Addendum: KMRL/FIN/CONT/2026/41                       Date: 14th August 2026

SUBJECT: ADDENDUM TO ROOFTOP SOLAR PPA TARIFF AT MUTTOM DEPOT & 14 ELEVATED STATIONS

1.0 Background & Revised Tariff:
Under the existing Power Purchase Agreement (PPA) with M/s CleanMax Solar JV, the Levelized Tariff for 4.5 MWp rooftop solar plants is hereby revised from INR 3.85 / kWh to INR 3.42 / kWh effective 1st September 2026.

2.0 Monthly Settlement & Net Metering:
KSEB Net Metering energy credit invoices must be submitted by 7th of every calendar month. Finance Wing must clear solar vendor credits within 20 banking days.

3.0 Approval Milestone:
Managing Director, KMRL and KSERC regulatory commission ratification scheduled for 29th August 2026.`);
    }
  };

  const handleProcessAndUpload = async () => {
    if (!title.trim() || !rawContent.trim()) {
      setError('Please provide document title and content.');
      return;
    }

    setError(null);
    setIsProcessing(true);
    setCurrentStep(0);

    // Dynamic Step Progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 2) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          refNumber,
          docType,
          department,
          rawContent,
          uploadedBy: 'Current User (Officer)',
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setCurrentStep(steps.length - 1);

      setTimeout(() => {
        setIsProcessing(false);
        onUploadSuccess(data.document);
        onClose();
      }, 700);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setError(err.message || 'Processing failed');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-700/60 flex items-center justify-center text-teal-400 shadow-sm shadow-teal-950/50">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span>Ingest KMRL Operational Document</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                    REAL OCR & RAG
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Full OCR extraction, AI classification, risk detection & entity mapping
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Quick Preload Operational Templates */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                Fast Ingestion Test Templates (1-Click Fill)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handlePreloadTemplate('traction')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-700/60 text-slate-300 hover:text-cyan-300 text-xs font-medium text-left transition-all truncate"
                >
                  ⚡ 110kV Transformer SOP
                </button>
                <button
                  type="button"
                  onClick={() => handlePreloadTemplate('signaling')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-700/60 text-slate-300 hover:text-cyan-300 text-xs font-medium text-left transition-all truncate"
                >
                  🚦 Cable Megger Directive
                </button>
                <button
                  type="button"
                  onClick={() => handlePreloadTemplate('finance')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-700/60 text-slate-300 hover:text-cyan-300 text-xs font-medium text-left transition-all truncate"
                >
                  ☀️ Solar PPA Amendment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Signaling Safety Circular No. SIG-2026-05"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="KMRL/S&T/CIRC/2026/05"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as DocumentType)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  disabled={isProcessing}
                >
                  <option value="SAFETY_DIRECTIVE">Safety Directive</option>
                  <option value="CIRCULAR">Technical Circular</option>
                  <option value="CONTRACT">Contract Agreement</option>
                  <option value="POLICY_AMENDMENT">Policy / Contract Amendment</option>
                  <option value="INSPECTION_REPORT">Inspection Report</option>
                  <option value="WORK_ORDER">Work Order</option>
                  <option value="TENDER_NOTICE">Tender Notice</option>
                  <option value="MAINTENANCE_MANUAL">Maintenance Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as DepartmentName)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  disabled={isProcessing}
                >
                  <option value="Signaling & Telecom">Signaling & Telecom</option>
                  <option value="Rolling Stock">Rolling Stock</option>
                  <option value="Traction & Power">Traction & Power</option>
                  <option value="Operations">Operations</option>
                  <option value="Civil & Track">Civil & Track</option>
                  <option value="Procurement & Contracts">Procurement & Contracts</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Safety & Quality">Safety & Quality</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Document Text / Extracted Content *
              </label>
              <textarea
                rows={6}
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                placeholder="Paste raw document text, technical circular, inspection data, or contract clauses here..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
                disabled={isProcessing}
              />
            </div>

            {/* 7-Step Animated Processing Pipeline */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-slate-950 border border-cyan-900/80 shadow-lg shadow-cyan-950/40 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Processing AI Pipeline: <strong className="text-white font-mono">{steps[currentStep].title}</strong></span>
                  </span>
                  <span className="font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 text-[11px]">
                    Step {currentStep + 1} of {steps.length} ({Math.round(((currentStep + 1) / steps.length) * 100)}%)
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 rounded-full shadow-sm shadow-cyan-400/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  />
                </div>

                {/* Vertical Stepper List */}
                <div className="space-y-1.5 pt-1">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isDone = idx < currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <motion.div
                        key={step.title}
                        initial={false}
                        animate={{
                          backgroundColor: isCurrent ? 'rgba(8, 51, 68, 0.5)' : 'transparent',
                          scale: isCurrent ? 1.01 : 1,
                        }}
                        className={`flex items-center gap-3 text-xs p-2 rounded-lg border transition-all ${
                          isCurrent
                            ? 'border-cyan-500/60 text-cyan-200 shadow-sm'
                            : isDone
                            ? 'border-transparent text-slate-400'
                            : 'border-transparent text-slate-600'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Icon className="w-4 h-4 shrink-0 text-slate-600" />
                        )}
                        <div className="flex-1 truncate">
                          <span className={`font-mono text-[11px] font-bold ${isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                            {step.title}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-2">
                            — {step.desc}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-950/60">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProcessAndUpload}
              disabled={isProcessing || !title.trim() || !rawContent.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-950/60 transition-all active:scale-95"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Ingesting & Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Run Intelligence Pipeline
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
