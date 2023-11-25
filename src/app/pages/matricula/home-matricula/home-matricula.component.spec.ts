import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMatriculaComponent } from './home-matricula.component';

describe('HomeMatriculaComponent', () => {
  let component: HomeMatriculaComponent;
  let fixture: ComponentFixture<HomeMatriculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMatriculaComponent]
    });
    fixture = TestBed.createComponent(HomeMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
