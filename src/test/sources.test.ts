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
    UpdateDataSource
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let stopTest: boolean = false;
let idWorkspaceTest: string = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";
let idSourceTest: string = "";
//let idDashboardCloneTest: string = "";

/* --------------------------- SOURCES CALLS ---------------------------*/

describe('GET - sources_calls', ()=>{
  test('GET getWorkspaceSources!', async () => {

    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    };

    const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceSources >> ", result);

    if(!("items" in result)){
      stopTest = true;
      console.error("ERROR getWorkspaceSources ",stopTest," >> ", result);
    }
  });
});

describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    console.log("numRandom: ", numRandom);
    
    let featureTest : Feature = {
      name: "MyFeatureTest"+numRandom,
      type: 'unknown',
      date_format: "2022-07-13T08:13:52.333Z",
      indexed: false
    };

    let sourceToAddTest : SourceToAdd = {
      name: "deviceTest"+numRandom,
      description: "Sin descripción",
      features: [featureTest]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceToAddTest
    }

    console.log("bodyPOST: ", JSON.stringify(bodyPOST));
    
    const result = await postWorkspaceSource(bodyPOST.idWorkspace, sourceToAddTest);
    expect(result).toBeDefined();
    console.log("postWorkspaceSource >> ", result);
    /*
    if("id" in result){
      idSourceTest = ""; //(result as ResultSuccess).result;
    }
    else{
      stopTest = true;
      console.error("ERROR postWorkspaceSource >> ", result);
    }
    */
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceClone!', async () => {
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      name: "SCAN SOURCE CLONE"
    }
    
    const result = await postSourceClone(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postSourceClone >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceDerived!', async () => {

    let queryTreeTest : QueryTree = {
      type: "Tipo test",
      operation: "Operation test",
      left: 0,
      right: "1",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "Source Derived Test", 
      description: "Sin descripción",
      derived_type: "Derived type test",
      origin: "Origen test",
      origin_b: "Origen B test",
      query: queryTreeTest,
      features: "Features test",
      field_a: 0,
      field_b: 1
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: sourceDerivedTest
    }
    
    const result = await postSourceDerived(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceDerived >> ", result);
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

describe('DELETE - dashboards_calls', ()=>{
  test.skip('DELETE deleteWorkspaceSourceById!', async () => {
    
    let bodyDELETE = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
    }

    const result = await deleteWorkspaceSourceById(bodyDELETE.idWorkspace, bodyDELETE.idSource);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceSourceById >> ", result);
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


/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

