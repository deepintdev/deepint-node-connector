//TYPES FOR WORKSPACE CALLS
export interface Filters {
    source: string;
    root: QueryTree;
}

//Source: https://github.com/deepintdev/deepint-external-source-mongo/blob/master/src/utils/deepint-sources.ts
export interface QueryTree {
    type: string;
    operation: string | null;
    left: number;
    right: string;
    children: QueryTree[] | Array<string>;
}

export type Iframe = {
    type: string;
    id: string;
    filters: Array<Filters>;
}

export type Workspace = {
    id: string;
    name: string;
    description: string;
    created: string;
    last_modified: string;
    last_access: string;
    sources_count: number;
    dashboards_count: number;
    visualizations_count: number;
    models_count: number;
    size_bytes: number;
}

export type WorkspaceById = Workspace & {
    disableIndividualAlerts: boolean;
    secret: string;
}

export type ResponseWorkspace = {
    result: string;
    workspace_id: string;
}

export type ResponseWorkspaceImport = ResponseWorkspace & { task_id: string }
export type ResponseWorkspaceExport = Omit<ResponseWorkspaceImport, "workspace_id">

export type ResponseError = {
    code: string; // es un enum de errors pero como me viene por la api tampoco me interesa hacerlo enum aqui ya que siempre me va a venir un string válido
    message: string;
}

export type ResponseErrorSource = ResponseError & { result: string }

export type ResultSuccess = { result: string; }

export type ResultSuccessIframe = ResultSuccess & {
    token: string;
    url: string;
}



// TYPES FOR TASKS CALLS 

export interface Item {
    id: string;
    user_id: string;
    user_name: string;
    created: string;
    status: string;
    duration: number;
    name: string;
    description: string;
}

export type Task = {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<Item>;
}

export type TaskById = Item & {
    subtask: string;
    progress: number;
    result: string;
    result_type: string;
    error_description: string;
}


// TYPES FOR SOURCES CALLS

type ItemSourceInterface = Item & {
    last_modified: string;
    last_access: string;
    type: string;
    features: number;
    instances: number;
    size_bytes: number;
}
export type ItemSource = Omit<ItemSourceInterface, ("user_id" | "user_name" | "status" | "duration")>

export interface Source extends Omit<Task, "items"> {
    items: Array<ItemSource>;
}

type FeatureType = 'numeric' | 'nominal' | 'text' | 'date' | 'logic' | 'unknown';

interface Feature {
    name: string;
    type: FeatureType;
    date_format: string;
    indexed: boolean;
}

interface FeatureExport extends Omit<Feature, "indexed"> {
    index: number;
}

export interface FeatureMapped extends Feature {
    mapped_to: number;
}


interface FeatureSourceResult {
    index: number;
    name: string;
    type: string;
    indexed: boolean;
    date_format: string;
    computed: boolean;
    null_count: number;
    min: number;
    max: number;
    mean: number;
    deviation: number;
}

export type FeatureSourceExternal = Omit<Feature, ("date_format" | "indexed")>

export type SourceToAdd = {
    name: string;
    description: string;
    features: Array<Feature>;
}

export type ResultSuccessSource = ResultSuccess & { source_id: string; }

export type ResultSuccessVisualization = ResultSuccess & { visualization_id: string; }

export interface SourceDerived extends Omit<SourceToAdd, "features"> {
    derived_type: string;
    origin: string;
    origin_b: string;
    query: QueryTree;
    features: string;
    field_a: number;
    field_b: number;
}


export interface SourceExternal extends Omit<SourceToAdd, "features"> {
    url: string;
    features: Array<FeatureSourceExternal>;
}


export type FieldType = 'numeric' | 'nominal' | 'text' | 'date' | 'logic'

export type Fields = {
    name: string;
    type: FieldType;
    dateFormat: string;
}

export type TypeSource = 'file/any' | 'url/any' | 's3' | 'ckan' | 'database/mongo' | 'database/mysql' | 'database/influx' | 'mqtt'
export type JsonMode = 'single' | 'default'
export type ParserType = 'csv' | 'json'
export type SortingDirection = 'asc' | 'desc'
export type DatabaseType = 'mysql' | 'pg' | 'oracle' | 'ms'


export interface SourceOther {
    name: string;
    description: string;
    type: TypeSource;
    encrypted: boolean;
    indexed: boolean;
    dyn_enabled: boolean;
    dyn_delay: number;
    dyn_replace: boolean;
    dyn_pk: string;
    dyn_update_mode: boolean;
    file: string;
    file_name: string;
    separator: string;
    quotes: string;
    csv_header: boolean;
    json_fields: Array<string>;
    json_prefix: string;
    json_mode: JsonMode;
    date_format: string;
    url: string;
    parser: ParserType;
    http_headers: string;
    rejectUnauthorized: boolean;
    sdp_enabled: boolean;
    sdp_name: string;
    sdp_dir: SortingDirection;
    database: string;
    user: string;
    password: string;
    table: string;
    query: string;
    sort: string;
    project: string;
    limit: number;
    db: DatabaseType;
    host: string;
    port: number;
    topics: string;
    fields_expected: Array<Fields>;
}

