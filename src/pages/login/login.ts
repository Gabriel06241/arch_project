import { UtilsProvider } from './../../providers/utils/utils';
import { UserPage } from './../user/user';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public userProvider: UserProvider,
    public forgotCtrl: AlertController,
    public toastCtrl: ToastController,
    public utilsProvider: UtilsProvider,
    public events: Events
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registerUser(user) {
    console.log("registerUser!");
    this.navCtrl.setRoot(UserPage);
  }

  async loginUser(user) {
    // console.log("loginUser!", user);
    // this.navCtrl.setRoot(HomePage);

    if (this.utilsProvider.validateDataUser(user)) {
      this.utilsProvider.showToast("Por favor complete todos los campos.");
      return this.utilsProvider.showAlert("Error campos vacíos","Por favor complete todos los campos.");
    }

    user.activo = false;

    try {
      await this.userProvider.getUserFromFieldValue('email', user.email)
      .then((response) => {
        // console.log('console @response -> ', response[0]);
        this.userProvider.setCurrentUser(response[0]);
        console.log('console #1 => ', JSON.stringify(this.userProvider.getCurrentUser(), null, 2));
        if (response.length) {
          // console.log('console @response -> ', response);
          user.exist = true;
          user.activo = response[0].activo;
          user.perfil = response[0].perfil;
        }
      }, (err) => {
        console.log('trying to get getUsuarioFromFieldValue', err)
      });
    }catch(error){
      console.log(error);
    }

    // if(!user.profile) {
    //   this.utilsProvider.showToast("Correo y/o contraseña incorrectos!");
    // }else if(user.active) {
    // if (user.exist) {
    if (user.exist && user.activo) {
      this.utilsProvider.showLoading('Por favor espere...');
      try {
        // console.log(this.utilsProvider.getHashMd5(user.password));
        console.log(user.password);
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, this.utilsProvider.getHashMd5(user.password))
        // const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        if (result) {
          this.navCtrl.setRoot(HomePage, user);
        }else {
          console.log('result -> ', result)
        }
      } catch (error) {
        console.log('result await -> ', error)
        if(error.message) {
          this.utilsProvider.showToast(error.message);
        }
      }
    } else{
      this.utilsProvider.showToast("Usuario no se encuentra activo!");
    }
  }

  forgotPassword() {
    let forgot = this.forgotCtrl.create({
      title: 'Olvidó su contraseña?',
      message: "Ingrese su correo para restablecer su contraseña.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
