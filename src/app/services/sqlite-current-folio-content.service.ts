import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteCurrentFolioContentService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "current_folio_content";
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

  // Update
  updateFolioContent(id: any, piezas: any, unidades: any, medida: any) {
    console.log('Piezas', piezas);
    console.log('Unidades', unidades);
    console.log('Medida', medida);
    let folioContent;
    this.getFolioContent(id).then(res => {
      folioContent = res;
      console.log('Valor actual del folio content', folioContent);
      if (medida == 'KGS') {
        if ((unidades - folioContent.Unidades) <= 0) {
          return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET Unidades = ${folioContent.Unidades - unidades}, Piezas = ${folioContent.Unidades - unidades} WHERE id = ${id}`, []);
        } else {
          return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET Unidades = ${folioContent.Unidades - unidades} WHERE id = ${id}`, []);
        }
      } else if (medida == 'PZA') {
        if ((piezas - folioContent.Piezas) <= 0) {
          return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET Piezas = ${folioContent.Piezas - piezas}, Unidades = ${folioContent.Piezas - piezas} WHERE id = ${id}`, []);
        } else {
          return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET Piezas = ${folioContent.Piezas - piezas} WHERE id = ${id}`, []);
        }
        // return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET Piezas = ${piezas - folioContent.Piezas} WHERE id = ${id}`, []);
      }

    }).catch((e) => console.log(e));
  }

  // Get user
  getFolioContent(id: any): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE id = ?`, [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          Piezas: res.rows.item(0).Piezas,
          Unidades: res.rows.item(0).Unidades
        }
      });
  }

  getAllFolioContents() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.FOLIOS_CONTENT = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.FOLIOS_CONTENT.push(res.rows.item(i));
        }
        return this.FOLIOS_CONTENT;
      }
    }, (e) => {
      console.log(JSON.stringify(e));
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


