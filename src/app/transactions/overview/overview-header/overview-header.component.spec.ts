import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverviewHeaderComponent } from './overview-header.component';

describe('OverviewHeaderComponent', () => {
  let component: OverviewHeaderComponent;
  let fixture: ComponentFixture<OverviewHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
