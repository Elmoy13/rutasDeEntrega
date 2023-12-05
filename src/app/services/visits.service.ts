import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  URL_API: string = env.API;

  constructor( private http: HttpClient) { }

  createVisits(visit: any) {    
    return this.http.post(this.URL_API + 'visits/create', visit);
  }

}


