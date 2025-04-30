import { TestBed } from '@angular/core/testing';

import { ArticulosRealService } from './articulos-real.service';

describe('ArticulosRealService', () => {
  let service: ArticulosRealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosRealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
