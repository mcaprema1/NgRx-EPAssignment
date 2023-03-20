import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import {Employee } from '../../../model/employee.model'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient) { }

  SERVER_URL = 'https://run.mocky.io/v3/022060ea-4c7c-4043-842b-7a776b5f52f9';
  private employeesData: Observable<Employee[]> | undefined

  search(term: string): Observable<Employee[]> {
    // let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
    return this.http.get<Employee[]>(this.SERVER_URL)
    // .map(res =>
          // return res.json()
          // .results.map(item => {
            // return new SearchItem(
            //     item.trackName,
            //     item.artistName,
            //     item.trackViewUrl,
            //     item.artworkUrl30,
            //     item.artistId
            // );
          // });
        // });
  }

}
