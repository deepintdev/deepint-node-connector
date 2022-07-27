/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- workspaces.test.ts
*/

import {
  getWorkspaces,
  postWorkspaces,
  postWorkspacesImport,
  getWorkspaceById,
  postWorkspaceById,
  deleteWorkspaceById,
  postIframe,
  postWorkspaceClone
} from '../workspaces_calls';

import {
  ResponseWorkspace,
  ResponseError,
  ResponseWorkspaceImport
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let listIdWorkspacesTest: Array<string> = [];
let secretWorkspaceTest: string = "secretTest1";

/* --------------------------- WORKSPACES CALLS ---------------------------*/

describe('POST - workspaces_calls', ()=>{  // Sin permisos
  test('POST postWorkspaces!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let bodyPOST = {
      name: "Workspace Test "+numRandom,
      description: "Esto es un test para workspace."
    }
    
    const result = await postWorkspaces(bodyPOST.name, bodyPOST.description);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('result', 'success');

    if((result as ResponseWorkspace).result === "success"){
      idWorkspaceTest = (result as ResponseWorkspace).workspace_id;
      //console.log("postWorkspaces: ", idWorkspaceTest, " >> CREADO");
      listIdWorkspacesTest.push(idWorkspaceTest);
      //console.log("Añadir id: ", idWorkspaceTest, " -- List: ", listIdWorkspacesTest);
    }
    else if((result as ResponseError).code === "ACCESS_DENIED"){
      console.error("ERROR postWorkspaces >> ACCESO DENEGADO: ", result);
    }
    else{
      console.error("ERROR postWorkspaces >> ", result);
    } 
  });
});

describe('POST - workspaces_calls', ()=>{
  test('POST postWorkspacesImport!', async () => { // Sin permisos
    let numRandom: number = generateRandomNumber(1000, 9000);

    let bodyPOST = {
      name: "workspace import "+numRandom,
      description: "Esta es una prueba de test para workspace import",
      file: ""
    }
    
    const result = await postWorkspacesImport(bodyPOST.name, bodyPOST.description, bodyPOST.file);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('result', 'success');
    
    if((result as ResponseWorkspaceImport).result === "success"){
      let idWorkspaceImportTest = (result as ResponseWorkspaceImport).task_id;
      //console.log("postWorkspacesImport: ", idWorkspaceImportTest, " >> IMPORTADO");
      listIdWorkspacesTest.push(idWorkspaceImportTest);
      //console.log("Añadir id: ", idWorkspaceImportTest, " -- List: ", listIdWorkspacesTest);
    }
    else if((result as ResponseError).code === "ACCESS_DENIED"){
      console.error("ERROR postWorkspacesImport >> ACCESO DENEGADO: ", result);
    }
    else{
      console.error("ERROR postWorkspacesImport >> ", result);
    } 
  });
});

// Modificar un workspace
describe('POST - workspaces_calls', ()=>{
  test('POST postWorkspaceById!', async () => {
    let bodyPOST = {
      id: idWorkspaceTest,
      name : "Conector Node.js - DeepInt (en prueba)",
      description : "Workspace utilizado para testear el conector de node con DeepInt",
      disableIndividualAlerts: false,
      secret: secretWorkspaceTest
    }
    
    const result = await postWorkspaceById(bodyPOST.id, bodyPOST.name, bodyPOST.description, bodyPOST.disableIndividualAlerts, bodyPOST.secret);
    expect(result).toBeDefined();
    //console.log("postWorkspaceById >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

describe('GET - workspaces_calls', ()=>{
  test('GET getWorkspaceById!', async () => {
    const result = await getWorkspaceById(idWorkspaceTest);
    expect(result).toBeDefined();
    //console.log("getWorkspaceById >> ", result);
    expect(result).toHaveProperty('id');  
  });
});

describe('POST - workspaces_calls', ()=>{
  test('POST postIframe!', async () => {
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
      id : idWorkspaceTest,
      iframe : testIframe
    }
    
    const result = await postIframe(bodyPOST.id, bodyPOST.iframe);
    expect(result).toBeDefined();
    //console.log("postIframe: ", result);
    expect(result).toHaveProperty('result');

  });
});

describe('POST - workspaces_calls', ()=>{
  test('POST postWorkspaceClone!', async () => { 
    let bodyPOST = {
      idWorkspace : idWorkspaceTest,
      name : "Conector Node.js - DeepInt (en prueba) [CLON]",
    }
    
    const result = await postWorkspaceClone(bodyPOST.idWorkspace, bodyPOST.name);
    expect(result).toBeDefined();
    //console.log("postWorkspaceClone: ", result);
    expect(result).toHaveProperty('result', 'success');
    
    if((result as ResponseWorkspace).result === "success"){
      let idWorkspaceCloneTest = (result as ResponseWorkspace).workspace_id;
      //console.log("postWorkspaceClone: ", idWorkspaceCloneTest, " >> CLONADO");
      listIdWorkspacesTest.push(idWorkspaceCloneTest);
      //console.log("Añadir id: ", idWorkspaceCloneTest, " -- List: ", listIdWorkspacesTest);
    }
    else if((result as ResponseError).code === "ACCESS_DENIED"){
      console.error("ERROR postWorkspaceClone >> ACCESO DENEGADO: ", result);
    }
    else{
      console.error("ERROR postWorkspaceClone >> ", result);
    }     
  });
});

describe('GET - workspaces_calls', ()=>{
  test('GET getWorkspaces!', async () => {
    const result = await getWorkspaces();
    expect(result).toBeDefined();
    //console.log("getWorkspaces >> ", result);
  }); 
});

describe('DELETE - workspaces_calls', ()=>{
  test('DELETE deleteWorkspaceById!', async () => {

    console.log("DELETE listIdSourceTest > ", listIdWorkspacesTest);

    if(listIdWorkspacesTest.length > 0){
      for (const item of listIdWorkspacesTest) {
        const result = await deleteWorkspaceById(item);
        expect(result).toBeDefined();
        //console.log("deleteWorkspaceById >> ", result); 
        expect(result).toHaveProperty('result', 'success');
      }
    }
    else{
      console.log("deleteWorkspaceById: NO SE HAN ELIMINADO WORKSPACES PORQUE NO SE HAN GENERADO NINGUNO.");
    }
 
  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

