import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSessionStatsComponent } from './filter-session-stats.component';

describe('FilterSessionStatsComponent', () => {
  let component: FilterSessionStatsComponent;
  let fixture: ComponentFixture<FilterSessionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSessionStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSessionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
