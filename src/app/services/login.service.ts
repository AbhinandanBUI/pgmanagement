import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

import { map, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private url = 'http://jsonplaceholder.typicode.com/posts';
  // private url = 'http://192.168.1.180/poise/application/controllers/Ajax.php';


  // constructor(private http: HttpClient) { }         

  // getCredentials(){
  //   return this.http.get(this.url + "?fn=get_users&param=");
  // }

  // verifyCredentials (credentials: any){
  //   var myApi = this.http.get(this.url + "?fn=verify_login&param=" 
  //     + encodeURIComponent(JSON.stringify(credentials)));
    
  //   return myApi.pipe(map(response => {
  //     //console.log(JSON.stringify(response));
  //     console.log(response);
  //     let result = JSON.parse(JSON.stringify(response));
  //     //result.token 
  //     if(result && result.token){
  //       localStorage.setItem('token', result.token);

  //       return true;
  //     }
      
  //     return false;

  //   }));

  // }

  // isLoggedIn(){
  //   let jwtToken = localStorage.getItem('token');
    
  //   if(!jwtToken)
  //     return false;

  //   const jwtHelper = new JwtHelperService();

  //   const decodedToken = jwtHelper.decodeToken(jwtToken);
  //   const expirationDate = jwtHelper.getTokenExpirationDate(jwtToken);
  //   const isExpired = jwtHelper.isTokenExpired(jwtToken);
 
  //   console.log(expirationDate);
  //   console.log(isExpired);    

  //   return true;
  // }
}
