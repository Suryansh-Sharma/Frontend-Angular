import {Component} from '@angular/core';
import {LibraryService} from "../service/api/Library/library.service";
import {ActivatedRoute, Router} from "@angular/router";
import SweatAl from 'sweetalert2';
import {ToastService} from "angular-toastify";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.css']
})
export class AddUpdateItemComponent {
  uuid = "";
  isUpdatePage=true;
  publisherSearch :Array<String>=[]
  constructor(private libraryApi:LibraryService,
              activeRoute:ActivatedRoute,
              private router:Router,
              private toastService:ToastService,
              private titleService:Title) {

    let route =activeRoute.snapshot.params['target'];
    if (route==='new'){
      this.isUpdatePage=false;
      this.titleService.setTitle('Add New Item');
    }else{
      this.titleService.setTitle('Update Item');
      this.uuid=route;
      this.getItemFullDetail();
    }
  }

  stock = {
    quantity: 0
  }

  BookModelData={
    author:'',
    publicationYear:0,
    bookType:'',
    bookClass:''
  }

  MagazineModelData={
    publishedDate:"",
    editor:''
  }

  itemData = {
    title: "",
    publisher: "",
    subject: "Select",
    itemType: "Select",
    description: "",
    itemLocation: "",
    itemLanguage: "",
    stock: this.stock,
    bookModel: this.BookModelData,
    magazineModel: this.MagazineModelData
  }

  handleFormChange(event: any) {
    const propertyName = event.target.name;
    if (propertyName==='publisher'){
      (this.itemData as any)[propertyName] = event.target.value;
      if (this.itemData.publisher===''){
        this.publisherSearch=[];
      }else{
        this.searchPublisher(this.itemData.publisher);
      }
    }
    else if(propertyName === 'itemStock'){
      this.stock.quantity = event.target.value;
      this.itemData.stock= this.stock;
    } else if (propertyName in this.itemData) {
      // Use type assertion to tell TypeScript that the property exists
      (this.itemData as any)[propertyName] = event.target.value.replace(/(^\s+|\s+$)/g, '');
    } else {
      this.toastService.error("Property name is not present in form input " + propertyName);
    }
  }
  searchPublisher(name:string){
    this.libraryApi.getSearchPublisher(name)
      .subscribe({
        next:(res)=>{
          this.publisherSearch=res;
        },
        error:err => {
          console.log(err);
        }
      });
  }
  handleSearchClick(value:any){
    this.itemData.publisher=value
  }
  handleDropDown(target:string,value:string){
    if(target==="itemType"){
      this.itemData.itemType = value;
    }else if(target==="subject"){
      this.itemData.subject=value;
      this.BookModelData.bookType=value;
    }else if (target==="class"){
      this.BookModelData.bookClass=value;
      this.itemData.bookModel.bookClass=value;
    }else {
      this.toastService.error("Option "+target +" is not present");
    }
  }

  handleBookForm(event:any){
    (this.BookModelData as any)[event.target.name] = event.target.value.replace(/(^\s+|\s+$)/g, '');
    this.itemData.bookModel = this.BookModelData;

  }

  handleMagazineForm(event:any){
    (this.MagazineModelData as any)[event.target.name] = event.target.value.replace(/(^\s+|\s+$)/g, '');
    this.itemData.magazineModel = this.MagazineModelData;
  }

