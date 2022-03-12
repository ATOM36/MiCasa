import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRatioComponent } from './sales-ratio.component';

describe('SalesRatioComponent', () => {
  let component: SalesRatioComponent;
  let fixture: ComponentFixture<SalesRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
