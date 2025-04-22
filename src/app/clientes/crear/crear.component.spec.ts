import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCliComponent } from './crear.component';

describe('CrearComponent', () => {
  let component: CrearCliComponent;
  let fixture: ComponentFixture<CrearCliComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//
