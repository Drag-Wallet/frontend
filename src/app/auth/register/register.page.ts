import { ApiService } from './../../common/services/api.service';
import { LoadingController } from '@ionic/angular';
import { REGEXs } from './../../common/helpers/constants';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Validators } from 'angular-reactive-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowLoader, ShowSuccessAlert, handleAuthError } from '../../common/helpers/helper-functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm = this.buildForm();

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private apiSrv: ApiService,
    private loadingCtrl: LoadingController
  ) { }

  private buildForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required('First name is required')],
      lastName: ['', Validators.required('Last name is required')],
      email: ['', [
        Validators.pattern(REGEXs.EMAIL, 'Enter valid email id'),
        Validators.required('Email is required')
      ]],
      password: ['', [
        Validators.required('Password is required'),
        Validators.minLength(6, 'Minimun 6 characters')
      ]]
    });
  }

  async onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    const { firstName, lastName, email, password } = this.registerForm.value;
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    await ShowLoader(this.loadingCtrl, 'Siging up..');
    this.apiSrv.register(formData).subscribe({
      next: async () => {
        await ShowSuccessAlert(
          this.alert,
          'Registered successfully, a OTP has beed sent to your email id for verification.'
        );
      },
      error: ({ error }: HttpErrorResponse) => {
        handleAuthError(this.alert, error);
      }
    }).add(async () => await this.loadingCtrl.dismiss());
  }
}
