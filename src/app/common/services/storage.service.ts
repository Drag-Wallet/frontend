import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    Preferences.configure({
      group: environment.storageKey
    });
  }

  async setItem(key: string, value: string) {
    await Preferences.set({
      key,
      value
    });
  }

  async getItem(key: string, defaultValue?: string) {
    const { value } = await Preferences.get({
      key
    });
    return value ?? defaultValue;
  }

  async removeItem(key: string) {
    await Preferences.remove({
      key
    });
  }

  async clearAll() {
    await Preferences.clear();
  }
}
