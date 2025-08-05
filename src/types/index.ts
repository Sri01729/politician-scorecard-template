// Core types for the Politician Scorecard System

export interface Politician {
  id: string;
  name: string;
  party: string;
  state: string;
  position: string;
  startDate: Date;
  endDate?: Date | undefined;
  imageUrl?: string | undefined;
}

export interface LegislativeAction {
  id: string;
  politicianId: string;
  billNumber: string;
  title: string;
  description: string;
  date: Date;
  action: 'sponsored' | 'co-sponsored' | 'voted_for' | 'voted_against' | 'abstained';
  category: EvaluationCategory;
  impact: 'positive' | 'neutral' | 'negative';
  evidence: string[];
}

export interface CampaignPromise {
  id: string;
  politicianId: string;
  promise: string;
  category: EvaluationCategory;
  source: string;
  date: Date;
  status: 'fulfilled' | 'partially_fulfilled' | 'broken' | 'pending';
  relatedLegislation?: string[];
}

export type EvaluationCategory =
  | 'economic_impact'
  | 'social_welfare'
  | 'environmental_protection'
  | 'national_security'
  | 'civil_rights'
  | 'healthcare'
  | 'education'
  | 'infrastructure'
  | 'foreign_policy'
  | 'government_transparency';

export interface CategoryScore {
  category: EvaluationCategory;
  score: number; // -100 to 100
  weight: number; // 0 to 1
  evidence: string[];
  confidence: number; // 0 to 1
}

export interface PoliticianScore {
  politicianId: string;
  overallScore: number; // -100 to 100
  categoryScores: CategoryScore[];
  evaluationDate: Date;
  dataPoints: number;
  confidence: number;
  biasDetected: boolean;
  biasMitigationApplied: string[];
}

export interface EvaluationReport {
  politician: Politician;
  score: PoliticianScore;
  legislativeActions: LegislativeAction[];
  campaignPromises: CampaignPromise[];
  promiseFulfillmentRate: number;
  dataSources: string[];
  evaluationMetadata: {
    totalDataPoints: number;
    evaluationDuration: number;
    biasChecks: string[];
    lastUpdated: Date;
  };
}

export interface DataSource {
  name: string;
  url: string;
  reliability: number; // 0 to 1
  lastUpdated: Date;
  dataType: 'legislation' | 'campaign' | 'financial' | 'voting_record';
}

export interface BiasCheck {
  type: 'data_source' | 'algorithm' | 'category_weight' | 'temporal';
  description: string;
  severity: 'low' | 'medium' | 'high';
  mitigation: string;
  applied: boolean;
}

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

export interface EvaluationContext {
  politician: Politician;
  timeRange: {
    start: Date;
    end: Date;
  };
  categories: EvaluationCategory[];
  dataSources: DataSource[];
  biasChecks: BiasCheck[];
}