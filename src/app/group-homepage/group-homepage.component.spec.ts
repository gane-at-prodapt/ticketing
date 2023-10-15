import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHomepageComponent } from './group-homepage.component';

describe('GroupHomepageComponent', () => {
  let component: GroupHomepageComponent;
  let fixture: ComponentFixture<GroupHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupHomepageComponent]
    });
    fixture = TestBed.createComponent(GroupHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
