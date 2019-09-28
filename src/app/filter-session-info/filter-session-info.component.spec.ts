import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSessionInfoComponent } from './filter-session-info.component';

describe('FilterSessionInfoComponent', () => {
  let component: FilterSessionInfoComponent;
  let fixture: ComponentFixture<FilterSessionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSessionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSessionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
