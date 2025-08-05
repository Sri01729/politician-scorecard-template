# Politician Scorecard Template

A comprehensive Mastra template for evaluating politicians based on their voting records, legislative actions, and campaign promises. This template demonstrates advanced agent workflows, data collection from government APIs, and unbiased political analysis.

## Overview

This template showcases how to build a sophisticated AI system for political analysis using Mastra's agent and workflow capabilities. It includes:

- **Multi-agent architecture** with specialized roles for data collection and evaluation
- **Government API integration** for real-time legislative data
- **Comprehensive evaluation workflows** with bias detection and quality assurance
- **Scalable data processing** with caching and rate limiting
- **Objective scoring system** across multiple policy categories

The system evaluates politicians across 10 key categories: economic impact, social welfare, environmental protection, national security, civil rights, healthcare, education, infrastructure, foreign policy, and government transparency.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your API keys (see Environment Variables section below)

3. **Run the project**:
   ```bash
   npm run dev
   ```

4. **Run example evaluation**:
   ```bash
   npm run example
   ```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key. Get one at [OpenAI Platform](https://platform.openai.com/api-keys)
- `ANTHROPIC_API_KEY`: Your Anthropic API key. Get one at [Anthropic Console](https://console.anthropic.com/settings/keys)
- `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google AI API key. Get one at [Google AI Studio](https://makersuite.google.com/app/apikey)
- `CONGRESS_GOV_API_KEY`: (Optional) Congress.gov API key for enhanced legislative data
- `OPENSECRETS_API_KEY`: (Optional) OpenSecrets API key for campaign finance data
- `DATABASE_URL`: (Optional) Database URL for persistent storage (defaults to in-memory)
- `LOG_LEVEL`: Logging level (default: info)

## Usage

### Basic Politician Evaluation

```typescript
import { PoliticianScorecardSystem } from './src/index';

const system = new PoliticianScorecardSystem();

const politician = {
  id: 'example-1',
  name: 'John Doe',
  party: 'Democratic',
  state: 'CA',
  position: 'Senator',
  startDate: new Date('2021-01-03')
};

const report = await system.evaluatePolitician(politician);
console.log('Evaluation Score:', report.score.overallScore);
```

### Batch Evaluation

```typescript
const politicians = [politician1, politician2, politician3];
const reports = await system.evaluateMultiplePoliticians(politicians);
```

### Using Mastra Workflows Directly

```typescript
import { mastra } from './src/mastra';

const run = await mastra.getWorkflow('evaluationWorkflow').createRunAsync();
const result = await run.start({
  inputData: {
    politician,
    timeRange: {
      start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  }
});
```

## Architecture

### Agents

- **PoliticianAgent**: Specialized agent for political analysis and evaluation
- **DataCollectionAgent**: Handles data fetching from government APIs with caching and rate limiting
- **EvaluationAgent**: Performs comprehensive politician evaluation across multiple categories

### Workflows

- **politicianEvaluationWorkflow**: New streamlined workflow for politician analysis
- **evaluationWorkflow**: Comprehensive workflow with data validation and quality assurance

### Tools

- **politicianDataTool**: Fetches comprehensive politician data
- **evaluationTool**: Evaluates politician performance with detailed scoring
- **comparisonTool**: Compares multiple politicians across various metrics

## Customization

### Adding New Evaluation Categories

1. Update the `EvaluationCategory` type in `src/types/index.ts`
2. Add category weights in `EvaluationAgent.getCategoryWeight()`
3. Implement category-specific analysis logic

### Integrating Additional Data Sources

1. Add new API configuration to `DataCollectionAgent`
2. Implement data fetching methods
3. Update data validation and quality metrics

### Modifying Scoring Algorithms

1. Update scoring logic in `EvaluationAgent.calculateCategoryScore()`
2. Adjust category weights for different evaluation priorities
3. Implement custom bias detection algorithms

## Project Structure

```
src/
├── mastra/                    # Mastra components
│   ├── agents/               # AI agents
│   │   ├── politician-agent.ts
│   │   ├── data-collection-agent.ts
│   │   └── evaluation-agent.ts
│   ├── tools/                # Custom tools
│   │   └── politician-tools.ts
│   ├── workflows/            # Workflow definitions
│   │   ├── politician-evaluation-workflow.ts
│   │   └── evaluation-workflow.ts
│   └── index.ts              # Main Mastra configuration
├── services/                 # External API services
│   ├── congress-gov-api.ts
│   └── govtrack-api.ts
├── types/                    # TypeScript type definitions
│   └── index.ts
└── index.ts                  # Main application entry point
```

## Contributing

This template follows the [Mastra template guidelines](https://mastra.ai/en/reference/templates). To contribute improvements:

1. Ensure code follows TypeScript best practices
2. Add comprehensive error handling
3. Include proper documentation and comments
4. Test with fresh installations
5. Follow the established project structure

## License

ISC License - see LICENSE file for details.