# n8n-nodes-runn

[![npm version](https://img.shields.io/npm/v/n8n-nodes-runn.svg)](https://www.npmjs.com/package/n8n-nodes-runn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependencies](https://img.shields.io/librariesio/release/npm/n8n-nodes-runn)](https://libraries.io/npm/n8n-nodes-runn)
[![Known Vulnerabilities](https://snyk.io/test/github/ralabs-team/n8n-nodes-runn/badge.svg)](https://snyk.io/test/github/ralabs-team/n8n-nodes-runn)

This is an n8n community node. It lets you use Runn in your n8n workflows.

[Runn](https://runn.io/) is a project management platform that helps you manage your team's work and projects.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Example of 2-way synchronization workflow between Runn and Google Sheets

![](https://github.com/user-attachments/assets/f1e7628a-202b-44ab-82a0-67e016f89af9)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Local development

```bash
n8n-nodes-runn % npm run build
n8n-nodes-runn % npm link
n8n-nodes-runn % N8N_LOG_LEVEL=debug n8n start
```

### Credentials

To use this node, you need to have a Runn API key. You can get one from your [Runn account API settings](https://app.runn.io/account/api).

## Operations

### Supported Triggers

- Events: `On created`, `On updated`, `On deleted`
- Resources: `Client`, `Project`, `People`, `Actuals`, `Assignments`, `Contracts`, `Users`, `Teams`

### Supported Resources & Operations

- `Client` (fetch all, fetch one, create, update, delete, archive, unarchive)
- `Project` (fetch all, fetch one, create, update, delete, archive, add a note, unarchive, delete)
- `Person` (fetch all, fetch one, create, update, delete, archive, unarchive, delete)

## Compatibility

This node supports n8n version 20.0.0 and above. It has been tested against n8n version 20.0.0.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Runn API documentation](https://developer.runn.io/)
