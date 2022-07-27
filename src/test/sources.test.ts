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
    ResponseWorkspaceExport,
    //Source
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idSourceTest: string = "";
let idSourceTest2: string = "";
let listIdSourceTest: Array<string> = [];

/* --------------------------- SOURCES CALLS ---------------------------*/

// Crear tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let sourceToAddTest : SourceToAdd = {
      name: "deviceTableTest "+numRandom,
      description: "Sin descripción",
      features: [
        {
          name: "Colum 1",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum 2",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum 3",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum 4",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
      ]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceToAddTest
    }
    
    const result = await postWorkspaceSource(bodyPOST.idWorkspace, sourceToAddTest);
    expect(result).toBeDefined();
    console.log("postWorkspaceSource (table 1) >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      idSourceTest = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idSourceTest);
      console.log("Añadir id: ", idSourceTest, " -- List: ", listIdSourceTest);
    }
  });
});

// Crear info tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postSourceInstances!', async () => {
    let updateDataSourceTest : UpdateDataSource = {
      replace: false,
      pk: "",
      date_format: "",
      data: [["Valor1", "Valor2","Valor3","Valor4"],["Valor5","Valor5","Valor5","Valor5"]]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      update: updateDataSourceTest
    }
    
    const result = await postSourceInstances(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.update);
    expect(result).toBeDefined();
    console.log("postSourceInstances (values 1) >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Clonar la tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postSourceClone!', async () => {
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      name: "SCAN SOURCE CLONE"
    }
    
    const result = await postSourceClone(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postSourceClone >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      let idCloneTest = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idCloneTest);
      console.log("Añadir id: ", idCloneTest, " -- List: ", listIdSourceTest);
    }
  });
});

// Filtrar en la tabla 1
describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceDerived - FILTER!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 2,
      right: "3",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "SourceDerivedFilterTest "+numRandom, 
      description: "Sin descripción",
      derived_type: "filter",
      origin: idSourceTest,
      origin_b: "",
      query: queryTreeTest,
      features: "0,2",
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
    expect(result).toHaveProperty('result', 'success');

    if((result as ResponseWorkspaceExport).result === "success"){
      let idTaskDerived = (result as ResponseWorkspaceExport).task_id;
      listIdSourceTest.push(idTaskDerived);
      console.log("Añadir id: ", idTaskDerived, " -- List: ", listIdSourceTest);
    }
  });
});

// Crear tabla 2
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource - JOIN!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let sourceToAddTest : SourceToAdd = {
      name: "deviceTableJoinTest "+numRandom,
      description: "Sin descripción",
      features: [
        {
          name: "Colum A",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum 2",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum B",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
        {
          name: "Colum C",
          type: 'unknown',
          date_format: "2022-07-13T08:13:52.333Z",
          indexed: false
        },
      ]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceToAddTest
    }
    
    const result = await postWorkspaceSource(bodyPOST.idWorkspace, sourceToAddTest);
    expect(result).toBeDefined();
    console.log("postWorkspaceSource (table 2) >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      idSourceTest2 = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idSourceTest2);
      console.log("Añadir id: ", idSourceTest2, " -- List: ", listIdSourceTest);
    }
  });
});

// Crear info tabla 2
describe('POST - sources_calls', ()=>{
  test('POST postSourceInstances - 2!', async () => {
    let updateDataSourceTest : UpdateDataSource = {
      replace: false,
      pk: "",
      date_format: "",
      data: [["Valor1", "Valor2","Valor3","Valor4"],["Valor5","Valor5","Valor5","Valor5"]]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest2,
      update: updateDataSourceTest
    }
    
    const result = await postSourceInstances(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.update);
    expect(result).toBeDefined();
    console.log("postSourceInstances - (values 2) >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Fusionar tabla 1 y 2 (JOIN)
describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceDerived - JOIN!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "SourceDerivedJoinTest "+numRandom, 
      description: "Sin descripción",
      derived_type: "join",
      origin: idSourceTest,
      origin_b: idSourceTest2,
      query: queryTreeTest,
      features: "0,1,2,3,4,5,6,7",
      field_a: 1,
      field_b: 1
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceDerivedTest
    }
    
    const result = await postSourceDerived(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceDerived SourceDerivedJoinTest "+numRandom," >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResponseWorkspaceExport).result === "success"){
      let idTaskDerivedJoin = (result as ResponseWorkspaceExport).task_id;
      listIdSourceTest.push(idTaskDerivedJoin);
      console.log("Añadir id: ", idTaskDerivedJoin, " -- List: ", listIdSourceTest);
    }
  });
});

// Extender tabla (EXTEND)
describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceDerived - EXTEND!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "SourceDerivedExtendTest "+numRandom, 
      description: "Sin descripción",
      derived_type: "extend",
      origin: idSourceTest,
      origin_b: idSourceTest2,
      query: queryTreeTest,
      features: "0,1,2,3,4,5,6,7",
      field_a: 1,
      field_b: 1
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceDerivedTest
    }
    
    const result = await postSourceDerived(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceDerived SourceDerivedExtendTest "+numRandom," >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResponseWorkspaceExport).result === "success"){
      let idTaskDerivedExtend = (result as ResponseWorkspaceExport).task_id;
      listIdSourceTest.push(idTaskDerivedExtend);
      console.log("Añadir id: ", idTaskDerivedExtend, " -- List: ", listIdSourceTest);
    }
  });
});

