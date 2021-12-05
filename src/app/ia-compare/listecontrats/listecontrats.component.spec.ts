import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecontratsComponent } from './listecontrats.component';

describe('ListecontratsComponent', () => {
  let component: ListecontratsComponent;
  let fixture: ComponentFixture<ListecontratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListecontratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListecontratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
