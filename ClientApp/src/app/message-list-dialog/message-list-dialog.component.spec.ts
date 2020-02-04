import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListDialogComponent } from './message-list-dialog.component';

describe('MessageListDialogComponent', () => {
  let component: MessageListDialogComponent;
  let fixture: ComponentFixture<MessageListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
