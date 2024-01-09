import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IssuerInfo} from "../service/api/model/IssuerInfo";
import {Item} from "../service/api/model/LibraryItemsPage";
import {IssuerService} from "../service/api/Issuers/issuer.service";
import {LibraryService} from "../service/api/Library/library.service";
import SweatAl from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-borrowed-item',
  templateUrl: './borrowed-item.component.html',
  styleUrls: ['./borrowed-item.component.css']
})
export class BorrowedItemComponent {
  @Input() item: Item = {};
  @Output() removeItem: EventEmitter<any> = new EventEmitter<any>();
  userProfile: IssuerInfo =  {
    contact_no: "",
    email: "",
    first_name: "",
    id: 0,
    issuer_branch: "",
    issuer_class: "",
    issuer_type: "",
    last_name: "",
    roll_no: 0,
    unique_id: "",
  }
  viewUserProfile = false;

  constructor(private issuerApi: IssuerService,
              private libraryApi: LibraryService,
              private router:Router) {
  }

  handleUserProfileBtn() {
    if (!this.viewUserProfile) {
      this.issuerApi.getIssuerByUniqueId(this.item.issuer_unique_id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.userProfile = data;
          },
          error: (err) => {
            console.log(err);
          }
        })
      this.viewUserProfile = true;
    } else {
      this.userProfile = {
        contact_no: "",
        email: "",
        first_name: "",
        id: 0,
        issuer_branch: "",
        issuer_class: "",
        issuer_type: "",
        last_name: "",
        roll_no: 0,
        unique_id: "",
      };
      this.viewUserProfile = false;
    }
  }

  extendReturnPeriod() {
    const today = new Date();
    const fifteenDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);
    const year = fifteenDaysLater.getFullYear();
    const month = (fifteenDaysLater.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
    const day = fifteenDaysLater.getDate().toString().padStart(2, "0"); // Add leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    SweatAl.fire({
      title: "Are you sure? that you want to extends return date of item.",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, extend it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.callExtendReturnPeriodApi(formattedDate);
      }
    });

  }

  callExtendReturnPeriodApi(formattedDate: string) {
    if (this.item.borrow_id === undefined) return;
    this.libraryApi.extendsReturnPeriod(this.item.borrow_id, formattedDate)
      .subscribe({
        next: () => {
          SweatAl.fire('Successful', 'Item Returned Successfully increased by 15 days', 'success').then();
          this.item.expectedReturnDate = formattedDate;
          this.item.isReturnPeriodOver = false;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  returnItemOnTime() {
    SweatAl.fire({
      title: "Are you sure? that you want to return item.",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.callReturnOnTimeApi();
      }
    });

  }
  returnItemWithFine(){
    this.router.navigate([`/generate-fine/${this.item.issuer_unique_id}`]).then();
  }

  callReturnOnTimeApi() {
    const returnItem = {
      itemUniqueId: this.item.item_unique_id,
      borrowId: this.item.borrow_id,
      issuerUniqueId: this.item.issuer_unique_id,
      itemCondition: "EXCELLENT"
    }
    this.libraryApi.returnItemOnTime(returnItem)
      .subscribe({
        next: () => {
          SweatAl.fire('Successful', 'Item Returned Successfully', 'success').then();
          this.removeItem.emit(this.item);
        },
        error: (err) => {
          // console.log(err);
          let errMsg = JSON.parse(err.error);
          console.log(errMsg);
          SweatAl.fire('Error', errMsg.error.message, 'error').then();
        },
      });
  }

  handleRouting(){
    this.router.navigate(['/item-full-detail/'+this.item.item_unique_id]).then();
  }


}
