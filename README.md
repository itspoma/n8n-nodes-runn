# n8n-nodes-runn

This is an n8n community node. It lets you use Runn in your n8n workflows.

Runn is a project management platform that helps you manage your team's work and projects.

![](https://github.com/user-attachments/assets/f1e7628a-202b-44ab-82a0-67e016f89af9)

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

### Supported Resources

- `Client` (fetch all, fetch one, create, update, delete, archive, unarchive)
- `Project` (fetch all, fetch one, create, update, delete, archive, unarchive)
- `Person` (fetch all, fetch one, create, update, delete, archive, unarchive)

### Supported Triggers

- Events: `On created`, `On updated`, `On deleted`
- Resources: `Client`, `Project`, `People`, `Actuals`, `Assignments`, `Contracts`, `Users`, `Teams`

## Credentials

To use this node, you need to have a Runn API key. You can get one from your [Runn account API settings](https://app.runn.io/account/api).

## Compatibility

This node supports n8n version 20.0.0 and above. It has been tested against n8n version 20.0.0.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Runn API documentation](https://developer.runn.io/)
