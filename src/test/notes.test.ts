import {
  getSession,
  getProfile
} from '../account_calls';

import {
  getWorkspaceDashboards, 
  postWorkspaceDashboards, 
  getWorkspaceDashboardById, 
  postWorkspaceDashboardById, 
  deleteWorkspaceDashboardById, 
  postDashboardClone
} from '../dashboards_calls';

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
  getWorkspaceTasks,
  getWorkspaceTaskById,
  deleteWorkspaceTaskById
} from '../tasks_calls';

import {
  getWorkspaceVisualizations,
  postWorkspaceVisualizations,
  getWorkspaceVisualizationById,
  postWorkspaceVisualizationById,
  deleteWorkspaceVisualizationById,
  postCloneVisualizationById
} from '../visualizations_calls'

import {
  getWorkspaces,
  postWorkspaces,
  postWorkspacesImport,
  getWorkspaceById,
  postWorkspaceById,
  deleteWorkspaceById,
  postIframe,
  postWorkspace,
  postWorkspaceClone
} from '../workspaces_calls';

import {
  deleteVisualization,
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
  VisualizationImport,
  VisualizationConfig,
  tableVisualization, 
  tableVisualizationGroup, 
  customSeries
} from "../types"

/* --------------------------- ACCOUNT CALLS ---------------------------*/

describe('GET - account_calls', ()=>{
  test.skip('GET getSession!', async () => {
    const result = await getSession();
    expect(result).toBeDefined();
    console.log("getSession >> ", result);
  });
});

describe('GET - account_calls', ()=>{
  test.skip('GET getProfile!', async () => {
    const result = await getProfile();
    expect(result).toBeDefined();
    console.log("getProfile >> ", result);
  });
});


/* --------------------------- DASHBOARDS CALLS ---------------------------*/

describe('GET - dashboards_calls', ()=>{
  test.skip('GET getWorkspaceDashboards!', async () => {

    let bodyGET = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceDashboards(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceDashboards >> ", result);
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postWorkspaceDashboards!', async () => {

    let dasboardTest = {
      name: "MyDashboardTest",
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboards(bodyPOST.idWorkspace, bodyPOST.dashboard);
    expect(result).toBeDefined();
    console.log("postWorkspaceDashboards >> ", result);
  });
});

describe('GET - dashboards_calls', ()=>{
  test.skip('GET getWorkspaceDashboardById!', async () => {
    
    let bodyGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93"
    }

    const result = await getWorkspaceDashboardById(bodyGET.idWorkspace, bodyGET.idDashboard);
    expect(result).toBeDefined();
    console.log("getWorkspaceDashboardById >> ", result);
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postWorkspaceDashboardById!', async () => {

    let dasboardTest = {
      name: "MyDashboardTest",
      description: "Descripción dashboard",
      privacy: "myPrivacy",
      shareOpt: "",
      gaId: "",
      restricted: false,
      configuration: {}
    }
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      dashboard: dasboardTest
    }
    
    const result = await postWorkspaceDashboardById(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.dashboard);
    expect(result).toBeDefined();
    console.log("postWorkspaceDashboardById >> ", result);
  });
});

describe('DELETE - dashboards_calls', ()=>{
  test.skip('DELETE deleteWorkspaceDashboardById!', async () => {

    let deleteVisTest : deleteVisualization = 'no';
    
    let bodyDELETE = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      deleteVis: deleteVisTest
    }

    const result = await deleteWorkspaceDashboardById(bodyDELETE.idWorkspace, bodyDELETE.idDashboard, bodyDELETE.deleteVis);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceDashboardById >> ", result);
  });
});

describe('POST - dashboards_calls', ()=>{
  test.skip('POST postDashboardClone!', async () => {
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idDashboard: "00000181f6a99b22-dbf1e49a-3b8e6446-61620d93",
      name: {name: "SCAN"}
    }
    
    const result = await postDashboardClone(bodyPOST.idWorkspace, bodyPOST.idDashboard, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postDashboardClone >> ", result);
  });
});

/* --------------------------- SOURCES CALLS ---------------------------*/

