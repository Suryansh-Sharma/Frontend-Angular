import {Component, ViewChild} from '@angular/core';
import {IssuerService} from "../service/api/Issuers/issuer.service";
import {IssuerTotalFine} from "../service/api/model/IssuerTotalFine";
import {LibraryService} from "../service/api/Library/library.service";
import SweatAl from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-generate-pay-fine',
  templateUrl: './generate-pay-fine.component.html',
  styleUrls: ['./generate-pay-fine.component.css']
})
export class GeneratePayFineComponent {
  @ViewChild('generateFine') content: any;

  issuerTotalFine!:IssuerTotalFine;

  isLoading=true;
  issuerUid="";
  showInput=true;
  status="UNPAID"
  hidePrint=false;
  constructor(private issuerApi:IssuerService,
              private libraryApi:LibraryService,
              private router:Router,
              private activeRoute:ActivatedRoute,
              private titleService:Title) {
    this.titleService.setTitle('Generate Fine');
    let uid = this.activeRoute.snapshot.params['target'];
    if (uid ==='new'){
      this.showInput=true;
    }else {
      this.issuerUid=uid;
      this.showInput=false;
      this.fetchFineApi(this.issuerUid);
    }
  }
  handleDataChange(event:any){
    this.issuerUid=event.target.value;
  }
  handleSubmit(){
    this.showInput=false;
    this.fetchFineApi(this.issuerUid);
  }
  fetchFineApi(issuer_uid:string){
    if (issuer_uid==='')return;
    this.issuerApi.generateTotalForIssuer(issuer_uid)
      .subscribe({
        next:(res)=>{
          this.issuerTotalFine=res;
          this.titleService.setTitle('Fine Of '+res.issuerInfo.name);
          this.isLoading=false;
          this.showInput=false;
        },
        error:(err)=>{
          console.log(err)
          SweatAl.fire('Error',err.error.error.message,'error')
            .then(()=>{
              this.router.navigate(['/']).then()
          });
        }
      });
  }

  handlePayFineBtn(){
    this.status = "PAID";
    this.hidePrint = true;
    SweatAl.fire({
      title: "Are you sure? that you want to pay fine for "+this.issuerTotalFine.issuerInfo.name,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.changeStatus();
      }else {
        this.status = "UNPAID";
        this.hidePrint = false;
      }
    });
  }
  async changeStatus() {

    this.payFineApi();
  }
  payFineApi(){
    if (this.issuerTotalFine.fines.length <=0){
      return;
    }
    let date = new Date();
    // Format the date as YYYY-MM-DD
    let formattedDate = date.toISOString().split('T')[0];

    // Format the time as HH:mm:ss
    let formattedTime = date.toTimeString().split(' ')[0];

    let data = document.getElementById('generateFine');

    // @ts-ignore
    html2canvas(data,{scale:4,useCORS:true}).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg')
      let pdf = new jsPDF('portrait', 'mm', 'a4');
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();
      let margin=10
      // Calculate the position with margins
      let xPosition = margin;
      let yPosition = margin;

      // Calculate the width and height with margins
      let contentWidth = width - 2 * margin;
      let contentHeight = height - 2 * margin;

      pdf.addImage(contentDataURL, 'PNG', xPosition, yPosition, contentWidth, contentHeight);

      let pdfBlob = pdf.output('blob');
      let formData = new FormData();

      formData.append('pdf',pdfBlob,
        formattedDate.replace(/-/g, "")+"_"+ formattedTime.replace(/:/g, "") + ".pdf"
      );

      // Send this data to post api.
      this.issuerApi.returnFinedItem(this.issuerUid,formData)
        .subscribe({
          next:()=>{
            SweatAl.fire('Successful','Fine paid successfully by user '+this.issuerTotalFine.issuerInfo.name,'success')
              .then(()=>{
                this.router.navigate(["/"]).then()
              })
          },
          error:(err)=>{
            console.log(err);
            let errMsg = JSON.parse(err.error);
            SweatAl.fire('Error',errMsg.error.message,'error').then();
          }
        });
    });

  }
  printInvoice(){
    window.print();
  }
}
