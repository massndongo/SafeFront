import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {

  countryCode = '221';
  whatsappNumber = '772497234';
  url: string = 'https://wa.me/'+this.countryCode+this.whatsappNumber;

  constructor(private http: HttpClient, private actionSheetController: ActionSheetController, private router: Router) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choisissez un type de commande',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Commander avec ordonnance',
          handler: () => {
            this.router.navigate(['/ordonnance']);
          }
        },
        {
          text: 'Commander sans ordonnance',
          handler: () => {
            this.router.navigate(['/ponctuel']);
          }
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  whatsapp() {
    this.http.get(this.url);
  }
}
