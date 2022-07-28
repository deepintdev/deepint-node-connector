/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- models.test.ts
*/

import {
  getWorkspaceModels,
  postWorkspaceModels,
  getWorkspaceModelById,
  //postWorkspaceModelById,
  deleteWorkspaceModelById,
  getModelEvaluation,
  getModelPredict,
  //postModelBatchPredict,
  //postModelPredict1d
} from '../models_calls';

import {
  Models
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idDashboardTest: string = "000001823fbf59fb-56e58111-95411216-582b2786" // Introducir uno existente en la fuente de Dashboard
let idNameModelTEmp: string = "";
let idModelTest: string = "";
let listIdModelsTest: Array<string> = [];

/* --------------------------- MODELS CALLS ---------------------------*/
describe('POST - models_calls', ()=>{
  test('POST postWorkspaceModels!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let modelTest = {
      name: "Workspace Model " + numRandom,
      description: "Descripción de modelo de testeo",
      type: "classifier",
      method: "bayes",
      source: idDashboardTest,
      target: 0,
      configuration: {},
      training_configuration: {
          test_size: 0.3,
          shuffle: true,
          random_state: 0,
      },
      hyper_search_configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      model: modelTest
    }
    
    const result = await postWorkspaceModels(bodyPOST.idWorkspace, bodyPOST.model);
    expect(result).toBeDefined();
    console.log("postWorkspaceModels: MyDashboardTest ",numRandom," >> ", result);
    expect(result).toHaveProperty('task_id');

    if("task_id" in result){
      idNameModelTEmp = "Workspace Model " + numRandom;
    }

  });
});

describe('GET - models_calls', ()=>{
  test('GET getWorkspaceModels!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceModels(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceModels >> ", result);
    expect(result).toHaveProperty('items');

    if(("items" in result)){
      if(result.items.length > 0){
        searchIdModel((result as Models));
      }
      else{
        console.log("getWorkspaceModels: la lista está vacía.");
      }
    }

  });
});

describe('GET - models_calls', ()=>{
  test('GET getWorkspaceModelById!', async () => {
    if(idModelTest != ""){
      let bodyGET = {
        id: idWorkspaceTest,
        idModel: idModelTest
      }

      const result = await getWorkspaceModelById(bodyGET.id, bodyGET.idModel);
      expect(result).toBeDefined();
      console.log("getWorkspaceModelById >> ", result);
      expect(result).toHaveProperty('id');
    }
    else{
      console.error("ERROR getWorkspaceModelById: No se ha encontrado un id para el modelo: ", idModelTest);
      throw new Error('ERROR getWorkspaceModelById: No se ha encontrado un id para el modelo.')
    }
  });
});

describe('GET - models_calls', ()=>{
  test('GET getModelEvaluation!', async () => {
    if(idModelTest != ""){
      let bodyGET = {
        id: idWorkspaceTest,
        idModel: idModelTest
      }

      const result = await getModelEvaluation(bodyGET.id, bodyGET.idModel);
      expect(result).toBeDefined();
      console.log("getModelEvaluation >> ", result);
      expect(result).toHaveProperty('evaluation');
    }
    else{
      console.error("ERROR getModelEvaluation: No se ha encontrado un id para el modelo: ", idModelTest);
      throw new Error('ERROR getModelEvaluation: No se ha encontrado un id para el modelo.')
    }
  });
});

describe('GET - models_calls', ()=>{
  test('GET getModelPredict!', async () => {
    if(idModelTest != ""){
      let bodyGET = {
        id: idWorkspaceTest,
        idModel: idModelTest,
        inputs: "[0.2, 0.1, -0.5, 0.9]"
      }

      const result = await getModelPredict(bodyGET.id, bodyGET.idModel, bodyGET.inputs);
      expect(result).toBeDefined();
      console.log("getModelPredict >> ", result);
      expect(result).toHaveProperty('output');
    }
    else{
      console.error("ERROR getModelPredict: No se ha encontrado un id para el modelo: ", idModelTest);
      throw new Error('ERROR getModelPredict: No se ha encontrado un id para el modelo.')
    }
  });
});

describe('DELETE - models_calls', ()=>{
  test('DELETE deleteWorkspaceModelById!', async () => {

    console.log("listIdModelsTest >> ", listIdModelsTest);

    if(listIdModelsTest.length > 0){
      for (const item of listIdModelsTest) {
        let bodyDELETE = {
          idWorkspace: idWorkspaceTest,
          idModel: item
        }

        const result = await deleteWorkspaceModelById(bodyDELETE.idWorkspace, bodyDELETE.idModel);
        expect(result).toBeDefined();
        console.log("deleteWorkspaceModelById ",item," >> ", result);
        expect(result).toHaveProperty('result', 'success');
      }
    }
    else{
      console.log("ERROR deleteWorkspaceModelById: Lista de modelos para eliminar vacía");
    }
  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const searchIdModel = (listItems: Models) => {
  for (const item of listItems.items) {
    if(item.name === idNameModelTEmp){
      idModelTest = item.id;
      listIdModelsTest.push(item.id);
      //console.log("Añadir id: ", idModelTest, " -- List: ", listIdModelsTest);
    }
  }
}