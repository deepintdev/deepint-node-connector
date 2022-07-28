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
  VisualizationImport,
  VisualizationConfig,
} from "../types"

/* ------------------------------ VARIABLES ------------------------------ */
let idWorkspaceTest: string = "00000181d3c6b79d-ebbd4d36-3f01b009-dddd65d2";
let visualizationConfigTestEmpty: VisualizationConfig = {
  type: '',
  instances: 0,
  instOrder: 0,
  instDir: '',
  filter: {
    type: "single",
    operation: "eq",
    left: 99999,
    right: "",
    children: []
  },
  xAxisType: '',
  yAxisType: '',
  zAxisType: '',
  xAxisFeature: 0,
  yAxisFeature: 0,
  zAxisFeature: 0,
  seriesMaker: 0,
  minValue: 0,
  maxValue: 0,
  units: '',
  unitsX: '',
  unitsY: '',
  unitsZ: '',
  unitsS: '',
  labelX: '',
  labelY: '',
  labelZ: '',
  labelS: '',
  numericIntervals: 0,
  ranges: '',
  useRanges: false,
  tablePrimaryDisplay: [],
  tableMakeGroups: [],
  tableExtraCols: [],
  durationValue: 0,
  durationUnits: '',
  customSeries: [],
  mapcenter: '',
  lat: 0,
  lng: 0,
  zoom: 0,
  maxZoom: 0,
  blur: 0,
  radious: 0,
  wordCloudMode: '',
  ignoreSeries: false,
  social: '',
  groupingMethod: '',
  customOrder: '',
  customOrderHeat: '',
  custom_url: '',
  custom_params: [],
  custom_params_mode: '',
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
  clusterMode: '',
  showArrows: false,
  axisTitles: false,
  hasPadding: false,
  axisLabels: false,
  trendLines: false,
  inversedAxis: false,
  customMarker: '',
  useMagnitude: false,
  avgCoords: false,
  fontSize: 0,
  titleFontSize: 0,
  background: '',
  xAxisDispStyle: '',
  colors: '',
  useCustomColors: false,
  useMultipleScales: false,
  showSeriesLabels: false,
  tension: 0,
  strokeWidth: 0,
  bullets: '',
  decimalDigits: 0,
  scrollbarSize: 0,
  legendPos: '',
  noanimations: false,
  autoreload: false,
  fillColor: '',
  minColor: '',
  maxColor: '',
  cmc: [],
  categoryMap: []
};
let idDashboardTest: string = "000001823fbf59fb-56e58111-95411216-582b2786" // Introducir uno existente en la fuente de Dashboard
let idVisualizationsTest: string = "";
let listIdVisualizationTest: Array<string> = [];

/* --------------------------- VISUALIZATIONS CALLS ---------------------------*/
describe('POST - visualizations_calls', ()=>{
  test('POST postWorkspaceVisualizations!', async () => {
    let numRandom: number = generateRandomNumber(1000, 9000);

    let visualizationImportTest : VisualizationImport = {
      name: "Representación de prueba test " + numRandom,
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
    //console.log("postWorkspaceVisualizations >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if("visualization_id" in result){
      idVisualizationsTest = result.visualization_id;
      listIdVisualizationTest.push(idVisualizationsTest);
      //console.log("Añadir id: ", idVisualizationsTest, " -- List: ", listIdVisualizationTest);
    }
  });
});

describe('GET - visualizations_calls', ()=>{
  test('GET getWorkspaceVisualizationById!', async () => {

    let BODYGET = {
      idWorkspace: idWorkspaceTest,
      idVisualization: idVisualizationsTest
    }

    const result = await getWorkspaceVisualizationById(BODYGET.idWorkspace, BODYGET.idVisualization);
    expect(result).toBeDefined();
    //console.log("getWorkspaceVisualizationById >> ", result);
  });
});

describe('POST - visualizations_calls', ()=>{
  test('POST postWorkspaceVisualizationById!', async () => {

    let numRandom: number = generateRandomNumber(1000, 9000);

    let visualizationImportTest : VisualizationImport = {
      name: "Representación de prueba test " + numRandom + " [MODIFICADO]",
      description: "Descripción de gráfica",
      privacy: "",
      source: idDashboardTest,
      configuration: visualizationConfigTestEmpty
    };
    
    let bodyPOST = {
      idWorkspace: idWorkspaceTest,
      idVisualization: idVisualizationsTest,
      visualization: visualizationImportTest
    }
    
    const result = await postWorkspaceVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.visualization);
    expect(result).toBeDefined();
    //console.log("postWorkspaceVisualizationById >> ", result);
    expect(result).toHaveProperty('result', 'success');
  });
});

describe('POST - visualizations_calls', ()=>{
  test('POST postCloneVisualizationById!', async () => {
    
    let bodyPOST = {
      idWorkspace:idWorkspaceTest,
      idVisualization: idVisualizationsTest,
      name:{name:"TEST CLONE VISUALIZATION"}
    }
  
    const result = await postCloneVisualizationById(bodyPOST.idWorkspace, bodyPOST.idVisualization, bodyPOST.name);
    expect(result).toBeDefined();
    //console.log("postCloneVisualizationById >> ", result);
    expect(result).toHaveProperty('result', 'success');

    if("visualization_id" in result){
      let idVisualizationsCloneTest = result.visualization_id;
      listIdVisualizationTest.push(idVisualizationsCloneTest);
      //console.log("Añadir id: ", idVisualizationsCloneTest, " -- List: ", listIdVisualizationTest);
    }

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
    //console.log("getWorkspaceVisualizations >> ", result);
  });
});

describe('DELETE - visualizations_calls', ()=>{
  test('DELETE deleteWorkspaceVisualizationById!', async () => {

    //console.log("listIdVisualizationTest: ", listIdVisualizationTest);

    for (const item of listIdVisualizationTest) {
      let BODYDELETE = {
        idWorkspace: idWorkspaceTest,
        idVisualization: item,
      }
    
      const result = await deleteWorkspaceVisualizationById(BODYDELETE.idWorkspace, BODYDELETE.idVisualization);
      expect(result).toBeDefined();
      //console.log("deleteWorkspaceVisualizationById >> ", result);
      expect(result).toHaveProperty('result', 'success');
    }

  });
});


/* ------------------------------- METHODS ------------------------------- */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

