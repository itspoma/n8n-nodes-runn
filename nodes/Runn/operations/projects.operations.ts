import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
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

      switch (operation) {
        case RUNN_OPERATIONS.PROJECTS.FETCH_ALL:
          responseData = await runnApi.projects.fetchAll();
          break;

        case RUNN_OPERATIONS.PROJECTS.FETCH_ONE:
          const projectId = this.getNodeParameter('id', i) as string;
          responseData = await runnApi.projects.fetchOneById(projectId);
          break;

        case RUNN_OPERATIONS.PROJECTS.CREATE:
          // Implementation for create project
          const projectData = {
            // Add project creation parameters here
          };
          responseData = await runnApi.projects.create(projectData);
          break;

        case RUNN_OPERATIONS.PROJECTS.UPDATE:
          // Implementation for update project
          const updateProjectId = this.getNodeParameter('id', i) as string;
          const updateData = {
            // Add project update parameters here
          };
          responseData = await runnApi.projects.update(updateProjectId, updateData);
          break;

        case RUNN_OPERATIONS.PROJECTS.ADD_NOTE:
          const noteProjectId = this.getNodeParameter('id', i) as string;
          const note = this.getNodeParameter('note', i) as string;
          responseData = await runnApi.projects.addNote(noteProjectId, { note });
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
