import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
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
      const dryRun = this.getNodeParameter('dryRun', i) as boolean;

      switch (operation) {
        case RUNN_OPERATIONS.CLIENTS.FETCH_ALL:
          const onlyActive = this.getNodeParameter('onlyActive', i) as boolean;
          responseData = await runnApi.clients.fetchAll({ onlyActive });
          break;

        case RUNN_OPERATIONS.CLIENTS.FETCH_ONE:
          const clientId = this.getNodeParameter('id', i) as string;
          try {
            responseData = await runnApi.clients.fetchOneById(clientId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.CLIENTS.CREATE:
          const createData = {
            name: this.getNodeParameter('name', i) as string,
            website: this.getNodeParameter('website', i) as string,
          };

          const createOtherValues = {
            ...(createData.website ? { website: createData.website } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.clients.create(createData.name, [], createOtherValues);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.CLIENTS.UPDATE:
          const updateClientId = this.getNodeParameter('id', i) as string;
          const updateData = {
            name: this.getNodeParameter('name', i) as string | null,
            website: this.getNodeParameter('website', i) as string | null,
          };

          const updateOtherValues = {
            ...(updateData.name ? { name: updateData.name } : {}),
            ...(updateData.website ? { website: updateData.website } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.clients.update(updateClientId, updateOtherValues);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.CLIENTS.ARCHIVE:
          const archiveClientId = this.getNodeParameter('id', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.clients.archive(archiveClientId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.CLIENTS.UNARCHIVE:
          const unarchiveClientId = this.getNodeParameter('id', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.clients.unarchive(unarchiveClientId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
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
