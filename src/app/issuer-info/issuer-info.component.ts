import {Component} from '@angular/core';
import {IssuerService} from "../service/api/Issuers/issuer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IssuerFullInfoModel} from "../service/api/model/IssuerInfo";
import {LibraryService} from "../service/api/Library/library.service";
import {LibraryItemsPage} from "../service/api/model/LibraryItemsPage";
import {Title} from "@angular/platform-browser";
import SweatAl from 'sweetalert2';

@Component({
  selector: 'app-issuer-info',
  templateUrl: './issuer-info.component.html',
  styleUrls: ['./issuer-info.component.css']
})
export class IssuerInfoComponent {
  issuer_uid="";
  IssuerData!:IssuerFullInfoModel;
  isLoading=true;
  borrowedItems!:LibraryItemsPage ;
  currentPage:number=1;

  constructor(private issuerApi:IssuerService,
              activateRoute:ActivatedRoute,
              private libraryApi:LibraryService,
              private titleService:Title,
              private router:Router) {
    this.issuer_uid = activateRoute.snapshot.params['issuer_uid'];
    this.fetchIssuerInfo();
  }
  fetchIssuerInfo() {
    this.issuerApi.getIssuerFullInfo(this.issuer_uid).subscribe({
      next: (res) => {
        this.IssuerData = res;
        this.titleService.setTitle(res.first_name);
        this.getBorrowsOfIssuer();
      },
      error: (err) => {
        console.log(err);
        SweatAl.fire('Error', "Unable To Find Issuer Of Id "+this.issuer_uid, 'error').then(() => {
          console.log('After SweatAl.fire');
          this.router.navigate(['/']).then();
        });
      }
    });
  }


  getBorrowsOfIssuer(){
    this.libraryApi.getAllBorrowsOfIssuer(this.issuer_uid,this.currentPage-1,6)
      .subscribe({
        next:res=>{
          this.borrowedItems=res;
          this.isLoading=false;
        }
      });
  }
  previousPage(){
    this.currentPage=this.currentPage-1;
    this.getBorrowsOfIssuer();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.getBorrowsOfIssuer();
  }
  clickPageNo(pageNo:number){
    if (pageNo===this.currentPage){
      return;
    }
    this.currentPage= pageNo;
    this.getBorrowsOfIssuer();
  }

  createRange(number: number | undefined){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((_n, index) => index + 1);
  }

}
