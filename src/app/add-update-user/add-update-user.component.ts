import { Component } from '@angular/core';
import {IssuerService} from "../service/api/Issuers/issuer.service";
import {ToastService} from "angular-toastify";
import SweatAl from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent {
  constructor(private issuerApi:IssuerService,
              private toastService:ToastService,
              private router:Router,
              private activeRoute:ActivatedRoute,
              private titleService:Title) {
    this.onInit();
  }
  onInit(){
    let unique_id = this.activeRoute.snapshot.params['target'];
    if (unique_id==='new'){
      this.isUpdatePage=false;
      this.titleService.setTitle('Creat New Issuer');
      this.showForm=false;
    }else if(unique_id==='search'){
      this.isLoading=true;
      this.isUpdatePage=true;
      this.titleService.setTitle('Search Issuer For Update');
      this.showForm=true;
    } else{
      this.isLoading=true;
      this.isUpdatePage=true
      this.getIssuerInfo(unique_id);
      this.uniqueId=unique_id;
    }

  }
  isLoading=false
  isUpdatePage=false;
  uniqueId='';
  showForm=true;

  issuerData={
    firstname:'',
    lastname:'',
    rollNo:0,
    issuerType:'Select',
    contactNo:'',
    email:'',
    issuerClass:'Select',
    issuerBranch:'Select'
  }
  issuerTypeArray:string[]=[
    "TEACHER",
    "STUDENT",
    "MANAGEMENT",
    "OTHER"
  ];
  issuerBranchArray:string[]=[
    "AV",
    "RV"
  ];
  issuerClassArray:string[]=[
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
  handleInputChange(event:any){
    const propertyName = event.target.name;
    if(propertyName in this.issuerData){
      (this.issuerData as any)[propertyName] = event.target.value;
    }else {
      alert("Property name "+propertyName+" is not present in issuer data");
    }
  }
  handleInputDropdown(target:string,value:string){
    if(target==="issuerType"){
      this.issuerData.issuerType = value;
    }else if(target==="issuerClass"){
      this.issuerData.issuerClass = value;
    }else if(target==="issuerBranch"){
      this.issuerData.issuerBranch = value;
    }else{
      alert("Target "+target+" is not present");
    }
  }
  handleValidateAndSubmit(){
    if (this.issuerData.firstname===''){
      this.handleDisplayToast("First name is empty");
    }else if (this.issuerData.rollNo<=0){
      this.handleDisplayToast("Check roll no again");
    }else if (!this.validateContactNo()){
      this.handleDisplayToast("Check contact number");
    }else if (this.issuerData.issuerType==="Select"){
      this.handleDisplayToast("Issuer type is not selected");
    }else if(this.issuerData.issuerClass==="Select"){
      this.handleDisplayToast("Issuer class is not selected");
    }else if (this.issuerData.issuerBranch==="Select"){
      this.handleDisplayToast("Issuer branch is not selected");
    }else {
      this.submitDataApi();
    }
  }
  validateContactNo(){
    let reg = /^[0-9]{10}$/;
    return reg.test(this.issuerData.contactNo);
  }
  submitDataApi(){
    if(this.isUpdatePage){
      if (this.uniqueId==='')return;
      this.issuerApi.updateIssuerInfo(this.issuerData,this.uniqueId)
          .subscribe({
              next:()=>{
                  SweatAl.fire('Successful','Issuer updated Successfully','success')
                      .then(()=>{
                          // this.router.navigate(['/']).then();
                      });
              },
              error:(err)=>{
                  console.log(err);
                  let errMsg = JSON.parse(err.error);
                  SweatAl.fire('Error',errMsg.error.message,'error').then()
              }
          });

    }else{
    this.issuerApi.addNewIssuer(this.issuerData)
      .subscribe({
        next:()=>{
          SweatAl.fire('Successful','Issuer registered Successfully','success')
            .then(()=>{
              this.router.navigate(['/']).then();
            });
        },
        error:(err)=>{
          console.log(err);
          let errMsg = JSON.parse(err.error);
          SweatAl.fire('Error',errMsg.error.message,'error').then()
        }
      });
    }

  }
  getIssuerInfo(issuer_uid:string){
    this.issuerApi.getIssuerByUniqueId(issuer_uid)
      .subscribe({
        next:(res)=>{
            this.issuerData.firstname=res.first_name;
            this.issuerData.lastname=res.last_name;
            this.issuerData.rollNo=res.roll_no;
            this.issuerData.issuerType=res.issuer_type;
            this.issuerData.contactNo=res.contact_no;
            this.issuerData.email=res.email;
            this.issuerData.issuerClass=res.issuer_class;
            this.issuerData.issuerBranch=res.issuer_branch;
            this.isLoading=false;
            this.isUpdatePage=true;
            this.showForm=false;
            this.titleService.setTitle('Update Info Of '+res.first_name);
        },
        error:(err)=>{
            console.log(err);
            SweatAl.fire('Error',err.error.error.message,'error').then();
            this.router.navigate(['/']).then();
        }
      });
  }
  handleDisplayToast(message:string){
    this.toastService.error(message);
  }

  handleDataChange(event: any) {
    this.uniqueId=event.target.value
  }
}
