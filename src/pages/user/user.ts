import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public utilsProvider: UtilsProvider,
    public userProvider: UserProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  async saveUser(user) {
    console.log("saveUser!", user);
    if (this.utilsProvider.validateDataUser(user)) {
      this.utilsProvider.showToast("Por favor complete todos los campos.");
      return this.utilsProvider.showAlert("Error campos vacíos","Por favor complete todos los campos.");
    }

    console.log('console @user -->> ', user);

    if (!user.id) {
      // try {

      await this.userProvider.getUserFromFieldValue('email', user.email)
      .then((response) => {
        console.log('console @response -> ',response);
        if (response.length) {
          return this.utilsProvider.showAlert("Alerta de error","El correo " + user.email + " ya se encuentra registrado!");
        }
      });
      // }catch(err){
      //   console.log(err)
      // }

      try {
        console.log('try');
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, this.utilsProvider.getHashMd5(user.password))
        // const result = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.cedula)
        console.log('retuls -> ', result);
        if (result) {
          user.id = result.user.uid;
          this.userProvider.createOrUpdateUser(user);
          // this.navCtrl.pop()
          this.navCtrl.setRoot(LoginPage);
        }
      } catch (error) {
        console.log('error', error.message);
        this.utilsProvider.showToast(error.message);
      }
    }else {
      console.log('#2');
      user.perfil = 'user';
      user.saldo = 0;
      user.activo = 1;
      this.userProvider.createOrUpdateUser(user);
      this.utilsProvider.showToast('Usuario actualizado exitosamente!');
      this.navCtrl.pop();
      // this.navCtrl.setRoot()
    }
  }

  redirectLogin() {
    this.navCtrl.setRoot(LoginPage)
  }

}
