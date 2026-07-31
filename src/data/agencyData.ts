import { ServiceCardData, CaseStudyData, TestimonialData, ProcessStepData } from '../types';

export const AGENCY_SERVICES: ServiceCardData[] = [
  {
    id: 'brand-positioning',
    title: 'Brand Positioning & Messaging Architecture',
    shortDesc: 'Carve out an unassailable market category with executive-level messaging frameworks that convert skeptical decision makers.',
    metric: '3.4x',
    metricLabel: 'Higher Pipeline Win Rate',
    iconName: 'Compass',
    capabilities: [
      'Category Creation & Strategic Narrative',
      'Value Proposition & ICP Mapping',
      'Competitive Moat Analysis',
      'Executive Battlecards & Sales Decks'
    ],
    deepDive: {
      overview: 'We translate complex B2B technologies and high-ticket service offerings into high-status narrative architectures. By defining your sharpest value prop, we position your brand as the single logical market leader.',
      deliverables: [
        'Comprehensive Brand Positioning Matrix',
        'ICP Persona Profiles & Messaging Playbooks',
        'Sales Enablement Battlecards & Decks',
        'Homepage & Landing Page Copywriting Blueprint'
      ],
      typicalTimeline: '3 - 4 Weeks',
      impactCase: 'Helped a Series B Cybersecurity firm reposition from generic tool to enterprise necessity, driving 3.4x win rates against legacy competitors.'
    }
  },
  {
    id: 'growth-marketing',
    title: 'Multi-Touch Growth Marketing Engine',
    shortDesc: 'Engineering predictable lead-to-revenue pipelines across high-intent digital ecosystems.',
    metric: '+310%',
    metricLabel: 'Qualified Pipeline Growth',
    iconName: 'TrendingUp',
    capabilities: [
      'Account-Based Marketing (ABM)',
      'High-Intent Content Architecture',
      'Omnichannel Demand Generation',
      'Multi-Touch Attribution Modeling'
    ],
    deepDive: {
      overview: 'A full-funnel growth architecture designed to systematically identify, capture, and nurture enterprise buyers who are actively in-market.',
      deliverables: [
        'ABM Campaign Orchestration Framework',
        'Pillar Content & Research Whitepaper Engine',
        'Omnichannel Ad & Retargeting Infrastructure',
        'Custom Pipeline Dashboard & Revenue Attribution'
      ],
      typicalTimeline: '4 - 6 Weeks Deployment',
      impactCase: 'Engineered ABM engine for Cloud Data provider resulting in +310% qualified pipeline growth within two quarters.'
    }
  },
  {
    id: 'paid-acquisition',
    title: 'High-Intent Paid Acquisition & Demand Gen',
    shortDesc: 'Eliminate wasted ad spend with surgical paid search, LinkedIn ABM targeting, and algorithmic retargeting.',
    metric: '-42%',
    metricLabel: 'Average CAC Reduction',
    iconName: 'Target',
    capabilities: [
      'LinkedIn Account-Targeted Campaigns',
      'Google High-Intent Paid Search (SEM)',
      'Programmatic & Custom Audiences',
      'Continuous Creative & Copy Testing'
    ],
    deepDive: {
      overview: 'We treat paid media as an investment strategy rather than an expense. By combining first-party intent signals with hyper-targeted audience lists, we ensure every dollar targets buyers with real budget.',
      deliverables: [
        'Custom Account List & Matched Audience Setup',
        'High-Converting Ad Copy & Visual Creative Packs',
        'Landing Page CRO Optimizations',
        'Real-time ROAS & Customer Acquisition Cost (CAC) Tracking'
      ],
      typicalTimeline: '2 Weeks Setup & Launch',
      impactCase: 'Scaled B2B FinTech paid acquiring leads at 42% lower CAC while doubling monthly SQL volume.'
    }
  },
  {
    id: 'marketing-automation',
    title: 'Lifecycle & Marketing Automation',
    shortDesc: 'Automate high-touch nurture sequences, lead scoring, and CRM routing to ensure zero pipeline leakage.',
    metric: '98.4%',
    metricLabel: 'MQL-to-Sales Handoff Efficiency',
    iconName: 'Cpu',
    capabilities: [
      'CRM & Revenue Tech Stack Integration',
      'Algorithmic Lead Scoring & Routing',
      'Behavioral Email Nurture Tracks',
      'Customer Retention & Expansion Workflows'
    ],
    deepDive: {
      overview: 'Connecting your marketing engine directly to sales execution. We build automated nurture engines that engage prospects based on behavioral intent triggers.',
      deliverables: [
        'HubSpot / Salesforce Revenue Stack Architecture',
        'Custom Lead Scoring & Qualification Rules',
        'Personalized Behavioral Email Sequences',
        'Retention & Account Expansion Triggers'
      ],
      typicalTimeline: '3 Weeks Architecture',
      impactCase: 'Streamlined lead routing for HR Tech platform, cutting lead response time from 24 hours to under 4 minutes.'
    }
  }
];

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'saas-scaleup',
    clientName: 'Nexus Cloud Analytics',
    industry: 'Enterprise SaaS',
    headline: 'Scaling Annual Recurring Revenue from $4M to $18M via Account-Based Growth Engine',
    heroMetric: '4.5x ARR Growth',
    heroMetricLabel: '$4M → $18M in 18 Months',
    challenge: 'High cost per acquisition and long 9-month sales cycles with low conversion from raw leads to enterprise SQLs.',
    solution: 'Kiran Markets restructured their market positioning around ROI quantification and launched a multi-touch LinkedIn & Google ABM campaign targeting Fortune 1000 CTOs.',
    results: [
      'Increased ACV (Average Contract Value) by 140%',
      'Shortened sales cycle from 270 days to 110 days',
      'Generated $14M in net-new pipeline in Year 1'
    ],
    tags: ['ABM Engine', 'Brand Positioning', 'LinkedIn Ads']
  },
  {
    id: 'fintech-growth',
    clientName: 'Veritas Financial Technologies',
    industry: 'B2B FinTech',
    headline: 'Achieving Market Category Leadership and -45% CAC Reduction across EMEA & US',
    heroMetric: '-45% CAC',
    heroMetricLabel: 'Lower Cost per Acquisition',
    challenge: 'Struggling to differentiate in a crowded payment infrastructure market against well-funded incumbents.',
    solution: 'Designed an executive narrative focused on security and compliance moats, paired with algorithmic paid search and retargeting content hubs.',
    results: [
      'Captured #1 share of voice for high-intent search terms',
      'Over 220 executive demos booked in Q1-Q3',
      'Lifted demo-to-closed-won rate from 12% to 29%'
    ],
    tags: ['Paid Acquisition', 'Category Creation', 'Conversion Rate Optimization']
  },
  {
    id: 'healthtech-expansion',
    clientName: 'PulseHealth AI',
    industry: 'Healthcare Tech',
    headline: 'Engineered Enterprise Demand Engine Yielding $9.2M in Qualified Hospital Pipeline',
    heroMetric: '14.2x ROAS',
    heroMetricLabel: 'Return on Ad Spend',
    challenge: 'Complex buying committees across hospital networks required hyper-compliant, multi-stakeholder education.',
    solution: 'Deployed a behavioral content nurture sequence and targeted C-suite executive briefings built around healthcare efficiency metrics.',
    results: [
      '100% compliant multi-channel outreach engine',
      '$9.2M in verified enterprise opportunities generated',
      'Featured in 4 major industry research papers'
    ],
    tags: ['Demand Generation', 'Marketing Automation', 'Content Architecture']
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 'test-1',
    quote: "Kiran Markets completely transformed our go-to-market trajectory. Nova's initial strategy blueprint laid out the exact flaws in our positioning. Within 90 days of execution, our enterprise pipeline tripled.",
    author: "Marcus Vance",
    title: "Chief Commercial Officer",
    company: "Nexus Analytics",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    metric: "+310% Pipeline"
  },
  {
    id: 'test-2',
    quote: "Working with Kiran and his team feels like having an elite elite executive growth team embedded inside your company. Their clarity on B2B metrics and revenue velocity is unmatched in the agency space.",
    author: "Elena Rostova",
    title: "VP of Global Marketing",
    company: "Veritas FinTech",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    metric: "-45% CAC"
  },
  {
    id: 'test-3',
    quote: "The interactive AI discovery session gave us more strategic value in 5 minutes than our previous agency delivered in two months. The execution was flawless.",
    author: "David Sterling",
    title: "Co-Founder & CEO",
    company: "PulseHealth AI",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    metric: "14.2x ROAS"
  }
];

