import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesHomepageComponent } from './roles-homepage.component';

describe('RolesHomepageComponent', () => {
  let component: RolesHomepageComponent;
  let fixture: ComponentFixture<RolesHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesHomepageComponent]
    });
    fixture = TestBed.createComponent(RolesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
