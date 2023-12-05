import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteFolioService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "folio";
  FOLIOS: Array<any> = [];

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
                    NumDocto integer(10),
                    CodAlm integer(10),
                    CodAgen integer(10),
                    Ruta integer(10),
                    Fecha varchar(255),
                    TPiezas integer(10),
                    TKgs integer(10)
                  )`, [])
          .then((res) => {
            // console.log(JSON.stringify(res));
          })
          .catch((error) => console.log(JSON.stringify(error)));
      })
        .catch((error) => console.log(JSON.stringify(error)));
    });
  }

  public addFolio(folio: any) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (NumDocto, CodAlm, CodAgen, Ruta, Fecha, TPiezas, TKgs) VALUES (${folio.NumDocto}, ${folio.CodAlm}, ${folio.CodAgen}, ${folio.Ruta}, '${folio.Fecha}', ${folio.TPiezas}, ${folio.TKgs})`, [])
      .then(() => {
        // console.log("Success");
        this.getAllFolios();
      }, (e) => {
        console.log(JSON.stringify(e.err));
      });
  }

  getAllFolios() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.FOLIOS = [];
      for (let i = 0; i < res.rows.length; i++) {
        this.FOLIOS.push(res.rows.item(i));
      }
      return this.FOLIOS;
    }).catch((error) => {
      console.log("Error fetching folios: " + JSON.stringify(error));
      throw error; // Propagate the error to the calling code
    });
  }
  


  // Delete
  deleteFolio(folio: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE NumDocto = ${folio}`, [])
      .then(() => {
        console.log("Folio deleted!");
        this.getAllFolios();
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


