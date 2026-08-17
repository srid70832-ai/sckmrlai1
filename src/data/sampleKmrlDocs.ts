/**
 * KMRL IntelliDocs - Authentic Operational Test Suite
 * SIH25080: Kochi Metro Rail Limited Document Set
 * Includes real technical terminology, actual station names (Aluva, Edappally, MG Road, Petta, Thykoodam),
 * contracts, maintenance circulars, and versioned amendments for impact simulation.
 */

import { DocumentRecord, RiskItem, ConflictItem, ActionItem, DeadlineItem, ComplianceCheck, ChangeImpactReport } from '../types';

export const SAMPLE_KMRL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'kmrl-doc-001',
    title: 'Signaling & Interlocking Safety Circular No. SIG-2026-04',
    refNumber: 'KMRL/S&T/CIRC/2026/04',
    docType: 'SAFETY_DIRECTIVE',
    department: 'Signaling & Telecom',
    recommendedDepartment: 'Signaling & Telecom',
    routingReason: 'Document strictly addresses CBI (Computer Based Interlocking) fail-safe relays, axle counter redundancy, and point machine testing protocol between Aluva and Petta corridor.',
    routingEvidence: 'Page 1, Section 1.2: "Applicable to all S&T Maintenance Engineers across Phase 1 Aluva to Petta corridor."',
    status: 'COMPLETED',
    uploadDate: '2026-08-10T10:30:00Z',
    version: '1.0',
    fileSize: '2.4 MB',
    pagesCount: 3,
    summary: 'Mandatory technical circular mandating weekly insulation testing of point machines and fail-safe CBI diagnostic logs verification across Muttom Depot and 22 operational stations before 04:30 AM non-revenue hours window.',
    confidenceScore: 0.98,
    riskScore: 'HIGH',
    uploadedBy: 'Rajesh K. Varma (Chief S&T Engineer)',
    tags: ['Signaling', 'CBI Interlocking', 'Point Machine', 'Muttom Depot', 'Safety Mandate'],
    pages: [
      {
        pageNumber: 1,
        ocrConfidence: 0.99,
        text: `KOCHI METRO RAIL LIMITED (KMRL)
SIGNALING & TELECOMMUNICATION WING - REVENUE OPERATIONS DIVISION
Ref: KMRL/S&T/CIRC/2026/04                                    Date: 10th August 2026

SUBJECT: MANDATORY PROTOCOL FOR CBI FAIL-SAFE RELAYS & POINT MACHINE INSULATION TESTING

1.1 Purpose & Scope:
In light of recent monsoon humidity spikes recorded at Muttom Depot yard and Kalamassery interlocking zones, this directive establishes revised weekly diagnostic routines for all Computer Based Interlocking (CBI) fail-safe relays and point machine motor insulation resistance.

1.2 Operational Window:
All physical trackside inspections and point drive resistance measurements must strictly be conducted during non-revenue shadow block hours between 01:00 AM and 04:15 AM. Power isolation certificate (PTW) must be signed by SCADA Traction Controller prior to track entry.`,
        extractedClauses: [
          'Weekly insulation testing mandatory for all 48 track point machines',
          'Inspections strictly confined to 01:00 AM - 04:15 AM shadow block window',
          'Traction power PTW mandatory before track entry'
        ],
        keyHighlights: ['Point Machine Insulation', 'Muttom Depot Interlocking', '01:00 AM - 04:15 AM Window']
      },
      {
        pageNumber: 2,
        ocrConfidence: 0.97,
        text: `2.0 TECHNICAL SPECIFICATIONS & THRESHOLD LIMITS

2.1 Point Machine Motor Insulation:
Motor winding insulation resistance shall not fall below 10 Mega-Ohms when tested with a 500V DC calibrated Megger. If resistance drops below 15 Mega-Ohms, preventive silicone encapsulation and heater check must be completed within 24 hours.

2.2 Axle Counter Wheel Sensor Cleaning:
High-frequency axle counter detection heads at Edappally, Kaloor, and Maharaja's College stations must be cleansed of metallic brake dust debris every 7 days.

2.3 Compliance Deadline:
First complete audit round and digital log upload to KMRL Asset Management Portal (K-AMP) must be concluded by 25th August 2026 by S&T Section Engineers.`,
        extractedClauses: [
          'Insulation resistance minimum limit is 10 Mega-Ohms at 500V DC',
          'Warning threshold 15 M-Ohms requires mitigation within 24 hours',
          'Audit compliance deadline: 25th August 2026'
        ],
        keyHighlights: ['10 M-Ohm threshold', 'Axle Counter Cleaning', 'Audit Due: 25th August 2026']
      },
      {
        pageNumber: 3,
        ocrConfidence: 0.98,
        text: `3.0 ESCALATION & RESPONSIBILITY MATRIX

3.1 Action Items Assigned:
- Sri. Aneesh Nair (Senior Section Engineer, S&T Muttom): Submit depot point machine logs by 20th August 2026.
- Smt. Priya Raman (Executive Engineer, Signals): Conduct surprise joint audit with Safety Directorate at Edappally junction by 22nd August 2026.

3.2 Penalty for Non-Compliance:
Any unrectified point detection failure causing train speed restriction (>25 kmph TSR) during peak passenger hours (08:00 - 10:30 AM) will trigger immediate inquiry under KMRL Safety Regulation Sec 14(b).

Approved By:
Director (Systems & Operations)
Kochi Metro Rail Limited`,
        extractedClauses: [
          'Muttom depot point machine logs due 20th August 2026',
          'Joint Safety audit at Edappally junction due 22nd August 2026',
          'TSR penalty clause under KMRL Safety Regulation Sec 14(b)'
        ],
        keyHighlights: ['Aneesh Nair & Priya Raman assigned', 'Penalties for Speed Restrictions']
      }
    ],
    entities: [
      { id: 'ent-1', docId: 'kmrl-doc-001', type: 'PROJECT', name: 'Phase 1 Metro Corridor', pageNumber: 1, evidenceText: 'Phase 1 Aluva to Petta corridor', confidence: 0.99 },
      { id: 'ent-2', docId: 'kmrl-doc-001', type: 'VENDOR', name: 'Alstom Transport India', value: 'Signaling OEM', pageNumber: 1, evidenceText: 'CBI fail-safe relays and point machine motor', confidence: 0.95 },
      { id: 'ent-3', docId: 'kmrl-doc-001', type: 'STATION', name: 'Muttom Depot', pageNumber: 1, evidenceText: 'monsoon humidity spikes recorded at Muttom Depot yard', confidence: 0.99 },
      { id: 'ent-4', docId: 'kmrl-doc-001', type: 'STATION', name: 'Edappally Station', pageNumber: 2, evidenceText: 'axle counter detection heads at Edappally, Kaloor', confidence: 0.98 },
      { id: 'ent-5', docId: 'kmrl-doc-001', type: 'EQUIPMENT', name: 'Point Machine 48-A', value: 'Track Switch', pageNumber: 2, evidenceText: 'Motor winding insulation resistance shall not fall below 10 Mega-Ohms', confidence: 0.96 },
      { id: 'ent-6', docId: 'kmrl-doc-001', type: 'DEADLINE', name: 'Point Log Submission Deadline', value: '2026-08-20', pageNumber: 3, evidenceText: 'Submit depot point machine logs by 20th August 2026', confidence: 0.99 },
      { id: 'ent-7', docId: 'kmrl-doc-001', type: 'DEADLINE', name: 'S&T First Audit Compliance', value: '2026-08-25', pageNumber: 2, evidenceText: 'First complete audit round must be concluded by 25th August 2026', confidence: 0.99 }
    ]
  },
  {
    id: 'kmrl-doc-002',
    title: 'Station HVAC & Chiller Energy Contract Agreement v1.0',
    refNumber: 'KMRL/PROC/CONT/2025/88-V1',
    docType: 'CONTRACT',
    department: 'Procurement & Contracts',
    recommendedDepartment: 'Procurement & Contracts',
    routingReason: 'Commercial HVAC operations & chiller energy performance contract for underground & elevated concourse cooling.',
    routingEvidence: 'Page 1, Clause 1.1: "Comprehensive Maintenance & Energy Performance Contracting for 16 Elevated Stations"',
    status: 'COMPLETED',
    uploadDate: '2026-06-15T09:00:00Z',
    version: '1.0',
    fileSize: '4.1 MB',
    pagesCount: 3,
    summary: 'Original service level agreement with Voltas-BlueStar JV for comprehensive maintenance of 450 TR water-cooled chillers across Phase 1 stations with guaranteed concourse temperature of 24°C ± 1.5°C and monthly billing cycle of ₹42,50,000.',
    confidenceScore: 0.96,
    riskScore: 'MEDIUM',
    uploadedBy: 'Gopalakrishnan Nair (DGM Procurement)',
    tags: ['HVAC', 'Chillers', 'Contract', 'Voltas JV', 'Energy Efficiency'],
    pages: [
      {
        pageNumber: 1,
        ocrConfidence: 0.98,
        text: `CONTRACT AGREEMENT - STATION HVAC MAINTENANCE & BMS INTEGRATION
Contract No: KMRL/PROC/CONT/2025/88 (Version 1.0)
Parties: Kochi Metro Rail Limited (Employer) AND M/s Voltas-BlueStar Infrastructure JV (Contractor)

1.1 Scope of Works:
Comprehensive annual maintenance, seasonal overhaul, and real-time Building Management System (BMS) telemetry integration of 32 Chiller units (450 TR each) and 96 Air Handling Units (AHUs) installed across Phase-1 elevated stations from Aluva to Ernakulam South.

1.2 Contract Period & Value:
Total contract tenure: 36 Months effective from 1st July 2025 to 30th June 2028.
Fixed monthly maintenance consideration: INR 42,50,000/- (Rupees Forty-Two Lakhs Fifty Thousand only) plus applicable GST.`,
        extractedClauses: [
          'Contract tenure: 36 Months (July 2025 to June 2028)',
          'Monthly consideration: INR 42,50,000 + GST',
          '32 Chillers and 96 AHUs across 16 elevated stations'
        ],
        keyHighlights: ['Contract Value ₹42.5 Lakh/mo', '36 Month Tenure', 'Voltas-BlueStar JV']
      },
      {
        pageNumber: 2,
        ocrConfidence: 0.96,
        text: `2.0 SERVICE LEVEL COMMITMENTS & SLA METRICS

2.1 Temperature & Humidity Standards:
Station concourse and ticketing hall ambient dry-bulb temperature shall strictly be maintained at 24.0°C ± 1.5°C with relative humidity below 65% during operational hours (05:30 to 22:30 IST).

2.2 Breakdown Response & MTTR:
In the event of chiller compressor trip, emergency technician must arrive on site within 45 minutes of automated SCADA alarm. Mean Time To Restore (MTTR) shall not exceed 3 hours.

2.3 Preventive Descaling Schedule:
Quarterly chemical descaling of condenser tube bundles shall be executed during first Sunday of every calendar quarter. Next due date: 15th September 2026.`,
        extractedClauses: [
          'Target temperature: 24°C ± 1.5°C, RH < 65%',
          'Technician arrival within 45 mins; MTTR max 3 hours',
          'Quarterly condenser descaling due: 15th September 2026'
        ],
        keyHighlights: ['24°C concourse target', '45 min SLA arrival', 'Next descaling 15 Sep 2026']
      },
      {
        pageNumber: 3,
        ocrConfidence: 0.97,
        text: `3.0 PAYMENT MILESTONES & LIQUIDATED DAMAGES

3.1 Invoicing Cycle:
Monthly invoices shall be submitted by 5th of each succeeding month accompanied by SCADA temperature uptime logs verified by Station Controller. Payment clearance window: 30 days from submission.

3.2 Penalty for SLA Breach:
Failure to maintain ambient temperature below 26.0°C for more than 2 consecutive hours will incur SLA penalty deduction of INR 50,000 per station-day.

Signed on 15th June 2025 at JLN Stadium Headquarters, Kochi.`,
        extractedClauses: [
          'Invoices submitted by 5th of succeeding month',
          'Payment window 30 days post verification',
          'SLA penalty: INR 50,000 per station-day for breach > 26°C'
        ],
        keyHighlights: ['Invoicing by 5th', '₹50,000 SLA penalty']
      }
    ],
    entities: [
      { id: 'ent-8', docId: 'kmrl-doc-002', type: 'CONTRACT', name: 'Station HVAC SLA Contract v1.0', value: 'KMRL/PROC/CONT/2025/88', pageNumber: 1, evidenceText: 'Contract No: KMRL/PROC/CONT/2025/88 (Version 1.0)', confidence: 0.99 },
      { id: 'ent-9', docId: 'kmrl-doc-002', type: 'VENDOR', name: 'Voltas-BlueStar JV', value: 'HVAC Contractor', pageNumber: 1, evidenceText: 'M/s Voltas-BlueStar Infrastructure JV', confidence: 0.98 },
      { id: 'ent-10', docId: 'kmrl-doc-002', type: 'PAYMENT', name: 'Monthly HVAC Retainer', value: '₹42,50,000 / month', pageNumber: 1, evidenceText: 'Fixed monthly maintenance consideration: INR 42,50,000/-', confidence: 0.99 },
      { id: 'ent-11', docId: 'kmrl-doc-002', type: 'DEADLINE', name: 'Condenser Descaling Due', value: '2026-09-15', pageNumber: 2, evidenceText: 'Next due date: 15th September 2026', confidence: 0.97 }
    ]
  },
  {
    id: 'kmrl-doc-003',
    title: 'Station HVAC & Chiller Energy Contract Amendment v2.0',
    refNumber: 'KMRL/PROC/CONT/2025/88-AMD-02',
    docType: 'POLICY_AMENDMENT',
    department: 'Procurement & Contracts',
    recommendedDepartment: 'Procurement & Contracts',
    routingReason: 'Formal contract amendment revising energy tariffs, SLA temperature thresholds, payment terms, and adding Phase 1A extension stations (Vadakkekotta & SN Junction).',
    routingEvidence: 'Page 1, Clause 1.0: "Addendum & Amendment 02 to HVAC Agreement KMRL/PROC/CONT/2025/88"',
    status: 'COMPLETED',
    uploadDate: '2026-08-12T14:15:00Z',
    version: '2.0',
    previousVersionId: 'kmrl-doc-002',
    fileSize: '3.8 MB',
    pagesCount: 3,
    summary: 'Critical Contract Amendment v2.0 increasing monthly consideration to ₹54,80,000 (+28.9%), revising concourse temperature limit to 25.5°C ± 1.0°C for green energy savings, extending scope to Vadakkekotta & SN Junction, and shortening payment terms from 30 days to 15 days.',
    confidenceScore: 0.99,
    riskScore: 'CRITICAL',
    uploadedBy: 'Gopalakrishnan Nair (DGM Procurement)',
    tags: ['HVAC Amendment', 'Budget Increase', 'Energy Policy', 'Blast Radius', 'Version 2.0'],
    pages: [
      {
        pageNumber: 1,
        ocrConfidence: 0.99,
        text: `KOCHI METRO RAIL LIMITED
AMENDMENT NO. 02 TO HVAC CONTRACT KMRL/PROC/CONT/2025/88 (Version 2.0)
Date of Execution: 12th August 2026
Effective Date: 1st September 2026

1.0 REVISED SCOPE & EXPANSION:
Pursuant to commissioning of Phase 1A extension, the scope of works is hereby augmented to incorporate 2 additional stations:
- Vadakkekotta Station (4 x 350 TR chillers)
- SN Junction Thripunithura Station (4 x 350 TR chillers)

1.1 REVISED MONTHLY CONSIDERATION:
Due to station scope addition (+8 chillers) and statutory minimum wage revisions, the revised fixed monthly consideration is revised from INR 42,50,000/- to INR 54,80,000/- (Rupees Fifty-Four Lakhs Eighty Thousand only) plus GST, representing an increase of INR 12,30,000/month (28.94%).`,
        extractedClauses: [
          'Scope expanded to Vadakkekotta and SN Junction stations',
          'Monthly payment increased from ₹42.50 Lakh to ₹54.80 Lakh (+28.94%)',
          'Effective Date: 1st September 2026'
        ],
        keyHighlights: ['Monthly Fee: ₹54,80,000', 'Scope Expansion Phase 1A', '+₹12.3 Lakh/mo Budget Impact']
      },
      {
        pageNumber: 2,
        ocrConfidence: 0.98,
        text: `2.0 REVISED ENERGY EFFICIENCY & TEMPERATURE SETPOINTS

2.1 Eco-Optimized Temperature Setting:
In compliance with Bureau of Energy Efficiency (BEE) National Green Metro Guidelines, station concourse ambient setpoint is modified from 24.0°C ± 1.5°C to 25.5°C ± 1.0°C. Peak demand chiller sequencing algorithm must be updated in BMS controller before 28th August 2026.

2.2 REVISED PAYMENT TERMS & CASH-FLOW REQUIREMENT:
Clause 3.1 is modified: Payment clearance window is drastically reduced from 30 calendar days to 15 calendar days post invoice submission to facilitate vendor supply chain liquidity.

2.3 Mandatory Advance Escrow:
KMRL Finance Wing must create dedicated sub-escrow account for Q3/Q4 HVAC payments totaling INR 3,28,80,000 before 1st September 2026.`,
        extractedClauses: [
          'Concourse temperature setpoint shifted to 25.5°C ± 1.0°C',
          'BMS algorithm update due by 28th August 2026',
          'Payment clearance window reduced from 30 days to 15 days',
          'Finance Escrow requirement: ₹3,28,80,000 by 1st September 2026'
        ],
        keyHighlights: ['Concourse setpoint 25.5°C', 'Payment window 15 days', 'Escrow ₹3.28 Cr due 1 Sep 2026']
      },
      {
        pageNumber: 3,
        ocrConfidence: 0.98,
        text: `3.0 INTER-DEPARTMENTAL IMPACT & GOVERNANCE

3.1 Finance & Accounts Approval:
Additional budget allocation of INR 1.476 Crores for FY 2026-27 requires Board approval at 48th KMRL Board Meeting scheduled for 30th August 2026.

3.2 Operations Directorate Sign-off:
Chief Operating Officer must issue circular to Station Controllers regarding passenger thermal comfort feedback handling for the 25.5°C revised setpoint.

Signatures:
Managing Director, KMRL                    Director, Voltas-BlueStar JV`,
        extractedClauses: [
          'Board approval required for additional ₹1.476 Cr budget on 30th August 2026',
          'Operations COO thermal comfort notification required',
          'Sign-off completed by MD KMRL'
        ],
        keyHighlights: ['Board Approval due 30 Aug 2026', 'Inter-departmental Finance & Ops Impact']
      }
    ],
    entities: [
      { id: 'ent-12', docId: 'kmrl-doc-003', type: 'CONTRACT', name: 'Station HVAC Amendment v2.0', value: 'KMRL/PROC/CONT/2025/88-AMD-02', pageNumber: 1, evidenceText: 'AMENDMENT NO. 02 TO HVAC CONTRACT KMRL/PROC/CONT/2025/88 (Version 2.0)', confidence: 0.99 },
      { id: 'ent-13', docId: 'kmrl-doc-003', type: 'VENDOR', name: 'Voltas-BlueStar JV', pageNumber: 1, evidenceText: 'Director, Voltas-BlueStar JV', confidence: 0.99 },
      { id: 'ent-14', docId: 'kmrl-doc-003', type: 'PAYMENT', name: 'Revised Monthly Fee', value: '₹54,80,000 / month', pageNumber: 1, evidenceText: 'revised fixed monthly consideration is revised from INR 42,50,000/- to INR 54,80,000/-', confidence: 0.99 },
      { id: 'ent-15', docId: 'kmrl-doc-003', type: 'DEADLINE', name: 'BMS Algorithm Update Due', value: '2026-08-28', pageNumber: 2, evidenceText: 'BMS controller before 28th August 2026', confidence: 0.98 },
      { id: 'ent-16', docId: 'kmrl-doc-003', type: 'DEADLINE', name: 'Escrow Account Creation', value: '2026-09-01', pageNumber: 2, evidenceText: 'escrow account totaling INR 3,28,80,000 before 1st September 2026', confidence: 0.99 },
      { id: 'ent-17', docId: 'kmrl-doc-003', type: 'APPROVAL', name: '48th KMRL Board Budget Approval', value: '₹1.476 Crore Allocation', pageNumber: 3, evidenceText: 'Board approval at 48th KMRL Board Meeting scheduled for 30th August 2026', confidence: 0.99 }
    ]
  },
  {
    id: 'kmrl-doc-004',
    title: 'Rolling Stock Bogie & Wheel Truing Inspection Protocol',
    refNumber: 'KMRL/RS/INS/2026/112',
    docType: 'INSPECTION_REPORT',
    department: 'Rolling Stock',
    recommendedDepartment: 'Rolling Stock',
    routingReason: 'Fleet wheel profile measurements, flange wear limits, and ultrasonic axle testing for 25 trainsets at Muttom Rolling Stock Depot.',
    routingEvidence: 'Page 1, Sec 1: "Ultrasonic Flaw Detection (UFD) and Underfloor Wheel Lathe Truing Schedule for KMRL 3-Car Trainsets"',
    status: 'COMPLETED',
    uploadDate: '2026-08-14T08:30:00Z',
    version: '1.0',
    fileSize: '3.1 MB',
    pagesCount: 2,
    summary: 'Bi-annual ultrasonic flaw detection report for 25 Alstom Metropolis 3-car rakes. Identified micro-spalling on Wheelset #14 of Trainset TS-09 exceeding 1.2mm depth threshold, requiring underfloor lathe wheel truing before 21st August 2026.',
    confidenceScore: 0.97,
    riskScore: 'HIGH',
    uploadedBy: 'Thomas George (DGM Rolling Stock)',
    tags: ['Rolling Stock', 'Wheel Truing', 'Trainset TS-09', 'Depot Lathe', 'Safety Inspection'],
    pages: [
      {
        pageNumber: 1,
        ocrConfidence: 0.98,
        text: `KOCHI METRO RAIL LIMITED - ROLLING STOCK DEPOT (MUTTOM)
TECHNICAL INSPECTION REPORT: BOGIE WHEEL PROFILES & UFD TESTING
Doc Ref: KMRL/RS/INS/2026/112                               Date: 14th August 2026

1.1 Executive Summary:
During scheduled 60,000 km periodic overhaul inspection on 25 trainsets (TS-01 through TS-25), non-destructive testing (NDT) via Ultrasonic Flaw Detection (UFD) was conducted on all intermediate motor and trailer axles.

1.2 Anomaly Flagged on Trainset TS-09:
Wheelset No. 14 (Trailer Car TC-09, Right Wheel) exhibited surface micro-spalling with depth measuring 1.45 mm, which exceeds the KMRL Maintenance Manual safety threshold of 1.00 mm.`,
        extractedClauses: [
          'Periodic 60,000 km overhaul on 25 trainsets',
          'TS-09 Wheelset 14 spalling depth 1.45 mm exceeds 1.00 mm limit'
        ],
        keyHighlights: ['TS-09 Defect Detected', '1.45mm Wheel Spalling', 'Exceeds Safety Threshold']
      },
      {
        pageNumber: 2,
        ocrConfidence: 0.96,
        text: `2.0 RECTIFICATION ACTION & TIMELINE

2.1 Underfloor Wheel Lathe (UWL) Scheduling:
Trainset TS-09 must be withdrawn from revenue passenger service on the night of 18th August 2026 and slotted into Muttom Bay-4 Underfloor Wheel Lathe for reprofiling to RDSO Type-29 standard profile.

2.2 Service Impact & Replacement Trainset:
Trainset TS-24 (Hot Standby Reserve) will be deployed into morning revenue loop #4 on 19th August 2026 to ensure zero headway degradation on Aluva - Thykoodam corridor.

2.3 Action Assigned:
- Sri. Sudheesh P. (Depot Incharge, Wheel Workshop): Complete lathe cut and submit post-truing laser gauge certificate by 21st August 2026.

Sign-off:
Chief Rolling Stock Engineer, KMRL`,
        extractedClauses: [
          'TS-09 withdrawn for lathe truing on 18th August 2026',
          'TS-24 deployed as hot standby on 19th August 2026',
          'Sudheesh P. to submit post-truing certificate by 21st August 2026'
        ],
        keyHighlights: ['Lathe cut due 18 Aug', 'Hot standby TS-24 deployed', 'Certificate due 21 Aug 2026']
      }
    ],
    entities: [
      { id: 'ent-18', docId: 'kmrl-doc-004', type: 'EQUIPMENT', name: 'Trainset TS-09', value: 'Alstom Metropolis 3-Car Rake', pageNumber: 1, evidenceText: 'Anomaly Flagged on Trainset TS-09: Wheelset No. 14', confidence: 0.99 },
      { id: 'ent-19', docId: 'kmrl-doc-004', type: 'STATION', name: 'Muttom Rolling Stock Depot', pageNumber: 1, evidenceText: 'Muttom Bay-4 Underfloor Wheel Lathe', confidence: 0.98 },
      { id: 'ent-20', docId: 'kmrl-doc-004', type: 'DEADLINE', name: 'TS-09 Lathe Truing Due', value: '2026-08-21', pageNumber: 2, evidenceText: 'submit post-truing laser gauge certificate by 21st August 2026', confidence: 0.98 },
      { id: 'ent-21', docId: 'kmrl-doc-004', type: 'TASK', name: 'Deploy Hot Standby TS-24', value: 'Revenue Service Protection', pageNumber: 2, evidenceText: 'Trainset TS-24 (Hot Standby Reserve) will be deployed', confidence: 0.96 }
    ]
  },
  {
    id: 'kmrl-doc-005',
    title: 'Traction Power Substation 33kV GIS Maintenance Directive',
    refNumber: 'KMRL/T&P/SOP/2026/55',
    docType: 'CIRCULAR',
    department: 'Traction & Power',
    recommendedDepartment: 'Traction & Power',
    routingReason: 'High voltage 33kV Gas Insulated Switchgear (GIS) SF6 gas pressure testing and 750V DC third rail feeder breaker calibration across receiving substations.',
    routingEvidence: 'Page 1: "Safety Operating Procedure for 33kV GIS at Kaloor and Aluva Receiving Sub-Stations (RSS)"',
    status: 'COMPLETED',
    uploadDate: '2026-08-11T11:00:00Z',
    version: '1.0',
    fileSize: '2.8 MB',
    pagesCount: 2,
    summary: 'Technical SOP for SF6 gas density monitoring and DC high-speed circuit breaker (HSCB) contact resistance testing at Kaloor & Aluva Receiving Sub-Stations, requiring mandatory SCADA alarm threshold verification by 27th August 2026.',
    confidenceScore: 0.96,
    riskScore: 'LOW',
    uploadedBy: 'K. R. Sivadas (Chief Electrical Engineer)',
    tags: ['Traction Power', '33kV GIS', 'SF6 Gas', 'Kaloor RSS', 'Third Rail'],
    pages: [
      {
        pageNumber: 1,
        ocrConfidence: 0.97,
        text: `KOCHI METRO RAIL LIMITED - TRACTION & POWER DISTRIBUTION WING
Directive No: KMRL/T&P/SOP/2026/55                           Date: 11th August 2026

SUBJECT: SF6 GAS DENSITY MONITORING & HSCB CALIBRATION AT RECEIVING SUBSTATIONS

1.0 Objective:
To prevent dielectric breakdown in 33kV Gas Insulated Switchgear (GIS) bays at Kaloor RSS (Receiving Substation) and Aluva RSS during high ambient humidity conditions.

1.1 SF6 Pressure Threshold:
Rated pressure is 0.55 MPa at 20°C. If Stage-1 alarm triggers at 0.50 MPa, immediate top-up and helium sniffer leak detection must be initiated within 4 hours. Under no condition shall breaker operate if pressure falls below Stage-2 lockout threshold of 0.45 MPa.`,
        extractedClauses: [
          'SF6 rated pressure 0.55 MPa; Stage 1 alarm at 0.50 MPa requires leak sniffer within 4 hours',
          'Stage 2 lockout threshold is 0.45 MPa'
        ],
        keyHighlights: ['SF6 gas pressure limits', 'Kaloor & Aluva RSS', '4-hour leak check SLA']
      },
      {
        pageNumber: 2,
        ocrConfidence: 0.98,
        text: `2.0 750V DC THIRD RAIL FEEDER BREAKERS

2.1 HSCB Calibration Window:
High Speed Circuit Breakers (HSCB) feeding the 750V DC third rail at Edappally and JLN Stadium substations must undergo contact timing calibration during the upcoming scheduled power shutdown on Sunday, 23rd August 2026.

2.2 Action Officer:
Sri. Binoy Mathew (Executive Engineer, Traction): Submit GIS SF6 pressure test reports and HSCB trip timing records to Central Control Centre (OCC) by 27th August 2026.`,
        extractedClauses: [
          'HSCB calibration during power shutdown on 23rd August 2026',
          'Binoy Mathew to submit test reports by 27th August 2026'
        ],
        keyHighlights: ['HSCB calibration 23 Aug', 'Report submission due 27 Aug 2026']
      }
    ],
    entities: [
      { id: 'ent-22', docId: 'kmrl-doc-005', type: 'EQUIPMENT', name: '33kV GIS Switchgear', value: 'Kaloor RSS', pageNumber: 1, evidenceText: '33kV Gas Insulated Switchgear (GIS) bays at Kaloor RSS', confidence: 0.98 },
      { id: 'ent-23', docId: 'kmrl-doc-005', type: 'DEADLINE', name: 'Traction SF6 Report Due', value: '2026-08-27', pageNumber: 2, evidenceText: 'Submit GIS SF6 pressure test reports by 27th August 2026', confidence: 0.98 }
    ]
  }
];

