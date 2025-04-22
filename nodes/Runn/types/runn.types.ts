export interface IRunnApi {
  clients: {
    fetchAll: () => Promise<any>;
    fetchOne: (id: string) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    archive: (id: string) => Promise<any>;
    unarchive: (id: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
  people: {
    fetchAll: () => Promise<any>;
    fetchOne: (id: string) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    archive: (id: string) => Promise<any>;
    unarchive: (id: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
  projects: {
    fetchAll: () => Promise<any>;
    fetchOne: (id: string) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    addNote: (id: string, data: { note: string }) => Promise<any>;
  };
}

export interface IRunnCredentials {
  apiKey: string;
  dryRun?: boolean;
}
