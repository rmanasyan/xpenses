import { Injectable } from '@angular/core';
import { NoNewVersionDetectedEvent, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { delay, merge, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BrowserStorageService } from './browser-storage.service';

const STORAGE_KEY = 'version-hash';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  // set only on init
  storedVersionHash: string = this.browserStorageService.get(STORAGE_KEY) || '...';

  private versionReadyHash$: Observable<string> = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map((evt) => evt.latestVersion.hash)
  );

  private noNewVersionDetectedHash$: Observable<string> = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is NoNewVersionDetectedEvent => evt.type === 'NO_NEW_VERSION_DETECTED'),
    map((evt) => evt.version.hash)
  );

  newVersionAvailable$: Observable<string> = merge(this.versionReadyHash$, this.noNewVersionDetectedHash$).pipe(
    map((hash) => (this.storedVersionHash !== hash ? hash : ''))
  );

  constructor(private swUpdate: SwUpdate, private browserStorageService: BrowserStorageService) {
    this.newVersionAvailable$
      .pipe(
        filter((version) => !!version),
        tap((version) => {
          this.browserStorageService.set(STORAGE_KEY, version);
        }),
        delay(2000),
        tap(() => {
          document.location.reload();
        })
      )
      .subscribe();
  }

  checkForUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}
