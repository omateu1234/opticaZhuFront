import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticaConfigComponent } from './optica-config.component';

describe('OpticaConfigComponent', () => {
  let component: OpticaConfigComponent;
  let fixture: ComponentFixture<OpticaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpticaConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpticaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
