import { TooltipPlacement } from "antd/es/tooltip";

export interface Iprops {
    steps:StepContent[];
    whiteSpaceRadius?:number;
    whitePadding?:number;
    isClosed?:boolean;
    onFnished?:()=>void;
}

interface StepContent {
    nodePath:  React.MutableRefObject<any>;
    desc:string;
    placement: TooltipPlacement;
}