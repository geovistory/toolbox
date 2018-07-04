import {  DfhClassInterface } from "../../core";



export interface Admin {
    classList?: ClassList;
    classDetail?: ClassDetail;
}

export interface ClassList {
    items: {};
    loading: boolean;
    error: any;
}

export interface ClassDetail {
    class?: DfhClassInterface
    loading: boolean;
    error: any;
}