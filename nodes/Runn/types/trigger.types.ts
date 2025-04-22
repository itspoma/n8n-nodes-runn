export const RUNN_TRIGGER_OPERATIONS = {
  RESOURCES: {
    PEOPLE: 'people',
    PROJECTS: 'projects',
    CLIENTS: 'clients',
    ASSIGNMENTS: 'assignments',
    ACTUALS: 'actuals',
    CONTRACTS: 'contracts',
    USERS: 'users',
    TEAMS: 'teams',
  },
  EVENTS: {
    CREATED: 'created',
    UPDATED: 'updated',
    DELETED: 'deleted',
  },
} as const;

export type RunnTriggerResource = typeof RUNN_TRIGGER_OPERATIONS.RESOURCES[keyof typeof RUNN_TRIGGER_OPERATIONS.RESOURCES];
export type RunnTriggerEvent = typeof RUNN_TRIGGER_OPERATIONS.EVENTS[keyof typeof RUNN_TRIGGER_OPERATIONS.EVENTS];