export const SAMPLE_RISKS: RiskItem[] = [
  {
    id: 'risk-001',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC & Chiller Energy Contract Amendment v2.0',
    title: 'Budget Deficit & Unapproved Escrow Allocation of ₹1.476 Crores',
    category: 'CONTRACT_RISK',
    severity: 'CRITICAL',
    status: 'DETECTED',
    pageNumber: 2,
    evidence: 'Clause 2.3: "KMRL Finance Wing must create dedicated sub-escrow account for Q3/Q4 HVAC payments totaling INR 3,28,80,000 before 1st September 2026." AND Clause 3.1: "Additional budget allocation of INR 1.476 Crores requires Board approval on 30th August 2026."',
    recommendedAction: 'Expedite Finance Directorate agenda note for 48th KMRL Board Meeting on 30th August 2026 and verify Treasury liquidity before 1st September 2026 deadline.',
    department: 'Finance & Accounts',
    createdAt: '2026-08-12T14:30:00Z'
  },
  {
    id: 'risk-002',
    docId: 'kmrl-doc-004',
    docTitle: 'Rolling Stock Bogie & Wheel Truing Inspection Protocol',
    title: 'Trainset TS-09 Flange Spalling Exceeding Safety Threshold (1.45mm vs 1.0mm)',
    category: 'COMPLIANCE_RISK',
    severity: 'HIGH',
    status: 'VERIFIED',
    pageNumber: 1,
    evidence: 'Page 1, Sec 1.2: "Wheelset No. 14 (Trailer Car TC-09, Right Wheel) exhibited surface micro-spalling with depth measuring 1.45 mm, which exceeds the KMRL Maintenance Manual safety threshold of 1.00 mm."',
    recommendedAction: 'Execute planned withdrawal of TS-09 on 18th August night and verify lathe reprofiling certificate before clearing trainset for revenue service.',
    department: 'Rolling Stock',
    createdAt: '2026-08-14T09:00:00Z',
    verifiedBy: 'Thomas George (DGM Rolling Stock)',
    verifiedAt: '2026-08-14T10:15:00Z'
  },
  {
    id: 'risk-003',
    docId: 'kmrl-doc-001',
    docTitle: 'Signaling & Interlocking Safety Circular No. SIG-2026-04',
    title: 'CBI Point Machine Insulation Degradation Risk During Monsoon Window',
    category: 'DEADLINE_RISK',
    severity: 'HIGH',
    status: 'VERIFIED',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.1: "Motor winding insulation resistance shall not fall below 10 Mega-Ohms... First complete audit round must be concluded by 25th August 2026."',
    recommendedAction: 'Deploy specialized S&T night-gangs at Muttom yard and Kalamassery junctions; verify Megger test readings before 25th August 2026.',
    department: 'Signaling & Telecom',
    createdAt: '2026-08-10T11:00:00Z',
    verifiedBy: 'Rajesh K. Varma (Chief S&T Engineer)',
    verifiedAt: '2026-08-11T08:30:00Z'
  },
  {
    id: 'risk-004',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC & Chiller Energy Contract Amendment v2.0',
    title: 'Vendor Payment Default Risk Under Shortened 15-Day Clearance SLA',
    category: 'DEPENDENCY_RISK',
    severity: 'MEDIUM',
    status: 'DETECTED',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.2: "Payment clearance window is drastically reduced from 30 calendar days to 15 calendar days post invoice submission."',
    recommendedAction: 'Streamline station controller verification workflow in SAP ERP to prevent SLA dispute or interest penalties from Voltas-BlueStar JV.',
    department: 'Procurement & Contracts',
    createdAt: '2026-08-12T14:35:00Z'
  }
];