// Extender tabla (MERGE)
describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceDerived - MERGE!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "SourceDerivedMergeTest "+numRandom, 
      description: "Sin descripción",
      derived_type: "merge",
      origin: idSourceTest,
      origin_b: idSourceTest2,
      query: queryTreeTest,
      features: "0,1,2,3,4,5,6,7",
      field_a: 1,
      field_b: 1
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceDerivedTest
    }
    
    const result = await postSourceDerived(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceDerived SourceDerivedMergeTest "+numRandom," >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResponseWorkspaceExport).result === "success"){
      let idTaskDerivedMerge = (result as ResponseWorkspaceExport).task_id;
      listIdSourceTest.push(idTaskDerivedMerge);
      console.log("Añadir id: ", idTaskDerivedMerge, " -- List: ", listIdSourceTest);
    }
  });
});

//
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
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      let idsourceExternal = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idsourceExternal);
      console.log("Añadir id: ", idsourceExternal, " -- List: ", listIdSourceTest);
    }
  });
});

// Es crear una tabla a partir de Mongo, MQQT, INFLUX, MYSQL o archivos
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
      idWorkspace: idWorkspaceTest,
      source: sourceOtherTest
    }
    
    const result = await postSourceOther(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postSourceOther >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      let idsourceOther = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idsourceOther);
      console.log("Añadir id: ", idsourceOther, " -- List: ", listIdSourceTest);
    }
  });
});

// Devolver datos de la tabla 1
describe('GET - sources_calls', ()=>{
  test('GET getWorkspaceSourceById!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
    };

    const result = await getWorkspaceSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getWorkspaceSourceById >> ", result);
    expect(result).toHaveProperty('id');
  });
});

// Actualiza el nombre y descripción de la tabla 1 por el ID
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSourceById!', async () => {

    let sourceSetTest : SourceSet = {
      name: "deviceTableTestCHANGE",
      description: "Descripción modificada"
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      source: sourceSetTest
    }
    
    const result = await postWorkspaceSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceSourceById >> ", result);
    expect(result).toHaveProperty('result', 'success');

  });
});

// 
describe('GET - sources_calls', ()=>{
  test.skip('GET getConnectionSourceById!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
    };

    const result = await getConnectionSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getConnectionSourceById >> ", result); // ??

  });
});

//
describe('POST - sources_calls', ()=>{
  test.skip('POST postConnectionSourceById!', async () => {

    let resultConnectionTest : ResultConnection = {
      url: "https://"
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      source: resultConnectionTest
    }
    
    const result = await postConnectionSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postConnectionSourceById >> ", result); // ??
  });
});

//
describe('GET - sources_calls', ()=>{
  test.skip('GET getAutoUpdateSourceById!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
    };

    const result = await getAutoUpdateSourceById(bodyGET.idWorkspace, bodyGET.idSource);
    expect(result).toBeDefined();
    console.log("getAutoUpdateSourceById >> ", result); // ??
  });
});

//
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
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      source: configurationSourceResultTest
    }
    
    const result = await postAutoUpdateSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postAutoUpdateSourceById >> ", result); // ??
  });
});

// Sustituir todas las columnas de una tabla por las indicadas
describe('POST - sources_calls', ()=>{
  test('POST postTransformFeaturesSourcesById!', async () => {
    let featureMappedTest : FeatureMapped = {
      name: "Colum X",
      type: "unknown",
      indexed: false,
      date_format: "2022-07-13T08:13:52.333Z",
      mapped_to: -1
    };

    let transformFeaturesTest : TransformFeatures = {
      features: [featureMappedTest]
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      source: transformFeaturesTest
    }
    
    const result = await postTransformFeaturesSourcesById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postTransformFeaturesSourcesById >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

//
describe('GET - sources_calls', ()=>{
  test('GET getSourceInstances!', async () => {

    let bodyGET = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
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
    expect(result).toHaveProperty('features');
    
  });
});

//
describe('POST - sources_calls', ()=>{
  test.skip('POST postExternalSources!', async () => {

    let bodyPOST = {
      source: [[""]]
    }
    
    const result = await postExternalSources(bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postExternalSources >> ", result); // ??
  });
});

// Mostrar información de los workspaces de sources
describe('GET - sources_calls', ()=>{
  test('GET getWorkspaceSources!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    };

    const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    //console.log("getWorkspaceSources >> ", result);
    expect(result).toHaveProperty('items');
  });
});

// Eliminar filas de tablas
describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteSourceInstances!', async () => {
    let bodyDELETE = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      where: '{"type": "single", "operation":"eq","left":0,"right":"Valor5","children": []}'
    }

    const result = await deleteSourceInstances(bodyDELETE.idWorkspace, bodyDELETE.idSource, bodyDELETE.where);
    expect(result).toBeDefined();
    //console.log("deleteSourceInstances >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Borrar todos los datos creados en POST
describe('DELETE - dashboards_calls', ()=>{
  test('DELETE deleteWorkspaceSourceById!', async () => {

    console.log("DELETE listIdSourceTest > ", listIdSourceTest);

    for (const item of listIdSourceTest) {
      let bodyDELETE = {
        idWorkspace: idWorkspaceTest,
        idSource: item,
      }

      const result = await deleteWorkspaceSourceById(bodyDELETE.idWorkspace, bodyDELETE.idSource);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceSourceById ",item," > ", result);
      expect(result).toHaveProperty('result', 'success');
    }
  });
});

/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
const searchIdCloneDashboard = (listItems: Source) => {
  for (const item of listItems.items) {
    if(item.name === "SCAN SOURCE CLONE"){
      listIdSourceTest.push(item.id);
      console.log("searchIdCloneDashboard >> Añadir id: ", item.id, " -- List: ", listIdSourceTest);
    }
  }
}
*/
