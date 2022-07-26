/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- sources.test.ts
*/

import {
    getWorkspaceSources,
    postWorkspaceSource,
    postSourceClone,
    postSourceDerived,
    postSourceExternal,
    postSourceOther,
    getWorkspaceSourceById,
    postWorkspaceSourceById,
    deleteWorkspaceSourceById,
    getConnectionSourceById,
    postConnectionSourceById,
    getAutoUpdateSourceById,
    postAutoUpdateSourceById,
    postTransformFeaturesSourcesById,
    getSourceInstances,
    postSourceInstances,
    deleteSourceInstances,
    postExternalSources
} from '../sources_calls';

import {
    Feature,
    SourceToAdd,
    QueryTree,
    SourceDerived,
    FeatureSourceExternal,
    SourceExternal,
    Fields,
    SourceOther,
    SourceSet,
    ResultConnection,
    ConfigurationSourceResult,
    TransformFeatures,
    FeatureMapped,
    UpdateDataSource,
    ResultSuccessSource,
    ResultSuccess,
    ResponseWorkspaceExport,
    Source
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let stopTest: boolean = false;
let idWorkspaceTest: string = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";
let idSourceTest: string = "";
let listIdSourceTest: Array<string> = [];

/* --------------------------- SOURCES CALLS ---------------------------*/

describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource!', async () => {
    if(!stopTest){
      let numRandom: number = generateRandomNumber(1000, 9000);
      
      let featureTest : Feature = {
        name: "MyFeatureTest "+numRandom,
        type: 'unknown',
        date_format: "2022-07-13T08:13:52.333Z",
        indexed: false
      };

      let sourceToAddTest : SourceToAdd = {
        name: "deviceTest "+numRandom,
        description: "Sin descripción",
        features: [featureTest]
      };
      
      let bodyPOST = {
        idWorkspace: idWorkspaceTest,
        source: sourceToAddTest
      }
      
      const result = await postWorkspaceSource(bodyPOST.idWorkspace, sourceToAddTest);
      expect(result).toBeDefined();

      if((result as ResultSuccessSource).result === "success"){
        idSourceTest = (result as ResultSuccessSource).source_id;
        listIdSourceTest.push(idSourceTest);
        console.log("Añadir id: ", idSourceTest, " -- List: ", listIdSourceTest);
      }
      else{
        stopTest = true;
        console.error("ERROR postWorkspaceSource >> ", result);
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postWorkspaceSource - sources_calls");
    }

  });
});

