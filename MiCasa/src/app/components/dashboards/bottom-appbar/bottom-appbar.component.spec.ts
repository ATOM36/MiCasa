import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomAppbarComponent } from './bottom-appbar.component';

describe('BottomAppbarComponent', () => {
  let component: BottomAppbarComponent;
  let fixture: ComponentFixture<BottomAppbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomAppbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
