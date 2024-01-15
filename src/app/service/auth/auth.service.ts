import {inject, Injectable} from '@angular/core';
import {AuthApiService} from "../api/auth api/auth-api.service";
import SweatAl from "sweetalert2";
import {LoginResModel} from "../api/model/LoginResModel";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogin=false;
  username="";
  private authApi=inject(AuthApiService);
  constructor() {
    const val = localStorage.getItem('isLogin');
    let username = localStorage.getItem('username')
    if (username!==null){
      this.username=username;
    }
    this.isUserLogin = val === 'true';
  }
  login(data:any){
    this.authApi.loginAccount(data)
      .subscribe({
        next:(res)=>{
          this.storeUserInfoInLocalStorage(res);
          location.reload();
        },
        error:err => {
          console.log(err);
          SweatAl.fire('Error',err.error.error.message,'error').then();
        }
      });

  }

  signUp(data:any){
    this.authApi.createAccount(data)
      .subscribe({
        next:(res)=>{
          this.storeUserInfoInLocalStorage(res);
        },
        error:err => {
          console.log(err);
          SweatAl.fire('Error',err.error.error.message,'error').then();
        }
      });

  }
  getJwtFromLocalStorage():string{
    let res = "";
    const token = localStorage.getItem('jwt');
    if (token!==null){
      res = token;
    }else{
      this.logout();
    }
    return res;
  }
  validateJwt(){
    if (!this.isLoggedIn())return;
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(this.getJwtFromLocalStorage())){
      // Try to get New Jwt From Refresh Token.
      let token = localStorage.getItem('refreshToken');
      if (token==null){
        return;
      }
      this.authApi.getNewJwtFromRefreshToken(token)
        .subscribe({
          next:res=>{
            this.storeUserInfoInLocalStorage(res);
          },
          error:err => {
            console.log(err);
            SweatAl.fire('Error',"Sorry your session is expired please re login !!",'error').then(()=>{
              this.logout();
            });
          }
        });

    }
  }
  logout(){
    localStorage.removeItem('isLogin');
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    this.isUserLogin=true;
    location.reload();
    return;
  }
  isLoggedIn(){
    return this.isUserLogin;
  }
  storeUserInfoInLocalStorage(res:LoginResModel){
    localStorage.setItem('isLogin','true');
    localStorage.setItem('username',res.username);
    localStorage.setItem('jwt',res.jwtResponse.token);
    localStorage.setItem('refreshToken',res.jwtResponse.refreshToken);
    this.isUserLogin=true;
  }
}
