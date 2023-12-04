import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteCustomersService {

  private dbInstance: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "customers";
  CUSTOMERS: Array<any> = [];

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.databaseConn();
  }

  // Create SQLite database 
  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    id INTEGER PRIMARY KEY, 
                    idcustomers varchar(255),
                    name varchar(255),
                    street varchar(255),
                    outdoor_number integer(7),
                    phone integer(10),
                    pc integer(5),
                    municipality varchar(255),
                    state varchar(255),
                    suburb varchar(255),
                    idRuta integer(7),
                    lat varchar(255),
                    length varchar(255),                    
                    itsNew varchar(255),
                    status varchar(255),
                    RFC varchar(255),
                    email varchar(255),
                    payment_method varchar(255),
                    CFDI varchar(255),
                    ruta integer(20)
                  )`, [])
          .then((res) => {
            // console.log(JSON.stringify(res));
          })
          .catch((error) => console.log(JSON.stringify(error)));
      })
        .catch((error) => console.log(JSON.stringify(error)));
    });
  }

  // Crud
  public addCustomer(customer: any) {  
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (idcustomers, name, street, outdoor_number, phone, pc, municipality, state, suburb, idRuta, lat, length, itsNew, status, RFC, email, payment_method, CFDI, ruta) 
      VALUES ('${customer.idcustomers}', '${customer.name.toUpperCase()}', '${customer.street}', ${customer.outdoor_number}, ${customer.phone}, ${customer.pc}, 
      '${customer.municipality}', '${customer.state}','${customer.suburb}', ${customer.idRuta}, '${customer.lat}', '${customer.length}', '${customer.itsNew}', '${customer.status}', 
      '${customer.RFC}', '${customer.email}', '${customer.payment_method}', '${customer.CFDI}', ${customer.ruta})`, [])
      .then(() => {
        this.getAllCustomers();
      }, (e) => {
      });
  }

  getAllCustomers() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.CUSTOMERS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.CUSTOMERS.push(res.rows.item(i));
        }
        return this.CUSTOMERS;
      }
    }, (e) => {
      console.log(JSON.stringify(e));
    });
  }

  // Get user
  getCustomer(id): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE id = ?`, [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          idcustomers: res.rows.item(0).idcustomers,
          name: res.rows.item(0).name,
          street: res.rows.item(0).street,
          outdoor_number: res.rows.item(0).outdoor_number,
          phone: res.rows.item(0).phone,
          pc: res.rows.item(0).pc,
          municipality: res.rows.item(0).municipality,
          suburb: res.rows.item(0).suburb,
          idRuta: res.rows.item(0).idRuta,
          state: res.rows.item(0).state,
          lat: res.rows.item(0).lat,
          length: res.rows.item(0).length,
          itsNew: res.rows.item(0).itsNew,
          status: res.rows.item(0).status,
          RFC: res.rows.item(0).RFC,
          email: res.rows.item(0).email,
          payment_method: res.rows.item(0).payment_method,
          CFDI: res.rows.item(0).CFDI,
          ruta: res.rows.item(0).ruta
        }
      });
  }

  // Update
  updateCustomer(id, customer) {
    let data = [customer.idcustomers, customer.name.toUpperCase(), customer.street, customer.outdoor_number, customer.phone, customer.pc, customer.municipality, customer.state, customer.suburb, customer.idRuta, customer.lat, customer.long, customer.itsNew, customer.status, 
      customer.RFC, customer.email, customer.payment_method, customer.CFDI, customer.ruta];
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET idcustomers = ?, name = ? , street = ?, outdoor_number = ?, phone = ?, pc = ?, municipality = ?, state = ?,suburb = ?, idRuta = ?, lat = ?, length = ?, itsNew = ? , status = ?,
    RFC = ?, email = ?, payment_method = ?, CFDI = ?, ruta = ?  WHERE id = ${id}`, data)
  }

  // Update
  updateStatus(id, status) {
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET status = '${status}' WHERE id = ${id}`, []);
  }

  // Delete
  deleteCustomer(customer) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ${customer}`, [])
      .then(() => {
        // console.log("customer deleted!");
        this.getAllCustomers();
      })
      .catch(e => {
        console.log(JSON.stringify(e))
      });
  }

  deleteTable() {
    this.dbInstance.executeSql(`
    DELETE FROM ${this.db_table}`)
        .then(() => {
        console.log("Table clean!");
    })
        .catch(e => {
        console.log(JSON.stringify(e));
    });
  }

}