describe('GET - sources_calls', ()=>{
  test.skip('GET getWorkspaceSources!', async () => {

    let bodyGET = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    };

    const result = await getWorkspaceSources(bodyGET.id, bodyGET.page, bodyGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceSources >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postWorkspaceSource!', async () => {

    let featureTest : Feature = {
      name: "MyFeatureTest",
      type: 'unknown',
      date_format: "2022-07-13T08:13:52.333Z",
      indexed: false
    };

    let sourceToAddTest : SourceToAdd = {
      name: "deviceTest",
      description: "Sin descripción",
      features: [featureTest]
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: sourceToAddTest
    }
    
    const result = await postWorkspaceSource(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceSource >> ", result);
  });
});

describe('POST - sources_calls', ()=>{
  test.skip('POST postSourceClone!', async () => {
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idSource: "00000181f6a225d5-ce9dcdf0-249550c5-1bffc0ed",
      name: "devicerecords 2"
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
    console.log("postExternalSources >> ", result); // NO DENEGADO ??
  });
});

/* --------------------------- TASKS CALLS ---------------------------*/

describe('GET - tasks_calls', ()=>{
  test.skip('GET getWorkspaceTasks!', async () => {

    let BODYGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceTasks(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceTasks >> ", result);
  });
});

describe('GET - tasks_calls', ()=>{
  test.skip('GET getWorkspaceTaskById!', async () => {

    let BODYGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idTask: "00000181f69b401b-8485783c-c8b93ab0-9d807270",
    }

    const result = await getWorkspaceTaskById(BODYGET.idWorkspace, BODYGET.idTask);
    expect(result).toBeDefined();
    console.log("getWorkspaceTaskById >> ", result);
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test.skip('DELETE deleteWorkspaceTaskById!', async () => {

    let BODYDELETE = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idTask: "00000181f69b401b-8485783c-c8b93ab0-9d807270",
    }
  
    const result = await deleteWorkspaceTaskById(BODYDELETE.idWorkspace, BODYDELETE.idTask);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceTaskById >> ", result);
  });
});

/* --------------------------- VISUALIZATIONS CALLS ---------------------------*/

describe('GET - visualizations_calls', ()=>{
  test.skip('GET getWorkspaceVisualizations!', async () => {

    let BODYGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceVisualizations(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceVisualizations >> ", result);
  });
});

describe('POST - visualizations_calls', ()=>{
  test.skip('POST postWorkspaceVisualizations!', async () => {

    let queryTreeTest : QueryTree = {
      type: "Query Tree test",
      operation: "Operation QueryTree test",
      left: 0,
      right: "1",
      children: [""]
    }
    
    let tableVisualizationTest: tableVisualization = {
      index: 0,
      name: "",
      type: ""
    }

    let tableVisualizationGroupTest: tableVisualizationGroup = {
      index: 0,
      name: "",
      type: "",
      g: ""
    }

    let customSeriesTest: customSeries = {
      index: 0,
      type: "",
      axisType: "",
      label: "",
      units: ""
    }

    let customParamsTest = {
      key: "", 
      value: ""
    }

    let cmcTest = {
      from: 0, 
      to: 0, 
      fillColor: "#"
    }

    let categoryMapTest = {
      index: 0,
      name: "",
      map: [{
        key: "", 
        value: ""
      }]
    }

    let visualizationConfigTest : VisualizationConfig = {
      type: "",
      instances: 0,
      instOrder: 0,
      instDir: "",
      filter: queryTreeTest,
      xAxisType: "",
      yAxisType: "",
      zAxisType: "",
      xAxisFeature: 0,
      yAxisFeature: 0,
      zAxisFeature: 0,
      seriesMaker: 0,
      minValue: 0,
      maxValue: 0,
      units: "",
      unitsX: "",
      unitsY: "",
      unitsZ: "",
      unitsS: "",
      labelX: "",
      labelY: "",
      labelZ: "",
      labelS: "",
      numericIntervals: 0,
      ranges: "",
      useRanges: false,
      tablePrimaryDisplay: [tableVisualizationTest],
      tableMakeGroups: [tableVisualizationGroupTest],
      tableExtraCols: [tableVisualizationGroupTest],
      durationValue: 0,
      durationUnits: "",
      customSeries: [customSeriesTest],
      mapcenter: "",
      lat: 0,
      lng: 0,
      zoom: 0,
      maxZoom: 0,
      blur: 0,
      radious: 0,
      wordCloudMode: "",
      ignoreSeries: false,
      social: "",
      groupingMethod: "",
      customOrder: "",
      customOrderHeat: "",
      custom_url: "",
      custom_params: [customParamsTest],
      custom_params_mode: "",
      showTitle: false,
      showScrollbars: false,
      showLegend: false,
      showGrid: false,
      showRaw: false,
      fillSeries: false,
      stacked: false,
      layered: false,
      mapCluster: false,
      clusterField: 0,
      clusterMode: "",
      showArrows: false,
      axisTitles: false,
      hasPadding: false,
      axisLabels: false,
      trendLines: false,
      inversedAxis: false,
      customMarker: "",
      useMagnitude: false,
      avgCoords: false,
      fontSize: 0,
      titleFontSize: 0,
      background: "",
      xAxisDispStyle: "",
      colors: "",
      useCustomColors: false,
      useMultipleScales: false,
      showSeriesLabels: false,
      tension: 0,
      strokeWidth: 0,
      bullets: "",
      decimalDigits: 0,
      scrollbarSize: 0,
      legendPos: "",
      noanimations: false,
      autoreload: false,
      fillColor: "",
      minColor: "",
      maxColor: "",
      cmc: [cmcTest],
      categoryMap: [categoryMapTest]
    };

    let visualizationImportTest : VisualizationImport = {
      name: "",
      description: "",
      privacy: "",
      source: "",
      configuration: visualizationConfigTest
    };

    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      source: visualizationImportTest
    }
    
    const result = await postWorkspaceVisualizations(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceVisualizations >> ", result);
  });
});

describe('GET - visualizations_calls', ()=>{
  test.skip('GET getWorkspaceVisualizationById!', async () => {

    let BODYGET = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f"
    }

    const result = await getWorkspaceVisualizationById(BODYGET.idWorkspace, BODYGET.idVisualization);
    expect(result).toBeDefined();
    console.log("getWorkspaceVisualizationById >> ", result); // Me falta conocer algún id de visualización existente
  });
});

describe('POST - visualizations_calls', ()=>{
  test.skip('POST postWorkspaceVisualizationById!', async () => {

    let queryTreeTest : QueryTree = {
      type: "Query Tree test",
      operation: "Operation QueryTree test",
      left: 0,
      right: "1",
      children: [""]
    }
    
    let tableVisualizationTest: tableVisualization = {
      index: 0,
      name: "",
      type: ""
    }

    let tableVisualizationGroupTest: tableVisualizationGroup = {
      index: 0,
      name: "",
      type: "",
      g: ""
    }

    let customSeriesTest: customSeries = {
      index: 0,
      type: "",
      axisType: "",
      label: "",
      units: ""
    }

    let customParamsTest = {
      key: "", 
      value: ""
    }

    let cmcTest = {
      from: 0, 
      to: 0, 
      fillColor: "#"
    }

    let categoryMapTest = {
      index: 0,
      name: "",
      map: [{
        key: "", 
        value: ""
      }]
    }

    let visualizationConfigTest : VisualizationConfig = {
      type: "",
      instances: 0,
      instOrder: 0,
      instDir: "",
      filter: queryTreeTest,
      xAxisType: "",
      yAxisType: "",
      zAxisType: "",
      xAxisFeature: 0,
      yAxisFeature: 0,
      zAxisFeature: 0,
      seriesMaker: 0,
      minValue: 0,
      maxValue: 0,
      units: "",
      unitsX: "",
      unitsY: "",
      unitsZ: "",
      unitsS: "",
      labelX: "",
      labelY: "",
      labelZ: "",
      labelS: "",
      numericIntervals: 0,
      ranges: "",
      useRanges: false,
      tablePrimaryDisplay: [tableVisualizationTest],
      tableMakeGroups: [tableVisualizationGroupTest],
      tableExtraCols: [tableVisualizationGroupTest],
      durationValue: 0,
      durationUnits: "",
      customSeries: [customSeriesTest],
      mapcenter: "",
      lat: 0,
      lng: 0,
      zoom: 0,
      maxZoom: 0,
      blur: 0,
      radious: 0,
      wordCloudMode: "",
      ignoreSeries: false,
      social: "",
      groupingMethod: "",
      customOrder: "",
      customOrderHeat: "",
      custom_url: "",
      custom_params: [customParamsTest],
      custom_params_mode: "",
      showTitle: false,
      showScrollbars: false,
      showLegend: false,
      showGrid: false,
      showRaw: false,
      fillSeries: false,
      stacked: false,
      layered: false,
      mapCluster: false,
      clusterField: 0,
      clusterMode: "",
      showArrows: false,
      axisTitles: false,
      hasPadding: false,
      axisLabels: false,
      trendLines: false,
      inversedAxis: false,
      customMarker: "",
      useMagnitude: false,
      avgCoords: false,
      fontSize: 0,
      titleFontSize: 0,
      background: "",
      xAxisDispStyle: "",
      colors: "",
      useCustomColors: false,
      useMultipleScales: false,
      showSeriesLabels: false,
      tension: 0,
      strokeWidth: 0,
      bullets: "",
      decimalDigits: 0,
      scrollbarSize: 0,
      legendPos: "",
      noanimations: false,
      autoreload: false,
      fillColor: "",
      minColor: "",
      maxColor: "",
      cmc: [cmcTest],
      categoryMap: [categoryMapTest]
    };

    let visualizationImportTest : VisualizationImport = {
      name: "",
      description: "",
      privacy: "",
      source: "",
      configuration: visualizationConfigTest
    };
    
    let bodyPOST = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
      visualization: visualizationImportTest
    }
    
    const result = await postWorkspaceVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.visualization);
    expect(result).toBeDefined();
    console.log("postWorkspaceVisualizationById >> ", result); // Me falta conocer algún id de visualización existente
  });
});

