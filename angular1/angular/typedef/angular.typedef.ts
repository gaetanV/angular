interface AngularScopeTypedef {
    $digest: () => void;
}

interface AngularListTypedef {
    $index: number;
    $depth: number;
    $parent: any;
}

interface AngularModuleTypedef {
    component: (Name: string, ParamFunc?: any) => void;
    factory: (Name: string, ParamFunc?: any) => void;
    service: (Name: string, ParamFunc?: any) => void;
    requires: Array<string>;
}

interface AngularTypedef {
    copy: (Object: any) => any;
    module: (Name: string, Param?: Array<string>) => AngularModuleTypedef;
}

declare var angular: AngularTypedef;
