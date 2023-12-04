import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL_API: string = env.RUTAS_API;

  constructor( private http: HttpClient) { }

  getAllProducts() {    
    return this.http.get(this.URL_API + 'producto/all');
  }

}
