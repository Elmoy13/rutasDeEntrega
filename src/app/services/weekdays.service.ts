import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeekdaysService {

  URL_API: string = env.API;

  constructor( private http: HttpClient) { }

  getWeekdaysById(idSeller: any) {    
    return this.http.get(this.URL_API + 'route/' + idSeller);
  }

}

