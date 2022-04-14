import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimebuttonComponent } from './primebutton.component';

describe('PrimebuttonComponent', () => {
  let component: PrimebuttonComponent;
  let fixture: ComponentFixture<PrimebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimebuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
