import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifconformiteComponent } from './verifconformite.component';

describe('VerifconformiteComponent', () => {
  let component: VerifconformiteComponent;
  let fixture: ComponentFixture<VerifconformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifconformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifconformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
