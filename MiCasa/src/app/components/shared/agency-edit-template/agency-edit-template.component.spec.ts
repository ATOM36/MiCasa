import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyEditTemplateComponent } from './agency-edit-template.component';

describe('AgencyEditTemplateComponent', () => {
  let component: AgencyEditTemplateComponent;
  let fixture: ComponentFixture<AgencyEditTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyEditTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
