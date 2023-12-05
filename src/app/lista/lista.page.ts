import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SellersService } from '../services/sellers.service';
import { ComponentsService } from '../services/components.service';
import { SqliteVisitsService } from '../services/sqlite-visits.service';
import { SqliteWeekdaysService } from '../services/sqlite-weekdays.service';
import { SqliteCustomersService } from '../services/sqlite-customers.service';
import { AlertController, ModalController } from '@ionic/angular';

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
    { nombre: 'martin lopez', detalles: 'una entrega de 20 kg de cecina' },
    { nombre: 'moises rodriguez', detalles: 'una entrega de 30 kg de buche' },
    { nombre: 'maria elena', detalles: 'una entrega de 5 kg de chicharron' },
    { nombre: 'maria elena', detalles: 'una entrega de 5 kg de chicharron' },
  ];

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private sellersService: SellersService,
    private sqliteVisits: SqliteVisitsService,
    private sqliteWeekdaysService: SqliteWeekdaysService,
    private componentsService: ComponentsService,
    public apiSql: SqliteCustomersService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.formInit();
    this.userInfo = localStorage.getItem('userData');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
    this.name2 = this.userInfo.name;
    console.log(this.name2);
    this.employee_number = localStorage.getItem('employee_number') || undefined;
    this.sellersService.getByIdSeller(this.employee_number).subscribe(
      (res: any) => {
        console.log('*', res.data);
        this.name = res.data.name;
        this.email = res.data.email;
      },
      (err) => console.log(err)
    );
    this.getLocation();
    this.validateWeekdays();
    this.getCurrentDay();
  }

  ionViewDidEnter() {
    this.employee_number = localStorage.getItem('employee_number') || undefined;
    this.sellersService.getByIdSeller(this.employee_number).subscribe(
      (res: any) => {
        console.log('*', res.data);
        this.name = res.data.name;
        this.email = res.data.email;
      },
      (err) => console.log(err)
    );
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log('No support for geolocation');
    }
  }
  getAllCustomers() {
    this.apiSql.getAllCustomers().then((res: any) => {
      console.log('*', this.currentWeekday);
      console.log('Clientes SQLITE', res);
      this.arrayCustomers = res.filter((customer: { ruta: any; }) => customer.ruta == parseInt(this.currentWeekday.idroute));
      console.log('Clientes filtrados');
    }).catch((e) => {
      console.log(e);
    });
  }
  validateWeekdays() {
    this.arrayWeekdays = this.sqliteWeekdaysService.WEEKDAYS;
  }

  getCurrentDay() {
    this.currentDay = moment().locale('es').format('dddd').toLocaleLowerCase();
    this.currentDay = (this.currentDay ?? '').toUpperCase() + this.currentDay?.slice(1);
    this.daySelected = this.currentDay;
    console.log(this.currentDay);
  }

  formInit() {
    this.form = this.formBuilder.group({
      employee_number: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
      ],
    });
  }

  irAMapa() {
    this.router.navigate(['/mapa']);
  }

  ngOnInit() {
    try {
      this.getAllCustomers();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }
  
  // Aquí puedes agregar las funciones adicionales que necesitas
}
