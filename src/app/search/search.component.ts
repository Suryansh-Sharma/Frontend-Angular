import {Component} from '@angular/core';
import {LibraryService} from "../service/api/Library/library.service";
import {LibraryItemsPage} from "../service/api/model/LibraryItemsPage";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {IssuerService} from "../service/api/Issuers/issuer.service";
import {IssuersPage} from "../service/api/model/IssuerInfo";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ItemSearchRes:LibraryItemsPage
  IssuerSearchRes:IssuersPage
  IssuerSearchTarget='firstname'
  value='';
  isItemPage=true;
  isChecked=false;
  param='';
  currentPage:number=1;
  isLoading=true;
  constructor(private libraryApi:LibraryService,
              private issuerApi:IssuerService,
              private activeRoute:ActivatedRoute,
              private router:Router,
              private titleService:Title) {
    this.onInit();
    this.ItemSearchRes = {
      page_no:0,
      items:[],
      total_records:0,
      page_size:0
    }
    this.IssuerSearchRes={
      page_no:0,
      items:[],
      total_records:0,
      page_size:0
    }
  }

  onInit() {
    this.param = this.activeRoute.snapshot.params['target'];
    if (this.param==='Item'){
      this.titleService.setTitle('Search Item');
      this.isItemPage=true;
    }else if (this.param==='Issuer'){
      this.titleService.setTitle('Search Issuer');
      this.isItemPage=false;
    }else {
      this.router.navigate(['/']).then();
    }
  }
  handleValueChange(event:any){
    let name = event.target.name;

    if (name==='isBook'){
      this.isChecked = event.target.checked;
    } else {
      this.value=event.target.value;
    }

  }
  handleDropDownChange(value:string){
    this.IssuerSearchTarget=value;
  }
  handleSearchData(){
    if (this.value===''){
      return;
    }
    if (this.isItemPage){

    this.libraryApi.searchItem(this.value,this.isChecked,6,this.currentPage-1)
      .subscribe({
        next:(res)=>{
          this.ItemSearchRes=res
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else{
      this.issuerApi.searchIssuer(this.value,this.IssuerSearchTarget,6,this.currentPage-1 )
        .subscribe({
          next:(res)=>{
            this.IssuerSearchRes=res;
            this.isLoading=false;
          },
          error:(err)=>{
            console.log(err);
          }
        });
    }
  }
  handleRouting(target:string,uuid:any){
    if(target==='Item-Full-View'){
      this.router.navigate(['/item-full-detail/'+uuid]).then()
    }else if (target==="Issuer-Full-Profile"){
      this.router.navigate(['/issuer-info/'+uuid]).then()
    }
  }
  handlePageClick(page:number){
    if (page===this.currentPage)return;
    this.currentPage=page;
    this.handleSearchData();
  }

  previousPage(){
    this.currentPage=this.currentPage-1;
    this.handleSearchData();
  }
  nextPage(){
    this.currentPage=this.currentPage+1;
    this.handleSearchData();
  }

  createRange(number: number | undefined){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
