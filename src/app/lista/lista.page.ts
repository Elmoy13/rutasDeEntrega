import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { SellersService } from '../services/sellers.service';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  userInfo: any;
  employee_number: string | undefined;
  name: string | undefined;
  name2: string | undefined;
  arrayCustomers: Array<any> = [];
  daySelected: string | undefined;
  currentDay: string | undefined;
  currentWeekday: any;
  currentVisit: any;
  arrayWeekdays: Array<any> = [];
  itsRouteStarted: string = 'not-started';
  longitude: any;
  latitude: any;
  userData: any;
  email: string | undefined;
  form: FormGroup | undefined;
  clientes = [
    { nombre: 'martin lopez', detalles: ' una entrega de 20 kg de cecina' },
    { nombre: 'moises rodriguez', detalles: 'una entrega de 30 kg de buche' },
    { nombre: 'maria elena', detalles: 'una entrega de 5 kg de chicharron' },
    { nombre: 'maria elena', detalles: 'una entrega de 5 kg de chicharron' },
    
  ];
  constructor(private router: Router, public formBuilder: FormBuilder,
    private sellersService: SellersService, componentService: ComponentsService) {
      this.formInit();
    this.userInfo = localStorage.getItem('userData'); //Se recuperan los datos del localstorage 
    this.userInfo = JSON.parse(this.userInfo); //convertir string a objeto 
    console.log(this.userInfo); //Comprobar que realmente se recuperó la información 
      this.name2=this.userInfo.name;
      console.log(this.name2);
    this.employee_number = localStorage.getItem('employee_number') || undefined;
    this.sellersService.getByIdSeller(this.employee_number).subscribe((res: any) => {
      console.log('*', res.data);
      this.name = res.data.name;
      this.email = res.data.email;
      
    }, err => console.log(err));
     }
     ionViewDidEnter() {
      this.employee_number = localStorage.getItem('employee_number') || undefined;

      this.sellersService.getByIdSeller(this.employee_number).subscribe((res: any) => {
        console.log('*', res.data);
        this.name = res.data.name;
        this.email = res.data.email;
      }, err => console.log(err));
    }
  irAMapa() {
    // Navega a la página del mapa cuando se hace clic
    this.router.navigate(['/mapa']);
  }
   formInit() {
    this.form = this.formBuilder.group({
      employee_number: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
    })
  }
  getCurrentDay() {
    this.currentDay = moment().locale('es').format('dddd').toLocaleLowerCase();
    this.currentDay = (this.currentDay ?? '').toUpperCase() + this.currentDay?.slice(1);


    this.daySelected = this.currentDay;
    console.log(this.currentDay);
  }
  ngOnInit() {
    
  }

}
