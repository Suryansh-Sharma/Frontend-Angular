import { Component } from '@angular/core';
import {ToastService} from "angular-toastify";
import {LibraryService} from "../service/api/Library/library.service";
import {ActivatedRoute} from "@angular/router";
import SweatAl from 'sweetalert2';
import {Item, LibraryItemsPage} from "../service/api/model/LibraryItemsPage";
import {Title} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-borrow-and-return',
  templateUrl: './issue-and-return.component.html',
  styleUrls: ['./issue-and-return.component.css']
})
export class IssueAndReturnComponent {
  constructor(private toastService:ToastService
              ,private libraryApi:LibraryService
              ,private activeRoute:ActivatedRoute,
              private titleService:Title,
              private datePipe:DatePipe) {
    this.onInit()
  }
  isReturnComponent=false;
  returnItemOnCustomDate=false;
  currentPage=1;
  pendingItems!:LibraryItemsPage;
  isLoading=true;
  issueItemData={
    itemUniqueId: '',
    quantity: 1,
    expectedReturnDate: "",
    issuerUniqueId: ''
  }
  onInit(){
    // let id = this.activeRoute.snapshot.paramMap.get('id');
    let target=this.activeRoute.snapshot.url[0].path;
    if (target==='return-item'){
      this.titleService.setTitle('Return Item');
      this.isReturnComponent=true;
    }else{
      this.titleService.setTitle('Issue Item');
      const currentDate = new Date();
      // Date after 15 day from today.
      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate()+15);
      let date = this.datePipe.transform(futureDate, 'yyyy-MM-dd');
      if (date!==null){
        this.issueItemData.expectedReturnDate =date;
      }
    }
  }

  removeBorrowedItem(removedItem:Item):void{
    if (this.pendingItems.items === undefined ||this.pendingItems.total_records===undefined ||this.pendingItems.items.length <=0){
      return;
    }
    this.pendingItems.items = this.pendingItems.items
      .filter(item=> item.borrow_id != removedItem.borrow_id);
    this.pendingItems.total_records = this.pendingItems.total_records-1
  }
  validateAndSubmit(){
    if (this.issueItemData.itemUniqueId===''){
      this.handleDisplayToast('error',"Item unique id is empty !!");
    } else if (this.issueItemData.issuerUniqueId==='') {
      this.handleDisplayToast('error', "Issuer unique id is empty !!");
    } else if (!this.isReturnComponent && this.issueItemData.expectedReturnDate===''){
      this.handleDisplayToast('error',"Expected return date is empty !!");
    }else {
      this.callApi();
    }
  }
  callApi(){
    if (this.isReturnComponent){
      this.libraryApi.specificItemsOfIssuer(this.issueItemData.issuerUniqueId
        ,this.issueItemData.itemUniqueId,this.currentPage-1,6)
        .subscribe({
          next:(res)=>{
            // console.log(res);
            this.pendingItems=res;
            if (this.pendingItems.total_records!==undefined && this.pendingItems.total_records>0){
              this.isLoading=false;
            }
          },
          error:(err)=>{
            console.log(err);
            // let errMsg = JSON.parse(err.error);
            SweatAl.fire('Error',err.error.error.message,'error').then();
          }
        })
    }else {
      this.libraryApi.borrowNewItem(this.issueItemData)
      .subscribe({
        next:(res)=>{
            this.handleDisplayToast('success',res);
            SweatAl.fire('Success!', 'Item issued successfully', 'success').then();
        },
        error:(err)=>{
          console.log(err);
          let errMsg = JSON.parse(err.error);
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        },
      });
    }
  }

  handleDataChange(event:any){
    let propertyName = event.target.name;
    if(propertyName in this.issueItemData){
      (this.issueItemData as any)[propertyName]=event.target.value;
    }else {
      this.handleDisplayToast('error',propertyName+ ' is not present !!');
    }
  }
  handleCheckBoxChange(){
    this.returnItemOnCustomDate = !this.returnItemOnCustomDate;
  }
  handleDisplayToast(type:string,message:string){
    if(type==='success'){
      this.toastService.success(message);
    }else {
      this.toastService.error(message);
    }
  }

  previousPage(){
    this.currentPage=this.currentPage-1;
    this.callApi();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.callApi();
  }

  createRange(number: number | undefined){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
