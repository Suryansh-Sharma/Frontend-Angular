import {Component, Input} from '@angular/core';
import {Item, LibraryItemsPage} from "../service/api/model/LibraryItemsPage";
import {LibraryService} from "../service/api/Library/library.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pendingItems!:LibraryItemsPage ;
  currentPage:number=1;
  isLoading=true;
  constructor(private libraryApi:LibraryService,
              private router:Router,
              private titleService:Title) {
    this.handleCallApi();
  }
  removeBorrowedItem(removedItem:Item):void{
    if (this.pendingItems.items === undefined ||this.pendingItems.total_records===undefined ||this.pendingItems.items.length <=0){
      return;
    }
    this.pendingItems.items = this.pendingItems.items
      .filter(item=> item.borrow_id != removedItem.borrow_id);
    this.pendingItems.total_records = this.pendingItems.total_records-1
  }
  handleCallApi(){
    this.titleService.setTitle('Home Page');
    this.libraryApi.getAllPendingItems(this.currentPage-1,6)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.pendingItems=data;
          this.isLoading=false;
        },
        error:(err)=>{
          console.log(err);
        }
      })
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
