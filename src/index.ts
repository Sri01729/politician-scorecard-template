import { mastra } from './mastra';
import { Politician, EvaluationReport } from './types';

export class PoliticianScorecardSystem {
  private mastraInstance = mastra;

  constructor(config: {
    apiKeys?: Record<string, string>;
    enableBiasDetection?: boolean;
    confidenceThreshold?: number;
    cacheEnabled?: boolean;
  } = {}) {
    // Configuration can be passed to the mastra instance if needed
    // For now, using the default configuration from mastra/index.ts
  }

  async evaluatePolitician(politician: Politician): Promise<EvaluationReport> {
    console.log(`Starting evaluation for ${politician.name}...`);

    try {
      const run = await this.mastraInstance.getWorkflow('evaluationWorkflow').createRunAsync();

      const result = await run.start({
        inputData: {
          politician,
          timeRange: {
            start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // Last year
            end: new Date()
          }
        }
      });

      if (result.status === 'success') {
        console.log(`Evaluation completed for ${politician.name}`);
        console.log(`Overall Score: ${result.result.score.overallScore.toFixed(2)}`);
        console.log(`Confidence: ${(result.result.score.confidence * 100).toFixed(1)}%`);

        return result.result;
      } else {
        throw new Error(`Workflow failed with status: ${result.status}`);
      }
    } catch (error) {
      console.error(`Error evaluating ${politician.name}:`, error);
      throw error;
    }
  }

  async evaluateMultiplePoliticians(politicians: Politician[]): Promise<EvaluationReport[]> {
    console.log(`Starting batch evaluation for ${politicians.length} politicians...`);

    const reports: EvaluationReport[] = [];

    for (const politician of politicians) {
      try {
        const report = await this.evaluatePolitician(politician);
        reports.push(report);
      } catch (error) {
        console.error(`Error evaluating politician ${politician.name}:`, error);
        // Continue with next politician
      }
    }

    console.log(`Batch evaluation completed. ${reports.length}/${politicians.length} successful.`);

    return reports;
  }

  async getSystemStatus(): Promise<{
    agents: { name: string; status: string }[];
    workflow: { status: string; lastExecution?: Date };
    dataSources: { name: string; status: string }[];
  }> {
    return {
      agents: [
        { name: 'PoliticianAgent', status: 'active' },
        { name: 'DataCollectionAgent', status: 'active' },
        { name: 'EvaluationAgent', status: 'active' }
      ],
      workflow: {
        status: 'ready'
      },
      dataSources: [
        { name: 'Congress.gov', status: 'available' },
        { name: 'GovTrack', status: 'available' },
        { name: 'OpenSecrets', status: 'available' }
      ]
    };
  }
}

// Example usage
export async function createExampleEvaluation() {
  const system = new PoliticianScorecardSystem({
    enableBiasDetection: true,
    confidenceThreshold: 0.7,
    cacheEnabled: true
  });

  const examplePolitician: Politician = {
    id: 'example-1',
    name: 'John Doe',
    party: 'Democratic',
    state: 'CA',
    position: 'Senator',
    startDate: new Date('2021-01-03'),
    imageUrl: 'https://example.com/john-doe.jpg'
  };

  try {
    const report = await system.evaluatePolitician(examplePolitician);
    console.log('Example evaluation report:', JSON.stringify(report, null, 2));
    return report;
  } catch (error) {
    console.error('Example evaluation failed:', error);
    throw error;
  }
}

// Export main classes for external use
export { mastra };
export * from './types';