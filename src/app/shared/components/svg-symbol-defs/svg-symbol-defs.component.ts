import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-symbol-defs',
  template: ''
})
export class SvgSymbolDefsComponent implements OnInit {
  @HostBinding('innerHTML') svg: SafeHtml;
  @Input() iconSet = 'entypo';
  svgUrl: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.svgUrl = `assets/${this.iconSet}.symbol-defs.svg`;

    this.http
      .get(this.svgUrl, { responseType: 'text' })
      .subscribe(response => (this.svg = this.sanitizer.bypassSecurityTrustHtml(response)));
  }
}
