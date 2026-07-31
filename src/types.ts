export type StageNumber = 1 | 2 | 3 | 4 | 5;

export interface DiscoveryContext {
  productService: string;
  targetAudience: string;
  channelsAndBudget: string;
  growthBottleneck: string;
  confirmedSummary: boolean;
}

export interface StrategyHook {
  title: string;
  strategicAngle: string;
  expectedOutcome: string;
  kpi: string;
}

export interface ChatMessage {
  id: string;
  sender: 'nova' | 'user';
  text: string;
  timestamp: string;
  stage: StageNumber;
  quickPills?: string[];
  strategies?: StrategyHook[];
  isSynthesis?: boolean;
}

export interface ServiceCardData {
  id: string;
  title: string;
  shortDesc: string;
  metric: string;
  metricLabel: string;
  iconName: string;
  capabilities: string[];
  deepDive: {
    overview: string;
    deliverables: string[];
    typicalTimeline: string;
    impactCase: string;
  };
}

export interface CaseStudyData {
  id: string;
  clientName: string;
  industry: string;
  headline: string;
  heroMetric: string;
  heroMetricLabel: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatarUrl: string;
  metric: string;
}

export interface ProcessStepData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface BookingFormData {
  fullName: string;
  email: string;
  companyName: string;
  preferredDate: string;
  preferredTime: string;
  projectBrief: string;
  auditData?: Partial<DiscoveryContext>;
  selectedHooks?: string[];
}
