import { Component } from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import SweatAl from "sweetalert2";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  username="";
  constructor(private authService:AuthService) {
    this.username=authService.username;
  }
  handleLogout(){
    SweatAl.fire({
      title: "Are you sure? that you want to logout",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
