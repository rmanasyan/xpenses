import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverviewCategorizedComponent } from './overview-categorized.component';

describe('OverviewCategorizedComponent', () => {
  let component: OverviewCategorizedComponent;
  let fixture: ComponentFixture<OverviewCategorizedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCategorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCategorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
