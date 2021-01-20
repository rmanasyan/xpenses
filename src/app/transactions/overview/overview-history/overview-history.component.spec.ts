import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverviewHistoryComponent } from './overview-history.component';

describe('OverviewHistoryComponent', () => {
  let component: OverviewHistoryComponent;
  let fixture: ComponentFixture<OverviewHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
