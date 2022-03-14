import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPublicationComponent } from './recent-publication.component';

describe('RecentPublicationComponent', () => {
  let component: RecentPublicationComponent;
  let fixture: ComponentFixture<RecentPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