export const SAMPLE_CONFLICTS: ConflictItem[] = [
  {
    id: 'conf-001',
    title: 'SLA Concourse Temperature Setpoint Contradiction (v1.0 vs v2.0)',
    conflictType: 'CLAUSE_INCONSISTENCY',
    severity: 'HIGH',
    status: 'ACTIVE',
    docAId: 'kmrl-doc-002',
    docATitle: 'Station HVAC Contract Agreement v1.0',
    pageA: 2,
    evidenceA: 'Clause 2.1: "Station concourse ambient dry-bulb temperature shall strictly be maintained at 24.0°C ± 1.5°C with relative humidity below 65%."',
    docBId: 'kmrl-doc-003',
    docBTitle: 'Station HVAC Contract Amendment v2.0',
    pageB: 2,
    evidenceB: 'Clause 2.1: "Station concourse ambient setpoint is modified from 24.0°C ± 1.5°C to 25.5°C ± 1.0°C. Peak demand chiller sequencing algorithm must be updated in BMS controller before 28th August 2026."',
    explanation: 'Amendment v2.0 raises the target temperature to 25.5°C for BEE green energy savings, directly conflicting with the original 24.0°C contractual passenger comfort SLA. Operating chillers under the old setpoint will violate energy targets and trigger vendor billing disputes.',
    recommendedResolution: 'Issue an immediate Operations Bulletin overriding the 24.0°C SLA with the revised 25.5°C setpoint and ensure BMS firmware parameters at all 18 stations are updated by 28th August 2026.',
    detectedAt: '2026-08-12T15:00:00Z'
  },
  {
    id: 'conf-002',
    title: 'Monthly Maintenance Fee & Payment Clearance Window Discrepancy',
    conflictType: 'AMOUNT_DISCREPANCY',
    severity: 'CRITICAL',
    status: 'ACTIVE',
    docAId: 'kmrl-doc-002',
    docATitle: 'Station HVAC Contract Agreement v1.0',
    pageA: 1,
    evidenceA: 'Clause 1.2: "Fixed monthly maintenance consideration: INR 42,50,000/- ... Payment clearance window: 30 days from submission."',
    docBId: 'kmrl-doc-003',
    docBTitle: 'Station HVAC Contract Amendment v2.0',
    pageB: 1,
    evidenceB: 'Clause 1.1: "revised fixed monthly consideration is revised to INR 54,80,000/-" AND Clause 2.2: "Payment clearance window is drastically reduced from 30 calendar days to 15 calendar days."',
    explanation: 'Contract v1.0 authorized ₹42.5 Lakh with 30-day payment term, whereas Amendment v2.0 mandates ₹54.8 Lakh (+₹12.3 Lakh/mo) with a strict 15-day term. Accounts department processing invoices under v1.0 terms will cause liquidity default and breach of new contract terms.',
    recommendedResolution: 'Update Vendor Master and PO schedules in KMRL SAP Financials to reflect ₹54,80,000 consideration and 15-day credit terms, subject to 30th August Board ratification.',
    detectedAt: '2026-08-12T15:05:00Z'
  }
];

