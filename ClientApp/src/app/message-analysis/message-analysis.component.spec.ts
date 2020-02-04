import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAnalysisComponent } from './message-analysis.component';

describe('MessageAnalysisComponent', () => {
  let component: MessageAnalysisComponent;
  let fixture: ComponentFixture<MessageAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
