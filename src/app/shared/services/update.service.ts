import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppVersion = {
  timestamp?: number;
  current?: string;
  available?: string;
};

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private storageKey = 'xpenses_version';
  private subject = new BehaviorSubject<AppVersion>(null);
  version$: Observable<AppVersion> = this.subject.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.getVersion();

    swUpdate.available.subscribe(event => {
      this.setVersion({ current: event.current.hash, available: event.available.hash });
    });

    swUpdate.activated.subscribe(event => {
      this.setVersion({ current: event.current.hash });
    });
  }

  checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }

  activateUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => {
        setTimeout(() => document.location.reload(), 1000);
      });
    }
  }

  private setVersion(version?: AppVersion) {
    version = { ...version, timestamp: Date.now() };
    this.subject.next(version);
    localStorage.setItem(this.storageKey, JSON.stringify(version));
  }

  private getVersion() {
    let version: AppVersion;

    try {
      version = JSON.parse(localStorage.getItem(this.storageKey));
      if (version) {
        this.subject.next({ timestamp: version?.timestamp, current: version?.current, available: version?.available });
      }
    } catch {}

    if (!version) {
      this.setVersion(); // setting current time here
    }
  }
}
