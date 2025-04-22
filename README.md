# n8n-nodes-runn

This is an n8n community node. It lets you use Runn in your n8n workflows.

Runn is a project management platform that helps you manage your team's work and projects.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Local development

```bash
n8n-nodes-runn % npm run build
n8n-nodes-runn % npm link
n8n-nodes-runn % N8N_LOG_LEVEL=debug n8n start
```

## Operations

This node supports the following operations:

- `Create a new client` - creates a new client
- `Fetch a client` - fetches a client by id
- `Fetch all clients` - fetches all clients
- `Update a client` - updates a client
- `Delete a client` - deletes a client

- `Create a new project` - creates a new project
- `Fetch a project` - fetches a project by id
- `Fetch all projects` - fetches all projects
- `Update a project` - updates a project
- `Delete a project` - deletes a project

- `Create a new person` - creates a new person
- `Fetch a person` - fetches a person by id
- `Fetch all people` - fetches all people
- `Update a person` - updates a person
- `Delete a person` - deletes a person

- `Create a new allocation` - creates a new allocation
- `Fetch an allocation` - fetches an allocation by id
- `Fetch all allocations` - fetches all allocations
- `Update an allocation` - updates an allocation
- `Delete an allocation` - deletes an allocation

- `Create a new note` - creates a new note
- `Fetch a note` - fetches a note by id
- `Fetch all notes` - fetches all notes
- `Update a note` - updates a note
- `Delete a note` - deletes a note

## Triggers

This node supports the following triggers:

- `Client created` - triggers when a new client is created
- `Client updated` - triggers when an existing client is updated
- `Client deleted` - triggers when a client is deleted
- `Project created` - triggers when a new project is created
- `Project updated` - triggers when an existing project is updated
- `Project deleted` - triggers when a project is deleted
- `Person created` - triggers when a new person is created
- `Person updated` - triggers when an existing person is updated
- `Person deleted` - triggers when a person is deleted


## Credentials

To use this node, you need to have a Runn API key. You can get one from your [Runn account API settings](https://app.runn.io/account/api).

## Compatibility

This node supports n8n version 20.0.0 and above. It has been tested against n8n version 20.0.0.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Runn API documentation](https://developer.runn.io/)
