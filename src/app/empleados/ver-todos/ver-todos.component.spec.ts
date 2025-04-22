import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodosEmpleadosComponent } from './ver-todos.component';
//
describe('VerTodosComponent', () => {
  let component: VerTodosEmpleadosComponent;
  let fixture: ComponentFixture<VerTodosEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTodosEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//
