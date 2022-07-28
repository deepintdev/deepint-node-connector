/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- emails.test.ts
*/

import {
  getWorkspaceEmails, 
  postWorkspaceEmails,
  deleteWorkspaceEmailById
} from '../emails_calls';

import {} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idEmailTest: string = "";
let listIdEmailTest: Array<string> = [];

/* --------------------------- EMAILS CALLS ---------------------------*/
describe('POST - emails_calls', ()=>{
  test('POST postWorkspaceEmails!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let emailUrl = "emailtest" + numRandom + "@gmail.com";
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      email: {
        email: emailUrl
      }
    }
    
    const result = await postWorkspaceEmails(bodyPOST.idWorkspace, bodyPOST.email);
    expect(result).toBeDefined();
    //console.log("postWorkspaceEmails >> ", result);
    expect(result).toHaveProperty('id');

    if("id" in result){
      idEmailTest = result.id;
      listIdEmailTest.push(idEmailTest);
      //console.log("Añadir id: ", idEmailTest, " -- List: ", listIdEmailTest);
    }

  });
});

describe('GET - emails_calls', ()=>{
  test('GET getWorkspaceEmails!', async () => {
    let bodyGET = {
      id: idWorkspaceTest
    }

    const result = await getWorkspaceEmails(bodyGET.id);
    expect(result).toBeDefined();
    //console.log("getWorkspaceEmails >> ", result);

  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceEmailById!', async () => {

    //console.log("listIdEmailTest >> ", listIdEmailTest);

    for (const item of listIdEmailTest) {
      let bodyDELETE = {
        idWorkspace: idWorkspaceTest,
        idEmail: item
      }

      const result = await deleteWorkspaceEmailById(bodyDELETE.idWorkspace, bodyDELETE.idEmail);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceEmailById ",item," >> ", result);
      expect(result).toHaveProperty('result', 'success');
    }
  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

