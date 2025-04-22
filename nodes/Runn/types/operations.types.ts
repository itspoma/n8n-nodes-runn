export const RUNN_OPERATIONS = {
  PEOPLE: {
    FETCH_ALL: 'fetchAllPeople',
    FETCH_ONE: 'fetchPerson',
    CREATE: 'createPerson',
    UPDATE: 'updatePerson',
    ARCHIVE: 'archivePerson',
    UNARCHIVE: 'unarchivePerson',
    DELETE: 'deletePerson',
  },
  PROJECTS: {
    FETCH_ALL: 'fetchAllProjects',
    FETCH_ONE: 'fetchProject',
    CREATE: 'createProject',
    UPDATE: 'updateProject',
    ADD_NOTE: 'addNote',
  },
  CLIENTS: {
    FETCH_ALL: 'fetchAllClients',
    FETCH_ONE: 'fetchClient',
    CREATE: 'createClient',
    UPDATE: 'updateClient',
  },
} as const;

export type RunnOperations = typeof RUNN_OPERATIONS;