export interface SourceResult {
    id: string;
    created: string;
    last_modified: string;
    last_access: string;
    name: string;
    description: string;
    type: string;
    features: Array<FeatureSourceResult>;
    instances: number;
    size_bytes: number;
}

export interface ResultConnection { url: string; }

export interface ConfigurationSource extends Omit<SourceOther, ("name" | "type" | "encrypted" | "indexed" | "dyn_enabled" | "dyn_delay" | "dyn_replace" | "dyn_pk" | "dyn_update_mode" | "file" | "file_name" | "fields_expected")> {
    noheader: boolean;
}

export interface UpdateConfiguration {
    enabled: boolean;
    delay: number;
    replace: boolean;
    updateMode: boolean;
    pk: string;
    configuration: ConfigurationSource;
}

export interface AutoUpdateConfiguration { updateConfig: UpdateConfiguration; }

export type ConfigurationSourceResult = Omit<SourceOther, ("name" | "description" | "type" | "encrypted" | "indexed" | "file" | "file_name")>

export type TransformFeatures = {
    features: Array<FeatureMapped>;
}

export type Instances = {
    features: Array<FeatureExport>;
    instances: Array<Array<string>>;
}

export interface UpdateDataSource {
    replace: boolean;
    pk: string;
    date_format: string;
    data: Array<Array<string>>;
}

export interface SourceSet {
    name: string;
    description: string;
}


// TYPES FOR VISUALIZATIONS CALLS

type ItemVisualization = {
    id: string;
    created: string;
    last_modified: string;
    last_access: string;
    name: string;
    description: string;
    type: string;
}

export interface Visualization {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<ItemVisualization>;
}

interface tableVisualization {
    index: number;
    name: string;
    type: string;
}

type tableVisualizationGroup = tableVisualization & { g: string; }

type customSeries = {
    index: number;
    type: string;
    axisType: string;  // string, array, undefined ???
    label: string;
    units: string;
}

interface VisualizationConfig {
    type: string;
    instances: number;
    instOrder: number;
    instDir: string;
    filter: QueryTree;
    xAxisType: string;
    yAxisType: string;
    zAxisType: string;
    xAxisFeature: number;
    yAxisFeature: number;
    zAxisFeature: number;
    seriesMaker: number;
    minValue: number;
    maxValue: number;
    units: string;
    unitsX: string;
    unitsY: string;
    unitsZ: string;
    unitsS: string;
    labelX: string;
    labelY: string;
    labelZ: string;
    labelS: string;
    numericIntervals: number;
    ranges: string;
    useRanges: boolean;
    tablePrimaryDisplay: Array<tableVisualization>;
    tableMakeGroups: Array<tableVisualizationGroup>;
    tableExtraCols: Array<tableVisualizationGroup>;
    durationValue: number;
    durationUnits: string;
    customSeries: Array<customSeries>;
    mapcenter: string;
    lat: number;
    lng: number;
    zoom: number;
    maxZoom: number;
    blur: number;
    radious: number;
    wordCloudMode: string;
    ignoreSeries: boolean;
    social: string;
    groupingMethod: string;
    customOrder: string;
    customOrderHeat: string;
    custom_url: string;
    custom_params: Array<{ key: string, value: string }>;
    custom_params_mode: string;
    showTitle: boolean;
    showScrollbars: boolean;
    showLegend: boolean;
    showGrid: boolean;
    showRaw: boolean;
    fillSeries: boolean;
    stacked: boolean;
    layered: boolean;
    mapCluster: boolean;
    clusterField: number;
    clusterMode: string;
    showArrows: boolean;
    axisTitles: boolean;
    hasPadding: boolean;
    axisLabels: boolean;
    trendLines: boolean;
    inversedAxis: boolean;
    customMarker: string;
    useMagnitude: boolean;
    avgCoords: boolean;
    fontSize: number;
    titleFontSize: number;
    background: string;
    xAxisDispStyle: string;
    colors: string;
    useCustomColors: boolean;
    useMultipleScales: boolean;
    showSeriesLabels: boolean;
    tension: number;
    strokeWidth: number;
    bullets: string;
    decimalDigits: number;
    scrollbarSize: number;
    legendPos: string;
    noanimations: boolean;
    autoreload: boolean;
    fillColor: string;
    minColor: string;
    maxColor: string;
    cmc: Array<{ from: number; to: number; fillColor: string; }>;
    categoryMap: Array<{ index: number; name: string; map: Array<{ key: string, value: string }> }>;
}
export interface VisualizationImport {
    name: string;
    description: string;
    privacy: string;
    source: string;
    configuration: VisualizationConfig;
}

