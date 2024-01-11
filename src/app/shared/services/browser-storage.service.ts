import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BROWSER_STORAGE } from './browser.token';

const STORAGE_ID: string = environment.firebase?.projectId || '';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string): string | null {
    return this.storage.getItem(STORAGE_ID + key);
  }

  set(key: string, value: string) {
    this.storage.setItem(STORAGE_ID + key, value);
  }

  remove(key: string) {
    this.storage.removeItem(STORAGE_ID + key);
  }

  clear() {
    this.storage.clear();
  }
}
