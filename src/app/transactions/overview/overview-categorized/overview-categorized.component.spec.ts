import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCategorizedComponent } from './overview-categorized.component';

describe('OverviewCategorizedComponent', () => {
  let component: OverviewCategorizedComponent;
  let fixture: ComponentFixture<OverviewCategorizedComponent>;

  beforeEach(async(() => {
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
