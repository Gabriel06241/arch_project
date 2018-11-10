import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
// 6Es0ClYhzXP8AfIHqQrVFKGzlPLgvk54wXeRS60y
// gestionar-lavadoras.firebaseio.com
  path: string = "http://192.168.0.103/";

  constructor(
    public http: HttpClient, 
    public afBD: AngularFireDatabase
  ) {
    console.log('Hello ServiceProvider Provider');
  }

  sendAction(value, LED_STATUS) {
    let defaultValue = 0;
    if (value) {
      defaultValue = 1;
    }
    return this.afBD.database.ref(LED_STATUS).set(defaultValue);
    // return this.afBD.database.ref(LED_STATUS).set(value);
    // return this.http.get(this.path + defaultValue);
  }

  // public createOrUpdateUser(user) {
  //   return this.afBD.database.ref('/users/' + user.id).set(user);
  // }

  public machine(machineName) {
    return this.afBD.database.ref(machineName)
    // return this.afBD.list(machineName).valueChanges();
    // return this.afBD.object(machineName).valueChanges();
  }
  
}
