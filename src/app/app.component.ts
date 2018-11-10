import { UserProvider } from './../providers/user/user';
import { AboutPage } from './../pages/about/about';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
import { RentPage } from './../pages/rent/rent';
import { BalancePage } from '../pages/balance/balance';
import { UtilsProvider } from '../providers/utils/utils';
import { ServiceProvider } from '../providers/service/service';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
  perfil: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  // rootPage: any = RentPage;
  // rootPage: any = HomePage;

  pages: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public userProvider: UserProvider,
    public utilsProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public serviceProvider: ServiceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Alquiler', component: HomePage, icon: 'md-cash', perfil: 'user' },
      { title: 'Saldo', component: BalancePage, icon: 'logo-usd', perfil: 'admin' },
      { title: 'Acerca de...', component: AboutPage, icon: 'md-information-circle', perfil: 'admin' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      // this.keyboard.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    let confirmAlert = this.alertCtrl.create({
      title: 'Cerrar Sesion',
      // subTitle: 'Subtitle',
      message: '¿Estas seguro que deseas salir?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
          // console.log('No puedo, estoy ocupado!');
        }
      }, {
        text: 'Si',
        handler: () => {
          // this.logout();
          this.nav.setRoot(LoginPage);
          // console.log('Si puedo, a que horas?');
        }
      }]
    })
    confirmAlert.present();
  }

}
