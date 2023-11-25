import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMatriculaComponent } from './form-matricula.component';

describe('FormMatriculaComponent', () => {
  let component: FormMatriculaComponent;
  let fixture: ComponentFixture<FormMatriculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMatriculaComponent]
    });
    fixture = TestBed.createComponent(FormMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
