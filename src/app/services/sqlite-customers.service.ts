import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteCustomersService {

  private dbInstance: SQLiteObject | undefined;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "customers";
  CUSTOMERS: Array<any> = [];

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.establishConnection();
  }

  private async establishConnection(): Promise<void> {
    if (!this.dbInstance) {
      this.dbInstance = await this.sqlite.create({
        name: this.db_name,
        location: 'default'
      });
      await this.createTable();
    }
  }

  private async createTable(): Promise<void> {
    const query = `
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
      )`;

    try {
      await this.dbInstance?.executeSql(query, []);
    } catch (error) {
      console.log('Error al crear la tabla: ' + JSON.stringify(error));
    }
  }

  public addCustomer(customer: any) {
    this.dbInstance?.executeSql(`
      INSERT INTO ${this.db_table} (idcustomers, name, street, outdoor_number, phone, pc, municipality, state, suburb, idRuta, lat, length, itsNew, status, RFC, email, payment_method, CFDI, ruta) 
      VALUES ('${customer.idcustomers}', '${customer.name.toUpperCase()}', '${customer.street}', ${customer.outdoor_number}, ${customer.phone}, ${customer.pc}, 
      '${customer.municipality}', '${customer.state}','${customer.suburb}', ${customer.idRuta}, '${customer.lat}', '${customer.length}', '${customer.itsNew}', '${customer.status}', 
      '${customer.RFC}', '${customer.email}', '${customer.payment_method}', '${customer.CFDI}', ${customer.ruta})`, [])
      .then(() => {
        this.getAllCustomers();
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  async getAllCustomers(): Promise<any[]> {
    await this.establishConnection();

    if (this.dbInstance) {
      try {
        const res = await this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []);
        this.CUSTOMERS = [];
        for (let i = 0; i < res.rows.length; i++) {
          this.CUSTOMERS.push(res.rows.item(i));
        }
        return this.CUSTOMERS;
      } catch (error) {
        console.log("Error fetching customers: " + JSON.stringify(error));
        throw error;
      }
    } else {
      console.error('Error: dbInstance is undefined');
      return [];
    }
  }

  getCustomer(id: any): Promise<any> {
    if (this.dbInstance) {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE id = ?`, [id])
        .then((res) => {
          if (res.rows.length > 0) {
            return {
              id: res.rows.item(0).id,
              idcustomers: res.rows.item(0).idcustomers,
              // ... otras propiedades
            };
          } else {
            throw new Error('Customer not found');
          }
        });
    } else {
      return Promise.reject(new Error('DB instance is undefined'));
    }
  }
  

  updateCustomer(id: any, customer: any) {
    this.establishConnection();

    if (this.dbInstance) {
      let data = [customer.idcustomers, customer.name.toUpperCase(), customer.street, customer.outdoor_number, customer.phone, customer.pc, customer.municipality, customer.state, customer.suburb, customer.idRuta, customer.lat, customer.long, customer.itsNew, customer.status,
        customer.RFC, customer.email, customer.payment_method, customer.CFDI, customer.ruta];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET idcustomers = ?, name = ? , street = ?, outdoor_number = ?, phone = ?, pc = ?, municipality = ?, state = ?,suburb = ?, idRuta = ?, lat = ?, length = ?, itsNew = ? , status = ?,
        RFC = ?, email = ?, payment_method = ?, CFDI = ?, ruta = ?  WHERE id = ${id}`, data);
    } else {
      console.error('Error: dbInstance is undefined');
      return null;
    }
  }

  updateStatus(id: any, status: any) {
    this.establishConnection();

    if (this.dbInstance) {
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET status = ? WHERE id = ?`, [status, id]);
    } else {
      console.error('Error: dbInstance is undefined');
      return null;
    }
  }

  deleteCustomer(customer: any) {
    this.establishConnection();

    if (this.dbInstance) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ?`, [customer])
        .then(() => {
          this.getAllCustomers();
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
    } else {
      console.error('Error: dbInstance is undefined');
    }
  }

  deleteTable() {
    this.establishConnection();

    if (this.dbInstance) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table}`)
        .then(() => {
          console.log("Table clean!");
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
    } else {
      console.error('Error: dbInstance is undefined');
    }
  }
}
