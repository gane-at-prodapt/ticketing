import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersHomepageComponent } from './users-homepage.component';

describe('UsersHomepageComponent', () => {
  let component: UsersHomepageComponent;
  let fixture: ComponentFixture<UsersHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersHomepageComponent]
    });
    fixture = TestBed.createComponent(UsersHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
