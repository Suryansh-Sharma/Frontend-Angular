import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LibraryService} from "../service/api/Library/library.service";
import SweatAl from 'sweetalert2';
import {Title} from "@angular/platform-browser";
import {LibraryItemsPage} from "../service/api/model/LibraryItemsPage";

@Component({
  selector: 'app-item-full-detail',
  templateUrl: './item-full-detail.component.html',
  styleUrls: ['./item-full-detail.component.css']
})
export class ItemFullDetailComponent {
  item_uuid="";
  showBorrows=false;
  itemsBorrows!:LibraryItemsPage ;
  currentPage:number=1;
  itemData={
    "id": 5,
    "title": "",
    "publisher": "",
    "itemType": "",
    "subject": "",
    "description": "",
    "itemLocation": "",
    "itemLanguage": "",
    "uniqueId": "",
    "stock": {
      "id": 2,
      "quantity": 10,
      "availableQuantity": 9,
      "lastStocked": "",
      "lastCheckedOut": "",
      "lastCheckedIn": null
    },
    "book": {
      "id": 2,
      "author": "MICHAEL JOHNSON",
      "publicationYear": null,
      "bookType": null,
      "bookClass": null
    },
    "magazine": {
      "editor":'',
      "publishedDate":''
    }
  }
  constructor(activeRoute:ActivatedRoute,
              private libraryApi:LibraryService,
              private titleService:Title,
              private router:Router) {
    this.item_uuid= activeRoute.snapshot.params['item_uuid'];
    this.getItemFullDetailsApi();
  }
  getItemFullDetailsApi(){
    this.libraryApi.getItemFullInfo(this.item_uuid)
      .subscribe({
        next:(res)=>{
          this.itemData=res;
          console.log(this.itemData);
          this.titleService.setTitle(res.title);
        },
        error:(err)=>{
          console.log(err)
          SweatAl.fire('Error',err.error.error.message,'error')
            .then(()=>{
              this.router.navigate(['/']).then();
            });
        }
      });
  }
  showAllBorrowsOfItem(){
    if (!this.showBorrows){
      this.showBorrows=true;
      this.handleCallApi();
    }else{
      this.showBorrows=false;
    }
  }
  handleCallApi(){
    this.libraryApi.getAllBorrowsOfItem(this.item_uuid,this.currentPage-1,6)
      .subscribe({
        next:(res)=>{
          this.itemsBorrows=res
          console.log(this.itemsBorrows)
        },
        error:err => {
          console.log(err);
        }
      });
  }
  previousPage(){
    this.currentPage=this.currentPage-1;
    this.handleCallApi();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.handleCallApi();
  }

  createRange(number: number | undefined){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
