/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- dashboards.test.ts
*/

import {
  getWorkspaceDashboards, 
  postWorkspaceDashboards, 
  getWorkspaceDashboardById, 
  postWorkspaceDashboardById, 
  deleteWorkspaceDashboardById, 
  postDashboardClone
} from '../dashboards_calls';

import {
  deleteVisualization,
  Dashboard
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idDashboardTest: string = "";
let listIdDashboardTest: Array<string> = [];

/* --------------------------- DASHBOARDS CALLS ---------------------------*/

describe('POST - dashboards_calls', ()=>{
  test('POST postWorkspaceDashboards!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let dasboardTest = {
      name: "MyDashboardTest " + numRandom,
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboards(bodyPOST.idWorkspace, bodyPOST.dashboard);
    expect(result).toBeDefined();
    //console.log("postWorkspaceDashboards: MyDashboardTest ",numRandom," >> ", result);
    expect(result).toHaveProperty('dashboard_id');

    if("dashboard_id" in result){
      idDashboardTest = result.dashboard_id;
      listIdDashboardTest.push(result.dashboard_id);
      //console.log("Añadir id: ", idDashboardTest, " -- List: ", listIdDashboardTest);
    }

  });
});

describe('GET - dashboards_calls', ()=>{
  test('GET getWorkspaceDashboardById!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idDashboard: idDashboardTest
    }

    const result = await getWorkspaceDashboardById(bodyGET.idWorkspace, bodyGET.idDashboard);
    expect(result).toBeDefined();
    //console.log("getWorkspaceDashboardById >> ", result); 
    expect(result).toHaveProperty('id');

  });
});

describe('POST - dashboards_calls', ()=>{
  test('POST postWorkspaceDashboardById!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let dasboardTest = {
      name: "MyDashboardTest " + numRandom,
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idDashboard: idDashboardTest,
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboardById(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.dashboard);
    expect(result).toBeDefined();
    //console.log("postWorkspaceDashboardById >> ", result);
    expect(result).toHaveProperty('result', 'success');

  });
});

describe('POST - dashboards_calls', ()=>{
  test('POST postDashboardClone!', async () => {
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idDashboard: idDashboardTest,
      name: {name: "SCAN CLONE TEST"}
    }
    
    const result = await postDashboardClone(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.name);
    expect(result).toBeDefined();
    //console.log("postDashboardClone >> ", result); 
    expect(result).toHaveProperty('result', 'success');
  });
});

describe('GET - dashboards_calls', ()=>{
  test('GET getWorkspaceDashboards!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceDashboards(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    //console.log("getWorkspaceDashboards >> ", result);
    expect(result).toHaveProperty('items');

    if(("items" in result)){
      searchIdCloneDashboard((result as Dashboard));
    }
  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceDashboardById!', async () => {

    let deleteVisTest : deleteVisualization = 'no';

    //console.log("listIdDashboardTest >> ", listIdDashboardTest);

    for (const item of listIdDashboardTest) {
      let bodyDELETE = {
        idWorkspace: idWorkspaceTest,
        idDashboard: item,
        deleteVis: deleteVisTest
      }

      const result = await deleteWorkspaceDashboardById(bodyDELETE.idWorkspace, bodyDELETE.idDashboard, bodyDELETE.deleteVis);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceDashboardById ",item," >> ", result);
      expect(result).toHaveProperty('result', 'success');
    }
  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const searchIdCloneDashboard = (listItems: Dashboard) => {
  for (const item of listItems.items) {
    if(item.name === "SCAN CLONE TEST"){
      listIdDashboardTest.push(item.id);
      //console.log("searchIdCloneDashboard >> Añadir id: ", item.id, " -- List: ", listIdDashboardTest);
    }
  }
}