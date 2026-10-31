
# AIR-Core Javascript SDK

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/) for connect with the [AIR-Core API](https://app.air-core.io/api/v1/).

This module lets you connect the platform [AIR-Core](https://app.air-core.io) (formerly Deep Intelligence), using their functions, to your projects.
It encapsulates by means of functions the different calls to the API in order to obtain the required data from it.

</br>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#install">Install</a></li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#example">Example</a></li>
        <li><a href="#functions">Functions</a></li>
        <ul>
          <li><a href="#authentication">Authentication</a></li>
          <li><a href="#account">Account</a></li>
          <li><a href="#workspaces">Workspaces</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#sources">Sources</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#alerts">Alerts</a></li>
          <li><a href="#emails">Emails</a></li>
          <li><a href="#visualizations">Visualizations</a></li>
          <li><a href="#dashboards">Dashboards</a></li>
        </ul>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#development-commands">Development Commands</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

</br>

---
### ✅ Install
---

</br>

```bash
npm i @airinstitute/deepint-js-sdk
```

</br>

---
### 🚩 Usage
---
You can import this package using the classic Javascript `require` or with `import` in the case you use Typescript as shown on the following examples:

</br>

### Example Javascript 🔻
---

```js
const deepint = require('@airinstitute/deepint-js-sdk');
deepint.getWorkspaces()
    .then(workspaces => {
        console.log(workspaces);
    })
    .catch(err => {
        console.log(err);
    });
```

### Example Typescript 🔻
---

```ts
import * as deepint from '@airinstitute/deepint-js-sdk';
deepint.getWorkspaces()
    .then(workspaces => {
        console.log(workspaces);
    })
    .catch(err => {
        console.log(err);
    });
```
OR using desestructuring to get only the requested function


```ts
import {getWorkspaces} from '@airinstitute/deepint-js-sdk';
getWorkspaces()
    .then(workspaces => {
        console.log(workspaces);
    })
    .catch(err => {
        console.log(err);
    });
```

</br>

### Functions 🔻
---

The module contains all API functions with a characteristic function name: 'methodAPI'+'groupAsociated'+'groupFunctions'+'informationFunction'. Eg: get+Workspace+Visualization+ById = getWorkspaceVisualizationById(params);.

Here there is a list of functions you can use:

- #### Authentication
    - postLoginToken
    - postRevokeToken

- #### Account 
    - getProfile
    - getSession

- #### Workspaces 
    - getWorkspaces
    - postWorkspaces
    - postWorkspacesImport
    - getWorkspaceById
    - postWorkspaceById
    - deleteWorkspaceById
    - postIframe
    - postWorkspace
    - postWorkspaceClone

- #### Tasks 
    - getWorkspaceTasks
    - getWorkspaceTaskById
    - deleteWorkspaceTaskById

- #### Sources 
    - getWorkspaceSources
    - postWorkspaceSource
    - postSourceClone
    - postSourceDerived
    - postSourceExternal
    - postSourceOther
    - getWorkspaceSourceById
    - postWorkspaceSourceById
    - deleteWorkspaceSourceById
    - getConnectionSourceById
    - postConnectionSourceById
    - getAutoUpdateSourceById
    - postAutoUpdateSourceById
    - postTransformFeaturesSourcesById
    - getSourceInstances
    - postSourceInstances
    - deleteSourceInstances
    - postExternalSources

- #### Models
    - getWorkspaceModels
    - postWorkspaceModels
    - getWorkspaceModelById
    - postWorkspaceModelById
    - deleteWorkspaceModelById
    - getModelEvaluation
    - getModelPredict
    - postModelBatchPredict
    - postModelPredict1d

- #### Alerts 
    - getWorkspaceAlerts
    - postWorkspaceAlerts
    - getWorkspaceAlertById
    - postWorkspaceAlertById
    - deleteWorkspaceAlertById
    - getWorkspaceAlertInstances

- #### Emails 
    - getWorkspaceEmails
    - postWorkspaceEmails
    - deleteWorkspaceEmailById

- #### Visualizations
    - getWorkspaceVisualizations
    - postWorkspaceVisualizations
    - getWorkspaceVisualizationById
    - postWorkspaceVisualizationById
    - deleteWorkspaceVisualizationById
    - postCloneVisualizationById

- #### Dashboards 
    - getWorkspaces
    - postWorkspaces
    - postWorkspacesImport
    - getWorkspaceById
    - postWorkspaceById
    - deleteWorkspaceById
    - postIframe
    - postWorkspace
    - postWorkspaceClone


These functions work asynchronously, so they return a promise.

</br>

### Configuration 🔻
---

To configure the module, set the following environment variables:

</br>

| Variable Name | Description |
|---|---|
| X_AUTH_TOKEN |Token Authorization to connect to the API | 
| X_AIRCORE_ORGANIZATION | Organization Token (legacy name `X_DEEPINT_ORGANIZATION` is still supported) | 
| AIRCORE_API_URL | AIR-Core API URL, default is `https://app.air-core.io/api/v1/` (legacy name `DEEPINT_API_URL` is still supported). Must end with `/` |
| AIRCORE_OAUTH_URL | Optional. Base URL of the OAuth endpoints used by `postLoginToken` and `postRevokeToken`. Defaults to `<API URL>/../oauth/`, i.e. `https://app.air-core.io/api/oauth/` |

When both the `AIRCORE_*` and the legacy `DEEPINT_*` variables are set, the `AIRCORE_*` value is used. To keep using a legacy Deep Intelligence instance, set `AIRCORE_API_URL` (or `DEEPINT_API_URL`) to `https://app.deepint.net/api/v1/`.

In case you can not set environment variable and still want to use this SDK you can set this parameters directly on your code, like this:

```js
const deepint = require('@airinstitute/deepint-js-sdk');
// If you did not setted X_AUTH_TOKEN && X_AIRCORE_ORGANIZATION env variables in order to be able to use the SDK you can set this variables on code in the next way

deepint.Config.getInstance().setToken("<Your AIR-Core user token>");
deepint.Config.getInstance().setOrganization("<Your AIR-Core organization ID>");

// This method it is only for development use in production please set the envionment variables
```

Even this method is available and working its highly recomended to set this variables through environment variables due it's more safety and this last method if used with text plain can expose your AIR-Core credentials.

</br>

For source configuration, set the following variables:

| Variable Name | Description |
|---|---|
| SOURCE_PUB_KEY | Public key of the external source | |
| SOURCE_SECRET_KEY | External source secret key | |


</br>

---
### ⌨️ Development Commands
---

</br>

Module repository for more information: https://github.com/deepintdev/deepint-node-connector

Start by running `npm install` inside the module folder.
`npm run tsc` to build the module,
`npm run start` to build the module,
`npm run pre` to run it in development mode.

To get the documentation of the module functions: `npx typedoc --out docs` .

</br>

---
### 🌐 Built With
---

</br>

This project has been developed with TypeScript, Node Js and Express languages and technologies.

[![TypeScript][TypeScript.js]][TypeScript-url]
[![Node][Node.js]][Node-url]

</br>

---
### 🙏 Acknowledgments
---

</br>

To express our gratitude to the following people involved in this project:

* Miguel Chaveinte García: https://github.com/miguelchaveinte
* Pablo Chamoso Santos: https://github.com/chamoso
* Francisco Pinto Santos: https://github.com/GandalFran
* Raúl López Blanco: https://github.com/raullb34
* Ángel Martín Domínguez: https://github.com/amartdom
* Alberto Galante Melero: https://github.com/Galazord

</br>

<div align="center">
  <a href="#air-core-javascript-sdk">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Circle-icons-arrow-up.svg/512px-Circle-icons-arrow-up.svg.png?20160314153305" 
      alt="Logo"
      width="60" height="60"
    >
  </a>
</div>

</br>

<!-- MARKDOWN LINKS & IMAGES -->
[TypeScript.js]: https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/es/
