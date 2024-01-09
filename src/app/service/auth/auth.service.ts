import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "../api/auth api/auth-api.service";
import SweatAl from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogin=false;
  username="";
  private router = inject(Router);
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
        next:()=>{
          console.log("Login Successful")
          localStorage.setItem('isLogin','true');
          localStorage.setItem('username',data.username);
          this.isUserLogin=true;
          location.reload();
        },
        error:err => {
          console.log(err);
          let errMsg = JSON.parse(err.error);
          console.log(errMsg)
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        }
      });

  }

  signUp(data:any){
    this.authApi.createAccount(data)
      .subscribe({
        next:()=>{
          console.log("Login Successful")
          localStorage.setItem('isLogin','true');
          localStorage.setItem('username',data.username);
          this.isUserLogin=true;
          location.reload();
        },
        error:err => {
          console.log(err);
          let errMsg = JSON.parse(err.error);
          console.log(errMsg)
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        }
      });

  }

  logout(){
    localStorage.removeItem('isLogin');
    localStorage.removeItem('username');
    this.isUserLogin=true;
    location.reload();
  }
  isLoggedIn(){
    return this.isUserLogin;
  }
}
