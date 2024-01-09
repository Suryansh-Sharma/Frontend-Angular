import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {inject} from "@angular/core";

export const AuthGuard=()=> {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()){
      return true;
    }else{
      router.navigate(['security/login']).then()
      return false;
    }
}