export const PROCESS_TIMELINE: ProcessStepData[] = [
  {
    number: '01',
    title: 'Deep Discovery & Audit',
    subtitle: 'Uncovering Friction & Opportunity',
    description: 'We audit your current funnel metrics, market positioning, competitor messaging, and ideal customer profiles to isolate high-leverage growth bottlenecks.',
    deliverables: [
      'Revenue & Pipeline Metric Audit',
      'Competitive Messaging Moat Breakdown',
      'Nova AI Strategy Baseline Brief'
    ]
  },
  {
    number: '02',
    title: 'Positioning & Engine Architecture',
    subtitle: 'Blueprint for Dominance',
    description: 'We craft your high-status strategic narrative, define campaign architecture, design ad creative assets, and build custom multi-touch nurture tracks.',
    deliverables: [
      'Executive Brand Narrative & Decks',
      'ABM Account List & Intent Triggers',
      'Conversion Landing Infrastructure'
    ]
  },
  {
    number: '03',
    title: 'Multi-Touch Omnichannel Execution',
    subtitle: 'Surgical Market Activation',
    description: 'We launch targeted paid acquisition, account-based outreach, and high-intent content hubs directly reaching your ideal enterprise buyers.',
    deliverables: [
      'Omnichannel Campaign Launch',
      'Real-Time Lead Scoring & CRM Routing',
      'Weekly Executive Performance Sprints'
    ]
  },
  {
    number: '04',
    title: 'Continuous Optimization & Scaling',
    subtitle: 'Compounding Revenue Engine',
    description: 'Using real-time pipeline attribution data, we double down on top-performing channels, optimize ad copy, and scale your predictable revenue engine.',
    deliverables: [
      'Multi-Touch Attribution Reports',
      'Creative & Messaging Iteration Packs',
      'Quarterly Executive Growth Reviews'
    ]
  }
];

export const PRESET_PILLS = {
  stage1: [
    "Enterprise B2B SaaS Platform",
    "High-Ticket Financial Services",
    "Healthcare & Biotech Software",
    "Professional Services Agency"
  ],
  stage2Audience: [
    "VPs of Engineering & CTOs",
    "Chief Marketing Officers & VPs of Growth",
    "CFOs & Financial Directors",
    "Mid-Market Business Owners"
  ],
  stage2Channels: [
    "LinkedIn Ads & Paid Search ($10k-$25k/mo)",
    "Organic Search & Content ($5k-$10k/mo)",
    "Cold Outbound & Email Automation ($15k+/mo)",
    "Starting fresh / Under $5k/mo"
  ],
  stage2Bottleneck: [
    "Low conversion rate from MQL to Sales Opportunity",
    "High Customer Acquisition Cost (CAC)",
    "Inconsistent enterprise pipeline velocity",
    "Unclear market positioning against competitors"
  ]
};
