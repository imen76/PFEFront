import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeBrouillonComponent } from './demande-brouillon.component';

describe('DemandeBrouillonComponent', () => {
  let component: DemandeBrouillonComponent;
  let fixture: ComponentFixture<DemandeBrouillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeBrouillonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeBrouillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
