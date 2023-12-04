import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteSalesContentService {

  private dbInstance: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "sales_content";
  SALES_CONTENT: Array<any> = [];

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
                    idSell integer(20),
                    idcostumer varchar(255),
                    idseller varchar(255),  
                    rowNumber integer(20),               
                    product_code varchar(255),
                    pieces integer(20),
                    kilograms integer(20),
                    precioUnit integer(20),
                    productName varchar(255),
                    medida varchar(255)
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
  public addSales(sales_content: any) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (idSell, idcostumer, idseller,rowNumber, product_code, pieces, kilograms, precioUnit, productName, medida) 
      VALUES (${sales_content.idSell}, '${sales_content.idcostumer}', '${sales_content.idseller}', ${sales_content.rowNumber},  '${sales_content.product_code}', ${sales_content.pieces}, ${sales_content.kilograms}, ${sales_content.precioUnit}, '${sales_content.productName}', '${sales_content.medida}')`, [])
      .then(() => {
        console.log("Success");
        this.getAllSalesContent();
      }, (e) => {
        console.log("error al crear contendio de ventas: " + e);
        console.log(JSON.stringify(e));
      });
  }

  getAllSalesContent() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.SALES_CONTENT = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.SALES_CONTENT.push(res.rows.item(i));
        }
        return this.SALES_CONTENT;
      }
    }, (e) => {
      console.log(JSON.stringify(e));
    });
  }

  getSalesContentByIdSell(idSell) {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} idSell = ${idSell}`, []).then((res) => {
      this.SALES_CONTENT = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.SALES_CONTENT.push(res.rows.item(i));
        }
        return this.SALES_CONTENT;
      }
    }, (e) => {
      console.log(JSON.stringify(e));
    });
  }


  // Delete
  deleteSalesContent(sales_content) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ${sales_content}`, [])
      .then(() => {
        console.log("sales_content deleted!");
        this.getAllSalesContent();
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


