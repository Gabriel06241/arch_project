import { RentPage } from './../rent/rent';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, price: number, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['md-aperture', 'md-nuclear', 'md-color-fill', 'md-water', 'md-rainy'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Lavadora ' + i,
        price: 200 * i,
        note: 'Alquiler #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage, {
      item: item
    });
  }

  createRent() {
    this.navCtrl.push(RentPage);
  }
}
