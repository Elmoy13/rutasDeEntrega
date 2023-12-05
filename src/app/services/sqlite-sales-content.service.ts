import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteSalesContentService {

  private dbInstance!: SQLiteObject;
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
        this.createTable();
      }).catch((error) => {
        console.log("Error creating SQLite database: " + JSON.stringify(error));
      });
    });
  }

  // Create table if not exists
  createTable() {
    this.dbInstance.executeSql(`
      CREATE TABLE IF NOT EXISTS ${this.db_table} (
        id INTEGER PRIMARY KEY, 
        idSell INTEGER,
        idcostumer VARCHAR(255),
        idseller VARCHAR(255),  
        rowNumber INTEGER,               
        product_code VARCHAR(255),
        pieces INTEGER,
        kilograms INTEGER,
        precioUnit INTEGER,
        productName VARCHAR(255),
        medida VARCHAR(255)
      )`, []).then(() => {
        console.log("Table created or already exists");
      }).catch((error) => {
        console.log("Error creating table: " + JSON.stringify(error));
      });
  }

  // Crud
  public addSales(sales_content: any) {
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (idSell, idcostumer, idseller, rowNumber, product_code, pieces, kilograms, precioUnit, productName, medida) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sales_content.idSell, sales_content.idcostumer, sales_content.idseller, sales_content.rowNumber, sales_content.product_code, sales_content.pieces, sales_content.kilograms, sales_content.precioUnit, sales_content.productName, sales_content.medida])
      .then(() => {
        console.log("Success");
        this.getAllSalesContent();
      }).catch((error) => {
        console.log("Error adding sales content: " + JSON.stringify(error));
      });
  }

  getAllSalesContent() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.SALES_CONTENT = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.SALES_CONTENT.push(res.rows.item(i));
        }
      }
      return this.SALES_CONTENT;
    }).catch((error) => {
      console.log("Error fetching sales content: " + JSON.stringify(error));
    });
  }

  getSalesContentByIdSell(idSell: any) {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE idSell = ?`, [idSell]).then((res) => {
      this.SALES_CONTENT = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.SALES_CONTENT.push(res.rows.item(i));
        }
      }
      return this.SALES_CONTENT;
    }).catch((error) => {
      console.log("Error fetching sales content by idSell: " + JSON.stringify(error));
    });
  }

  // Delete
  deleteSalesContent(sales_content_id: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ?`, [sales_content_id])
      .then(() => {
        console.log("Sales content deleted!");
        this.getAllSalesContent();
      }).catch((error) => {
        console.log("Error deleting sales content: " + JSON.stringify(error));
      });
  }

  deleteTable() {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table}`)
      .then(() => {
        console.log("Table cleaned!");
      }).catch((error) => {
        console.log("Error cleaning table: " + JSON.stringify(error));
      });
  }
}
