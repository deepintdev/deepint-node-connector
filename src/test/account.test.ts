/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- account.test.ts
*/

import {
	getSession,
	getProfile,
	postProfile
} from '../account_calls';

import {
  AccProfileImport
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let fullNameTest: string = "";
let bioTest: string = "";
let urlTest: string = "";
let countryTest: string = "";

/* --------------------------- ACCOUNT CALLS ---------------------------*/

describe('GET - account_calls', ()=>{
	test('GET getSession!', async () => {
		const result = await getSession();
		expect(result).toBeDefined();
		//console.log("getSession >> ", result);
	});
});

describe('GET - account_calls', ()=>{
	test('GET getProfile!', async () => {
		const result = await getProfile();
		expect(result).toBeDefined();
		//console.log("getProfile >> ", result);

		if("full_name" in result){
      fullNameTest = result.full_name;
			bioTest = result.bio;
			urlTest = result.url;
			countryTest = result.country;
    }
	});
});

describe('POST - account_calls', ()=>{
	test('POST postProfile!', async () => {

		let accProfileImportTest: AccProfileImport = {
			full_name: fullNameTest,
			bio: bioTest,
			url: urlTest,
			country: countryTest
		};

		let bodyPOST = {
      profile: accProfileImportTest
    }
		
		const result = await postProfile(bodyPOST.profile);
		expect(result).toBeDefined();
		//console.log("postProfile >> ", result);
		expect(result).toHaveProperty('result', 'success');

	});
});

