import { IExecuteFunctions, INode, INodeType, ITriggerFunctions, NodeOperationError } from 'n8n-workflow';
const RunnApiClient = require('runn-api-client');

export abstract class RunnBaseNode implements INodeType, INode {
  // INode implementation
  id = '';
  name = '';
  type = 'n8n-nodes-runn.runn';
  typeVersion = 1;
  position: [number, number] = [0, 0];
  disabled = false;
  parameters = {};
  abstract description: any;

  public async getRunnApi(this: IExecuteFunctions | ITriggerFunctions) {
    const credentials = await this.getCredentials('runnApi');
    return new RunnApiClient(
      credentials.apiKey as string,
      {
        logLevel: 'debug',
        isDryRun: credentials.dryRun as boolean
      },
    );
  }

  protected handleError(error: any, itemIndex: number): never {
    if (error.response) {
      throw new NodeOperationError(this, `API Error: ${error.response.data.message}`, {
        itemIndex,
        description: error.response.data.description,
      });
    }
    throw error;
  }
}
