import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticasTablaComponent } from './opticas-tabla.component';

describe('OpticasTablaComponent', () => {
  let component: OpticasTablaComponent;
  let fixture: ComponentFixture<OpticasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpticasTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpticasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
