import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  URL_API: string = env.API;
  PRODUCTS: Array<any> = [];
  total = new Subject<any>();
  public totalFinal = 0;

  constructor(private http: HttpClient) { }

  // createSales(sale) {
  //   return this.http.post(this.URL_API + 'sales/create', sale);
  // }

  createAllSalesToBonnacarne(sale: any) {
    return this.http.post(env.RUTAS_API + 'docVenta/create', sale);
  }

  createAllSalesContentToBonnacarne(sale_content: any) {
    return this.http.post(env.RUTAS_API + 'movVenta/create', sale_content);
  }

  createAllSales(sale: any) {
    return this.http.post(this.URL_API + 'sales/create', sale);
  }

  createAllSalesContent(sale_content: any) {
    return this.http.post(this.URL_API + 'sales_content/create', sale_content);
  }


  add(product: { CodProd: any; qty: number; }) {

    if (this.PRODUCTS.length != 1) {
      let index = this.PRODUCTS.findIndex(p => p.CodProd === product.CodProd);
      if (index == -1) {
        product.qty = 1;
        this.PRODUCTS.push(product);
      }
      else {
        this.increase(index);
      }
    }
    else {
      product.qty = 1;
      this.PRODUCTS.push(product);
    }
  }

  addMoreThanOne(product: { CodProd: any; qty: any; }, qty: any) {
    if (this.PRODUCTS.length != 1) {
      let index = this.PRODUCTS.findIndex(p => p.CodProd === product.CodProd);
      if (index == -1) {
        product.qty = qty;
        this.PRODUCTS.push(product);
      }
      else {
        this.increaseMoreThanOne(index, qty);
      }
    }
    else {
      product.qty = qty;
      this.PRODUCTS.push(product);
    }
  }

  get() {
    return this.PRODUCTS;
  }
  clear() {
    this.PRODUCTS = [];
  }

  increase(index: number) {
    this.PRODUCTS[index].qty = parseInt(this.PRODUCTS[index].qty) + 1;
  }

  increaseMoreThanOne(index: number, qty: any) {
    this.PRODUCTS[index].qty = qty;
  }

  decrease(index: number) {
    if (this.PRODUCTS[index].qty > 0) {
      this.PRODUCTS[index].qty = parseInt(this.PRODUCTS[index].qty) - 1;
    }
    else {
      this.PRODUCTS.splice(index, 1);
    }
  }

}


