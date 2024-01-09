import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginSignUpModel} from "../model/LoginSignUpModel";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http:HttpClient) { }
  baseUrl = `http://localhost:8080/api/v1/auth/`

  createAccount(model:LoginSignUpModel){
    return this.http.post(this.baseUrl+`signUp`,model,{responseType:'text'})
  }
  loginAccount(model:LoginSignUpModel){
    return this.http.post(this.baseUrl+`login`,model,{responseType:'text'})
  }
}
