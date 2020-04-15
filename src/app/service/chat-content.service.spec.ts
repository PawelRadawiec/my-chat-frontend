import { TestBed } from '@angular/core/testing';

import { ChatContentService } from './chat-content.service';

describe('ChatContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatContentService = TestBed.get(ChatContentService);
    expect(service).toBeTruthy();
  });
});
