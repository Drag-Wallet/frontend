import { UserType } from './../helpers/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  login(formData: FormData) {
    return this.http.post<UserType>('auth/login', formData);
  }

  register(formData: FormData) {
    return this.http.post('auth/register', formData);
  }

}
