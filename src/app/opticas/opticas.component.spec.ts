import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticasComponent } from './opticas.component';

describe('OpticasComponent', () => {
  let component: OpticasComponent;
  let fixture: ComponentFixture<OpticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
