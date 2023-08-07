
export interface Filters {
    msg:string;
    error:string;
    docname:string;
    doctype:string;
    filtersData:any;
    loading: "idle" | "pending" | "succeeded" | "failed";
}