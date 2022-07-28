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
  SourceExternal,
  SourceOther,
  SourceSet,
  ResultConnection,
  TransformFeatures,
  FeatureMapped,
  UpdateDataSource,
  ResultSuccessSource,
  Source
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let idSourceTest: string = "";
let idSourceTest2: string = "";
let idAutoUpdateSourceTest: string = "";
let listIdSourceTest: Array<string> = [];

/* --------------------------- SOURCES CALLS ---------------------------*/

// Crear tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let sourceToAddTest : SourceToAdd = {
      name: "Device Table Test-1: "+numRandom,
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
    //console.log("deviceTableTest "+numRandom+": postWorkspaceSource (table 1) >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      idSourceTest = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idSourceTest);
      //console.log("Añadir id: ", idSourceTest, " -- List: ", listIdSourceTest);
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
    //console.log("postSourceInstances (values 1) >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Clonar la tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postSourceClone!', async () => {
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      name: "Device Table Test-CLONE: "
    }
    
    const result = await postSourceClone(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.name);
    expect(result).toBeDefined();
    //console.log("postSourceClone CLONE >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      let idCloneTest = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idCloneTest);
      //console.log("Añadir id: ", idCloneTest, " -- List: ", listIdSourceTest);
    }
  });
});

// Crear tabla 2
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSource 2!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let sourceToAddTest : SourceToAdd = {
      name: "Device Table Test-2: "+numRandom,
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
    //console.log("deviceTableJoinTest "+numRandom+": postWorkspaceSource (table 2) >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      idSourceTest2 = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idSourceTest2);
      //console.log("Añadir id: ", idSourceTest2, " -- List: ", listIdSourceTest);
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
    //console.log("postSourceInstances - (values 2) >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Filtrar en la tabla 1
describe('POST - sources_calls', ()=>{
  test('POST postSourceDerived - FILTER!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 2,
      right: "3",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "Derived Table Test-FILTER: "+numRandom, 
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
    //console.log("SourceDerivedFilterTest "+numRandom+": postSourceDerived >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Fusionar tabla 1 y 2 (JOIN)
describe('POST - sources_calls', ()=>{
  test('POST postSourceDerived - JOIN!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "Derived Table Test-JOIN: "+numRandom, 
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
    //console.log("SourceDerivedJoinTest "+numRandom+": postSourceDerived >> ", result);
    expect(result).toHaveProperty('result', 'success');

  });
});

// Extender tabla (EXTEND)
describe('POST - sources_calls', ()=>{
  test('POST postSourceDerived - EXTEND!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "Derived Table Test-EXTEND: "+numRandom, 
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
    //console.log("SourceDerivedExtendTest "+numRandom+": postSourceDerived >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

// Extender tabla (MERGE)
describe('POST - sources_calls', ()=>{
  test('POST postSourceDerived - MERGE!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let queryTreeTest : QueryTree = {
      type: "single",
      operation: "cni",
      left: 0,
      right: "",
      children: [""]
    };

    let sourceDerivedTest : SourceDerived = {
      name: "Derived Table Test-MERGE: "+numRandom, 
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
    //console.log("SourceDerivedMergeTest "+numRandom+": postSourceDerived >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

//
describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceExternal - EXTERNAL!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);
    let numRandomFeature: number = generateRandomNumber(1000, 9000);

    let sourceExternalTest : SourceExternal = {
      name: "Derived Table Test-EXTERNAL: "+numRandom, 
      description: "Descripción de testeo de la tabla derivada de EXTERNAL",
      url: "https://",
      features: [
        {
          name: "features "+numRandomFeature,
          type: "unknown",
        }
      ]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: sourceExternalTest
    }
    
    const result = await postSourceExternal(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    //console.log("postSourceExternal >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if((result as ResultSuccessSource).result === "success"){
      let idsourceExternal = (result as ResultSuccessSource).source_id;
      listIdSourceTest.push(idsourceExternal);
      //console.log("Añadir id: ", idsourceExternal, " -- List: ", listIdSourceTest);
    }
  });
});

// Es crear una tabla a partir de Mongo, MQQT, INFLUX, MYSQL o archivos
describe('POST - sources_calls', ()=>{
  test('POST postSourceOther - OTHERS!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let sourceOtherTest : SourceOther = {
      name: "Derived Table Test-OTHERS: "+numRandom,
      description: "Descripción de testeo de derivadas OTHERS",
      type: "database/mongo",
      encrypted: false,
      indexed: false,
      dyn_enabled: true,
      dyn_delay: 3600000,
      dyn_replace: false,
      dyn_pk: "id",
      dyn_update_mode: false,
      file: "",
      file_name: "",
      separator: "",
      quotes: "",
      csv_header: false,
      json_fields: [],
      json_prefix: "",
      json_mode: "default",
      date_format: "",
      url: "mongodb://mongoadmin:lifevdlp2020@lifevia.ddns.net:27017",
      parser: "json",
      http_headers: "",
      rejectUnauthorized: true,
      sdp_enabled: false,
      sdp_name: "",
      sdp_dir: "asc",
      database: "LifeVia",
      user: "mongoadmin",
      password: "lifevdlp2020",
      table: "field1",
      query: "",
      sort: "",
      project: "",
      limit: 0,
      db: "mysql",
      host: "lifevia.ddns.net",
      port: 27017,
      topics: "",
      fields_expected: []
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: sourceOtherTest
    }
    
    const result = await postSourceOther(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    //console.log("postSourceOther >> ", result);
    expect(result).toHaveProperty('result', 'success');
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
    //console.log("getWorkspaceSourceById >> ", result);
    expect(result).toHaveProperty('id');
  });
});

// Actualiza el nombre y descripción de la tabla 1 por el ID
describe('POST - sources_calls', ()=>{
  test('POST postWorkspaceSourceById!', async () => {

    let sourceSetTest : SourceSet = {
      name: "Derived Table Test-CHANGE: ",
      description: "Descripción modificada"
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idSourceTest,
      source: sourceSetTest
    }
    
    const result = await postWorkspaceSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    //console.log("postWorkspaceSourceById >> ", result);
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
    //console.log("getConnectionSourceById >> ", result); // ??

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
    //console.log("postConnectionSourceById >> ", result); // ??
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
    //console.log("getAutoUpdateSourceById >> ", result); // ??
  });
});

// Buscar el ID de OTHERS en workspaces de sources (Activar si se usa postAutoUpdateSourceById)
describe('GET - sources_calls', ()=>{
  test.skip('GET getWorkspaceSources!', async () => {
    let bodyGET = {
      id: idWorkspaceTest,
      page: 0,
      limit: 500
    };

    const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceSources (OTHERS) >> ", result);
    expect(result).toHaveProperty('items');

    if(("items" in result)){
      searchIdAutoUpdateSourceOthers((result as Source));
    }
  });
});

// AVISO: No funciona porque aunque POST postSourceOther - OTHERS sale correcto no se crea realmente para poder coger su id source en el test anterior.
describe('POST - sources_calls', ()=>{
  test.skip('POST postAutoUpdateSourceById - MODIFY!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let configurationSourceResultTest : SourceOther = {
      name: "MODIFY Derived Table Test-OTHERS: "+numRandom,
      description: "Descripción de testeo de derivadas MODIFY",
      type: "database/mongo",
      encrypted: false,
      indexed: false,
      dyn_enabled: true,
      dyn_delay: 3600000,
      dyn_replace: false,
      dyn_pk: "id",
      dyn_update_mode: false,
      file: "",
      file_name: "",
      separator: "",
      quotes: "",
      csv_header: false,
      json_fields: [],
      json_prefix: "",
      json_mode: "default",
      date_format: "",
      url: "mongodb://mongoadmin:lifevdlp2020@lifevia.ddns.net:27017",
      parser: "json",
      http_headers: "",
      rejectUnauthorized: true,
      sdp_enabled: false,
      sdp_name: "",
      sdp_dir: "asc",
      database: "LifeVia",
      user: "mongoadmin",
      password: "lifevdlp2020",
      table: "field1",
      query: "",
      sort: "",
      project: "",
      limit: 0,
      db: "mysql",
      host: "lifevia.ddns.net",
      port: 27017,
      topics: "",
      fields_expected: []
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idSource: idAutoUpdateSourceTest,
      source: configurationSourceResultTest
    }

    //console.log("postAutoUpdateSourceById >> bodyPOST: ", bodyPOST);
    
    const result = await postAutoUpdateSourceById(bodyPOST.idWorkspace, bodyPOST.idSource, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postAutoUpdateSourceById >> ", result);
    expect(result).toHaveProperty('result', 'success');
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
    //console.log("postTransformFeaturesSourcesById >> ", result);
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
    //console.log("getSourceInstances >> ", result);
    expect(result).toHaveProperty('features');
    
  });
});

//
describe('POST - sources_calls', ()=>{
  test.skip('POST postExternalSources - EXTERNAL!', async () => {

    let bodyPOST = {
      source: [[""]]
    }
    
    const result = await postExternalSources(bodyPOST.source);
    expect(result).toBeDefined();
    //console.log("postExternalSources >> ", result); // ??
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

    if(("items" in result)){
      searchIdDerivedTasks((result as Source));
    }

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

    //console.log("DELETE listIdSourceTest > ", listIdSourceTest);

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

const searchIdDerivedTasks = (listItems: Source) => {
  for (const item of listItems.items) {

    let splitName1 = item.name.split("-")[1];

    if(splitName1 != undefined){

      let splitName2 = splitName1.split(":")[0];
      //console.log("splitName2: ", splitName2);
      if(splitName2 != undefined && 
        splitName2 == "FILTER" || 
        splitName2 == "JOIN" || 
        splitName2 == "EXTEND" || 
        splitName2 == "OTHERS" || 
        splitName2 == "MERGE"){

        listIdSourceTest.push(item.id);
        //console.log("searchIdDerivedTasks ",item.name," >> id: ", item.id, " -- List: ", listIdSourceTest);
      }
    }
  }
}

const searchIdAutoUpdateSourceOthers = (listItems: Source) => {
  for (const item of listItems.items) {
    //console.log("item: ", item);
    let splitName1 = item.name.split("-")[1];
    if(splitName1 != undefined){
      let splitName2 = splitName1.split(":")[0];
      if(splitName2 != undefined && splitName2 == "OTHERS"){
        idAutoUpdateSourceTest = item.id;
        console.log(">>>>>> ENCONTRADO: ", idAutoUpdateSourceTest);
      }
    }
  }
}