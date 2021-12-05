import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAccepterComponent } from './demande-accepter.component';

describe('DemandeAccepterComponent', () => {
  let component: DemandeAccepterComponent;
  let fixture: ComponentFixture<DemandeAccepterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAccepterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAccepterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
