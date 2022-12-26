import { REGEXs } from './../../common/helpers/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from 'angular-reactive-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [
        Validators.required('Email is required'),
        Validators.pattern(REGEXs.EMAIL, 'Please provide valid email')
      ]],
      password: ['', [
        Validators.maxLength(6),
        Validators.required('Password is required')
      ]]
    });
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.invalid)
      return;
    console.log(this.formGroup.value);

  }

}
