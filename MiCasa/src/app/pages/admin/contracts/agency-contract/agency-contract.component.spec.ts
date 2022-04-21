import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyContractComponent } from './agency-contract.component';

describe('AgencyContractComponent', () => {
  let component: AgencyContractComponent;
  let fixture: ComponentFixture<AgencyContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
