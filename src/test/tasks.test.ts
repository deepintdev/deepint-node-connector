/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- tasks.test.ts
*/

import {
  getWorkspaceTasks,
  getWorkspaceTaskById,
  deleteWorkspaceTaskById
} from '../tasks_calls';

import {
  TaskById,
  ResultSuccess
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let stopTest: boolean = false;
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idTaskTest: string = "";

/* --------------------------- TASKS CALLS ---------------------------*/

describe('GET - tasks_calls', ()=>{
  if(!stopTest){
    test('GET getWorkspaceTasks!', async () => {

      let BODYGET = {
        idWorkspace: idWorkspaceTest,
        page: 0,
        limit: 500
      }

      const result = await getWorkspaceTasks(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
      expect(result).toBeDefined();
      console.log("getWorkspaceTasks >> ", result);

      if(("items" in result)){
        if(result.items.length > 0){
          idTaskTest = result.items[0].id;
          console.log("getWorkspaceTasks > idTaskTest: ", idTaskTest);
        }
        else{
          stopTest = true;
          console.error("ERROR getWorkspaceTasks >> The tasks list is empty");
        }
      }
      else{
        stopTest = true;
        console.error("ERROR getWorkspaceTasks >> ", result); 
      }
    });    
  }
});

describe('GET - tasks_calls', ()=>{
  test('GET getWorkspaceTaskById!', async () => {
    if(!stopTest){
      let BODYGET = {
        idWorkspace: idWorkspaceTest,
        idTask: idTaskTest,
      }

      const result = await getWorkspaceTaskById(BODYGET.idWorkspace, BODYGET.idTask);
      expect(result).toBeDefined();

      if((result as TaskById).id){
        console.log("getWorkspaceTaskById >> ", result);        
      }
      else{
        stopTest = true;
        console.error("ERROR getWorkspaceTaskById >> ", result); 
      }      
    }
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test('DELETE deleteWorkspaceTaskById!', async () => {
    if(!stopTest){
      let BODYDELETE = {
        idWorkspace: idWorkspaceTest,
        idTask: idTaskTest,
      }
    
      const result = await deleteWorkspaceTaskById(BODYDELETE.idWorkspace, BODYDELETE.idTask);
      expect(result).toBeDefined();
      console.log("deleteWorkspaceTaskById >> ", result);

      if((result as ResultSuccess).result === "success"){
        console.log("deleteWorkspaceTaskById: ", idTaskTest, " >> BORRADO");
      }
      else{
        stopTest = true;
        console.error("ERROR deleteWorkspaceTaskById >> ", result);
      }      
    }
  });
});