  validateAndSubmitForm(){
    if (this.itemData.title===''){
      this.toastService.error("Check item name is empty");
      return;
    }else if(this.itemData.publisher===''){
      this.toastService.error("Check publisher name is empty");
      return;
    }else if(this.itemData.subject==='Select'){
      this.toastService.error("Check item subject is empty, If your subject is not present then select other and add that subject name with Title");
      return;
    }else if (this.itemData.itemType==='Select'){
      this.toastService.error("Check item type is empty");
      return;
    }else if (this.itemData.itemLocation===''){
      this.toastService.error("Check item location is empty");
      return;
    }else if(this.itemData.itemLanguage===''){
      this.toastService.error("Check item language is empty");
      return;
    }else if (this.itemData.stock.quantity <=0 ){
      this.toastService.error("Stock of item can't be less than or equal to zero");
      return;
    }else if (this.itemData.itemType==='BOOK'){
      if (this.itemData.bookModel.author===''){
        this.toastService.error("Book author name is empty");
        return;
      }else if (this.itemData.bookModel.publicationYear<=0){
        this.toastService.error("Book publication year wrong");
        return;
      }else if (this.itemData.bookModel.bookType===""){
        this.toastService.error("Book type is missing");
        return;
      }else if (this.itemData.bookModel.bookClass===""){
        this.toastService.error("Book class is empty");
        return;
      }else{
        SweatAl.fire({
          title: "Are you sure",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Add it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitData()
          }
        });
      }
    }else if(this.itemData.itemType==='MAGAZINE'){
      if(this.itemData.magazineModel.publishedDate===''){
        this.toastService.error("Magazine published date is missing, If date is not present select random date");
        return;
      }else if(this.itemData.magazineModel.editor===''){
        this.toastService.error("Magazine editor name is empty");
        return;
      }else{
        SweatAl.fire({
          title: "Are you sure",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitData()
          }
        });
      }
    }
  }
  submitData(){
    let newFormData = {
      title: this.itemData.title,
      publisher: this.itemData.publisher,
      subject: this.itemData.subject,
      itemType: this.itemData.itemType,
      description: this.itemData.description,
      itemLocation: this.itemData.itemLocation,
      itemLanguage: this.itemData.itemLanguage,
      itemStock: this.stock,
      magazineModel: {},
      bookModel:{},
    }
    if (this.itemData.itemType==='MAGAZINE'){
      newFormData.magazineModel={
        publishedDate: this.MagazineModelData.publishedDate,
        editor: this.MagazineModelData.editor
      };
      // @ts-ignore
      newFormData.bookModel=null;
    }else{
      newFormData.bookModel={
        author:this.BookModelData.author,
        publicationYear:this.BookModelData.publicationYear,
        bookType:this.BookModelData.bookType,
        bookClass:this.BookModelData.bookClass
      }
      // @ts-ignore
      newFormData.magazineModel=null;
    }
    this.libraryApi.addNewItem(newFormData)
      .subscribe({
        next:(res)=>{
           SweatAl.fire('Success!', res, 'success')
             .then(()=>{
               this.router.navigate(['/']).then();
             })
        },
        error:(err)=>{
          console.log(err);
          let errMsg = JSON.parse(err.error);
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        }
      });

  }
  updateData(){
    let newFormData = {
      title: this.itemData.title,
      publisher: this.itemData.publisher,
      subject: this.itemData.subject,
      itemType: this.itemData.itemType,
      description: this.itemData.description,
      itemLocation: this.itemData.itemLocation,
      itemLanguage: this.itemData.itemLanguage,
      itemStock: this.itemData.stock,
      magazineModel: null,
      bookModel:null,
    }
    this.libraryApi.updateItem(this.uuid,newFormData)
      .subscribe({
        next:()=>{
          SweatAl.fire('Success!', 'Item Updated successfully', 'success')
            .then(()=>{
              this.router.navigate(['/item-full-detail/'+this.uuid]).then();
            })
        },
        error:(err)=>{
          console.log(err);
          let errMsg = JSON.parse(err.error);
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        }
      });
  }
  getItemFullDetail(){
    this.libraryApi.getItemFullInfo(this.uuid)
      .subscribe({
        next:(res)=>{
          this.itemData=res;
          console.log(res)
          this.titleService.setTitle('Update '+res.title);
        },
        error:(err)=>{
          console.log(err);
          SweatAl.fire('Error',err.error.error.message,'error')
            .then(()=>{
              this.router.navigate(['/']).then()
            });
        }
      })
  }
  bookTypes: string[] = [
    "NEWS", "COURSE", "HINDI", "ENGLISH", "MATH", "SCIENCE", "GK", "SST", "DRAWING", "IT",
    "PHYSICS", "CHEMISTRY", "ACCOUNTS", "BUSINESS", "ECO", "MUSIC", "FICTION", "NON_FICTION",
    "REFERENCE", "CHILDREN", "TEXTBOOK", "GRAPHIC_NOVEL", "MYSTERY_THRILLER", "ROMANCE",
    "SCIENCE_FICTION", "FANTASY", "BIOGRAPHY_AUTOBIOGRAPHY", "COOKBOOK", "POETRY", "TRAVEL_GUIDE",
    "RELIGIOUS_SPIRITUAL", "SELF_HELP", "HEALTH_WELLNESS", "ART_PHOTOGRAPHY", "BUSINESS_ECONOMICS",
    "TECHNOLOGY_SCIENCE", "ADVENTURE", "OTHER"
  ];
  issuerClassArray:string[]=[
    "General",
    "SKG",
    "JKG",
    "UKG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11 Sci",
    "11 Comm",
    "12 Sci",
    "12 Comm",
    "Other"
  ]


}
