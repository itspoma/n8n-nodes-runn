import { INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { RUNN_OPERATIONS } from '../types/operations.types';

export const nodeDescription: INodeTypeDescription = {
  displayName: 'Runn',
  name: 'runn',
  icon: 'file:runn.png',
  group: ['transform'],
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: 'Interact with Runn.io API',
  defaults: {
    name: 'Runn',
  },
  inputs: [NodeConnectionType.Main],
  outputs: [NodeConnectionType.Main],
  credentials: [
    {
      name: 'runnApi',
      required: true,
    },
  ],
  properties: [
    // Resource selection
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: [
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
          name: 'People',
          value: 'people',
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
          name: 'Projects',
          value: 'projects',
        },
        {
          // eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
          name: 'Clients',
          value: 'clients',
        },
      ],
      default: 'people',
    },

    // Operations for Clients
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      default: RUNN_OPERATIONS.CLIENTS.FETCH_ALL,
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: ['clients'],
        },
      },
      options: [
        {
          name: 'Get All',
          value: RUNN_OPERATIONS.CLIENTS.FETCH_ALL,
          description: 'Get all clients',
          action: 'Get all clients',
        },
        {
          name: 'Get One',
          value: RUNN_OPERATIONS.CLIENTS.FETCH_ONE,
          description: 'Get a single client',
          action: 'Get a client',
        },
        {
          name: 'Create',
          value: RUNN_OPERATIONS.CLIENTS.CREATE,
          description: 'Create a new client',
          action: 'Create a client',
        },
        {
          name: 'Update',
          value: RUNN_OPERATIONS.CLIENTS.UPDATE,
          description: 'Update a client',
          action: 'Update a client',
        },
        {
          name: 'Archive',
          value: RUNN_OPERATIONS.CLIENTS.ARCHIVE,
          description: 'Archive a client',
          action: 'Archive a client',
        },
        {
          name: 'Unarchive',
          value: RUNN_OPERATIONS.CLIENTS.UNARCHIVE,
          description: 'Unarchive a client',
          action: 'Unarchive a client',
        },
      ],
    },

    // Operations for Projects
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      default: RUNN_OPERATIONS.PROJECTS.FETCH_ALL,
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: ['projects'],
        },
      },
      options: [
        {
          name: 'Get All',
          value: RUNN_OPERATIONS.PROJECTS.FETCH_ALL,
          description: 'Get all projects',
          action: 'Get all projects',
        },
        {
          name: 'Get One',
          value: RUNN_OPERATIONS.PROJECTS.FETCH_ONE,
          description: 'Get a single project',
          action: 'Get a project',
        },
        {
          name: 'Create',
          value: RUNN_OPERATIONS.PROJECTS.CREATE,
          description: 'Create a new project',
          action: 'Create a project',
        },
        {
          name: 'Update',
          value: RUNN_OPERATIONS.PROJECTS.UPDATE,
          description: 'Update a project',
          action: 'Update a project',
        },
        {
          name: 'Add Note',
          value: RUNN_OPERATIONS.PROJECTS.ADD_NOTE,
          description: 'Add a note to a project',
          action: 'Add a note to a project',
        },
        {
          name: 'Archive',
          value: RUNN_OPERATIONS.PROJECTS.ARCHIVE,
          description: 'Archive a project',
          action: 'Archive a project',
        },
        {
          name: 'Unarchive',
          value: RUNN_OPERATIONS.PROJECTS.UNARCHIVE,
          description: 'Unarchive a project',
          action: 'Unarchive a project',
        },
        {
          name: 'Delete',
          value: RUNN_OPERATIONS.PROJECTS.DELETE,
          description: 'Delete a project',
          action: 'Delete a project',
        },
      ],
    },

    // Operations for People
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      default: RUNN_OPERATIONS.PEOPLE.FETCH_ALL,
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: ['people'],
        },
      },
      options: [
        {
          name: 'Get All',
          value: RUNN_OPERATIONS.PEOPLE.FETCH_ALL,
          description: 'Get all people',
          action: 'Get all people',
        },
        {
          name: 'Get One',
          value: RUNN_OPERATIONS.PEOPLE.FETCH_ONE,
          description: 'Get a single person',
          action: 'Get a person',
        },
        {
          name: 'Create',
          value: RUNN_OPERATIONS.PEOPLE.CREATE,
          description: 'Create a new person',
          action: 'Create a person',
        },
        {
          name: 'Update',
          value: RUNN_OPERATIONS.PEOPLE.UPDATE,
          description: 'Update a person',
          action: 'Update a person',
        },
        {
          name: 'Archive',
          value: RUNN_OPERATIONS.PEOPLE.ARCHIVE,
          description: 'Archive a person',
          action: 'Archive a person',
        },
        {
          name: 'Unarchive',
          value: RUNN_OPERATIONS.PEOPLE.UNARCHIVE,
          description: 'Unarchive a person',
          action: 'Unarchive a person',
        },
        {
          name: 'Delete',
          value: RUNN_OPERATIONS.PEOPLE.DELETE,
          description: 'Delete a person',
          action: 'Delete a person',
        },
      ]
    },

    // ID field for single item operations (clients, projects)
    {
      displayName: 'ID',
      name: 'id',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          operation: [
            RUNN_OPERATIONS.CLIENTS.FETCH_ONE,
            RUNN_OPERATIONS.CLIENTS.UPDATE,
            RUNN_OPERATIONS.CLIENTS.ARCHIVE,
            RUNN_OPERATIONS.CLIENTS.UNARCHIVE,
            RUNN_OPERATIONS.PROJECTS.FETCH_ONE,
            RUNN_OPERATIONS.PROJECTS.UPDATE,
            RUNN_OPERATIONS.PROJECTS.ADD_NOTE,
            RUNN_OPERATIONS.PROJECTS.ARCHIVE,
            RUNN_OPERATIONS.PROJECTS.UNARCHIVE,
            RUNN_OPERATIONS.PROJECTS.DELETE
          ],
        },
      },
      default: '',
      description: 'ID of the item to operate on',
    },

    // Fields for fetching all clients, projects, and people
    {
      displayName: 'Only Active',
      name: 'onlyActive',
      type: 'boolean',
      default: false,
      displayOptions: {
        show: {
          operation: [
            RUNN_OPERATIONS.PEOPLE.FETCH_ALL,
            RUNN_OPERATIONS.CLIENTS.FETCH_ALL,
            RUNN_OPERATIONS.PROJECTS.FETCH_ALL
          ],
        },
      },
      description: 'Return only active people',
    },

    // ID or Email field for single item operations (people)
    {
      displayName: 'ID or Email',
      name: 'idOrEmail',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          operation: [
            RUNN_OPERATIONS.PEOPLE.FETCH_ONE,
            RUNN_OPERATIONS.PEOPLE.UPDATE,
            RUNN_OPERATIONS.PEOPLE.ARCHIVE,
            RUNN_OPERATIONS.PEOPLE.UNARCHIVE,
            RUNN_OPERATIONS.PEOPLE.DELETE
          ],
        },
      },
      default: '',
      description: 'ID or Email of the item to operate on (at least one of them should be filled)',
    },

    // Fields for creating/updating a client
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          resource: ['clients'],
          operation: [RUNN_OPERATIONS.CLIENTS.CREATE],
        },
      },
      default: '',
      description: 'Name of the client',
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: false,
      displayOptions: {
        show: {
          resource: ['clients'],
          operation: [RUNN_OPERATIONS.CLIENTS.UPDATE,],
        },
      },
      default: '',
      description: 'Name of the client',
    },
    {
      displayName: 'Website',
      name: 'website',
      type: 'string',
      displayOptions: {
        show: {
          resource: ['clients'],
          operation: [
            RUNN_OPERATIONS.CLIENTS.CREATE,
            RUNN_OPERATIONS.CLIENTS.UPDATE,
          ],
        },
      },
      default: '',
      description: 'Website of the client',
    },

    // Fields for creating/updating a project
    {
      displayName: 'Emoji',
      name: 'emoji',
      type: 'string',
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [
            RUNN_OPERATIONS.PROJECTS.CREATE,
          ],
        },
      },
      default: '',
      description: 'Emoji for the project',
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [RUNN_OPERATIONS.PROJECTS.CREATE],
        },
      },
      default: '',
      description: 'Name of the project',
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: false,
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [RUNN_OPERATIONS.PROJECTS.UPDATE],
        },
      },
      default: '',
      description: 'Name of the project',
    },
    {
      displayName: 'Is Confirmed?',
      name: 'isConfirmed',
      type: 'boolean',
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [
            RUNN_OPERATIONS.PROJECTS.CREATE,
            RUNN_OPERATIONS.PROJECTS.UPDATE,
          ],
        },
      },
      default: false,
      description: 'Whether the project is confirmed or not',
    },
    {
      displayName: 'Budget',
      name: 'budget',
      type: 'number',
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [
            RUNN_OPERATIONS.PROJECTS.CREATE,
            RUNN_OPERATIONS.PROJECTS.UPDATE,
          ],
        },
      },
      default: 0,
      description: 'Budget for the project',
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'number',
      required: true,
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [RUNN_OPERATIONS.PROJECTS.CREATE],
        },
      },
      default: '',
      description: 'Client ID for the project',
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'number',
      required: false,
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [RUNN_OPERATIONS.PROJECTS.UPDATE],
        },
      },
      default: "",
      description: 'Client ID for the project',
    },
    {
      displayName: 'Pricing Model',
      name: 'pricingModel',
      type: 'options',
      options: [
        {
          name: 'Fixed Price',
          value: 'fp',
        },
        {
          name: 'Time and Materials',
          value: 'tm',
        },
        {
          name: 'Non-Billable',
          value: 'nb',
        },
      ],
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [
            RUNN_OPERATIONS.PROJECTS.CREATE,
            RUNN_OPERATIONS.PROJECTS.UPDATE,
          ],
        },
      },
      default: 'fp',
      description: 'Pricing model for the project',
    },

    // Fields for adding a note for project
    {
      displayName: 'Note',
      name: 'note',
      type: 'string',
      displayOptions: {
        show: {
          resource: ['projects'],
          operation: [RUNN_OPERATIONS.PROJECTS.ADD_NOTE],
        },
      },
      default: '',
      description: 'Note for the project',
    },

    // Fields for creating a person
    {
      displayName: 'First Name',
      name: 'firstName',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE, RUNN_OPERATIONS.PEOPLE.UPDATE],
        },
      },
      default: '',
      description: 'First name of the person',
    },
    {
      displayName: 'Last Name',
      name: 'lastName',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE, RUNN_OPERATIONS.PEOPLE.UPDATE],
        },
      },
      default: '',
      description: 'Last name of the person',
    },
    {
      displayName: 'Role',
      name: 'role',
      type: 'string',
      required: true,
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE],
        },
      },
      default: '',
      description: 'Role to assign to the person (supported both role Id or String)',
    },
    {
      displayName: 'Email',
      name: 'email',
      type: 'string',
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE, RUNN_OPERATIONS.PEOPLE.UPDATE],
        },
      },
      default: '',
      description: 'Email of the person',
    },
    {
      displayName: 'Start Date',
      name: 'startDate',
      type: 'dateTime',
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE],
        },
      },
      default: '',
      description: 'Start date of the person contract (first working day). Defaults to today.',
    },
    {
      displayName: 'End Date',
      name: 'endDate',
      type: 'dateTime',
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE],
        },
      },
      default: '',
      description: 'Last date of the person contract',
    },
    {
      displayName: 'Employment Type',
      name: 'employmentType',
      type: 'options',
      options: [
        {
          name: '<empty>',
          value: '',
        },
        {
          name: 'Employee',
          value: 'employee',
        },
        {
          name: 'Contractor',
          value: 'contractor',
        },
      ],
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.CREATE],
        },
      },
      default: '',
      description: 'The type of employment for the contract',
    },
    {
      displayName: 'Is Archived?',
      name: 'isArchived',
      type: 'boolean',
      displayOptions: {
        show: {
          resource: ['people'],
          operation: [RUNN_OPERATIONS.PEOPLE.UPDATE],
        },
      },
      default: false,
      description: 'Whether the person is archived or not',
    },

    // Dry Run Option
    {
      displayName: 'Dry Run',
      name: 'dryRun',
      type: 'boolean',
      default: false,
      description: 'If enabled, no actual changes will be made to your Runn account',
      displayOptions: {
        show: {
          resource: ['people', 'projects'],
          operation: [
            RUNN_OPERATIONS.CLIENTS.CREATE,
            RUNN_OPERATIONS.CLIENTS.UPDATE,
            RUNN_OPERATIONS.CLIENTS.ARCHIVE,
            RUNN_OPERATIONS.CLIENTS.UNARCHIVE,
            RUNN_OPERATIONS.PEOPLE.CREATE,
            RUNN_OPERATIONS.PEOPLE.UPDATE,
            RUNN_OPERATIONS.PEOPLE.ARCHIVE,
            RUNN_OPERATIONS.PEOPLE.UNARCHIVE,
            RUNN_OPERATIONS.PEOPLE.DELETE,
            RUNN_OPERATIONS.PROJECTS.CREATE,
            RUNN_OPERATIONS.PROJECTS.UPDATE,
            RUNN_OPERATIONS.PROJECTS.ADD_NOTE,
            RUNN_OPERATIONS.PROJECTS.ARCHIVE,
            RUNN_OPERATIONS.PROJECTS.UNARCHIVE,
            RUNN_OPERATIONS.PROJECTS.DELETE,
          ],
        },
      },
    },

    // Options
    {
      displayName: 'Options',
      name: 'options',
      type: 'collection',
      placeholder: 'Add Option',
      default: {},
      options: [],
    },
  ],
};
