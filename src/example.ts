/**
 * Example usage of the Politician Scorecard Template
 *
 * This script demonstrates how to use the template to evaluate politicians.
 * It shows basic usage patterns and expected outputs.
 */

import { PoliticianScorecardSystem } from './index';
import { Politician } from './types';

async function runExample() {
  console.log('🚀 Politician Scorecard Template Example');
  console.log('========================================\n');

  try {
    // Initialize the system
    const system = new PoliticianScorecardSystem({
      enableBiasDetection: true,
      confidenceThreshold: 0.7,
      cacheEnabled: true
    });

    // Create example politician data
    const examplePolitician: Politician = {
      id: 'example-1',
      name: 'John Doe',
      party: 'Democratic',
      state: 'CA',
      position: 'Senator',
      startDate: new Date('2021-01-03'),
      imageUrl: 'https://example.com/john-doe.jpg'
    };

    console.log('📊 Evaluating politician:', examplePolitician.name);
    console.log('Party:', examplePolitician.party);
    console.log('State:', examplePolitician.state);
    console.log('Position:', examplePolitician.position);
    console.log('Start Date:', examplePolitician.startDate.toLocaleDateString());
    console.log('');

    // Perform evaluation
    console.log('⏳ Starting evaluation...');
    const report = await system.evaluatePolitician(examplePolitician);

    // Display results
    console.log('✅ Evaluation completed!');
    console.log('');
    console.log('📈 Evaluation Results:');
    console.log('======================');
    console.log(`Overall Score: ${report.score.overallScore.toFixed(2)}/100`);
    console.log(`Confidence: ${(report.score.confidence * 100).toFixed(1)}%`);
    console.log(`Data Points Analyzed: ${report.score.dataPoints}`);
    console.log(`Bias Detected: ${report.score.biasDetected ? 'Yes' : 'No'}`);
    console.log(`Promise Fulfillment Rate: ${(report.promiseFulfillmentRate * 100).toFixed(1)}%`);
    console.log('');

    // Display category scores
    console.log('📋 Category Breakdown:');
    console.log('=====================');
    report.score.categoryScores.forEach(category => {
      console.log(`${category.category.replace(/_/g, ' ').toUpperCase()}: ${category.score.toFixed(1)}/100 (${(category.confidence * 100).toFixed(0)}% confidence)`);
    });
    console.log('');

    // Display system status
    console.log('🔧 System Status:');
    console.log('=================');
    const status = await system.getSystemStatus();
    status.agents.forEach(agent => {
      console.log(`- ${agent.name}: ${agent.status}`);
    });
    console.log(`- Workflow: ${status.workflow.status}`);
    status.dataSources.forEach(source => {
      console.log(`- ${source.name}: ${source.status}`);
    });

    console.log('');
    console.log('🎉 Example completed successfully!');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('- Configure your API keys in .env file');
    console.log('- Replace example data with real politician information');
    console.log('- Customize evaluation criteria in the agents');
    console.log('- Add additional data sources as needed');

  } catch (error) {
    console.error('❌ Example failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('- Check that your API keys are configured in .env');
    console.log('- Ensure all dependencies are installed: npm install');
    console.log('- Verify TypeScript compilation: npm run build');
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExample();
}

export { runExample };