export const SAMPLE_CHANGE_IMPACT_REPORTS: ChangeImpactReport[] = [
  {
    id: 'impact-001',
    title: 'HVAC Contract v1.0 → v2.0 Scope & Tariff Expansion Simulation',
    sourceDocId: 'kmrl-doc-002',
    sourceDocTitle: 'Station HVAC & Chiller Energy Contract Agreement v1.0',
    targetDocId: 'kmrl-doc-003',
    targetDocTitle: 'Station HVAC & Chiller Energy Contract Amendment v2.0',
    oldVersion: '1.0',
    newVersion: '2.0',
    summary: 'Comprehensive multi-department blast radius simulation of the HVAC Amendment v2.0 across Kochi Metro operations, finance treasury, energy telemetry, station comfort, and governance.',
    overallRisk: 'CRITICAL',
    createdAt: '2026-08-12T16:00:00Z',
    diffs: [
      {
        field: 'Monthly Consideration',
        changeType: 'MODIFIED',
        oldValue: '₹42,50,000 / month',
        newValue: '₹54,80,000 / month (+28.94%)',
        pageNumber: 1,
        clauseRef: 'Clause 1.1',
        operationalImpactSeverity: 'CRITICAL'
      },
      {
        field: 'Station Scope',
        changeType: 'ADDED',
        oldValue: '16 Elevated Stations (Aluva to Ernakulam South)',
        newValue: '18 Stations (Added Vadakkekotta & SN Junction)',
        pageNumber: 1,
        clauseRef: 'Clause 1.0',
        operationalImpactSeverity: 'MEDIUM'
      },
      {
        field: 'Concourse Temperature Setpoint',
        changeType: 'MODIFIED',
        oldValue: '24.0°C ± 1.5°C',
        newValue: '25.5°C ± 1.0°C',
        pageNumber: 2,
        clauseRef: 'Clause 2.1',
        operationalImpactSeverity: 'HIGH'
      },
      {
        field: 'Payment Clearance Window',
        changeType: 'MODIFIED',
        oldValue: '30 Calendar Days',
        newValue: '15 Calendar Days',
        pageNumber: 2,
        clauseRef: 'Clause 2.2',
        operationalImpactSeverity: 'HIGH'
      },
      {
        field: 'Dedicated Escrow Funding',
        changeType: 'ADDED',
        oldValue: 'None (Regular monthly disbursement)',
        newValue: '₹3,28,80,000 sub-escrow account prior to 01-Sep-2026',
        pageNumber: 2,
        clauseRef: 'Clause 2.3',
        operationalImpactSeverity: 'CRITICAL'
      }
    ],
    blastRadiusChain: [
      {
        step: 1,
        entityType: 'CONTRACT',
        name: 'Contract Amendment KMRL/PROC/CONT/2025/88-AMD-02',
        role: 'Root Originating Event',
        consequence: 'Monthly fee escalated by ₹12.30 Lakh/mo and payment window compressed to 15 days.',
        evidence: 'Amendment v2.0, Page 1, Clause 1.1',
        severity: 'CRITICAL',
        status: 'AFFECTED'
      },
      {
        step: 2,
        entityType: 'PAYMENT',
        name: 'KMRL Treasury & Finance Division',
        role: 'Direct Financial Impact',
        consequence: 'Additional FY budget shortfall of ₹1.476 Crores requires emergency Board sanction on 30th August 2026; ₹3.288 Cr escrow must be locked.',
        evidence: 'Amendment v2.0, Page 2, Clause 2.3 & Page 3, Clause 3.1',
        severity: 'CRITICAL',
        status: 'AT_RISK'
      },
      {
        step: 3,
        entityType: 'VENDOR',
        name: 'Voltas-BlueStar JV Service Network',
        role: 'Contractor Service Delivery',
        consequence: 'Technician deployment expanded to 8 additional chillers at Vadakkekotta and SN Junction stations starting 1st September 2026.',
        evidence: 'Amendment v2.0, Page 1, Clause 1.0',
        severity: 'MEDIUM',
        status: 'AFFECTED'
      },
      {
        step: 4,
        entityType: 'EQUIPMENT',
        name: 'BMS Chiller Automation System',
        role: 'Operational SCADA Control',
        consequence: 'Telemetry setpoint reprogramming from 24.0°C to 25.5°C must be completed before 28th August 2026 deadline.',
        evidence: 'Amendment v2.0, Page 2, Clause 2.1',
        severity: 'HIGH',
        status: 'AT_RISK'
      },
      {
        step: 5,
        entityType: 'STATION',
        name: 'Passenger Operations & Thermal Comfort',
        role: 'Public Experience & Complaints',
        consequence: 'Concourse air temperature will rise by 1.5°C; Station Controllers require customer response guidelines for passenger feedback.',
        evidence: 'Amendment v2.0, Page 3, Clause 3.2',
        severity: 'MEDIUM',
        status: 'AFFECTED'
      },
      {
        step: 6,
        entityType: 'APPROVAL',
        name: '48th KMRL Board of Directors Meeting',
        role: 'Statutory Governance Finality',
        consequence: 'Failure to ratify ₹1.476 Cr budget on 30th August will render the 1st September effective date legally defective.',
        evidence: 'Amendment v2.0, Page 3, Clause 3.1',
        severity: 'CRITICAL',
        status: 'AT_RISK'
      }
    ],
    recommendedActions: [
      'Submit Board Note to Company Secretary for 48th Board Meeting agenda (Due: 24th August 2026)',
      'Issue BMS reprogramming work order to Electrical Engineering Wing for 25.5°C setpoints (Due: 28th August 2026)',
      'Instruct Finance Treasury to create ₹3.288 Cr sub-escrow account (Due: 1st September 2026)',
      'Circulate passenger comfort briefing to all 18 Station Controllers (Due: 29th August 2026)'
    ],
    humanDecision: {
      status: 'PENDING'
    }
  }
];