describe('DELETE - visualizations_calls', ()=>{
  test.skip('DELETE deleteWorkspaceVisualizationById!', async () => {

    let BODYDELETE = {
      idWorkspace: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
    }
  
    const result = await deleteWorkspaceVisualizationById(BODYDELETE.idWorkspace, BODYDELETE.idVisualization);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceVisualizationById >> ", result); // Me falta conocer algún id de visualización existente
  });
});

describe('POST - visualizations_calls', ()=>{
  test.skip('POST postCloneVisualizationById!', async () => {
    
    let bodyPOST = {
      idWorkspace:"00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      idVisualization:"00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
      name:{name:""}
    }
  
    const result = await postCloneVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postCloneVisualizationById >> ", result); // Me falta conocer algún id y nombre de visualización existente
  });
});

/* --------------------------- WORKSPACES CALLS ---------------------------*/

describe('GET - workspaces_calls', ()=>{
  test.skip('GET getWorkspaces!', async () => {
    const result = await getWorkspaces();
    expect(result).toBeDefined();
    console.log("getWorkspaces >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaces!', async () => {
    
    let bodyPOST = {
      name: "DeepInt workspace",
      description: "Esta es una prueba de test para workspace"
    }
    
    const result = await postWorkspaces(bodyPOST.name, bodyPOST.description);
    expect(result).toBeDefined();
    console.log("postWorkspaces >> ", result); // Sin permisos
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspacesImport!', async () => {
    
    let bodyPOST = {
      name: "Mi primer workspace import",
      description: "Esta es una prueba de test para workspace import",
      file: ""
    }
    
    const result = await postWorkspacesImport(bodyPOST.name, bodyPOST.description, bodyPOST.file);
    expect(result).toBeDefined();
    console.log("postWorkspacesImport >> ", result); // Sin permisos
  });
});

describe('GET - workspaces_calls', ()=>{
  test.skip('GET getWorkspaceById!', async () => {
    let id = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";

    const result = await getWorkspaceById(id);
    expect(result).toBeDefined();
    console.log("getWorkspaceById >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaceById!', async () => {
      
    let bodyPOST = {
      id: "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      name : "Lohmann",
      description : "Descripción del proyecto",
      disableIndividualAlerts: false,
      secret: ""
    }
    
    const result = await postWorkspaceById(bodyPOST.id, bodyPOST.name, bodyPOST.description, bodyPOST.disableIndividualAlerts, bodyPOST.secret);
    expect(result).toBeDefined();
    console.log("postWorkspaceById >> ", result);
  });
});

describe('DELETE - workspaces_calls', ()=>{
  test.skip('DELETE deleteWorkspaceById!', async () => {

    let id = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";

    const result = await deleteWorkspaceById(id);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceById >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postIframe!', async () => {

    let testQueryTree = {
      type: "",
      operation: "",
      left: 1,
      right: "",
      children: [],
      };

      let testFilters = {
      source: "",
      root: testQueryTree,
      };

      let testIframe = {
      type: "",
      id: "01376941324-64681-6546464-25541",
      filters: [testFilters],
      };

      let bodyPOST = {
      id : "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      iframe : testIframe
    }
    
    const result = await postIframe(bodyPOST.id, bodyPOST.iframe);
    expect(result).toBeDefined();
    console.log("postIframe >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspace!', async () => {
    
    let idWorkspace = "00000181f6998342-1f83dffe-8d32362e-252c9ebd";
    
    const result = await postWorkspace(idWorkspace);
    expect(result).toBeDefined();
    console.log("postWorkspace >> ", result);
  });
});

describe('POST - workspaces_calls', ()=>{
  test.skip('POST postWorkspaceClone!', async () => { 
    let bodyPOST = {
      idWorkspace : "00000181f6998342-1f83dffe-8d32362e-252c9ebd",
      name : "DeepInt 2",
    }
    
    const result = await postWorkspaceClone(bodyPOST.idWorkspace, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postWorkspaceClone >> ", result);
  });
});







