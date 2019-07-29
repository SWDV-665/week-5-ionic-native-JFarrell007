import { Injectable } from '@angular/core';
import { GroceriesService } from '../api/groceries.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public dataService: GroceriesService) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please Edit Item...' : 'Please Enter Item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          min: '1',
          max: '20',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          // tslint:disable-next-line: no-shadowed-variable
          handler: item => {
            console.log('Confirm Save');
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
