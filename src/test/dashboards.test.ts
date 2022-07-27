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
  ResultSuccess,
  ResultSuccessDashboard,
  Dashboard
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let stopTest: boolean = false;
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idDashboardTest: string = "";
let listIdDashboardTest: Array<string> = [];

/* --------------------------- DASHBOARDS CALLS ---------------------------*/

describe('POST - dashboards_calls', ()=>{
  test('POST postWorkspaceDashboards!', async () => {

    if(!stopTest){
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

      if("dashboard_id" in result){
        idDashboardTest = result.dashboard_id;
        listIdDashboardTest.push(result.dashboard_id);
        //console.log("Añadir id: ", idDashboardTest, " -- List: ", listIdDashboardTest);
      }
      else{
        stopTest = true;
        console.error("ERROR postWorkspaceDashboards >> ", result);
      }
    }
  });
});

describe('GET - dashboards_calls', ()=>{
  test('GET getWorkspaceDashboardById!', async () => {
    
    if(!stopTest){
      let bodyGET = {
        idWorkspace: idWorkspaceTest,
        idDashboard: idDashboardTest
      }

      const result = await getWorkspaceDashboardById(bodyGET.idWorkspace, bodyGET.idDashboard);
      expect(result).toBeDefined();
      //console.log("getWorkspaceDashboardById >> ", result); 
      
      if(!("id" in result)){
        stopTest = true;
        console.error("ERROR getWorkspaceDashboardById >> ", result); 
      }
    }

  });
});

describe('POST - dashboards_calls', ()=>{
  test('POST postWorkspaceDashboardById!', async () => {

    if(!stopTest){
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

      if((result as ResultSuccess).result !== "success"){
        stopTest = true;
        console.error("ERROR postWorkspaceDashboardById >> ", result);
      }
    }

  });
});

describe('POST - dashboards_calls', ()=>{
  test('POST postDashboardClone!', async () => {
    if(!stopTest){
      let bodyPOST = {
        idWorkspace: idWorkspaceTest,
        idDashboard: idDashboardTest,
        name: {name: "SCAN CLONE TEST"}
      }
      
      const result = await postDashboardClone(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.name);
      expect(result).toBeDefined();
      //console.log("postDashboardClone >> ", result); 

      if((result as ResultSuccessDashboard).result !== "success"){
        stopTest = true;
        console.error("ERROR postDashboardClone >> ", result);        
      }
    }
  });
});

describe('GET - dashboards_calls', ()=>{
  test('GET getWorkspaceDashboards 2!', async () => {
    if(!stopTest){
      let bodyGET = {
        id: idWorkspaceTest,
        page: 0,
        limit: 500
      }

      const result = await getWorkspaceDashboards(bodyGET.id, bodyGET.page, bodyGET.limit);
      expect(result).toBeDefined();
      //console.log("getWorkspaceDashboards 2 >> ", result);

      if(("items" in result)){
        searchIdCloneDashboard((result as Dashboard));
      }
      else{
        stopTest = true;
        console.error("ERROR getWorkspaceDashboards 2 >> ", result);
      }
    }

  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceDashboardById!', async () => {

    if(!stopTest){
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
        //console.log("deleteWorkspaceDashboardById >> ", result);
  
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR deleteWorkspaceDashboardById >> ", result);
        }
      }
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