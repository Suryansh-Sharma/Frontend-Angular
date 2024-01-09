import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  @ViewChild('input1')usrName:any;
  @ViewChild('input2')pass:any;

  loginData={
    username:'',
    password:''
  };
  isSignUp=false;
  constructor(private authService:AuthService,
              private router:Router,
              private toastService:ToastService,
              activeRoute:ActivatedRoute,
              titleService:Title) {
    if (authService.isLoggedIn()){
      this.router.navigate(['']).then();
    }
    let target = activeRoute.snapshot.params['target'];
    if (target==="signUp"){
      this.isSignUp=true;
      titleService.setTitle('Create New Account');
    }else if (target==="login"){
      this.isSignUp=false;
      titleService.setTitle('Login Your Account');
    }else{
      this.router.navigate(['']).then();
    }
  }
  handleDataChange(event:any){
    let propertyName = event.target.name;
    if (propertyName in this.loginData){
      (this.loginData as  any)[propertyName] = event.target.value;
    }else {
      alert(propertyName + " is not present ");
    }
  }
  handleSubmitData(){
    if (this.loginData.username===''){
      this.handleDisplayToast("User name can't be blank !!");
      return;
    }
    else if (this.loginData.password===''){
      this.handleDisplayToast("Password can't be blank !!");
      return;
    }else if (!this.isSignUp){
      let username = this.loginData.username.replaceAll(' ','');
      let password = this.loginData.password.replaceAll(' ','');
      this.authService.login({username,password});
    }else if (this.isSignUp){
      let username = this.loginData.username.replaceAll(' ','');
      let password = this.loginData.password.replaceAll(' ','');
      this.authService.signUp({username,password});
    }
  }
  handleDisplayToast(message:string){
    this.toastService.error(message);
  }

  changeFocus(){
    this.pass.nativeElement.focus();
  }

}
