import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCliComponent } from './buscar.component';

describe('BuscarComponent', () => {
  let component: BuscarCliComponent;
  let fixture: ComponentFixture<BuscarCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//
