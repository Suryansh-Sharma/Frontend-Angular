import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IssuerFullInfoModel, IssuerInfo, IssuerInfoModel, IssuersPage} from "../model/IssuerInfo";
import {IssuerTotalFine} from "../model/IssuerTotalFine";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IssuerService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  baseUrl = `http://localhost:8080/api/v1/issuer/`

  httpHeader(){
    return  new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getJwtFromLocalStorage()}`
    });
  }
  getIssuerByUniqueId(unique_id: string | undefined){
    return this.http.get<IssuerInfo>(this.baseUrl+unique_id)
  }
  addNewIssuer(issuerModel:IssuerInfoModel){
    return this.http.post(this.baseUrl+`register-new`,issuerModel,{responseType:'text'})
  }
  updateIssuerInfo(issuerModel:IssuerInfoModel,unique_id:string){
    this.authService.validateJwt();
    return this.http.put(this.baseUrl+`update-profile/${unique_id}`,issuerModel,{responseType:'text',headers:this.httpHeader()});
  }
  generateTotalForIssuer(issuer_uid:string){
    return this.http.get<IssuerTotalFine>(this.baseUrl+`generate-total-fine/${issuer_uid}`);
  }
  searchIssuer(value:string,target:string,page_size:number,page_no:number){
    return this.http.get<IssuersPage>(this.baseUrl+`search?value=${value}&target=${target}&page_size=${page_size}&page_no=${page_no}`);
  }
  returnFinedItem(issuer_unique_id:string,file:FormData){
    this.authService.validateJwt();
    return this.http.post(this.baseUrl+`pay-fine-upload-pdf/${issuer_unique_id}`,file,{responseType:'text',headers:this.httpHeader()})
  }
  getIssuerFullInfo(unique_id:string){
    return this.http.get<IssuerFullInfoModel>(this.baseUrl+`full-detail-by/unique-id/${unique_id}`)
  }
}
