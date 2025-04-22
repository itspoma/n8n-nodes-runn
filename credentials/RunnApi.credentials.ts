import {
  ICredentialType,
  INodeProperties,
  Icon,
} from 'n8n-workflow';

export class RunnApi implements ICredentialType {
  name = 'runnApi';
  displayName = 'Runn API';
  documentationUrl = 'https://help.runn.io/en/articles/7039247-how-to-generate-an-api-token-in-runn';
  description = 'Authentication for Runn.io - a resource planning and forecasting tool';
  icon: Icon = 'file:runn.png';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Your Runn API key',
    },
  ];
}