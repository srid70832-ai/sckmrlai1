import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Globe,
  Loader2,
  Trash2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { CopilotMessage, DocumentRecord } from '../types';
import { SupportedLanguage, Translations } from '../i18n/translations';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface AICopilotViewProps {
  documents: DocumentRecord[];
  onSelectDocument: (docId: string) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

export const AICopilotView: React.FC<AICopilotViewProps> = ({
  documents,
  onSelectDocument,
  language,
  onChangeLanguage,
  t,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-001',
      role: 'assistant',
      content: language === 'ml' 
        ? 'നമസ്കാരം! ഞാൻ KMRL ഇന്റലിഡോക്‌സ് AI കോപൈലറ്റ് ആണ്. കൊച്ചി മെട്രോയുടെ ഔദ്യോഗിക രേഖകൾ, സർക്കുലറുകൾ, പരിശോധനാ റിപ്പോർട്ടുകൾ എന്നിവയിൽ നിന്നുള്ള കൃത്യമായ തെളിവുകളുടെ അടിസ്ഥാനത്തിൽ ഞാൻ നിങ്ങളുടെ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകാം.'
        : language === 'hi'
        ? 'नमस्ते! मैं KMRL IntelliDocs AI कोपायलट हूँ। कोच्चि मेट्रो के अधिकृत दस्तावेज़ों, अनुबंधों और सुरक्षा परिपत्रों के आधार पर मैं आपके प्रश्नों के साक्ष्य-सहित उत्तर दूंगा।'
        : 'Welcome to KMRL IntelliDocs Operational Copilot. Every single claim in my answers is grounded strictly in authorized Kochi Metro technical circulars, contracts, and inspection logs with verifiable page citations.',
      citations: [],
      timestamp: new Date().toISOString(),
      hasSufficientEvidence: true,
      modelUsed: 'gemini-3.7-flash',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleQuestions = [
    {
      en: 'What is the required CBI safety testing protocol before line energization?',
      ml: 'ലൈൻ ഊർജ്ജസ്വലമാക്കുന്നതിന് മുമ്പ് പാലിക്കേണ്ട CBI സുരക്ഷാ പരിശോധനാ പ്രോട്ടോക്കോൾ എന്താണ്?',
      hi: 'लाइन ऊर्जीकरण से पहले आवश्यक सीबीआई सुरक्षा परीक्षण प्रोटोकॉल क्या है?',
      ta: 'மின்மயமாக்கலுக்கு முன் தேவையான CBI பாதுகாப்பு நெறிமுறை என்ன?',
    },
    {
      en: 'What are the penalty clauses for HVAC chiller downtime at Aluva & Edappally stations?',
      ml: 'ആലുവ, ഇടപ്പള്ളി സ്റ്റേഷനുകളിലെ HVAC ചില്ലർ തകരാറുകൾക്കുള്ള പിഴ വ്യവസ്ഥകൾ എന്തൊക്കെയാണ്?',
      hi: 'अलुवा और एडपल्ली स्टेशनों पर एचवीएसी चिलर डाउनटाइम के लिए क्या जुर्माना खंड हैं?',
      ta: 'அலுவா மற்றும் இடப்பள்ளி நிலையங்களில் HVAC சில்லர் செயலிழப்புக்கான அபராத விதிகள் என்ன?',
    },
    {
      en: 'What wheelset wear defect was recorded on trainset TS-09 during Muttom depot inspection?',
      ml: 'മുട്ടം ഡിപ്പോ പരിശോധനയിൽ ട്രെയിൻസെറ്റ് TS-09 ൽ രേഖപ്പെടുത്തിയ വീൽസെറ്റ് തകരാർ എന്താണ്?',
      hi: 'मुत्तम डिपो निरीक्षण के दौरान ट्रेनसेट TS-09 पर कौन सा व्हीलसेट दोष दर्ज किया गया था?',
      ta: 'முட்டம் பணிமனை சோதனையில் TS-09 ரயிலில் கண்டறியப்பட்ட குறைபாடு என்ன?',
    },
    {
      en: 'What changed between the baseline and revised station HVAC contract regarding payment terms?',
      ml: 'പേയ്‌മെന്റ് നിബന്ധനകളുമായി ബന്ധപ്പെട്ട് സ്റ്റേഷൻ HVAC കരാറിന്റെ പുതിയ പതിപ്പിൽ വന്ന മാറ്റങ്ങൾ എന്തൊക്കെയാണ്?',
      hi: 'भुगतान शर्तों के संबंध में संशोधित स्टेशन एचवीएसी अनुबंध में क्या बदलाव हुए हैं?',
      ta: 'நிலைய HVAC ஒப்பந்தத்தில் பணம் செலுத்தும் விதிமுறைகளில் என்ன மாற்றங்கள் செய்யப்பட்டுள்ளன?',
    },
  ];

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      citations: [],
      timestamp: new Date().toISOString(),
      hasSufficientEvidence: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          language,
        }),
      });

      const data = await response.json();

      const copilotMsg: CopilotMessage = {
        id: `copilot-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'No response generated.',
        citations: data.citations || [],
        timestamp: new Date().toISOString(),
        hasSufficientEvidence: data.hasSufficientEvidence ?? true,
        modelUsed: data.modelUsed || 'gemini-3.7-flash',
      };

      setMessages((prev) => [...prev, copilotMsg]);
    } catch (err: any) {
      console.error('Copilot request failed:', err);
      const errorMsg: CopilotMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Failed to connect to KMRL intelligence engine. Please ensure documents are loaded.',
        citations: [],
        timestamp: new Date().toISOString(),
        hasSufficientEvidence: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-4 max-w-5xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/60 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100">
                Evidence-Based AI Copilot
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Gemini 3.7 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Strict Policy: <strong className="text-teal-300">NO EVIDENCE → NO CLAIM</strong>
            </p>
          </div>
        </div>

        {/* Language & Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            {(['en', 'ml', 'hi', 'ta'] as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onChangeLanguage(lang)}
                className={`px-2 py-1 rounded text-[11px] uppercase font-mono font-semibold transition-colors ${
                  language === lang
                    ? 'bg-cyan-900 text-cyan-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-700/60 flex items-center justify-center text-teal-300 font-bold text-xs shrink-0 mt-1">
                  AI
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                  isUser
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-cyan-950/40'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-lg'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-4 text-[10px] font-mono opacity-80 border-b border-white/10 pb-1.5">
                  <span className="font-semibold">
                    {isUser ? 'Operational Officer' : 'KMRL Copilot'}
                  </span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Content */}
                <div className="text-xs leading-relaxed whitespace-pre-wrap selection:bg-teal-900">
                  {msg.content}
                </div>

                {/* Evidence Citations (Strict Proof) */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Document Citations ({msg.citations.length})
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cit, idx) => (
                        <EvidenceBadge
                          key={idx}
                          docTitle={cit.docTitle}
                          pageNumber={cit.pageNumber}
                          evidenceText={cit.evidenceText}
                          onClick={() => cit.docId && onSelectDocument(cit.docId)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Insufficient Evidence Warning */}
                {!isUser && msg.hasSufficientEvidence === false && (
                  <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-300 text-[11px] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>No unverified speculation was made. Grounded strictly in available corpus.</span>
                  </div>
                )}

                {/* Message Footer Copy Action */}
                {!isUser && (
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono transition-colors"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy Answer'}</span>
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-cyan-900 border border-cyan-700/60 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-1">
                  ME
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-700/60 flex items-center justify-center text-teal-300 font-bold text-xs shrink-0">
              AI
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-3 text-xs font-mono shadow-lg">
              <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
              <span>Synthesizing authorized KMRL records with citations...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested 1-Click Operational Questions */}
      <div className="shrink-0 space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold block">
          Suggested Operational Queries (1-Click Test)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleQuestions.map((sq, idx) => {
            const label = sq[language] || sq.en;
            return (
              <button
                key={idx}
                onClick={() => handleSend(label)}
                disabled={isLoading}
                className="text-left px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-700/60 text-slate-300 hover:text-cyan-200 text-xs transition-all truncate"
              >
                💡 {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Prompt Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="shrink-0 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-xl focus-within:border-cyan-500 transition-colors"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about safety circulars, contracts, inspections, or deadlines..."
          className="flex-1 px-3 py-2 bg-transparent text-slate-100 text-xs focus:outline-none placeholder:text-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-950/60 transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
