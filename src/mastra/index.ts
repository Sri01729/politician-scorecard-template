/**
 * Main Mastra configuration for the Politician Scorecard Template
 *
 * This file configures the Mastra instance with all agents, workflows, and tools
 * needed for comprehensive politician evaluation. The system uses a multi-agent
 * architecture with specialized roles for data collection, evaluation, and analysis.
 *
 * Key Components:
 * - PoliticianAgent: Specialized agent for political analysis
 * - DataCollectionAgent: Handles government API data fetching with caching
 * - EvaluationAgent: Performs comprehensive evaluation across policy categories
 * - politicianEvaluationWorkflow: Streamlined workflow for quick analysis
 * - evaluationWorkflow: Comprehensive workflow with quality assurance
 */

import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { politicianEvaluationWorkflow } from './workflows/politician-evaluation-workflow';
import { evaluationWorkflow } from './workflows/evaluation-workflow';
import { politicianAgent } from './agents/politician-agent';
import { DataCollectionAgent } from './agents/data-collection-agent';
import { EvaluationAgent } from './agents/evaluation-agent';

/**
 * Main Mastra instance configured for politician evaluation
 *
 * This instance includes:
 * - 3 specialized agents for different aspects of political analysis
 * - 2 workflows for different evaluation scenarios
 * - In-memory storage for development (can be changed to persistent storage)
 * - Structured logging for observability
 */
export const mastra = new Mastra({
  workflows: {
    // Streamlined workflow for quick politician analysis
    politicianEvaluationWorkflow,
    // Comprehensive workflow with data validation and quality assurance
    evaluationWorkflow
  },
  agents: {
    // Specialized agent for political analysis and evaluation
    politicianAgent,
    // Agent for collecting data from government APIs with caching and rate limiting
    dataCollectionAgent: new DataCollectionAgent({
      apiKeys: {
        'congress.gov': process.env.CONGRESS_GOV_API_KEY || '',
        'govtrack.us': process.env.GOVTRACK_API_KEY || '',
        'opensecrets.org': process.env.OPENSECRETS_API_KEY || ''
      },
      rateLimits: {
        'congress.gov': 1000,    // Congress.gov API rate limit
        'govtrack.us': 1000,     // GovTrack API rate limit
        'opensecrets.org': 500   // OpenSecrets API rate limit
      },
      cacheEnabled: true,
      cacheDuration: 24 * 60 * 60 * 1000 // 24 hours cache
    }),
    // Agent for comprehensive politician evaluation across multiple categories
    evaluationAgent: new EvaluationAgent({
      dataSources: ['Congress.gov', 'GovTrack', 'OpenSecrets'],
      biasDetectionEnabled: true,
      confidenceThreshold: 0.7
    })
  },
  storage: new LibSQLStore({
    // In-memory storage for development
    // Change to 'file:./mastra.db' for persistent storage
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Politician Scorecard',
    level: 'info',
  }),
});