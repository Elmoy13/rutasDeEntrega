import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteVisitsService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "visits";
  VISITS: Array<any> = [];

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
                    idCustomer varchar(255),
                    lat varchar(255),
                    long varchar(255),
                    check_in varchar(255),
                    check_out varchar(255),                    
                    idVendedor integer(10),
                    idRuta integer(10),
                    saleCreated varchar(255)
                  )`, [])
          .then((res) => {
            console.log(JSON.stringify(res));
          })
          .catch((error) => console.log(JSON.stringify(error)));
      })
        .catch((error) => console.log(JSON.stringify(error)));
    });
  }

  // Crud
  public addVisit(visit: any) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (idCustomer, lat, long, check_in, check_out, idVendedor, idRuta, saleCreated) 
      VALUES ('${visit.idCustomer}', '${visit.lat}', '${visit.long}', '${visit.check_in}', '${visit.check_out}', ${visit.idVendedor}, ${visit.idRuta}, '${visit.saleCreated}')`, [])
      .then(() => {
        console.log("Success");
        this.getAllVisits();
      }, (e) => {
        console.log(JSON.stringify(e.err));
      });
  }

  getAllVisits() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.VISITS = [];
      for (let i = 0; i < res.rows.length; i++) {
        this.VISITS.push(res.rows.item(i));
      }
      return this.VISITS;
    }).catch((error) => {
      console.log("Error fetching visits: " + JSON.stringify(error));
      throw error; // Propagate the error to the calling code
    });
  }
  

  // Get user
  getVisit(id: any): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE id = ?`, [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          idCustomer: res.rows.item(0).idCustomer,
          lat: res.rows.item(0).lat,
          long: res.rows.item(0).long,
          check_in: res.rows.item(0).check_in,
          check_out: res.rows.item(0).check_out,
          idVendedor: res.rows.item(0).idVendedor,
          idRuta: res.rows.item(0).idRuta,
          saleCreated: res.rows.item(0).saleCreated
        }
      });
  }

  // Update
  updateVisit(id: any, visit: { idCustomer: any; lat: any; long: any; check_in: any; check_out: any; idVendedor: any; idRuta: any; saleCreated: any; }) {
    let data = [visit.idCustomer, visit.lat, visit.long, visit.check_in, visit.check_out, visit.idVendedor, visit.idRuta, visit.saleCreated];
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET idCustomer = ?, lat = ?, long = ?, check_in = ?, check_out = ?, idVendedor = ?, idRuta = ?, saleCreated = ? WHERE id = ${id}`, data)
  }

  // Update
  updateVisitCheckOut(id: any, check_out: any) {
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET check_out = '${check_out}' WHERE id = ${id}`, [])
  }

  updateSaleCreated(id: any, saleCreated: any) {
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET saleCreated = '${saleCreated}' WHERE id = ${id}`, [])
  }

  // Delete
  deleteVisit(visit: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ${visit}`, [])
      .then(() => {
        console.log("Visit deleted!");
        this.getAllVisits();
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

