import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { RunnBaseNode } from './base/RunnBaseNode';
import { nodeDescription } from './descriptions/node.description';
import { executePeopleOperation } from './operations/people.operations';
import { executeProjectsOperation } from './operations/projects.operations';
import { executeClientsOperation } from './operations/clients.operations';

export class Runn extends RunnBaseNode {
  description = nodeDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    this.logger.debug('Resource/Operation:', { resource, operation });

    const runnApi = await RunnBaseNode.prototype.getRunnApi.call(this);

    try {
      let returnData: INodeExecutionData[] = [];

      switch (resource) {
        case 'people':
          returnData = await executePeopleOperation.call(this, operation, items, runnApi);
          break;
        case 'projects':
          returnData = await executeProjectsOperation.call(this, operation, items, runnApi);
          break;
        case 'clients':
          returnData = await executeClientsOperation.call(this, operation, items, runnApi);
          break;
        default:
          throw new Error(`Unsupported resource ${resource}`);
      }

      return [returnData];
    } catch (error) {
      if (this.continueOnFail()) {
        return [[{ json: { error: error.message } }]];
      }
      throw error;
    }
  }
}
