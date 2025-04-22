declare module 'runn-api-client' {
  interface RunnApiClientOptions {
    logLevel?: string;
    isDryRun?: boolean;
  }

  class RunnApiClient {
    constructor(apiKey: string, options?: RunnApiClientOptions);

    people: {
      fetchAll(): Promise<any[]>;
      fetch(id: string): Promise<any>;
      create(data: any): Promise<any>;
      update(id: string, data: any): Promise<any>;
    };

    projects: {
      fetchAll(): Promise<any[]>;
      fetch(id: string): Promise<any>;
      create(data: any): Promise<any>;
      update(id: string, data: any): Promise<any>;
    };

    clients: {
      fetchAll(): Promise<any[]>;
      fetch(id: string): Promise<any>;
      create(data: any): Promise<any>;
      update(id: string, data: any): Promise<any>;
    };
  }

  export = RunnApiClient;
}
