import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import { RUNN_OPERATIONS } from '../types/operations.types';

// Helper function to format date to YYYY-MM-DD
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Helper function to get person ID from ID or email
async function getPersonId(
  this: IExecuteFunctions,
  idOrEmail: string,
  runnApi: any,
): Promise<string> {
  if (!isNaN(Number(idOrEmail))) {
    return idOrEmail;
  }

  const email = idOrEmail;
  this.logger.debug('Fetching person with email', { email });

  const personData = await runnApi.people.fetchOneByEmail(email);
  if (!personData) {
    throw new NodeOperationError(
      this.getNode(),
      `Person with email ${email} not found`,
      { description: 'Person not found' },
    );
  }

  return personData.id;
}

export async function executePeopleOperation(
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

      this.logger.debug('operation', { operation });

      switch (operation) {
        // fetch all people
        case RUNN_OPERATIONS.PEOPLE.FETCH_ALL:
          const onlyActive = this.getNodeParameter('onlyActive', i) as boolean;
          responseData = await runnApi.people.fetchAll({ onlyActive });
          break;

        // fetch one person by id or email
        case RUNN_OPERATIONS.PEOPLE.FETCH_ONE:
          const fetchPersonId = await getPersonId.call(
            this,
            this.getNodeParameter('idOrEmail', i) as string,
            runnApi,
          );
          responseData = await runnApi.people.fetchOneById(fetchPersonId);
          break;

        // create a new person
        case RUNN_OPERATIONS.PEOPLE.CREATE:
          // combined values filled by user
          const createValues = {
            firstName: this.getNodeParameter('firstName', i) as string,
            lastName: this.getNodeParameter('lastName', i) as string,
            role: this.getNodeParameter('role', i) as string,
            email: this.getNodeParameter('email', i) as string,
            startDate: formatDate(this.getNodeParameter('startDate', i) as string),
            endDate: formatDate(this.getNodeParameter('endDate', i) as string),
            employmentType: this.getNodeParameter('employmentType', i) as string,
          };

          // optional values, removed empty
          const createOtherValues = {
            ...(createValues.email ? { email: createValues.email } : {}),
            ...(createValues.startDate ? { startDate: createValues.startDate } : {}),
            ...(createValues.endDate ? { endDate: createValues.endDate } : {}),
            ...(createValues.employmentType ? { employmentType: createValues.employmentType } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          this.logger.debug('Creating person:', { createValues, createOtherValues });

          try {
            responseData = await runnApi.people.create(
              createValues.firstName,
              createValues.lastName,
              createValues.role,
              createOtherValues,
            );
          } catch (error) {
            if (error.response && error.response.status !== 200) {
              throw new NodeOperationError(
                this.getNode(),
                error.response.data.message,
                { description: error.response.status },
              );
            }

            throw error;
          }
          break;

        // update a person
        case RUNN_OPERATIONS.PEOPLE.UPDATE:
          const updatePersonId = await getPersonId.call(
            this,
            this.getNodeParameter('idOrEmail', i) as string,
            runnApi,
          );

          // values filled by user
          const updateValues = {
            firstName: this.getNodeParameter('firstName', i) as string,
            lastName: this.getNodeParameter('lastName', i) as string,
            email: this.getNodeParameter('email', i) as string,
            isArchived: this.getNodeParameter('isArchived', i) as boolean | undefined,
          };

          // optional values, removed empty
          const updateValuesData = {
            ...(updateValues.firstName ? { firstName: updateValues.firstName } : {}),
            ...(updateValues.lastName ? { lastName: updateValues.lastName } : {}),
            ...(updateValues.email ? { email: updateValues.email } : {}),
            ...(updateValues.isArchived ? { isArchived: updateValues.isArchived } : {}),
          };

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          this.logger.debug('Updating person:', { id: updatePersonId, updateValues, updateValuesData });

          try {
            responseData = await runnApi.people.update(updatePersonId, updateValuesData);
          } catch (error) {
            if (error.response && error.response.status !== 200) {
              throw new NodeOperationError(
                this.getNode(),
                error.response.data.message,
                { description: error.response.status },
              );
            }

            throw error;
          }

          break;

        // archive a person
        case RUNN_OPERATIONS.PEOPLE.ARCHIVE:
          const archivePersonId = await getPersonId.call(
            this,
            this.getNodeParameter('idOrEmail', i) as string,
            runnApi,
          );

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.people.archive(archivePersonId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        // unarchive a person
        case RUNN_OPERATIONS.PEOPLE.UNARCHIVE:
          const unarchivePersonId = await getPersonId.call(
            this,
            this.getNodeParameter('idOrEmail', i) as string,
            runnApi,
          );

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.people.unarchive(unarchivePersonId);
          }
          catch (error) {
            throw new NodeOperationError(
              this.getNode(),
              error.response.data.message,
              { description: error.response.status },
            );
          }
          break;

        // delete a person
        case RUNN_OPERATIONS.PEOPLE.DELETE:
          const deletePersonId = await getPersonId.call(
            this,
            this.getNodeParameter('idOrEmail', i) as string,
            runnApi,
          );

          if (dryRun) {
            responseData = {
              success: true,
              dry_run: true,
            };
            break;
          }

          try {
            responseData = await runnApi.people.delete(deletePersonId);
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
