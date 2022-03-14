import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTemplateComponent } from './agency-template.component';

describe('AgencyTemplateComponent', () => {
  let component: AgencyTemplateComponent;
  let fixture: ComponentFixture<AgencyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
