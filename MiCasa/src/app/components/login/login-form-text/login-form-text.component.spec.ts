import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormTextComponent } from './login-form-text.component';

describe('LoginFormTextComponent', () => {
  let component: LoginFormTextComponent;
  let fixture: ComponentFixture<LoginFormTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
