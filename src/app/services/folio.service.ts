import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolioService {

  URL_API: string = env.RUTAS_API;

  constructor(private http: HttpClient) { }

  getFolioHeaderById(id: any) {
    return this.http.get(this.URL_API + 'DocAgen/' + id);
  }

  getFolioContentById(id: any) {
    return this.http.get(this.URL_API + 'MovAgen/' + id);
  }


}