export const SAMPLE_ACTIONS: ActionItem[] = [
  {
    id: 'act-001',
    docId: 'kmrl-doc-004',
    docTitle: 'Rolling Stock Bogie & Wheel Truing Inspection Protocol',
    title: 'Slot Trainset TS-09 into Underfloor Lathe for Reprofiling',
    description: 'Withdraw TS-09 on 18th August night, complete lathe wheel truing at Muttom Bay-4, and submit post-truing laser certificate.',
    owner: 'Sudheesh P. (Depot Incharge)',
    department: 'Rolling Stock',
    priority: 'HIGH',
    dueDate: '2026-08-21',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.1: "Trainset TS-09 must be withdrawn... and slotted into Muttom Bay-4 Underfloor Wheel Lathe for reprofiling"',
    status: 'IN_PROGRESS',
    aiRecommended: true,
    humanApproved: true,
    approvedBy: 'Thomas George (DGM Rolling Stock)',
    approvedAt: '2026-08-14T10:00:00Z'
  },
  {
    id: 'act-002',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    title: 'Prepare Board Memorandum for ₹1.476 Cr Budget Allocation',
    description: 'Draft statutory note for 48th Board of Directors meeting to sanction additional budget for HVAC expansion and 15-day escrow terms.',
    owner: 'Gopalakrishnan Nair (DGM Procurement)',
    department: 'Procurement & Contracts',
    priority: 'CRITICAL',
    dueDate: '2026-08-24',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Additional budget allocation of INR 1.476 Crores for FY 2026-27 requires Board approval at 48th KMRL Board Meeting on 30th August 2026."',
    status: 'PENDING',
    aiRecommended: true,
    humanApproved: true,
    approvedBy: 'Gopalakrishnan Nair (DGM)',
    approvedAt: '2026-08-13T09:30:00Z'
  },
  {
    id: 'act-003',
    docId: 'kmrl-doc-001',
    docTitle: 'Signaling & Interlocking Safety Circular No. SIG-2026-04',
    title: 'Execute Point Machine Megger Insulation Audits',
    description: 'Conduct 500V DC Megger tests across 48 point machine drives during non-revenue window and upload logs to K-AMP.',
    owner: 'Aneesh Nair (Senior Section Engineer)',
    department: 'Signaling & Telecom',
    priority: 'HIGH',
    dueDate: '2026-08-20',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Sri. Aneesh Nair: Submit depot point machine logs by 20th August 2026."',
    status: 'IN_PROGRESS',
    aiRecommended: true,
    humanApproved: true,
    approvedBy: 'Rajesh K. Varma (Chief S&T)',
    approvedAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'act-004',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    title: 'Reprogram BMS Chiller Setpoint to 25.5°C',
    description: 'Update SCADA/BMS controller firmware logic across 18 stations to enforce new 25.5°C concourse baseline.',
    owner: 'Executive Engineer (Electrical)',
    department: 'Operations',
    priority: 'MEDIUM',
    dueDate: '2026-08-28',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.1: "Peak demand chiller sequencing algorithm must be updated in BMS controller before 28th August 2026."',
    status: 'PENDING',
    aiRecommended: true,
    humanApproved: false
  }
];

