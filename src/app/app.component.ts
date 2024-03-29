import { Component } from '@angular/core';
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authService:AuthService
  constructor() {
    this.authService=new AuthService();
    this.authService.validateJwt()
  }
  title = 'Frontend-Angular';
  protected readonly top = top;
}
