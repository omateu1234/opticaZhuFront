import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVentaComponent } from './perfil-venta.component';

describe('PerfilVentaComponent', () => {
  let component: PerfilVentaComponent;
  let fixture: ComponentFixture<PerfilVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