export const SAMPLE_DEADLINES: DeadlineItem[] = [
  {
    id: 'dl-001',
    docId: 'kmrl-doc-001',
    docTitle: 'Signaling & Interlocking Safety Circular',
    title: 'Depot Point Machine Diagnostic Logs Submission',
    dueDate: '2026-08-20',
    owner: 'Aneesh Nair',
    department: 'Signaling & Telecom',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Submit depot point machine logs by 20th August 2026."',
    status: 'DUE_SOON',
    priority: 'HIGH'
  },
  {
    id: 'dl-002',
    docId: 'kmrl-doc-004',
    docTitle: 'Rolling Stock Bogie & Wheel Truing Report',
    title: 'TS-09 Post-Truing Laser Certificate Due',
    dueDate: '2026-08-21',
    owner: 'Sudheesh P.',
    department: 'Rolling Stock',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.3: "submit post-truing laser gauge certificate by 21st August 2026."',
    status: 'DUE_SOON',
    priority: 'HIGH'
  },
  {
    id: 'dl-003',
    docId: 'kmrl-doc-001',
    docTitle: 'Signaling & Interlocking Safety Circular',
    title: 'Edappally Joint Safety Audit Execution',
    dueDate: '2026-08-22',
    owner: 'Priya Raman',
    department: 'Signaling & Telecom',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Conduct surprise joint audit at Edappally junction by 22nd August 2026."',
    status: 'UPCOMING',
    priority: 'MEDIUM'
  },
  {
    id: 'dl-004',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    title: 'BMS Chiller 25.5°C Algorithm Update',
    dueDate: '2026-08-28',
    owner: 'EE Electrical',
    department: 'Operations',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.1: "BMS controller before 28th August 2026."',
    status: 'UPCOMING',
    priority: 'HIGH'
  },
  {
    id: 'dl-005',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    title: '48th KMRL Board Budget Sanction Meeting',
    dueDate: '2026-08-30',
    owner: 'Gopalakrishnan Nair',
    department: 'Procurement & Contracts',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Board approval at 48th KMRL Board Meeting on 30th August 2026."',
    status: 'UPCOMING',
    priority: 'CRITICAL'
  },
  {
    id: 'dl-006',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    title: '₹3.288 Cr Sub-Escrow Funding Deadline',
    dueDate: '2026-09-01',
    owner: 'Chief Finance Officer',
    department: 'Finance & Accounts',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.3: "dedicated sub-escrow account totaling INR 3,28,80,000 before 1st September 2026."',
    status: 'UPCOMING',
    priority: 'CRITICAL'
  }
];

