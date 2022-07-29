/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- alerts.test.ts
*/

import {
  getWorkspaceAlerts, 
  postWorkspaceAlerts,
  getWorkspaceAlertById,
  postWorkspaceAlertById,
  deleteWorkspaceAlertById,
  getWorkspaceAlertInstances
} from '../alerts_calls';

import {} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idDashboardTest: string = "000001823fbf59fb-56e58111-95411216-582b2786" // Introducir uno existente en la fuente de Dashboard
let idAlertTest: string = "";
let listIdAlertTest: Array<string> = [];

/* --------------------------- ALERTS CALLS ---------------------------*/
describe('POST - alerts_calls', ()=>{
  test('POST postWorkspaceAlerts!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let alertsImportTest = {
      name: "Alert-Test-"+numRandom,
      description: "Es una alerta de prueba para el test",
      color: "#FF0000",
      type: "update",
      source: idDashboardTest,
      condition: {
        type: "single",
        operation: "eq",
        left: 99999,
        right: "",
        children: []
      },
      time_stall: 0
    }
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      alert: alertsImportTest
    }
    
    const result = await postWorkspaceAlerts(bodyPOST.idWorkspace, bodyPOST.alert);
    expect(result).toBeDefined();
    //console.log("postWorkspaceAlerts: Alert-Test-",numRandom," >> ", result);
    expect(result).toHaveProperty('result', 'success');
    expect(result).toHaveProperty('alert_id');

    if("alert_id" in result){
      idAlertTest = result.alert_id;
      listIdAlertTest.push(result.alert_id);
      //console.log("Añadir id: ", idAlertTest, " -- List: ", listIdAlertTest);
    }

  });
});

describe('POST - alerts_calls', ()=>{
  test('POST postWorkspaceAlertById!', async () => {

    let alertsImportTest = {
      name: "Alert-Test-MODIFICADO",
      description: "Es una alerta de prueba para el test",
      color: "#FF0000",
      type: "update",
      source: idDashboardTest,
      condition: {
        type: "single",
        operation: "eq",
        left: 99999,
        right: "",
        children: []
      },
      time_stall: 0
    }
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idAlert: idAlertTest,
      alert: alertsImportTest
    }
    
    const result = await postWorkspaceAlertById(bodyPOST.idWorkspace, bodyPOST.idAlert, bodyPOST.alert);
    expect(result).toBeDefined();
    //console.log("postWorkspaceAlertById: Alert-Test-",numRandom," >> ", result);
    expect(result).toHaveProperty('result', 'success');

  });
});

describe('GET - alerts_calls', ()=>{
  test('GET getWorkspaceAlertInstances!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      idAlert: idAlertTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceAlertInstances(bodyGET.id, bodyGET.idAlert, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    //console.log("getWorkspaceAlertInstances >> ", result);
    expect(result).toHaveProperty('items');
  });
});

describe('GET - alerts_calls', ()=>{
  test('GET getWorkspaceAlertById!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idAlert: idAlertTest
    }

    const result = await getWorkspaceAlertById(bodyGET.idWorkspace, bodyGET.idAlert);
    expect(result).toBeDefined();
    //console.log("getWorkspaceAlertById >> ", result); 
    expect(result).toHaveProperty('id');

  });
});

describe('GET - alerts_calls', ()=>{
  test('GET getWorkspaceAlerts!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceAlerts(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    //console.log("getWorkspaceAlerts >> ", result);
    expect(result).toHaveProperty('items');
  });
});

describe('DELETE - alerts_calls', ()=>{
  test('DELETE deleteWorkspaceAlertById!', async () => {

    //console.log("listIdAlertTest >> ", listIdAlertTest);

    if(listIdAlertTest.length > 0){
      for (const item of listIdAlertTest) {
        let bodyDELETE = {
          idWorkspace: idWorkspaceTest,
          idAlert: item
        }

        const result = await deleteWorkspaceAlertById(bodyDELETE.idWorkspace, bodyDELETE.idAlert);
        expect(result).toBeDefined();
        //console.log("deleteWorkspaceAlertById ",item," >> ", result);
        expect(result).toHaveProperty('result', 'success');
      }
    }
    else{
      console.log("deleteWorkspaceAlertById: No hay errores para eliminar.");
    }

  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

