interface angularScopeTypedef {
    $digest: () => void;
}

interface angularListTypedef {
    $index: number;
    $depth: number;
    $parent: any;
}

interface angularModuleTypedef {
    component: (Name: string, ParamFunc?: any) => void;
    factory: (Name: string, ParamFunc?: any) => void;
    service: (Name: string, ParamFunc?: any) => void;
}

interface angularTypedef {
    copy: (Object: any) => any;
    module: (Name: string, Param?: Array<string>) => angularModuleTypedef;
}

declare var angular: angularTypedef;
