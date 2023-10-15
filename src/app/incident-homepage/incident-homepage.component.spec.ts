import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentHomepageComponent } from './incident-homepage.component';

describe('IncidentHomepageComponent', () => {
  let component: IncidentHomepageComponent;
  let fixture: ComponentFixture<IncidentHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentHomepageComponent]
    });
    fixture = TestBed.createComponent(IncidentHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
