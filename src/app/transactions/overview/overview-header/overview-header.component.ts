import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
