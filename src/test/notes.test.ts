import {
  getSession,
  getProfile
} from '../account_calls';

import {
  getWorkspaceDashboards, 
  postWorkspaceDashboards, 
  getWorkspaceDashboardById, 
  postWorkspaceDashboardById, 
  deleteWorkspaceDashboardById, 
  postDashboardClone
} from '../dashboards_calls';

import {
  getWorkspaceSources,
  postWorkspaceSource,
  //postSourceClone,
  //postSourceDerived,
  //postSourceExternal,
  //postSourceOther,
  //getWorkspaceSourceById,
  //postWorkspaceSourceById,
  //deleteWorkspaceSourceById,
  //getConnectionSourceById,
  //postConnectionSourceById,
  //getAutoUpdateSourceById,
  //postAutoUpdateSourceById,
  //postTransformFeaturesSourcesById,
  //getSourceInstances,
  //postSourceInstances,
  //deleteSourceInstances,
  //postExternalSources
} from '../sources_calls';

import {
  getWorkspaces,
  postWorkspaces,
  postWorkspacesImport,
  getWorkspaceById,
  postWorkspaceById,
  deleteWorkspaceById,
  postIframe,
  postWorkspace,
  postWorkspaceClone
} from '../workspaces_calls';

import {
  getWorkspaceTasks,
  getWorkspaceTaskById,
  deleteWorkspaceTaskById
} from '../tasks_calls';

import {
  deleteVisualization,
  Feature,
  SourceToAdd
} from "../types"

/* --------------------------- ACCOUNT CALLS ---------------------------*/

describe('GET - account_calls', ()=>{
  test.skip('GET getSession!', async () => {
    const result = await getSession();
    expect(result).toBeDefined();
    console.log("getSession >> ", result);
  });
});

describe('GET - account_calls', ()=>{
  test.skip('GET getProfile!', async () => {
    const result = await getProfile();
    expect(result).toBeDefined();
    console.log("getProfile >> ", result);
  });
});


/* --------------------------- DASHBOARDS CALLS ---------------------------*/

