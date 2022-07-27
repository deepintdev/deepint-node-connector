/* 
Cargar TODOS los test: npm run test
Cargar sólo este fichero en específico: npm test -- visualizations.test.ts
*/

import {
  getWorkspaceVisualizations,
  postWorkspaceVisualizations,
  getWorkspaceVisualizationById,
  postWorkspaceVisualizationById,
  deleteWorkspaceVisualizationById,
  postCloneVisualizationById
} from '../visualizations_calls'

import {
  QueryTree,
  VisualizationImport,
  VisualizationConfig,
  tableVisualization, 
  tableVisualizationGroup, 
  customSeries,
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let visualizationConfigTestEmpty: VisualizationConfig = {};
let idDashboardTest: string = "000001823fbf59fb-56e58111-95411216-582b2786"
let idVisualizationsTest: string = "";
let listIdVisualizationTest: Array<string> = [];

/* --------------------------- VISUALIZATIONS CALLS ---------------------------*/
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
      name: "Representación de prueba para el test",
      description: "Descripción de gráfica",
      privacy: "",
      source: idDashboardTest,
      configuration: visualizationConfigTestEmpty
    };

    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      source: visualizationImportTest
    }
    
    const result = await postWorkspaceVisualizations(bodyPOST.idWorkspace, bodyPOST.source);
    expect(result).toBeDefined();
    console.log("postWorkspaceVisualizations >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if("source_id" in result){
      idVisualizationsTest = result.source_id;
      listIdVisualizationTest.push(idVisualizationsTest);
      //console.log("Añadir id: ", idVisualizationsTest, " -- List: ", listIdVisualizationTest);
    }
  });
});

describe('GET - visualizations_calls', ()=>{
  test.skip('GET getWorkspaceVisualizationById!', async () => {

    let BODYGET = {
      idWorkspace: idWorkspaceTest,
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f"
    }

    const result = await getWorkspaceVisualizationById(BODYGET.idWorkspace, BODYGET.idVisualization);
    expect(result).toBeDefined();
    console.log("getWorkspaceVisualizationById >> ", result);
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
      idWorkspace: idWorkspaceTest,
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
      visualization: visualizationImportTest
    }
    
    const result = await postWorkspaceVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.visualization);
    expect(result).toBeDefined();
    console.log("postWorkspaceVisualizationById >> ", result);
  });
});

describe('DELETE - visualizations_calls', ()=>{
  test.skip('DELETE deleteWorkspaceVisualizationById!', async () => {

    let BODYDELETE = {
      idWorkspace: idWorkspaceTest,
      idVisualization: "00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
    }
  
    const result = await deleteWorkspaceVisualizationById(BODYDELETE.idWorkspace, BODYDELETE.idVisualization);
    expect(result).toBeDefined();
    console.log("deleteWorkspaceVisualizationById >> ", result);
  });
});

describe('POST - visualizations_calls', ()=>{
  test.skip('POST postCloneVisualizationById!', async () => {
    
    let bodyPOST = {
      idWorkspace:idWorkspaceTest,
      idVisualization:"00000181f75b2c15-fc4c8aa6-f2c5304d-8ec92c3f",
      name:{name:""}
    }
  
    const result = await postCloneVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.name);
    expect(result).toBeDefined();
    console.log("postCloneVisualizationById >> ", result);
  });
});

describe('GET - visualizations_calls', ()=>{
  test('GET getWorkspaceVisualizations!', async () => {

    let BODYGET = {
      idWorkspace: idWorkspaceTest,
      page: 0,
      limit: 500
    }

    const result = await getWorkspaceVisualizations(BODYGET.idWorkspace, BODYGET.page, BODYGET.limit);
    expect(result).toBeDefined();
    console.log("getWorkspaceVisualizations >> ", result);
    expect(result).toHaveProperty('items:');
  });
});