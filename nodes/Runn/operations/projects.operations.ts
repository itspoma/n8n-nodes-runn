import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import { RUNN_OPERATIONS } from '../types/operations.types';

export async function executeProjectsOperation(
  this: IExecuteFunctions,
  operation: string,
  items: INodeExecutionData[],
  runnApi: any,
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      let responseData;

      let dryRun = false;
      try {
        dryRun = this.getNodeParameter('dryRun', i) as boolean;
      }
      catch (e) {
        dryRun = false;
      }

      switch (operation) {
        case RUNN_OPERATIONS.PROJECTS.FETCH_ALL:
          const onlyActive = this.getNodeParameter('onlyActive', i) as boolean;
          responseData = await runnApi.projects.fetchAll({ onlyActive });
          break;

        case RUNN_OPERATIONS.PROJECTS.FETCH_ONE:
          const projectId = this.getNodeParameter('id', i) as string;
          try {
            responseData = await runnApi.projects.fetchOneById(projectId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.CREATE:
          // Implementation for create project
          const createData = {
            emoji: this.getNodeParameter('emoji', i) as string,
            name: this.getNodeParameter('name', i) as string,
            isConfirmed: this.getNodeParameter('isConfirmed', i) as boolean,
            budget: this.getNodeParameter('budget', i) as number,
            clientId: this.getNodeParameter('clientId', i) as number,
            pricingModel: this.getNodeParameter('pricingModel', i) as string,
          };

          const createOtherValues = {
            ...(createData.emoji ? { emoji: createData.emoji } : {}),
            ...(createData.isConfirmed !== undefined ? { isConfirmed: createData.isConfirmed } : {}),
            ...(createData.budget ? { budget: createData.budget } : {}),
            ...(createData.pricingModel ? { pricingModel: createData.pricingModel } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.create(createData.name, createData.clientId, createOtherValues);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.UPDATE:
          // Implementation for update project
          const updateProjectId = this.getNodeParameter('id', i) as string;
          const updateData = {
            name: this.getNodeParameter('name', i) as string,
            isConfirmed: this.getNodeParameter('isConfirmed', i) as boolean,
            budget: this.getNodeParameter('budget', i) as number,
            pricingModel: this.getNodeParameter('pricingModel', i) as string,
          };

          const updateOtherValues = {
            ...(updateData.name ? { name: updateData.name } : {}),
            ...(updateData.isConfirmed !== undefined ? { isConfirmed: updateData.isConfirmed } : {}),
            ...(updateData.budget ? { budget: updateData.budget } : {}),
            ...(updateData.pricingModel ? { pricingModel: updateData.pricingModel } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.update(updateProjectId, updateOtherValues);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.ADD_NOTE:
          const noteProjectId = this.getNodeParameter('id', i) as string;
          const note = this.getNodeParameter('note', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.addNote(noteProjectId, note);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.ARCHIVE:
          const archiveProjectId = this.getNodeParameter('id', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.archive(archiveProjectId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.UNARCHIVE:
          const unarchiveProjectId = this.getNodeParameter('id', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.unarchive(unarchiveProjectId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        case RUNN_OPERATIONS.PROJECTS.DELETE:
          const deleteProjectId = this.getNodeParameter('id', i) as string;

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.projects.delete(deleteProjectId);
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