export type ResultSuccessSource = ResultSuccess & { visualization_id: string; }

export type VisualizationResult = ItemVisualization & {
    public: boolean;
    source: string;
    configuration: VisualizationConfig;
}


// TYPES FOR DASHBOARDS CALLS

type ItemDashboard = Omit<ItemVisualization, "type">

export interface Dashboard {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<ItemDashboard>;
}

export interface DashboardImport {
    name: string;
    description: string;
    privacy: string;
    shareOpt: string;
    gaId: string;
    restricted: boolean;
    configuration: object;
}

export type DashboarResult = DashboardImport & {
    id: string;
    created: string;
    last_modified: string;
    last_access: string;
}

export type ResultSuccessDashboard = ResultSuccess & { dashboard_id: string; }

export type deleteVisualization = 'yes' | 'no';


// TYPES FOR MODELS CALLS

type ItemModels = {
    id: string;
    created: string;
    last_modified: string;
    last_access: string;
    name: string;
    description: string;
    type: string;
    size_bytes: number;
}

export interface Models {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<ItemModels>;
}

export interface ModelsImport {
    name: string;
    description: string;
    type: string;
    method: string;
    source: string;
    target: number;
    configuration: object;
    training_configuration: {
        test_size: number;
        shuffle: boolean;
        random_state: number;
    };
    hyper_search_configuration: object;
}

export interface ModelsResult {
    id: string;
    name: string;
    description: string;
    type: string;
    method: string;
    created: string;
    last_modified: string;
    last_access: string;
    source_train: string;
    configuration: object;
    inputs: Array<{
        name: string;
        type: string;
    }>;
    output:{
        name: string;
        type: string;
    };
    size_bytes: number;
}

export type ModelSet = {
    name: string;
    description: string;
}

export interface ModelEvaluation {
    evaluation: object;
    "op-diagram": {
        observed:Array<number>;
        predicted: Array<number>;
    };
    confusion: Array<Array<number>>;
    classes: Array<string>;
}

export interface ModelData {
    data: Array<{
        inputs: Array<number>;
    }>;
}

export interface ModelPredict {
    inputs: Array<number>;
    vary: number;
    values: Array<number>;
}


// TYPES FOR ALERTS CALLS

type ItemAlerts = {
    id: string;
    created: string;
    last_modified: string;
    name: string;
    description: string;
}

export interface Alerts {
    page: number;
    limit: number;
    pages_count: number;
    items_count: number;
    items: Array<ItemAlerts>;
}

export interface AlertsImport {
    name: string;
    description: string;
    color: string;
    type: string;
    source: string;
    condition:QueryTree;
    time_stall: number;
}

export type ResultSuccessAlert= ResultSuccess & { alert_id: string; }

export interface AlertResult {
    id: string;
    name: string;
    description: string;
    created: string;
    last_modified: string;
    source: string;
    color: string;
    type: string;
    condition: QueryTree;
    time_stall: number;
}

type ItemsInstances = {
    id: string;
    alert_type: string;
    timestamp: string;
    data:{
        type: string;
        title: string;
        color: string;
        source:{
            id: string;
            name: string;
        };
        fields: Array<{
            name: string;
            type: string;
            dateFormat: string;
        }>;
        triggers:number;
        instances: Array<Array<string>>;
        since:number;
        span:number;
    }
}

export interface AlertsInstances extends Omit<Alerts, "items"> {
    items: Array<ItemsInstances>;
}


// TYPES FOR EMAILS CALLS

export interface Emails {
    id:string;
    email: string;
    validated: boolean;
}

export type ResultSuccessEmail= ResultSuccess & { id: string; }

// TYPES FOR ACCOUNT CALLS

export interface Account {
    user_id: string;
    user_name: string;
    user_email: string;
    token_expiration: string;
    permissions:{
        read_workspaces: boolean;
        write_workspaces: boolean;
        profile: boolean;
    };
    organizations: Array<{
        id: string;
        name: string;
        role: string;
    }>;
}

export interface AccountProfile {
    user_name: string;
    full_name: string;
    bio: string;
    url: string;
    country: string;
    picture: string;
}

export type AccProfileImport = Omit<AccountProfile, ("user_name" | "picture")>

// TYPES FOR AUTHENTICATION CALLS

export interface BearerToken {
    client_id: string;
    client_secret: string;
    bearer: string;
    expiration: string;
}

export type ResultSuccessToken = ResultSuccess & {auth_token: string} 

export interface RevokeToken extends Omit<BearerToken, ("bearer" | "expiration")>{
    auth_token: string;
}
