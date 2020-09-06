import { Component } from '@angular/core';
import { AppVersion, UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent {
  version$ = this.updateService.version$;
  showAnimation = false;

  constructor(private updateService: UpdateService) {}

  update(version: AppVersion) {
    this.toggleAnimation();

    if (version.available) {
      this.updateService.activateUpdate();
    } else {
      this.updateService.checkForUpdate();
    }
  }

  private toggleAnimation() {
    this.showAnimation = true;
    setTimeout(() => (this.showAnimation = false), 2800);
  }
}
