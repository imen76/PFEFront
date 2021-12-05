import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveaucontratComponent } from './nouveaucontrat.component';

describe('NouveaucontratComponent', () => {
  let component: NouveaucontratComponent;
  let fixture: ComponentFixture<NouveaucontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveaucontratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveaucontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