export const SAMPLE_COMPLIANCE_CHECKS: ComplianceCheck[] = [
  {
    id: 'comp-001',
    docId: 'kmrl-doc-001',
    docTitle: 'Signaling & Interlocking Safety Circular No. SIG-2026-04',
    ruleId: 'KMRL-SOP-SIG-09',
    ruleName: 'Trackside Power Isolation & PTW Protocol',
    category: 'Safety & Quality',
    requirement: 'Physical track inspection must possess signed SCADA Traction Controller Permit-To-Work (PTW) certificate prior to track entry during shadow block.',
    status: 'PASS',
    pageNumber: 1,
    evidence: 'Page 1, Sec 1.2: "Power isolation certificate (PTW) must be signed by SCADA Traction Controller prior to track entry."',
    reviewer: 'Safety Directorate Audits',
    decisionRemarks: 'Mandatory PTW protocol clearly stated and in compliance with Metro Railways General Rules 2020.',
    checkedAt: '2026-08-10T12:30:00Z'
  },
  {
    id: 'comp-002',
    docId: 'kmrl-doc-004',
    docTitle: 'Rolling Stock Bogie & Wheel Truing Inspection Protocol',
    ruleId: 'KMRL-RS-MAN-14',
    ruleName: 'Maximum Wheel Surface Spalling Depth Limit',
    category: 'Rolling Stock',
    requirement: 'Wheelset surface defect depth shall strictly remain under 1.00 mm. Any defect >= 1.0 mm must mandate trainset withdrawal from revenue service.',
    status: 'FAIL',
    pageNumber: 1,
    evidence: 'Page 1, Sec 1.2: "Wheelset No. 14 exhibited surface micro-spalling with depth measuring 1.45 mm, which exceeds the KMRL Maintenance Manual safety threshold of 1.00 mm."',
    reviewer: 'Chief Rolling Stock Engineer',
    decisionRemarks: 'Rule breached. Trainset TS-09 marked for immediate withdrawal to Muttom lathe bay on 18th August night.',
    checkedAt: '2026-08-14T09:30:00Z'
  },
  {
    id: 'comp-003',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    ruleId: 'BEE-GREEN-METRO-2025',
    ruleName: 'BEE Station Thermal Concourse Efficiency Setting',
    category: 'Compliance',
    requirement: 'Public concourse cooling temperatures must be set between 24.5°C - 26.0°C to curb carbon footprint and auxiliary traction power loads.',
    status: 'PASS',
    pageNumber: 2,
    evidence: 'Page 2, Sec 2.1: "In compliance with Bureau of Energy Efficiency (BEE) National Green Metro Guidelines, station concourse ambient setpoint is modified to 25.5°C ± 1.0°C."',
    reviewer: 'Energy Management Cell',
    decisionRemarks: 'Full compliance achieved with BEE national guidelines.',
    checkedAt: '2026-08-12T16:00:00Z'
  },
  {
    id: 'comp-004',
    docId: 'kmrl-doc-003',
    docTitle: 'Station HVAC Contract Amendment v2.0',
    ruleId: 'KMRL-FIN-DOA-04',
    ruleName: 'Delegation of Financial Powers - Board Ratification Threshold',
    category: 'Finance & Accounts',
    requirement: 'Contract amendments causing net financial variation exceeding ₹1.00 Crore require formal Board of Directors sanction before disbursements.',
    status: 'REVIEW_REQUIRED',
    pageNumber: 3,
    evidence: 'Page 3, Sec 3.1: "Additional budget allocation of INR 1.476 Crores for FY 2026-27 requires Board approval at 48th KMRL Board Meeting on 30th August 2026."',
    reviewer: 'Finance Directorate',
    decisionRemarks: 'Pending approval at upcoming 48th Board Meeting on 30th August.',
    checkedAt: '2026-08-12T16:30:00Z'
  }
];
