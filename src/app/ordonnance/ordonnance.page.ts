import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import {Storage} from '@ionic/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { CommandService } from '../command/command.service';
//import { IonicStorageModule } from '@ionic/storage-angular';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.page.html',
  styleUrls: ['./ordonnance.page.scss'],
})
export class OrdonnancePage implements OnInit {
  step = 0;
  clicked = false;
  photo = null;
  photos: any;
  myForm: any = FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    //private storage: IonicStorageModule,
    private loadingController: LoadingController,
    private comandService: CommandService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nomClient: ['', Validators.required],
      numeroClient: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  public async readAsBase64(cameraPhoto: any) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath);
    const blob = await response.blob();

    this.photos = blob;

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    if (capturedPhoto.webPath !== null) {
      this.clicked = true;
    }

    const base64Data = await this.readAsBase64(capturedPhoto);

    this.photo = base64Data;
  }

  cancel() {
    this.myForm.reset();
    this.photo  = null;
    this.router.navigate(['/command']);
  }

  async errorPhoto() {
    const noImage = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      message: 'Veuillez ajouter une image',
      buttons: ['OK']
    });
    await noImage.present();
    return;
  }
  async errorName() {
    const alerte = await this.alertController.create({
      header: 'Erreur',
      cssClass: 'app-alert',
      message: 'Veuillez renseigner vos informations svp',
      buttons: ['Ok']
    });
    await alerte.present();
    return;
  }
  suivant() {
    if (this.photo === null) {
      this.errorPhoto();
    }
    else {
      this.step = this.step + 1;
      console.log(this.step);
    }
  }

  async success() {
    const alerte = await this.alertController.create({
      header: 'Commande réussie',
      cssClass: 'app-alert',
      message: 'La commande a été envoyée avec succès, vous allez bientôt recevoir un appel de confirmation',
      buttons: ['Ok']
    });
    await alerte.present();
    this.myForm.reset();
    this.router.navigate(['/command']);
  }
  async errorSubmit() {
    const alerte = await this.alertController.create({
      header: 'Erreur',
      cssClass: 'app-alert',
      message: 'Une erreur est survenue, veuillez réessayer',
      buttons: ['Ok']
    });
    await alerte.present();
  }
  async onSubmit() {
    console.log(this.photos);
    if (this.myForm.value.nomClient === '' ||
        this.myForm.value.numeroClient === '' || this.myForm.value.adresse === '') {
      this.errorName();
      return;
    }else{
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Veuilez patienter...',
      });
      await loading.present();
    const formValue = this.myForm.value;
    const formData = new FormData();
    formData.append('nomClient', formValue.nomClient);
    formData.append('numeroClient', formValue.numeroClient);
    formData.append('adresse', formValue.adresse);
    formData.append('file', this.photos);
    this.comandService.commandWithPrescription(formData).subscribe(
      async (res: any) => {
        loading.dismiss();
        this.success();
        this.router.navigate(['/command']);
      },  async (error: any) => {
        console.log(error);
        loading.dismiss();
        this.errorSubmit();
      }
    );
    }
  }

}
