import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { RUNN_OPERATIONS } from '../types/operations.types';

export async function executeClientsOperation(
  this: IExecuteFunctions,
  operation: string,
  items: INodeExecutionData[],
  runnApi: any,
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      let responseData;

      switch (operation) {
        case RUNN_OPERATIONS.CLIENTS.FETCH_ALL:
          responseData = await runnApi.clients.fetchAll();
          break;

        case RUNN_OPERATIONS.CLIENTS.FETCH_ONE:
          const clientId = this.getNodeParameter('id', i) as string;
          responseData = await runnApi.clients.fetchOneById(clientId);
          break;

        case RUNN_OPERATIONS.CLIENTS.CREATE:
          // Implementation for create client
          const clientData = {
            // Add client creation parameters here
          };
          responseData = await runnApi.clients.create(clientData);
          break;

        case RUNN_OPERATIONS.CLIENTS.UPDATE:
          // Implementation for update client
          const updateClientId = this.getNodeParameter('id', i) as string;
          const updateData = {
            // Add client update parameters here
          };
          responseData = await runnApi.clients.update(updateClientId, updateData);
          break;

        default:
          throw new Error(`Unsupported operation ${operation}`);
      }

      returnData.push({
        json: responseData,
      });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({
          json: {
            error: error.message,
          },
        });
        continue;
      }
      throw error;
    }
  }

  return returnData;
}
