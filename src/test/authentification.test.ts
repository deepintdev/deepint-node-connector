/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- authentification.test.ts
*/

import {
	postLoginToken,
	postRevokeToken
} from '../authentication_calls';

import {
  BearerToken,
  RevokeToken
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let clientIdTest: string = "0000018243b0081c-957f8647-12b4bbf8-93e2eb0b";
let clientSecretTest: string = "tniKHDfZlJMxJ-XVkt6vRd05JPNFUlsZJWhFbJCq2fRpBd904XwTnSClqGw1udcK36wBy02OBon_Wna-zw5aSg";
let bearerTest: string = "e5ywjgGjNbC5LB1aMPeAGm0ZAGFvNCllBd-hCR6bLzYBDgQKASgUkrvpk8vONzGk72HGBowVkLAXWBIT9MnE-o"; // Generar uno nuevo cada vez
let expirationTest: string = "never";
let tokenTest: string = "";

/* --------------------------- AUTHENTICATION CALLS ---------------------------*/

describe('POST - authentication_calls', ()=>{
  test('POST postLoginToken!', async () => {

    let bearerTokenTest : BearerToken = {
      client_id: clientIdTest,
      client_secret: clientSecretTest,
      bearer: bearerTest,
      expiration: expirationTest
    };

    let bodyPOST = {
      token: bearerTokenTest
    }

    const result = await postLoginToken(bodyPOST.token);
    expect(result).toBeDefined();
    //console.log("postLoginToken >> ", result);
		expect(result).toHaveProperty('result', 'success');

		if(("auth_token" in result)){
      tokenTest = result.auth_token;
			//console.log("tokenTest: ", tokenTest);
    }
  });
});

describe('POST - authentication_calls', ()=>{
  test('POST postRevokeToken!', async () => {
		if(tokenTest != ""){
			let revokeTokenTest : RevokeToken = {
				client_id: clientIdTest,
				client_secret: clientSecretTest,
				auth_token: tokenTest
			};

			let bodyPOST = {
				token: revokeTokenTest
			}

			const result = await postRevokeToken(bodyPOST.token);
			expect(result).toBeDefined();
			//console.log("postRevokeToken >> ", result);			
		}
		else{
			console.error("ERROR postRevokeToken: NO hay un token para la consulta.");
			throw new Error('ERROR postRevokeToken: NO hay un token para la consulta.')
		}
  });
});
