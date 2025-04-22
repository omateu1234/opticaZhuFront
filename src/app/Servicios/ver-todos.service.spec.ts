import { TestBed } from '@angular/core/testing';

import { VerTodosService } from './ver-todos.service';

describe('VerTodosService', () => {
  let service: VerTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
