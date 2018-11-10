import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html',
})
export class RentPage {

  machine1: Observable<any>;
  machine2: Observable<any>;
  machine3: Observable<any>;

  dateIni: any;
  dateEnd: any;

  // machine1: number = 1;
  // machine2: number = 0;
  // machine3: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceProvider: ServiceProvider
  ) {
    this.serviceProvider.machine('/LED_STATUS1')
    .on('value', snap => {
      this.machine1 = snap.val();
      console.log('snap1 -->> ', snap.val())
    });

    this.serviceProvider.machine('/LED_STATUS2')
    .on('value', snap => {
      this.machine2 = snap.val();
      console.log('snap2 -->> ', snap.val())
    });

    this.serviceProvider.machine('/LED_STATUS3')
    .on('value', snap => {
      this.machine3 = snap.val();
      console.log('snap3 -->> ', snap.val())
    });



    // this.serviceProvider.machine('/LED_STATUS1').query.once('value')
    //   // .then(c => ({key: c.key, ...c.val()}))
    // .then(snapshot => snapshot.val()).then((data) => {
    //   console.log('data -> ', data)
    //   this.machine1 = data
    // });
    // this.serviceProvider.machine('/LED_STATUS2').query.once('value')
    //   // .then(c => ({key: c.key, ...c.val()}))
    // .then(snapshot => snapshot.val()).then((data) => {
    //   console.log('data -> ', data)
    //   this.machine2 = data
    // });
    // this.serviceProvider.machine('/LED_STATUS3').query.once('value')
    //   // .then(c => ({key: c.key, ...c.val()}))
    // .then(snapshot => snapshot.val()).then((data) => {
    //   console.log('data -> ', data)
    //   this.machine3 = data
    // });

    console.log('machine1 -->> ', this.machine1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentPage');
  }

  sendAction(value, LED_STATUS) {
    console.log(value)
    console.log(LED_STATUS)
    this.serviceProvider.sendAction(value, LED_STATUS);
    // this.serviceProvider.sendAction(value, LED_STATUS).subscribe(
    //   (data) => { // Success
    //     // this.users = data['results'];
    //     console.log('console @data ===>>> ', data);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

}
