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
  Dashboard
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let stopTest: boolean = false;
let idWorkspaceTest: string = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";
let idDashboardTest: string = "";
let idDashboardCloneTest: string = "";

/* --------------------------- DASHBOARDS CALLS ---------------------------*/

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

    if(!("items" in result)){
      stopTest = true;
      console.error("ERROR getWorkspaceDashboards >> ", result);
    }
  });
});
  
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
      //console.log("postWorkspaceDashboards >> ", result);

      if("dashboard_id" in result){
        idDashboardTest = result.dashboard_id;
      }
      else{
        stopTest = true;
        console.error("ERROR postWorkspaceDashboards >> ", result);
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postWorkspaceDashboards - dashboards_calls");
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
    else{
      console.error("El test se ha detenido por un error en la consulta de GET getWorkspaceDashboardById - dashboards_calls");
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
      if(("result" in result)){
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR postWorkspaceDashboardById >> ", result);
        }
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postWorkspaceDashboardById - dashboards_calls");
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
      if(("result" in result)){
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR postDashboardClone >> ", result);
        }
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postDashboardClone - dashboards_calls");
    }
  });
});

describe('GET - dashboards_calls', ()=>{
  test('GET getWorkspaceDashboards - 2!', async () => {
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
        idDashboardCloneTest = searchIdCloneDashboard((result as Dashboard));
      }
      else{
        stopTest = true;
        console.error("ERROR getWorkspaceDashboards 2 >> ", result);
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST getWorkspaceDashboards - 2 - dashboards_calls");
    }

  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceDashboardById!', async () => {

    if(!stopTest){
      let deleteVisTest : deleteVisualization = 'no';
      
      let bodyDELETE = {
        idWorkspace: idWorkspaceTest,
        idDashboard: idDashboardTest,
        deleteVis: deleteVisTest
      }

      const result = await deleteWorkspaceDashboardById(bodyDELETE.idWorkspace, bodyDELETE.idDashboard, bodyDELETE.deleteVis);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceDashboardById >> ", result);

      if(("result" in result)){
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR deleteWorkspaceDashboardById >> ", result);
        }
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de DELETE deleteWorkspaceDashboardById - dashboards_calls");
    }

  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceDashboardById - CLONE!', async () => {

    if(!stopTest){

      let deleteVisTest : deleteVisualization = 'no';
      
      let bodyDELETE = {
        idWorkspace: idWorkspaceTest,
        idDashboard: idDashboardCloneTest,
        deleteVis: deleteVisTest
      }

      const result = await deleteWorkspaceDashboardById(bodyDELETE.idWorkspace, bodyDELETE.idDashboard, bodyDELETE.deleteVis);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceDashboardById - CLONE >> ", result);

      if(("result" in result)){
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR deleteWorkspaceDashboardById - CLONE >> ", result);
        }
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de DELETE deleteWorkspaceDashboardById - CLONE - dashboards_calls");
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
      return item.id;
    }
  }
  return "";
}