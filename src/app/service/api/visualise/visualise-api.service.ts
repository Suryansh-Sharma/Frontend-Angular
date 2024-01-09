import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VisualiseDto} from "../model/Visualise";

@Injectable({
  providedIn: 'root'
})
export class VisualiseApiService {

  constructor(private http:HttpClient) { }
  base_url="http://localhost:8080/api/v1/visualise";

  getGeneralInfo(){
    return this.http.get<VisualiseDto>(this.base_url+'/general-info');
  }
  getChartData(query:string){
   return this.http.get<VisualiseDto>(this.base_url+"/"+query);
  }
}
