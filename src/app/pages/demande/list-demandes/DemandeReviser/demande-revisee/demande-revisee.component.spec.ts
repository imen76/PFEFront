import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeReviseeComponent } from './demande-revisee.component';

describe('DemandeReviseeComponent', () => {
  let component: DemandeReviseeComponent;
  let fixture: ComponentFixture<DemandeReviseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeReviseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeReviseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
