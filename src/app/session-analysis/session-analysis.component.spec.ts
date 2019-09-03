import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAnalysisComponent } from './session-analysis.component';

describe('SessionAnalysisComponent', () => {
  let component: SessionAnalysisComponent;
  let fixture: ComponentFixture<SessionAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