describe('GET - dashboards_calls', ()=>{
  test.skip('GET getWorkspaceDashboards!', async () => {

    let bodyGET = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceDashboards(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceDashboards >> ", result);
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postWorkspaceDashboards!', async () => {

    let dasboardTest = {
      name: "MyDashboardTest",
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboards(bodyPOST.idWorkspace, bodyPOST.dashboard);
    expect(result).toBeDefined();
    console.log("postWorkspaceDashboards >> ", result); // PENDIENTE...
  });
});

describe('GET - dashboards_calls', ()=>{
  test.skip('GET getWorkspaceDashboardById!', async () => {
    
    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93"
    }

    const result = await getWorkspaceDashboardById(bodyGET.idWorkspace, bodyGET.idDashboard);
    expect(result).toBeDefined();
    console.log("getWorkspaceDashboardById >> ", result);
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postWorkspaceDashboardById!', async () => {

    let dasboardTest = {
      name: "MyDashboardTest",
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboardById(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.dashboard);
    expect(result).toBeDefined();
    console.log("postWorkspaceDashboardById >> ", result); // PENDIENTE...
  });
});

describe('DELETE - dashboards_calls', ()=>{
  test.skip('DELETE deleteWorkspaceDashboardById!', async () => {

    let deleteVisTest : deleteVisualization = 'no';
    
    let bodyDELETE = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      deleteVis: deleteVisTest
    }

    const result = await deleteWorkspaceDashboardById(bodyDELETE.idWorkspace, bodyDELETE.idDashboard, bodyDELETE.deleteVis);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceDashboardById >> ", result); // ACCESO DENEGADO
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postDashboardClone!', async () => {
    
    let bodyPOST = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      name: {name: "SCAN"}
    }
    
    const result = await postDashboardClone(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postDashboardClone >> ", result); // PENDIENTE...
  });
});

/* --------------------------- SOURCES CALLS ---------------------------*/

describe('GET - sources_calls', ()=>{
  test.skip('GET getWorkspaceSources!', async () => {

    let bodyGET = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    };

    const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceSources >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postWorkspaceSource!', async () => {

    let featureTest : Feature = {
      name: "MyFeatureTest",
      type: 'unknown',
      date_format: "2022-07-13T08:13:52.333Z",
      indexed: false
    };

    let sourceToAddTest : SourceToAdd = {
      name: "deviceTest",
      description: "Sin descripción",
      features: [featureTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      source: sourceToAddTest
    }
    
    const result = await postWorkspaceSource(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceSource >> ", result); // Sin permisos
  });
});

/* --------------------------- WORKSPACES CALLS ---------------------------*/

describe('GET - workspaces_calls', ()=>{
  test.skip('GET getWorkspaces!', async () => {
    const result = await getWorkspaces();
    expect(result).toBeDefined();
    console.log("getWorkspaces >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaces!', async () => {
    
    let bodyPOST = {
      name: "DeepInt workspace",
      description: "Esta es una prueba de test para workspace"
    }
    
    const result = await postWorkspaces(bodyPOST.name, bodyPOST.description);
    expect(result).toBeDefined();
    console.log("postWorkspaces >> ", result); // Sin permisos
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspacesImport!', async () => {
    
    let bodyPOST = {
      name: "Mi primer workspace import",
      description: "Esta es una prueba de test para workspace import",
      file: ""
    }
    
    const result = await postWorkspacesImport(bodyPOST.name, bodyPOST.description, bodyPOST.file);
    expect(result).toBeDefined();
    console.log("postWorkspacesImport >> ", result); // Sin permisos
  });
});

describe('GET - workspaces_calls', ()=>{
  test.skip('GET getWorkspaceById!', async () => {
    let id = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";

    const result = await getWorkspaceById(id);
    expect(result).toBeDefined();
    console.log("getWorkspaceById >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaceById!', async () => {
      
    let bodyPOST = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      name : "Lohmann",
      description : "test",
      disableIndividualAlerts: false,
      secret: ""
    }
    
    const result = await postWorkspaceById(bodyPOST.id, bodyPOST.name, bodyPOST.description, bodyPOST.disableIndividualAlerts, bodyPOST.secret);
    expect(result).toBeDefined();
    console.log("postWorkspaceById >> ", result); // ????
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test.skip('DELETE deleteWorkspaceById!', async () => {

    let id = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";

    const result = await deleteWorkspaceById(id);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceById >> ", result); // ACCESO DENEGADO
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postIframe!', async () => {

    let testQueryTree = {
      type: "",
      operation: "",
      left: 1,
      right: "",
      children: [],
      };

      let testFilters = {
      source: "",
      root: testQueryTree,
      };

      let testIframe = {
      type: "",
      id: "01376941324-64681-6546464-25541",
      filters: [testFilters],
      };

      let bodyPOST = {
      id : "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      iframe : testIframe
    }
    
    const result = await postIframe(bodyPOST.id, bodyPOST.iframe);
    expect(result).toBeDefined();
    console.log("postIframe >> ", result); // ACCESO DENEGADO
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspace!', async () => {
    
    let idWorkspace = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
    
    const result = await postWorkspace(idWorkspace);
    expect(result).toBeDefined();
    console.log("postWorkspace >> ", result); // ACCESO DENEGADO
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaceClone!', async () => { 
    let bodyPOST = {
      idWorkspace : "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      name : "DeepInt 2",
    }
    
    const result = await postWorkspaceClone(bodyPOST.idWorkspace, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postWorkspaceClone >> ", result); // ACCESO DENEGADO
  });
});

/* --------------------------- TASKS CALLS ---------------------------*/

describe('GET - tasks_calls', ()=>{
  test.skip('GET getWorkspaceTasks!', async () => {

    let BODYGET = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceTasks(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceTasks >> ", result); // Not found
  });
});

describe('GET - tasks_calls', ()=>{
  test.skip('GET getWorkspaceTaskById!', async () => {

    let BODYGET = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      idTask: "0001",
    }

    const result = await getWorkspaceTaskById(BODYGET.idWorkspace, BODYGET.idTask);
    expect(result).toBeDefined();
    console.log("getWorkspaceTaskById >> ", result); // Not found
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test.skip('DELETE deleteWorkspaceTaskById!', async () => {

    let BODYDELETE = {
      idWorkspace: "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2",
      idTask: "0001",
    }
  
    const result = await deleteWorkspaceTaskById(BODYDELETE.idWorkspace, BODYDELETE.idTask);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceTaskById >> ", result); // Not found
  });
});








