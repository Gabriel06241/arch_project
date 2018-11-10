import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the BalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {

  addSaldo: number = 0;
  currentUser: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public utilsProvider: UtilsProvider
  ) {
    console.log('#2 -> ', this.userProvider.getCurrentUser());
    this.currentUser = this.userProvider.getCurrentUser();
    if (!this.currentUser.saldo) {
      this.currentUser.saldo = 0;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

  updateBalance() {
    console.log('testing...')
    // this.currentUser = this.userProvider.getCurrentUser();
    console.log('#1', this.currentUser);
    this.currentUser.saldo = Number(this.currentUser.saldo) + Number(this.addSaldo);
    this.utilsProvider.showToast('Saldo actualizado exitosamente!');
    this.userProvider.createOrUpdateUser(this.currentUser);
    this.addSaldo = 0;
  }

  createRent() {
    console.log('testing...')
  }
}
