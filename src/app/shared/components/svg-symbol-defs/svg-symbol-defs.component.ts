import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-svg-symbol-defs',
  template: '',
})
export class SvgSymbolDefsComponent implements OnInit {
  @HostBinding('innerHTML') svg: SafeHtml;
  @Input() iconSet = 'entypo';
  svgUrl: string;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    let locationOrigin = '';

    // app-shell renders on localhost server
    if (isPlatformServer(this.platformId)) {
      locationOrigin = 'http://localhost:4200';
    }

    this.svgUrl = `${locationOrigin}/assets/${this.iconSet}.symbol-defs.svg`;

    this.http
      .get(this.svgUrl, { responseType: 'text' })
      .subscribe((response) => (this.svg = this.sanitizer.bypassSecurityTrustHtml(response)));
  }
}
