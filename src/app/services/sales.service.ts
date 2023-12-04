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

  createAllSalesToBonnacarne(sale) {
    return this.http.post(env.RUTAS_API + 'docVenta/create', sale);
  }

  createAllSalesContentToBonnacarne(sale_content) {
    return this.http.post(env.RUTAS_API + 'movVenta/create', sale_content);
  }

  createAllSales(sale) {
    return this.http.post(this.URL_API + 'sales/create', sale);
  }

  createAllSalesContent(sale_content) {
    return this.http.post(this.URL_API + 'sales_content/create', sale_content);
  }


  add(product) {

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

  addMoreThanOne(product, qty) {
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

  increase(index) {
    this.PRODUCTS[index].qty = parseInt(this.PRODUCTS[index].qty) + 1;
  }

  increaseMoreThanOne(index, qty) {
    this.PRODUCTS[index].qty = qty;
  }

  decrease(index) {
    if (this.PRODUCTS[index].qty > 0) {
      this.PRODUCTS[index].qty = parseInt(this.PRODUCTS[index].qty) - 1;
    }
    else {
      this.PRODUCTS.splice(index, 1);
    }
  }

}


