import { TestBed } from '@angular/core/testing';

import { SocketConntectionService } from './socket-conntection.service';

describe('SocketConntectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketConntectionService = TestBed.get(SocketConntectionService);
    expect(service).toBeTruthy();
  });
});
