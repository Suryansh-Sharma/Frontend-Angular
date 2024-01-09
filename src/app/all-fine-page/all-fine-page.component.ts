import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AllFinePage} from "../service/api/model/AllFinePage";
import {LibraryService} from "../service/api/Library/library.service";

@Component({
  selector: 'app-all-fine-page',
  templateUrl: './all-fine-page.component.html',
  styleUrls: ['./all-fine-page.component.css']
})
export class AllFinePageComponent {
  allFinePage!:AllFinePage;
  currentPage=1;
  isLoading=true;
  constructor(title:Title,
              private libraryApi:LibraryService) {
    title.setTitle("All Fines");
    this.fetchData();
  }

  fetchData(){
    this.libraryApi.getAllPaidFines(this.currentPage-1,6)
      .subscribe({
        next:res=>{
          this.allFinePage=res;
          this.isLoading=false;
        },
        error:err => {
          console.log(err);
        }
      });
  }

  previousPage(){
    this.currentPage=this.currentPage-1;
    this.fetchData();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.fetchData();
  }
  createRange(number: number | undefined){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
