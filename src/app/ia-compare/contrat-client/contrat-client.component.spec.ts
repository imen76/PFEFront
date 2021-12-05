import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratClientComponent } from './contrat-client.component';

describe('ContratClientComponent', () => {
  let component: ContratClientComponent;
  let fixture: ComponentFixture<ContratClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
