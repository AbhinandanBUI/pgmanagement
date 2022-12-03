import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }



  getCountryList() {

    let url = environment.baseApiUrl + 'api/country/getCountries';

    var myApi = this.http.get(url);

    return myApi.pipe(map(response => {
      //console.log(response);
      let result = JSON.parse(JSON.stringify(response));

      if (result) {
        return result;
      }

      return false;
    }));

  }
}
