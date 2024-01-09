import {Item} from "./LibraryItemsPage";

export interface IssuerInfo{
  id: 0,
  first_name:"",
  last_name: "",
  roll_no: 0,
  issuer_type: "",
  contact_no: "",
  email: "",
  issuer_class: "",
  unique_id: "",
  issuer_branch:""
}
export interface IssuerInfoModel{
  firstname:string,
  lastname:string,
  rollNo:number,
  issuerType:string,
  contactNo:string,
  email:string,
  issuerClass:string,
  issuerBranch:string,
}
export interface IssuerFullInfoModel{
  first_name:string,
  last_name:string,
  roll_no:number,
  issuer_type:string,
  contact_no:string,
  email:string,
  issuer_class:string,
  issuer_branch:string,
  unique_id:string,
  allFine:Array<Fine>
}
export interface Fine{
  id: number,
  payDateTime: string,
  totalItems: number,
  fileName: string,
  downloadUrl: string,
  amount: number,
  items: Array<Item>
}

export interface IssuersPage{
  page_no?:number,
  total_pages?:number,
  items?:Array<IssuerInfo>,
  total_records?:number,
  page_size?:number
}
