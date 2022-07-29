/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- tasks.test.ts
*/

import {
  getWorkspaceTasks,
  getWorkspaceTaskById,
  deleteWorkspaceTaskById
} from '../tasks_calls';

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idTaskTest: string = "";

/* --------------------------- TASKS CALLS ---------------------------*/

describe('GET - tasks_calls', ()=>{
  test('GET getWorkspaceTasks!', async () => {

    let BODYGET = {
      idWorkspace: idWorkspaceTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceTasks(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
    expect(result).toBeDefined();
    //console.log("getWorkspaceTasks >> ", result);
    expect(result).toHaveProperty('items');

    if(("items" in result)){
      if(result.items.length > 0){
        idTaskTest = result.items[0].id;
        //console.log("idTaskTest >> ", result.items[0].id);
      }
      else{
        console.error("ERROR getWorkspaceTasks >> The tasks list is empty");
      }
    }
  });  
});

describe('GET - tasks_calls', ()=>{
  test('GET getWorkspaceTaskById!', async () => {
    let BODYGET = {
      idWorkspace: idWorkspaceTest,
      idTask: idTaskTest,
    }

    const result = await getWorkspaceTaskById(BODYGET.idWorkspace, BODYGET.idTask);
    expect(result).toBeDefined();
    //console.log("getWorkspaceTaskById >> ", result);
    expect(result).toHaveProperty('id');     
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test('DELETE deleteWorkspaceTaskById!', async () => {
    let BODYDELETE = {
      idWorkspace: idWorkspaceTest,
      idTask: idTaskTest,
    }
  
    const result = await deleteWorkspaceTaskById(BODYDELETE.idWorkspace, BODYDELETE.idTask);
    expect(result).toBeDefined();
    //console.log("deleteWorkspaceTaskById >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});