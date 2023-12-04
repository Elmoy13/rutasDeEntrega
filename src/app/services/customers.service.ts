import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  URL_API: string = env.API;

  constructor(private http: HttpClient) { }

  getAllCustomers(id: any) {
    return this.http.get(this.URL_API + 'customer/' + id);
  }

  createCustomerAPI(customer: any){
    return this.http.post(this.URL_API + 'customer/create', customer);
  }

  createCustomersToBonnacarne(customer: any){
    return this.http.post(env.RUTAS_API + 'client/create', customer);
  }

  updateCustomerAPI(customer: any, idCustomer: any){
    return this.http.put(this.URL_API + 'customer/update/' + idCustomer, customer);
  }

  updateCustomersToBonnacarne(customer: any, idCustomer: any){
    return this.http.put(env.RUTAS_API + 'client/update/' + idCustomer, customer);
  }

  getFormasPagos(){
    return this.http.get(env.RUTAS_API + 'FormasPago/all');
  }

}
