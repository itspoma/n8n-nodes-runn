export const RUNN_OPERATIONS = {
  CLIENTS: {
    FETCH_ALL: 'fetchAllClients',
    FETCH_ONE: 'fetchClient',
    CREATE: 'createClient',
    UPDATE: 'updateClient',
    ARCHIVE: 'archiveClient',
    UNARCHIVE: 'unarchiveClient',
  },
  PROJECTS: {
    FETCH_ALL: 'fetchAllProjects',
    FETCH_ONE: 'fetchProject',
    CREATE: 'createProject',
    UPDATE: 'updateProject',
    ADD_NOTE: 'addNote',
    ARCHIVE: 'archiveProject',
    UNARCHIVE: 'unarchiveProject',
    DELETE: 'deleteProject',
  },
  PEOPLE: {
    FETCH_ALL: 'fetchAllPeople',
    FETCH_ONE: 'fetchPerson',
    CREATE: 'createPerson',
    UPDATE: 'updatePerson',
    ARCHIVE: 'archivePerson',
    UNARCHIVE: 'unarchivePerson',
    DELETE: 'deletePerson',
  },
} as const;

export type RunnOperations = typeof RUNN_OPERATIONS;
