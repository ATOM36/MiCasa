import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiconComponent } from './primeicon.component';

describe('PrimeiconComponent', () => {
  let component: PrimeiconComponent;
  let fixture: ComponentFixture<PrimeiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeiconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