describe('POST - sources_calls', ()=>{
  test('POST postSourceClone!', async () => {
    if(!stopTest){
      let bodyPOST = {
        idWorkspace: idWorkspaceTest,
        idSource: idSourceTest,
        name: "SCAN SOURCE CLONE"
      }
      
      const result = await postSourceClone(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.name);
      expect(result).toBeDefined();
      //console.log("postSourceClone >> ", result);

      if((result as ResultSuccessSource).result === "success"){
        let idCloneTest = (result as ResultSuccessSource).source_id;
        listIdSourceTest.push(idCloneTest);
        console.log("Añadir id: ", idCloneTest, " -- List: ", listIdSourceTest);
      }
      else{
        stopTest = true;
        console.error("ERROR postSourceClone >> ", result);
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postSourceClone - sources_calls");
    }

  });
});

describe('POST - sources_calls', ()=>{
  test('POST postSourceDerived!', async () => {
    if(!stopTest){
      let numRandom: number = generateRandomNumber(1000, 9000);

      let queryTreeTest : QueryTree = {
        type: "Tipo test",
        operation: "Operation test",
        left: 0,
        right: "1",
        children: [""]
      };

      let sourceDerivedTest : SourceDerived = {
        name: "SourceDerivedTest "+numRandom, 
        description: "Sin descripción",
        derived_type: "filter",
        origin: "Origen test",
        origin_b: "Origen B test",
        query: queryTreeTest,
        features: "Features test",
        field_a: 0,
        field_b: 1
      };
      
      let bodyPOST = {
        idWorkspace: idWorkspaceTest,
        source: sourceDerivedTest
      }
      
      const result = await postSourceDerived(bodyPOST.idWorkspace, bodyPOST.source);
      expect(result).toBeDefined();
      console.log("postSourceDerived >> ", result);
      if((result as ResponseWorkspaceExport).result === "success"){
        let idTaskDerived = (result as ResponseWorkspaceExport).task_id;
        listIdSourceTest.push(idTaskDerived);
        console.log("Añadir id: ", idTaskDerived, " -- List: ", listIdSourceTest);
      }
      else{
        stopTest = true;
        console.error("ERROR deleteWorkspaceDashboardById >> ", result);
      }
      
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de POST postSourceDerived - sources_calls");
    }

  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceExternal!', async () => {

    let featureSourceExternalTest : FeatureSourceExternal = {
      name: "",
      type: "unknown",
    };

    let sourceExternalTest : SourceExternal = {
      name: "Source External Test", 
      description: "Sin descripción",
      url: "https://",
      features: [featureSourceExternalTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: sourceExternalTest
    }
    
    const result = await postSourceExternal(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceExternal >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceOther!', async () => {

    let fieldsTest : Fields = {
      name: "Fields text test",
      type: "text",
      dateFormat: "2022-07-13T08:13:52.333Z",
    };

    let sourceOtherTest : SourceOther = {
      name: "Source Other Test",
      description: "Sin descripción",
      type: "ckan",
      encrypted: false,
      indexed: false,
      dyn_enabled: false,
      dyn_delay: 0,
      dyn_replace: false,
      dyn_pk: "",
      dyn_update_mode: false,
      file: "",
      file_name: "",
      separator: "",
      quotes: "",
      csv_header: false,
      json_fields: [""],
      json_prefix: "",
      json_mode: "default",
      date_format: "",
      url: "",
      parser: "json",
      http_headers: "",
      rejectUnauthorized: false,
      sdp_enabled: false,
      sdp_name: "",
      sdp_dir: "asc",
      database: "",
      user: "",
      password: "",
      table: "",
      query: "",
      sort: "",
      project: "",
      limit: 0,
      db: "mysql",
      host: "",
      port: 0,
      topics: "",
      fields_expected: [fieldsTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: sourceOtherTest
    }
    
    const result = await postSourceOther(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceOther >> ", result);
  });
});

describe('GET - sources_calls', ()=>{
  test.skip('GET getWorkspaceSourceById!', async () => {

    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
    };

    const result = await getWorkspaceSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getWorkspaceSourceById >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postWorkspaceSourceById!', async () => {

    let sourceSetTest : SourceSet = {
      name: "Source Set test",
      description: "Sin descripción"
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      source: sourceSetTest
    }
    
    const result = await postWorkspaceSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceSourceById >> ", result);
  });
});

describe('GET - sources_calls', ()=>{
  test.skip('GET getConnectionSourceById!', async () => {

    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
    };

    const result = await getConnectionSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getConnectionSourceById >> ", result); // ??
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postConnectionSourceById!', async () => {

    let resultConnectionTest : ResultConnection = {
      url: "https://"
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      source: resultConnectionTest
    }
    
    const result = await postConnectionSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postConnectionSourceById >> ", result);
  });
});

describe('GET - sources_calls', ()=>{
  test.skip('GET getAutoUpdateSourceById!', async () => {

    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
    };

    const result = await getAutoUpdateSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getAutoUpdateSourceById >> ", result); 
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postAutoUpdateSourceById!', async () => {

    let fieldsTest : Fields = {
      name: "Fields text test",
      type: "text",
      dateFormat: "2022-07-13T08:13:52.333Z",
    };

    let configurationSourceResultTest : ConfigurationSourceResult = {
      dyn_enabled: false,
      dyn_delay: 0,
      dyn_replace: false,
      dyn_pk: "",
      dyn_update_mode: false,
      separator: "",
      quotes: "",
      csv_header: false,
      json_fields: [""],
      json_prefix: "",
      json_mode: "default",
      date_format: "",
      url: "",
      parser: "json",
      http_headers: "",
      rejectUnauthorized: false,
      sdp_enabled: false,
      sdp_name: "",
      sdp_dir: "asc",
      database: "",
      user: "",
      password: "",
      table: "",
      query: "",
      sort: "",
      project: "",
      limit: 0,
      db: "mysql",
      host: "",
      port: 0,
      topics: "",
      fields_expected: [fieldsTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      source: configurationSourceResultTest
    }
    
    const result = await postAutoUpdateSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postAutoUpdateSourceById >> ", result);
  });
});


describe('POST - sources_calls', ()=>{
  test.skip('POST postTransformFeaturesSourcesById!', async () => {

    let featureMappedTest : FeatureMapped = {
      name: "Source Other Test",
      type: "unknown",
      indexed: false,
      date_format: "",
      mapped_to: 10
    };

    let transformFeaturesTest : TransformFeatures = {
      features: [featureMappedTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      source: transformFeaturesTest
    }
    
    const result = await postTransformFeaturesSourcesById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postTransformFeaturesSourcesById >> ", result);
  });
});

describe('GET - sources_calls', ()=>{
  test.skip('GET getSourceInstances!', async () => {

    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      select: "",
      where: "",
      order_by: "",
      offset: 0,
      limit: 5
    };

    const result = await getSourceInstances(
      bodyGET.idWorkspace, 
      bodyGET.idSource, 
      bodyGET.select, 
      bodyGET.where, 
      bodyGET.order_by,
      bodyGET.offset,
      bodyGET.limit
    );
    expect(result).toBeDefined();
    console.log("getSourceInstances >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceInstances!', async () => {

    let updateDataSourceTest : UpdateDataSource = {
      replace: false,
      pk: "",
      date_format: "",
      data: [[""]]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      update: updateDataSourceTest
    }
    
    const result = await postSourceInstances(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.update);
    expect(result).toBeDefined();
    console.log("postSourceInstances >> ", result);
  });
});

describe('DELETE - dashboards_calls', ()=>{
  test.skip('DELETE deleteSourceInstances!', async () => {
    
    let bodyDELETE = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      where: ""
    }

    const result = await deleteSourceInstances(bodyDELETE.idWorkspace, bodyDELETE.idSource, bodyDELETE.where);
    expect(result).toBeDefined();
    console.log("deleteSourceInstances >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postExternalSources!', async () => {

    let bodyPOST = {
      source: [[""]]
    }
    
    const result = await postExternalSources(bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postExternalSources >> ", result);
  });
});





/* -------------------------------------------------------------------------------------------------------- */
describe('GET - sources_calls', ()=>{
  test('GET getWorkspaceSources!', async () => {
    if(!stopTest){
      let bodyGET = {
        id: idWorkspaceTest,
        page: 0,
        limit: 500
      };

      const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
      expect(result).toBeDefined();
      console.log("getWorkspaceSources >> ", result);

      if(("items" in result)){
        searchIdCloneDashboard((result as Source));
      }
      else{
        stopTest = true;
        console.error("ERROR getWorkspaceSources ",stopTest," >> ", result);
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de GET getWorkspaceSources - sources_calls");
    }

  });
});

describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceSourceById!', async () => {
    if(!stopTest){

      console.log("DELETE listIdSourceTest >> ", listIdSourceTest);

      for (const item of listIdSourceTest) {
        let bodyDELETE = {
          idWorkspace: idWorkspaceTest,
          idSource: item,
        }
  
        const result = await deleteWorkspaceSourceById(bodyDELETE.idWorkspace, bodyDELETE.idSource);
        expect(result).toBeDefined();
        console.log("deleteWorkspaceSourceById ",item," >> ", result);
        
        if((result as ResultSuccess).result !== "success"){
          stopTest = true;
          console.error("ERROR deleteWorkspaceSourceById >> ", result);
        }
        else{
          console.log("BORRADO >>> ", item);
        }
      }
    }
    else{
      console.error("El test se ha detenido por un error en la consulta de DELETE deleteWorkspaceSourceById - sources_calls");
    }

  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const searchIdCloneDashboard = (listItems: Source) => {
  for (const item of listItems.items) {
    if(item.name === "SCAN SOURCE CLONE"){
      listIdSourceTest.push(item.id);
      console.log("searchIdCloneDashboard >> Añadir id: ", item.id, " -- List: ", listIdSourceTest);
    }
  }
}
