import { TestBed } from '@angular/core/testing';

import { VerTodosClientesService } from './ver-todos-clientes.service';

describe('VerTodosClientesService', () => {
  let service: VerTodosClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerTodosClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
