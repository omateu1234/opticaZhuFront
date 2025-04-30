import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilArticuloComponent } from './perfil-articulo.component';

describe('PerfilArticuloComponent', () => {
  let component: PerfilArticuloComponent;
  let fixture: ComponentFixture<PerfilArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilArticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
