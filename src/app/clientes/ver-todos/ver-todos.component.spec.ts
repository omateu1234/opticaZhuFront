import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodosCliComponent } from './ver-todos.component';

describe('VerTodosComponent', () => {
  let component: VerTodosCliComponent;
  let fixture: ComponentFixture<VerTodosCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTodosCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodosCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
