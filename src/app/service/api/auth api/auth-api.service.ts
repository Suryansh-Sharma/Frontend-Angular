import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginSignUpModel} from "../model/LoginSignUpModel";
import {LoginResModel} from "../model/LoginResModel";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http:HttpClient) { }
  baseUrl = `http://localhost:8080/api/v1/auth/`

  createAccount(model:LoginSignUpModel){
    return this.http.post<LoginResModel>(this.baseUrl+`signUp`,model)
  }
  loginAccount(model:LoginSignUpModel){
    return this.http.post<LoginResModel>(this.baseUrl+`login`,model)
  }
  getNewJwtFromRefreshToken(token:string){
    return this.http.get<LoginResModel>(this.baseUrl+`new-jwt-by-refresh-token?refresh_token=${token}`)
  }
}
