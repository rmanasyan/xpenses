import { Component } from '@angular/core';
import { concat, delay, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent {
  storedVersionHash: string = this.updateService.storedVersionHash;
  newVersionAvailable$: Observable<string> = this.updateService.newVersionAvailable$;

  animationSource: Subject<void> = new Subject<void>();
  animation$: Observable<boolean> = this.animationSource.pipe(
    switchMap(() => concat(of(true), of(false).pipe(delay(2000))))
  );

  constructor(private updateService: UpdateService) {}

  checkForUpdate(): void {
    this.startAnimation();
    this.updateService.checkForUpdate();
  }

  private startAnimation(): void {
    this.animationSource.next();
  }
}
