import { StorageKeys } from './../helpers/constants';
import { Injectable } from '@angular/core';
import { UserType } from '../helpers/interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserDetails: UserType;

  //public userStatusChange$ = new Subject();

  constructor(private storageSrv: StorageService) {
    this.getCurrentUserFromStorage();
  }

  private async getCurrentUserFromStorage() {
    const details = await this.storageSrv.getItem(StorageKeys.USER_DETAILS, null);
    if (details)
      this.loggedInUserDetails = JSON.parse(details);
  }

  public get currentUserDetails() {
    return this.loggedInUserDetails;
  }

  public async logoutUser() {
    await this.storageSrv.getItem(StorageKeys.USER_DETAILS);
  }

}
