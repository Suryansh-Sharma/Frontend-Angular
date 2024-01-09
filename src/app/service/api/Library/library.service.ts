import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LibraryItemsPage} from "../model/LibraryItemsPage";
import {Observable} from "rxjs";
import {AllFinePage} from "../model/AllFinePage";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor( private http:HttpClient) {

  }
  private baseUrl = `http://localhost:8080/api/v1/library/`;

  addNewItem(item:any){
    return this.http.post(this.baseUrl+`add-new-item`,item,{responseType:'text'});
  }
  updateItem(item_unique_id:string,item:any){
    return this.http.put(this.baseUrl+`update-item-detail-and-stock/${item_unique_id}`,item,{responseType:'text'});
  }
  getAllPendingItems(page:number,limit:number):Observable<any>{
    const itemsUrl=this.baseUrl+`all-pending-return-item?page_size=${limit}&page_no=${page}`;
    return this.http.get<LibraryItemsPage>(itemsUrl)
  }
  borrowNewItem(item:any){
    return this.http.post(this.baseUrl+'borrow-item', item, {responseType:'text'});
  }
  returnItemOnTime(item:any){
    return this.http.post(this.baseUrl+'return-item', item, {responseType:'text'});
  }
  specificItemsOfIssuer(issuer_uid:string,item_uid:string,page:number,limit:number){
    return this.http.get<LibraryItemsPage>(this.baseUrl+`specific-items-of-user/${issuer_uid}/${item_uid}?page_size=${limit}&page_no=${page}`)
  }
  extendsReturnPeriod(borrow_id:number,new_date:string){
    return this.http.post(this.baseUrl+`extend-return-date/${borrow_id}/${new_date}`,{},{responseType:'text'})
  }
  searchItem(value:string,is_book:boolean,page_size:number,page_no:number){
    return this.http.get<LibraryItemsPage>(this.baseUrl+`item-full-text-search/${value}`+
    `?is_book=${is_book}&page_size=${page_size}&page_no=${page_no}`);
  }
  getItemFullInfo(unique_id:string){
    return this.http.get<any>(this.baseUrl+`item-full-details/${unique_id}`)
  }
  getAllBorrowsOfItem(item_uid:string,page:number,limit:number){
    return this.http.get<LibraryItemsPage>(this.baseUrl+`all-borrows-of-item/${item_uid}?page_size=${limit}&page_no=${page}`);
  }
  getAllBorrowsOfIssuer(issuer_uid:string,page:number,limit:number){
    return this.http.get<LibraryItemsPage>(this.baseUrl+`all-borrows-of-user/${issuer_uid}?page_size=${limit}&page_no=${page}`)
  }
  getSearchPublisher(name:string){
    return this.http.get<Array<String>>(this.baseUrl+`search-publisher/${name}`)
  }
  getAllPaidFines(page:number,limit:number){
    return this.http.get<AllFinePage>(this.baseUrl+`all-paid-fines?page_no=${page}&page_size=${limit}`);
  }
}
