/**
 * KMRL IntelliDocs - Internationalization (i18n)
 * Supported languages: English (en), Malayalam (ml), Hindi (hi), Tamil (ta)
 */

export type SupportedLanguage = 'en' | 'ml' | 'hi' | 'ta';

export interface Translations {
  appName: string;
  subtitle: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  coreFlow: string;
  navDashboard: string;
  navDocuments: string;
  navSearch: string;
  navCopilot: string;
  navKnowledgeGraph: string;
  navRiskRadar: string;
  navConflictRadar: string;
  navChangeImpact: string;
  navActions: string;
  navDeadlines: string;
  navCompliance: string;
  navApprovals: string;
  navAuditTrail: string;
  navAnalytics: string;
  navAdmin: string;
  uploadDocBtn: string;
  loadSampleBtn: string;
  totalDocs: string;
  docsProcessed: string;
  pendingActions: string;
  overdueActions: string;
  activeRisks: string;
  verifiedConflicts: string;
  processingVol: string;
  completedActions: string;
  searchPlaceholder: string;
  copilotPlaceholder: string;
  noEvidenceNoClaim: string;
  blastRadiusHeader: string;
  blastRadiusSub: string;
  diffOldVsNew: string;
  humanReviewRequired: string;
  approve: string;
  reject: string;
  verifyRisk: string;
  viewEvidence: string;
  emptyNoDocs: string;
  emptyNoRisks: string;
  emptyNoConflicts: string;
  emptyNoActions: string;
  emptyNoActivity: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'KMRL IntelliDocs',
    subtitle: 'AI-Powered Document Intelligence & Operational Automation',
    tagline: 'Turning Document Overload into Actionable Intelligence',
    heroHeadline: 'From Document Overload to Actionable Intelligence',
    heroSubheadline: 'Kochi Metro Rail Limited Enterprise Document Cognition, Inter-Departmental Blast Radius Simulation & Automated Governance',
    coreFlow: 'DOCUMENT → INTELLIGENCE → IMPACT → ACTION → DECISION → AUDIT',
    navDashboard: 'Dashboard',
    navDocuments: 'Documents',
    navSearch: 'Semantic Search',
    navCopilot: 'AI Copilot',
    navKnowledgeGraph: 'Knowledge Graph',
    navRiskRadar: 'Risk Radar',
    navConflictRadar: 'Conflict Radar',
    navChangeImpact: 'Change Impact Simulator',
    navActions: 'Actions',
    navDeadlines: 'Deadlines',
    navCompliance: 'Compliance Checker',
    navApprovals: 'Approvals & Workflow',
    navAuditTrail: 'Audit Trail',
    navAnalytics: 'Analytics',
    navAdmin: 'Admin & DB Schema',
    uploadDocBtn: 'Ingest Document',
    loadSampleBtn: 'Load KMRL Operational Suite',
    totalDocs: 'Total Documents',
    docsProcessed: 'Documents Processed',
    pendingActions: 'Pending Actions',
    overdueActions: 'Overdue Actions',
    activeRisks: 'Active Risks',
    verifiedConflicts: 'Verified Conflicts',
    processingVol: 'Processing Volume',
    completedActions: 'Completed Actions',
    searchPlaceholder: 'Search across all authorized technical documents, contracts & SOPs...',
    copilotPlaceholder: 'Ask anything about your authorized KMRL documents with strict evidence citations...',
    noEvidenceNoClaim: 'Strict Evidence Verification: If evidence is not in authorized documents, no claim will be made.',
    blastRadiusHeader: 'Operational Blast Radius & Dependency Impact',
    blastRadiusSub: 'We don\'t just detect what changed. We determine what that change will affect.',
    diffOldVsNew: 'Version Comparison & Clause Diffs',
    humanReviewRequired: 'Human-in-the-Loop Governance Sign-Off Required',
    approve: 'Approve & Sanction',
    reject: 'Reject Change',
    verifyRisk: 'Verify Risk',
    viewEvidence: 'Inspect Source Evidence',
    emptyNoDocs: 'No documents uploaded yet. Ingest a document or load the KMRL operational suite to begin.',
    emptyNoRisks: 'No active risks detected in authorized documents.',
    emptyNoConflicts: 'No inter-document contradictions or clause conflicts detected.',
    emptyNoActions: 'No pending actions extracted.',
    emptyNoActivity: 'No audit logs recorded yet.'
  },
  ml: {
    appName: 'കെ.എം.ആർ.എൽ ഇന്റലിഡോക്സ്',
    subtitle: 'കൊച്ചി മെട്രോ ഡോക്യുമെന്റ് ഇന്റലിജൻസ് & ഓപ്പറേഷണൽ ഓട്ടോമേഷൻ',
    tagline: 'രേഖകളുടെ ബാഹുല്യത്തിൽ നിന്ന് കൃത്യമായ പ്രവർത്തന നടപടികളിലേക്ക്',
    heroHeadline: 'രേഖകളുടെ ബാഹുല്യത്തിൽ നിന്ന് പ്രവർത്തന ഇന്റലിജൻസിലേക്ക്',
    heroSubheadline: 'കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ് എന്റർപ്രൈസ് ഡോക്യുമെന്റ് ഇൻഫറൻസ് & ഇംപാക്ട് സിമുലേഷൻ',
    coreFlow: 'ഡോക്യുമെന്റ് → ഇന്റലിജൻസ് → ഇംപാക്ട് → ആക്ഷൻ → തീരുമാനം → ഓഡിറ്റ്',
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navDocuments: 'രേഖകൾ (Documents)',
    navSearch: 'സെമാന്റിക് സെർച്ച്',
    navCopilot: 'എ.ഐ കോപൈലറ്റ്',
    navKnowledgeGraph: 'നോളജ് ഗ്രാഫ്',
    navRiskRadar: 'റിസ്ക് റഡാർ',
    navConflictRadar: 'കോൺഫ്ലിക്റ്റ് റഡാർ',
    navChangeImpact: 'ചേഞ്ച് ഇംപാക്ട് സിമുലേറ്റർ',
    navActions: 'നടപടിക്രമങ്ങൾ (Actions)',
    navDeadlines: 'സമയപരിധികൾ (Deadlines)',
    navCompliance: 'കംപ്ലയൻസ് ചെക്കർ',
    navApprovals: 'അംഗീകാരങ്ങൾ (Approvals)',
    navAuditTrail: 'ഓഡിറ്റ് ട്രയൽ',
    navAnalytics: 'അനലിറ്റിക്സ്',
    navAdmin: 'അഡ്മിൻ & സ്കീമ',
    uploadDocBtn: 'രേഖ അപ്‌ലോഡ് ചെയ്യുക',
    loadSampleBtn: 'കെ.എം.ആർ.എൽ ടെസ്റ്റ് രേഖകൾ ലോഡ് ചെയ്യുക',
    totalDocs: 'ആകെ രേഖകൾ',
    docsProcessed: 'പ്രോസസ് ചെയ്തവ',
    pendingActions: 'ബാക്കി നടപടികൾ',
    overdueActions: 'കാലതാമസം വന്നവ',
    activeRisks: 'സാധ്യതയുള്ള റിസ്കുകൾ',
    verifiedConflicts: 'സ്ഥിരീകരിച്ച പൊരുത്തക്കേടുകൾ',
    processingVol: 'പ്രോസസ്സിംഗ് വോളിയം',
    completedActions: 'പൂർത്തിയായ നടപടികൾ',
    searchPlaceholder: 'അംഗീകൃത സാങ്കേതിക രേഖകളിൽ തിരയുക...',
    copilotPlaceholder: 'രേഖകളെക്കുറിച്ച് തെളിവ് സഹിതം എന്തിനെക്കുറിച്ചും ചോദിക്കുക...',
    noEvidenceNoClaim: 'കർശനമായ തെളിവ് വ്യവസ്ഥ: രേഖകളിൽ തെളിവില്ലെങ്കിൽ അനുമാനങ്ങൾ നൽകില്ല.',
    blastRadiusHeader: 'ഓപ്പറേഷണൽ ബ്ലാസ്റ്റ് റേഡിയസ് ഇംപാക്ട്',
    blastRadiusSub: 'എന്ത് മാറി എന്ന് മാത്രമല്ല, അത് മറ്റ് വിഭാഗങ്ങളെ എങ്ങനെ ബാധിക്കുമെന്നും നിർണ്ണയിക്കുന്നു.',
    diffOldVsNew: 'പതിപ്പ് വ്യത്യാസങ്ങൾ (Version Diff)',
    humanReviewRequired: 'മനുഷ്യ മേൽനോട്ട അനുമതി ആവശ്യമാണ്',
    approve: 'അംഗീകരിക്കുക',
    reject: 'നിരസിക്കുക',
    verifyRisk: 'റിസ്ക് സ്ഥിരീകരിക്കുക',
    viewEvidence: 'തെളിവ് പരിശോധിക്കുക',
    emptyNoDocs: 'രേഖകൾ ഒന്നും ലഭ്യമായിട്ടില്ല.',
    emptyNoRisks: 'റിസ്കുകൾ ഒന്നും കണ്ടെത്തിയിട്ടില്ല.',
    emptyNoConflicts: 'പൊരുത്തക്കേടുകൾ ഒന്നും കണ്ടെത്തിയിട്ടില്ല.',
    emptyNoActions: 'നടപടിക്രമങ്ങൾ ഒന്നും ശേഷിക്കുന്നില്ല.',
    emptyNoActivity: 'ഓഡിറ്റ് വിവരങ്ങൾ ലഭ്യമല്ല.'
  },
  hi: {
    appName: 'केएमआरएल इंटेलिजेंस डॉक्स',
    subtitle: 'एआई-संचालित दस्तावेज़ इंटेलिजेंस और परिचालन स्वचालन',
    tagline: 'दस्तावेज़ अधिभार से कार्रवाई योग्य बुद्धिमत्ता तक',
    heroHeadline: 'दस्तावेज़ अधिभार से कार्रवाई योग्य बुद्धिमत्ता की ओर',
    heroSubheadline: 'कोच्चि मेट्रो रेल लिमिटेड उद्यम दस्तावेज़ संज्ञान एवं प्रभाव सिमुलेशन',
    coreFlow: 'दस्तावेज़ → बुद्धिमत्ता → प्रभाव → कार्रवाई → निर्णय → ऑडिट',
    navDashboard: 'डैशबोर्ड',
    navDocuments: 'दस्तावेज़',
    navSearch: 'सिमेंटिक खोज',
    navCopilot: 'एआई कोपायलट',
    navKnowledgeGraph: 'ज्ञान आरेख (Knowledge Graph)',
    navRiskRadar: 'जोखिम रडार',
    navConflictRadar: 'विरोधाभास रडार',
    navChangeImpact: 'परिवर्तन प्रभाव सिम्युलेटर',
    navActions: 'कार्रवाईयाँ (Actions)',
    navDeadlines: 'अंतिम तिथियाँ (Deadlines)',
    navCompliance: 'अनुपालन जाँचकर्ता',
    navApprovals: 'अनुमोदन एवं कार्यप्रवाह',
    navAuditTrail: 'ऑडिट ट्रेल',
    navAnalytics: 'एनालिटिक्स',
    navAdmin: 'व्यवस्थापक और स्कीमा',
    uploadDocBtn: 'दस्तावेज़ अपलोड करें',
    loadSampleBtn: 'केएमआरएल टेस्ट सूट लोड करें',
    totalDocs: 'कुल दस्तावेज़',
    docsProcessed: 'संसाधित दस्तावेज़',
    pendingActions: 'लंबित कार्रवाइयां',
    overdueActions: 'अतिदेय कार्रवाइयां',
    activeRisks: 'सक्रिय जोखिम',
    verifiedConflicts: 'सत्यापित विरोधाभास',
    processingVol: 'प्रसंस्करण मात्रा',
    completedActions: 'पूर्ण कार्रवाइयां',
    searchPlaceholder: 'अधिकृत तकनीकी दस्तावेज़ों में खोजें...',
    copilotPlaceholder: 'कड़े दस्तावेजी साक्ष्यों के साथ कुछ भी पूछें...',
    noEvidenceNoClaim: 'कड़ा साक्ष्य नियम: दस्तावेज़ में साक्ष्य न होने पर कोई दावा नहीं किया जाएगा।',
    blastRadiusHeader: 'परिचालन प्रभाव और निर्भरता विश्लेषण (Blast Radius)',
    blastRadiusSub: 'हम केवल यह नहीं देखते कि क्या बदला, बल्कि यह निर्धारित करते हैं कि इसका क्या प्रभाव होगा।',
    diffOldVsNew: 'संस्करण तुलना (Version Diff)',
    humanReviewRequired: 'मानवीय समीक्षा एवं अनुमोदन आवश्यक',
    approve: 'स्वीकृत करें',
    reject: 'अस्वीकृत करें',
    verifyRisk: 'जोखिम सत्यापित करें',
    viewEvidence: 'साक्ष्य देखें',
    emptyNoDocs: 'अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया है।',
    emptyNoRisks: 'कोई सक्रिय जोखिम नहीं मिला।',
    emptyNoConflicts: 'कोई विरोधाभास नहीं मिला।',
    emptyNoActions: 'कोई लंबित कार्रवाई नहीं है।',
    emptyNoActivity: 'कोई ऑडिट लॉग दर्ज नहीं हुआ है।'
  },
  ta: {
    appName: 'கே.எம்.ஆர்.எல் இன்டெல்லி டாக்ஸ்',
    subtitle: 'கொச்சி மெட்ரோ ஆவண நுண்ணறிவு மற்றும் தானியக்க அமைப்பு',
    tagline: 'ஆவண சுமையிலிருந்து செயல்திறன் மிக்க நுண்ணறிவுக்கு',
    heroHeadline: 'ஆவண சுமையிலிருந்து செயல்திறன் நுண்ணறிவுக்கு',
    heroSubheadline: 'கொச்சி மெட்ரோ ரயில் நிறுவன ஆவண பகுப்பாய்வு & தாக்கம் உருவகப்படுத்துதல்',
    coreFlow: 'ஆவணம் → நுண்ணறிவு → தாக்கம் → செயல் → முடிவு → தணிக்கை',
    navDashboard: 'டாஷ்போர்டு',
    navDocuments: 'ஆவணங்கள்',
    navSearch: 'பொருள்சார் தேடல்',
    navCopilot: 'AI துணை வழிகாட்டி',
    navKnowledgeGraph: 'அறிவு வரைபடம்',
    navRiskRadar: 'இடர் கண்டறிதல் (Risk Radar)',
    navConflictRadar: 'முரண்பாடு கண்டறிதல்',
    navChangeImpact: 'மாற்ற தாக்க உருவகப்படுத்தி',
    navActions: 'செயல்பாடுகள்',
    navDeadlines: 'காலக்கெடு',
    navCompliance: 'இணக்கத்தன்மை சரிபார்ப்பு',
    navApprovals: 'ஒப்புதல்கள்',
    navAuditTrail: 'தணிக்கை பதிவு',
    navAnalytics: 'பகுப்பாய்வு',
    navAdmin: 'நிர்வாகம் & தரவுத்தளம்',
    uploadDocBtn: 'ஆவணம் பதிவேற்றவும்',
    loadSampleBtn: 'மாதிரி ஆவணங்களை ஏற்றவும்',
    totalDocs: 'மொத்த ஆவணங்கள்',
    docsProcessed: 'செயலாக்கப்பட்டவை',
    pendingActions: 'நிலுவையில் உள்ள செயல்கள்',
    overdueActions: 'காலாவதியான செயல்கள்',
    activeRisks: 'செயலில் உள்ள இடர்கள்',
    verifiedConflicts: 'சரிபார்க்கப்பட்ட முரண்பாடுகள்',
    processingVol: 'செயலாக்க அளவு',
    completedActions: 'நிறைவுற்ற செயல்கள்',
    searchPlaceholder: 'அங்கீகரிக்கப்பட்ட ஆவணங்களில் தேடவும்...',
    copilotPlaceholder: 'சான்றுகளுடன் கூடிய பதில்களுக்கு கேட்கவும்...',
    noEvidenceNoClaim: 'ஆதார விதி: ஆவணங்களில் சான்று இல்லையெனில் கருத்து உருவாக்கப்படாது.',
    blastRadiusHeader: 'இயக்க தாக்கம் மற்றும் சார்பு சங்கிலி',
    blastRadiusSub: 'என்ன மாறியது என்பதை மட்டுமல்லாமல், அது எவற்றையெல்லாம் பாதிக்கும் என்பதையும் கணிக்கிறோம்.',
    diffOldVsNew: 'பதிப்பு வேறுபாடுகள்',
    humanReviewRequired: 'மனித ஒப்புதல் தேவைப்படுகிறது',
    approve: 'ஒப்புதல் அளி',
    reject: 'நிராகரி',
    verifyRisk: 'இடரை உறுதிப்படுத்து',
    viewEvidence: 'ஆதாரத்தை பார்க்க',
    emptyNoDocs: 'ஆவணங்கள் இன்னும் பதிவேற்றப்படவில்லை.',
    emptyNoRisks: 'இடர்கள் எதுவும் இல்லை.',
    emptyNoConflicts: 'முரண்பாடுகள் எதுவும் இல்லை.',
    emptyNoActions: 'செயல்கள் எதுவும் இல்லை.',
    emptyNoActivity: 'தணிக்கை பதிவுகள் இல்லை.'
  }
};
