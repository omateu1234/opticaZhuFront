import { TestBed } from '@angular/core/testing';

import { VerTodosEmpleadosService } from './ver-todos-empleados.service';

describe('VerTodosEmpleadosService', () => {
  let service: VerTodosEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerTodosEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
