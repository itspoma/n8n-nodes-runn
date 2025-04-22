import {
	INodeType,
	INodeTypeDescription,
	ITriggerFunctions,
	ITriggerResponse,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { RunnBaseNode } from './base/RunnBaseNode';
import { RUNN_TRIGGER_OPERATIONS, RunnTriggerResource, RunnTriggerEvent } from './types';

// Helper function to format a link based on operation
function formatRunnLink(resource: RunnTriggerResource, record: { id?: string; personId?: string }) {
  if (resource === 'people') {
    return `https://app.runn.io/people/${record.id}`;
  } else if (resource === 'projects') {
    return `https://app.runn.io/projects/${record.id}`;
  } else if (resource === 'clients') {
    return `https://app.runn.io/clients/${record.id}`;
  } else if (resource === 'teams') {
    return `https://app.runn.io/teams/${record.id}`;
  } else if (resource === 'actuals') {
    // https://developer.runn.io/reference/get_actuals
    return `https://app.runn.io/people/${record.personId}`;
  } else if (resource === 'assignments') {
    // https://developer.runn.io/reference/get_assignments
    return `https://app.runn.io/people/${record.personId}`;
  } else if (resource === 'contracts') {
    // https://developer.runn.io/reference/get_contracts
    return `https://app.runn.io/people/${record.personId}`;
  } else if (resource === 'users') {
    return `https://app.runn.io/users/${record.id}`;
  }
  return '';
}

export class RunnTrigger extends RunnBaseNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Runn Trigger',
		name: 'runnTrigger',
		icon: 'file:runn.png',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when Runn events occur',
		defaults: {
			name: 'When Runn events occur',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		subtitle: '={{$parameter["events"].length + " events over " + $parameter["resources"].length + " resources"}}',
		credentials: [
			{
				name: 'runnApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resources',
				name: 'resources',
				type: 'multiOptions',
				required: true,
				options: [
					{
						name: 'People',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE,
					},
					{
						name: 'Projects',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS,
					},
					{
						name: 'Clients',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.CLIENTS,
					},
					{
						name: 'Assignments',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS,
					},
					{
						name: 'Actuals',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS,
					},
					{
						name: 'Contracts',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.CONTRACTS,
					},
					{
						name: 'Users',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.USERS,
					},
					{
						name: 'Teams',
						value: RUNN_TRIGGER_OPERATIONS.RESOURCES.TEAMS,
					},
				],
				default: [
          RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE,
          RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS,
          RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS,
          RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS
        ],
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				options: [
					{
						name: 'Created',
						value: RUNN_TRIGGER_OPERATIONS.EVENTS.CREATED,
						description: 'Will trigger when a new resource is created',
					},
					{
						name: 'Updated',
						value: RUNN_TRIGGER_OPERATIONS.EVENTS.UPDATED,
						description: 'Will trigger when a resource is updated',
					},
					{
						name: 'Deleted',
						value: RUNN_TRIGGER_OPERATIONS.EVENTS.DELETED,
						description: 'Will trigger when a resource is deleted. Currently supporting only projects, people, contracts, actuals and assignments. Supported only LIVE accounts.',
					},
				],
				default: [
          RUNN_TRIGGER_OPERATIONS.EVENTS.CREATED,
          RUNN_TRIGGER_OPERATIONS.EVENTS.UPDATED,
        ],
			},
			{
				displayName: 'Polling Interval',
				name: 'pollInterval',
				type: 'number',
				default: 60,
				description: 'How often to poll for new people (in minutes)',
				typeOptions: {
					minValue: 0.1,
				},
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const resources = this.getNodeParameter('resources', 0) as RunnTriggerResource[];
		const events = this.getNodeParameter('events', 0) as RunnTriggerEvent[];
		const pollInterval = Number(this.getNodeParameter('pollInterval', 0)) || 60;

		if (resources.length === 0) {
			throw new NodeOperationError(this.getNode(), 'At least one resource should be selected');
		}
		if (events.length === 0) {
			throw new NodeOperationError(this.getNode(), 'At least one event should be selected');
		}

		const webhookData = this.getWorkflowStaticData('node');

		// Initialize lastCheck time if not set
		if (!webhookData.lastCheck) {
			webhookData.lastCheck = new Date().toISOString();
		}
		let lastCheck = webhookData.lastCheck as string;

		const runnApi = await RunnBaseNode.prototype.getRunnApi.call(this);

    // Function to listed Runn for any updates
		const checkRunnForUpdates = async () => {
      // collect here all items that matched
      const resultItemsMatched: any[] = [];

      // check for creates and updates from any resource
      if (events.includes(RUNN_TRIGGER_OPERATIONS.EVENTS.CREATED) || events.includes(RUNN_TRIGGER_OPERATIONS.EVENTS.UPDATED)) {
        // Function to check for updates from any resource
        const checkForUpdates = async (
          resourceType: RunnTriggerResource,
          fetchFunction: (params?: any) => Promise<any[]>
        ) => {
          // console.log('!!!checkForUpdates', { resourceType });

          const items = await fetchFunction({
            // adding modifiedAt will help to decrease response size from Runn API
            modifiedAfter: new Date(lastCheck).toISOString().substring(0, 19) + 'Z',
          });

          // filter items created or updated after lastCheck
          const itemsMatching = items.filter((item: any) => {
            let condition = false;

            if (events.includes(RUNN_TRIGGER_OPERATIONS.EVENTS.CREATED)) {
              item.trigger_event_type = RUNN_TRIGGER_OPERATIONS.EVENTS.CREATED;
              const createdAt = new Date(item.createdAt);
              condition = condition || createdAt.getTime() > new Date(lastCheck).getTime();
            }

            if (!condition && events.includes(RUNN_TRIGGER_OPERATIONS.EVENTS.UPDATED)) {
              item.trigger_event_type = RUNN_TRIGGER_OPERATIONS.EVENTS.UPDATED;
              const updatedAt = new Date(item.updatedAt);
              condition = condition || updatedAt.getTime() > new Date(lastCheck).getTime();
            }

            item.trigger_link = formatRunnLink(resourceType, item);

            return condition;
          });

          // this.logger.debug(`!!!${resourceType}Matching`, { itemsMatching, lastCheck });

          return itemsMatching.map((item: any) => ({
            trigger_resource_type: resourceType,
            trigger_event_type: item.trigger_event_type,
            trigger_link: item.trigger_link,
            ...item,
          }));
        };

        // check for updates from people
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE, (params) => runnApi.people.fetchAll(params)),
          );
        }

        // check for updates from projects
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS, (params) => runnApi.projects.fetchAll(params)),
          );
        }

        // check for updates from clients
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.CLIENTS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.CLIENTS, (params) => runnApi.clients.fetchAll(params)),
          );
        }

        // check for updates from assignments
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS, (params) => runnApi.assignments.fetchAll(params)),
          );
        }

        // check for updates from actuals
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS, (params) => runnApi.actuals.fetchAll(params)),
          );
        }

        // check for updates from contracts
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.CONTRACTS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.CONTRACTS, (params) => runnApi.contracts.fetchAll(params)),
          );
        }

        // check for updates from users
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.USERS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.USERS, (params) => runnApi.users.fetchAll(params)),
          );
        }

        // check updates from teams
        if (resources.includes(RUNN_TRIGGER_OPERATIONS.RESOURCES.TEAMS)) {
          resultItemsMatched.push(
            ...await checkForUpdates(RUNN_TRIGGER_OPERATIONS.RESOURCES.TEAMS, (params) => runnApi.teams.fetchAll(params)),
          );
        }
      }

      // check for deleted items
      if (events.includes(RUNN_TRIGGER_OPERATIONS.EVENTS.DELETED)) {
        try {
          const items = await runnApi.activityLog.fetchAll({
            // adding occurredAfter will help to decrease response size from Runn API
						occurredAfter: new Date(lastCheck).toISOString().substring(0, 19) + 'Z',
          });

          // this.logger.debug(`!!!deleted matching`, { items, lastCheck });

          resultItemsMatched.push(
            ...items.map((item: any) => ({
              trigger_event_type: RUNN_TRIGGER_OPERATIONS.EVENTS.DELETED,
              trigger_resource_type: (() => {
                switch (item.type) {
                  case 'person_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE;
                  case 'project_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS;
                  case 'contract_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.CONTRACTS;
                  case 'actual_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS;
                  case 'assignment_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS;
                  default:
                    return item.type;
                }
              })(),
              trigger_link: formatRunnLink((() => {
                switch (item.type) {
                  case 'person_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.PEOPLE;
                  case 'project_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.PROJECTS;
                  case 'contract_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.CONTRACTS;
                  case 'actual_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.ACTUALS;
                  case 'assignment_deleted':
                    return RUNN_TRIGGER_OPERATIONS.RESOURCES.ASSIGNMENTS;
                  default:
                    return item.type;
                }
              })(), item),
              ...item,
            }))
          );
        } catch (error) {
          // Use handleError from RunnBaseNode
          // Disabled to not block the execution
          // throw new NodeOperationError(this.getNode(), `Runn API error: ${error.message}`);
        }
      }

      // console.log('!!!resultItemsMatched', { resultItemsMatched })

      if (resultItemsMatched.length > 0) {
        // Update lastCheck to current time
        lastCheck = new Date().toISOString();
        webhookData.lastCheck = lastCheck;

        // Return data for each matching person
        for (const itemMatched of resultItemsMatched) {
          const data = {
            trigger_resource_type: itemMatched.trigger_resource_type,
            trigger_event_type: itemMatched.trigger_event_type,
            trigger_link: itemMatched.trigger_link,
            ...itemMatched
          };
          this.emit([this.helpers.returnJsonArray(data)]);
        }
      }
		}

		const pollTimer = setInterval(async () => {
			await checkRunnForUpdates();
		}, pollInterval * 60 * 1000);

		return {
			closeFunction: async () => {
				clearInterval(pollTimer);
			},
		};
	}
}
