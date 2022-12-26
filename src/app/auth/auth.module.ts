import { IonicModule } from '@ionic/angular';
import { ProfileEditPage } from './profile-edit/profile-edit.page';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register/register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationModule } from 'angular-reactive-validation';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'profile_edit',
    component: ProfileEditPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage,
    ProfileEditPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ReactiveValidationModule
  ]
})
export class AuthModule { }
