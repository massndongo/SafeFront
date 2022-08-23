import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CommandService} from '../command/command.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ponctuel',
  templateUrl: './ponctuel.page.html',
  styleUrls: ['./ponctuel.page.scss'],
})
export class PonctuelPage implements OnInit {
  /*other = false;
  autre = false;
  myForm: any = FormGroup;

  constructor(
    private commandService: CommandService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      libelle1: [''],
      quantite1: [''],
      libelle2: [''],
      quantite2: [''],
      nomClient: ['', Validators.required],
      adresse: ['', Validators.required],
      numeroClient: ['', Validators.required],
      nomComplet: [''],
      telephone: [''],
      adresse1: [''],
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.myForm.controls;
  }

  async command() {
    const formValue = this.myForm.value;
    const formData = new FormData();
    formData.append('libelle1', formValue.libelle1);
    formData.append('quantite1', formValue.quantite1);
    formData.append('libelle2', formValue.libelle2);
    formData.append('quantite2', formValue.quantite2);
    formData.append('nomClient', formValue.nomClient);
    formData.append('adresse', formValue.adresse);
    formData.append('numeroClient', formValue.numeroClient);
    formData.append('nomComplet', formValue.nomComplet);
    formData.append('telephone', formValue.telephone);
    formData.append('adresse1', formValue.adresse1);

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();

    if (formValue.libelle1 === '' && formValue.libelle2 === '') {
      await loading.dismiss();
      await this.errorMedoc();
      return;
    }

    if ((formValue.libelle1 !== '' && formValue.quantite1 === '') || (formValue.quantite1 !== '' && formValue.libelle1 === '')) {
      await loading.dismiss();
      await this.errorMedoc();
      return;
    }

    if ((formValue.libelle2 !== '' && formValue.quantite2 === '') || (formValue.quantite2 !== '' && formValue.libelle2 === '')) {
      await loading.dismiss();
      await this.errorMedoc();
      return;
    }

    if (formValue.nomClient === '' || formValue.numeroClient === '' || formValue.adresse === '') {
      await loading.dismiss();
      await this.errorName();
      return;
    }

    if (formValue.nomComplet !== '' && formValue.adresse1 === '' || formValue.telephone === '') {
      await loading.dismiss();
      await this.errorBenef();
      return;
    }

    if (formValue.adresse1 !== '' && formValue.nomComplet === '' || formValue.telephone === '') {
      await loading.dismiss();
      await this.errorBenef();
      return;
    }

    if (formValue.telephone !== '' && formValue.nomComplet === '' || formValue.adresse1 === '') {
      await loading.dismiss();
      await this.errorBenef();
      return;
    }

    this.commandService.command(formData).subscribe(
      (res: any) => {
        loading.dismiss();
        this.success();
      }
    );
  }

  async errorName() {
    const alerte = await this.alertController.create({
      message: 'Veuillez renseigner votre nom, numéro de téléphone et adresse svp',
      buttons: ['Ok']
    });
    await alerte.present();
  }

  async errorMedoc() {
    const alerte = await this.alertController.create({
      message: 'Veuillez renseigner le nom du médicament et sa quantité svp',
      buttons: ['Ok']
    });
    await alerte.present();
  }

  async errorMedoc1() {
    const alerte = await this.alertController.create({
      message: 'Veuillez renseigner au moins un médicament et sa quantité svp',
      buttons: ['Ok']
    });
    await alerte.present();
  }

  async errorBenef() {
    const alerte = await this.alertController.create({
      message: 'Veuillez renseigner le nom, le numéro de téléphone et l\'adresse du bénéficiaire svp',
      buttons: ['Ok']
    });
    await alerte.present();
  }

  async success() {
    const alerte = await this.alertController.create({
      message: 'Commande exécutée avec succès, vous allez bientôt recevoir un appel de confirmation',
      buttons: ['Ok']
    });
    await alerte.present();
    this.myForm.reset();
    this.router.navigate(['/command']);
  }

  cancel() {
    this.myForm.reset();
    this.router.navigate(['/command']);
  }

*/

  step = 0;

  productForm: FormGroup;
  cliqued = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private commandService: CommandService,
  ) {

    this.productForm = this.fb.group({
      nomClient: '',
      numeroClient: '',
      adresse: '',
      medicament: this.fb.array([]) ,
    });
  }

  ngOnInit() {
  }

  quantities(): FormArray {
    return this.productForm.get('medicament') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      libelle: '',
      quantite: '',
    });
  }

  get f() {
    return this.productForm.controls;
  }

  addQuantity() {
    console.log(this.productForm.value.medicament.length);
    if (this.productForm.value.medicament.length == '0') {
      //console.log('bon')
      this.quantities().push(this.newQuantity());
      this.cliqued = true;
    }else {
      this.productForm.value.medicament.forEach((value: any) => {
        if (value.libelle === '' || value.quantite === '' || value.quantite === null) {
          this.errorMedoc1();
          return;
        }else {
          this.quantities().push(this.newQuantity());
          this.cliqued = true;
        }
      });
    }
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
    if (i === 0) {
      this.cliqued = false;
    }
  }


  async onSubmit() {
    if (this.productForm.value.nomClient === '' || this.productForm.value.numeroClient === '' || this.productForm.value.adresse === '') {
      await this.errorName();
      return;
    }else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Veuilez patienter...',
      });
      await loading.present();

      this.commandService.command(this.productForm.value).subscribe(
        (res: any) => {
          loading.dismiss();
          this.success();
          console.log(res);
        },error => {
          loading.dismiss();
          this.errorSubmit();
          console.log(error);
        }
      );
    }

  }

  cancel() {
    this.productForm.reset();
    this.router.navigate(['/command']);
  }

  async errorMedoc1() {
    const alerte = await this.alertController.create({
      header: 'Erreur',
      cssClass: 'app-alert',
      message: 'Veuillez renseigner au moins un médicament et sa quantité en nombre avant de continuer',
      buttons: ['Ok']
    });
    await alerte.present();
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

  async errorName() {
    const alerte = await this.alertController.create({
      header: 'Erreur',
      cssClass: 'app-alert',
      message: 'Veuillez renseigner vos informations svp',
      buttons: ['Ok']
    });
    await alerte.present();
  }

  async success() {
    const alerte = await this.alertController.create({
      header: 'Commande réussie',
      cssClass: 'app-alert',
      message: 'La commande a été envoyée avec succès, vous allez bientôt recevoir un appel de confirmation',
      buttons: ['Ok']
    });
    await alerte.present();
    this.productForm.reset();
    this.router.navigate(['/command']);
  }

  suivant() {
    if (this.productForm.value.medicament.length === 0) {
      this.errorMedoc1();
    }
    this.productForm.value.medicament.forEach((value: any) => {
      if (value.libelle === '' || value.quantite === '' || value.quantite === null) {
        this.errorMedoc1();
        return;
      }
        this.step = this.step + 1;
      //console.log(value.last);
    });
  }
}
