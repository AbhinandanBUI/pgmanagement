import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { catchError, EMPTY, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryRegionService {

  private url = 'http://192.168.1.180/poise/application/controllers/Ajax.php';

  constructor(private http: HttpClient) { }

  getStateInfo (regId:any){

    let url = 'http://192.168.1.190:8080/api/country-region/';
    var myApi = this.http.get(url + regId);
    
    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if(result){
        return result;
      }
      
      return false;
    }));
  }

  getStateList (){
    let url = 'http://192.168.1.190:8080/api/country-region';

    let country = "US";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country_id",country);

    var myApi = this.http.get(url,{params:queryParams}); //For testing only, to reduce amoutn of records
    //var myApi = this.http.get(url);
    
    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if(result){
        return result;
      }
      
      return false;
    }));
  } 

  postState (data:any){
    let url = 'http://192.168.1.190:8080/api/country-region/';

    var myApi = this.http.post<any>(url, data);
    
    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if(result){
        return result;
      }
      return false;
    }));
  }

  putState (regId:any, data:any){
    let url = 'http://192.168.1.190:8080/api/country-region/';
 
    var myApi = this.http.put<any>(url + regId, data);
    
    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if(result){
        return result;
      }
      return false;
    }));
  }

  deleteState (regId:any){
    let url = 'http://192.168.1.190:8080/api/country-region/';
    var myApi = this.http.delete<any>(url + regId);

    return myApi.pipe(map(response => {
      //console.log(response);
      //let result = JSON.parse(JSON.stringify(response));
      return "succesfully deleted";
    }),
    catchError((err, caught) => {
      //console.log(err.error);
      return "failed to delete";
    }));
  } 

  getStateName (state_code:any){

    let url = 'http://192.168.1.190:8080/api/country-region/';

    let queryParams = new HttpParams();
    queryParams = queryParams.append("code",state_code);

    var myApi = this.http.get(url,{params:queryParams});
    
    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if(result){
        return result;
      }
      
      return false;
    }));
    
  }   

}
