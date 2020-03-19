import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

/**
 * Fixes vertical scroll when hammerjs swipe gestures used
 */
@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}
