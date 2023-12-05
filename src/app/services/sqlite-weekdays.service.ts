import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteWeekdaysService {


  private dbInstance!: SQLiteObject;
  readonly db_name: string = "sistema_de_rutas.db";
  readonly db_table: string = "weekdays";
  WEEKDAYS: Array<any> = [];

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
                    idweekdays varchar(255), 
                    idroute varchar(255),
                    day varchar(255),
                    name varchar(255),
                    city varchar(255),
                    description varchar(255)
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
  public addItem(id: any, route: any, day: any, name: any, city: any, desc: any) {
    // validation
    // if (!n.length || !e.length) { 
    //   console.log('Provide both email & name');
    //   return;
    // }
    this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (idweekdays, idroute, day, name, city, description) VALUES ('${id}', '${route}', '${day}', '${name}', '${city}', '${desc}')`, [])
      .then(() => {
        // console.log("Success");
        this.getAllWeekdays();
      }, (e) => {
        console.log(JSON.stringify(e.err));
      });
  }

  getAllWeekdays() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.WEEKDAYS = [];
      for (let i = 0; i < res.rows.length; i++) {
        this.WEEKDAYS.push(res.rows.item(i));
      }
      return this.WEEKDAYS;
    }).catch((error) => {
      console.log("Error fetching weekdays: " + JSON.stringify(error));
      throw error; // Propagate the error to the calling code
    });
  }
  

  // Delete
  deleteWeekday(id: any) {
    this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE idweekdays = ${id}`, [])
      .then(() => {
        console.log("weekday deleted!");
        this.getAllWeekdays();
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
