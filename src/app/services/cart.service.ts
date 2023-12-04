import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  total = new Subject<any>();
  public totalFinal = 0;


  constructor() { }

  add(product) {
    let prod = this.cart[product];
    if (this.cart.length != 1) {
      let index = this.cart.findIndex(p => p.CodProd === prod.CodProd);
      if (index == -1) {
        product.qty = 1;
        // product.total = product.Precio;
        this.cart.push(product);
      }
      else {
        this.increase(index);
      }
    }
    else {
      // this.cart.push(product);
      let check = this.cart.some(e => e === product);
      if (!check) {
        this.cart.push(product);
      };
      product.qty++;
    }
  }

  addMoreThanOne(product, qty) {
    if (this.cart.length != 1) {
      let index = this.cart.findIndex(p => p.CodProd === product.CodProd);
      if (index == -1) {
        product.qty = qty;
        // product.total = product.Precio;
        this.cart.push(product);
      }
      else {
        this.increaseMoreThanOne(index, qty);
      }
    }
    else {
      product.qty = qty;
      // product.total = product.Precio;
      this.cart.push(product);
    }
  }

  get() {
    return this.cart;
  }
  clear() {
    this.cart = [];
  }

  increase(index) {
    console.log(this.cart[index]);
    this.cart[index].qty = parseInt(this.cart[index].qty) + 1;
    // this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].Precio);
  }

  increaseMoreThanOne(index, qty) {
    this.cart[index].qty = qty;
    // this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].Precio);
  }

  decrease(index) {
    if (this.cart.length != 0) {
      if (this.cart[index].qty == 1) {
        this.cart.splice(index, 1);
      } else if (this.cart[index].qty > 0) {
        console.log('Todavia descuenta')
        this.cart[index].qty = parseInt(this.cart[index].qty) - 1;
        // this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].Precio);
      }
    }
    else if(this.cart.length != 0){
      console.log('Es igual a 0')
    }
  }
  

}
