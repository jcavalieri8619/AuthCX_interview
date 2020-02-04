import { TestBed } from '@angular/core/testing';

import { UserMessageService } from './user-message.service';

describe('MessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMessageService = TestBed.get(UserMessageService);
    expect(service).toBeTruthy();
  });
});
