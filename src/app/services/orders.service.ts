import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  URL_API: string = env.RUTAS_API;

  constructor( private http: HttpClient) { }

  createDocOrders(order: any) {    
    return this.http.post(this.URL_API + 'docPedidos/create', order);
  }

  createMovOrders(order: any) {    
    return this.http.post(this.URL_API + 'movPedidos/create', order);
  }

}

