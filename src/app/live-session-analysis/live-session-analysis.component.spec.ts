import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionAnalysisComponent } from './live-session-analysis.component';

describe('LiveSessionAnalysisComponent', () => {
  let component: LiveSessionAnalysisComponent;
  let fixture: ComponentFixture<LiveSessionAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveSessionAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSessionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
