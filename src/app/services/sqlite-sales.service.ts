import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteSalesService {

  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "sales";
  SALES: Array<any> = [];

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
                    date varchar(255),
                    idCustomer varchar(255),
                    nameCustomer varchar(255),
                    reference varchar(255),
                    idSeller integer(20),
                    totalPzs integer(20),
                    totalKgs integer(20),
                    totalImport integer(20),
                    subTotal integer(20)
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
  public addSales(sales: any) {
    this.dbInstance.executeSql(`  
      INSERT INTO ${this.db_table} (idSell, date, idCustomer, nameCustomer, reference, idSeller, totalPzs, totalKgs, totalImport, subTotal) 
      VALUES (${sales.idSell}, '${sales.date}', '${sales.idCustomer}', '${sales.nameCustomer}', '${sales.reference}', ${sales.idSeller}, ${sales.totalPzs}, ${sales.totalKgs}, ${sales.totalImport}, ${sales.subTotal})`, [])
      .then(() => {
        console.log("Success");
        this.getAllSales();
      }, (e) => {
        console.log(JSON.stringify(e.err));
      });
  }

  getAllSales() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.SALES = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.SALES.push(res.rows.item(i));
        }
        return this.SALES;
      }
    }, (e) => {
      console.log(JSON.stringify(e));
    });
  }

  // Get user
  getVisit(id: any): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE idSell = ?`, [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          idSell: res.rows.item(0).idSell,
          date: res.rows.item(0).date,
          idCustomer: res.rows.item(0).idCustomer,
          nameCustomer: res.rows.item(0).nameCustomer,
          reference: res.rows.item(0).reference,
          idSeller: res.rows.item(0).idSeller,
          totalPzs: res.rows.item(0).totalPzs,
          totalKgs: res.rows.item(0).totalKgs,
          totalImport: res.rows.item(0).totalImport,
          subTotal: res.rows.item(0).subTotal
        }
      });
  }

  // Delete
  deleteSale(sales: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE id = ${sales}`, [])
      .then(() => {
        console.log("sales deleted!");
        this.getAllSales();
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


