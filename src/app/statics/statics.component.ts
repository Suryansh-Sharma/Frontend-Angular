import {Component, ViewChild} from '@angular/core';
import {VisualiseDto} from "../service/api/model/Visualise";
import {VisualiseApiService} from "../service/api/visualise/visualise-api.service";
import {Title} from "@angular/platform-browser";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {Router} from "@angular/router";

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type BarChartOption={
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
}
@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})

export class StaticsComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public pieChartOptions: Partial<PieChartOptions> | any;
  public barChartOptions: Partial<BarChartOption> | any;

  generalVisualiseInfo!:VisualiseDto;
  chartVisualiseInfo!:VisualiseDto;

  chartTitle="Select Option";
  showChart=false;
  constructor(private visualiseApi:VisualiseApiService,
              titleService:Title,
              private router:Router) {
    titleService.setTitle("Statics Page");
    this.fetchGeneralData();
  }

  initialiseChartData(){
    this.showChart=false;
    this.pieChartOptions = {
      chart: {
        width: 600,
        type: "pie"
      },
      labels: this.chartVisualiseInfo.labels,
      series: this.chartVisualiseInfo.series,
    };

    this.barChartOptions={
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      series: [
        {
          name: "value",
          data: this.chartVisualiseInfo.series
        },

      ],
      chart: {
        type: "bar",
        height:500,
        width: 1400
      },
      plotOptions: {
        bar: {
          distributed: true
        },

      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.chartVisualiseInfo.labels,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        categories: this.chartVisualiseInfo.labels,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      },
      labels: {
        style: {
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8"
          ],
          fontSize: "12px"
        }
      }
    }
    this.showChart=true;
  }
  fetchGeneralData(){
    this.visualiseApi.getGeneralInfo()
      .subscribe({
        next:res=>{
          this.generalVisualiseInfo=res;
        },
        error:err=>{
          console.log(err);
          this.router.navigate(['/']).then();
        }
      });
  }

  handleDropDown(value:string,caseNo:number){
    this.chartTitle=value;
    let query="";
    switch (caseNo){
      case 1:
        query="total-items-per-date";
        break
      case 2:
        query="total-items-by-borrow-status";
        break;
      case 3:
        query="total-item-per-type";
        break
      case 4:
        query="total-item-per-subject";
        break;
      case 5:
        query="total-item-per-pub-year";
        break
      case 6:
        query="total-item-per-class";
        break
      case 7:
        query="total-issuer-per-type";
        break
      case 8:
        query="total-issuer-per-class";
        break
      case 9:
        query="total-fine-per-date";
        break
      case 10:
        query="total-item-returned-on-time";
        break
      case 11:
        query="total-item-per-publication";
        break
      default:
        alert("No case found for "+caseNo);
        break;
    }
    this.handleFetchChartData(query);
  }

  handleFetchChartData(query:string){
    this.showChart=false;
    this.visualiseApi.getChartData(query)
      .subscribe({
        next:res=>{
          this.chartVisualiseInfo=res;
          this.initialiseChartData();
        },
        error:err=>{
          console.log(err);
        }
      });

  }

}
