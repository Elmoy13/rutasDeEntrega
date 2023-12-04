import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  URL_API: string = env.API;

  constructor(private http: HttpClient) { }



  updateUID(credentials: any, uid: string) {
    return this.http.patch(this.URL_API + 'sellers/uid/' + uid, credentials);
  }


  getByIdSeller(employee_number: any) {
    return this.http.get(this.URL_API + 'sellers/' + employee_number);
  }

  updatePasswprd(password: any, id: string) {
    return this.http.put(this.URL_API + 'sellers/pass/' + id, {
      "prevpass": password.current_password,
      "password": password.confirm_password
    });
  }

  updateUser(name: string, email: string, id: string){
    return this.http.put(this.URL_API + 'sellers/update/' + id, {
      "name": name,
      "email": email
  });
  }

  updateUserToBonnaCarne(name: string, email: string, id: string){
    return this.http.put(env.RUTAS_API + 'agent/' + id, {
      "Nombre": name,
      "Email": email
  });
  }

}