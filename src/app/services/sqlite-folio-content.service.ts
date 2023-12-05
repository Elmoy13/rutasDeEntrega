import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteFolioContentService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "folio_content";
  FOLIOS_CONTENT: Array<any> = [];

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
                    CodProd varchar(255),
                    Descripcion varchar(255),
                    NoRenglon integer(20),
                    NumDocto integer(20),
                    Piezas integer(20),
                    Unidades real(20),
                    Medida varchar(255),
                    PrecioUnitario integer(20)
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
  public addFolioContent(CodProd: any, Descripcion: any, NoRenglon: any, NumDocto: any, Piezas: any, Unidades: any, Medida: any, PrecioUnitario: any) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (CodProd, Descripcion, NoRenglon, NumDocto, Piezas, Unidades, Medida, PrecioUnitario) 
      VALUES ('${CodProd}','${Descripcion}', ${NoRenglon}, ${NumDocto}, ${Piezas}, ${Unidades}, '${Medida}', ${PrecioUnitario})`, [])
      .then(() => {
        // console.log("Success");
        this.getAllFolioContents();
      }, (e) => {
        console.log(JSON.stringify(e.err));
      });
  }

  getAllFolioContents() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.FOLIOS_CONTENT = [];
      for (let i = 0; i < res.rows.length; i++) {
        this.FOLIOS_CONTENT.push(res.rows.item(i));
      }
      return this.FOLIOS_CONTENT;
    }).catch((error) => {
      console.log("Error fetching folio contents: " + JSON.stringify(error));
      throw error; // Propagate the error to the calling code
    });
  }
  


  // Delete
  deleteFolioContent(folio: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ${folio}`, [])
      .then(() => {
        console.log("Folio content deleted!");
        this.getAllFolioContents();
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


